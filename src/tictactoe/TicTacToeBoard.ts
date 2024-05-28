import { Board, BoardInspector, BoardState, PlayState } from './Board';

export type Play = { player: number; square: number; }

export class TicTacToeBoardState implements BoardState, BoardInspector {
    board: number[] = []; // 0 for whether a spot is occupied at all, 1 for player 1 in that spot, 2 for player 2 in that spot
    currentPlayer = 1;

    hash: bigint;
    normalized: bigint;

    constructor() { this.board[0] = this.board[1] = this.board[2] = 0; }

    getHash(): bigint {
        if (this.hash === undefined) this.hash = BigInt(((this.currentPlayer-1) << 18) + (this.board[2] << 9) + this.board[1]);
        return this.hash;
    }

    // normalize a state so that the MCTS doesn't have to store rotated/reflected copies of each state
    normalize(): bigint {
        if (this.normalized !== undefined) return this.normalized;

        let hash = Number(this.getHash());

        let hashes: bigint[] = [BigInt(hash), BigInt(this.mirrorHash(hash))];
        for (let i=0; i<3; i++) {
            hash = this.rotateHash(hash);
            hashes.push(BigInt(hash), BigInt(this.mirrorHash(hash)));
        }
        this.normalized = hashes.reduce((max, s) => max>s?max:s, 0n);

        return this.normalized;
    }

    // 1 2 4
    // 8 16 32
    // 64 128 256

    // mirror
    // 012 036
    // 345 147
    // 678 258
    mirrorHash(state: number): number {
        let newState = state & (1<<18);
        for (let p of [0,1]) {
            let h = (state>>(9*p)) & (511);
            h = (h&1)      | ((h&8)>>2)  | ((h&64)>>4)  |
                ((h&2)<<2) | (h&16)      | ((h&128)>>2) |
                ((h&4)<<4) | ((h&32)<<2) | (h&256);
            newState = newState | (h << (9*p));
        }
        return newState;
    }

    // rotate
    // 012 630
    // 345 741
    // 678 852
    rotateHash(state: number): number {
        let newState = state & (1<<18);
        for (let p of [0,1]) {
            let h = (state>>(9*p)) & (511);
            h = ((h&64)>>6)  | ((h&8)>>2)  | ((h&1)<<2) |
                ((h&128)>>4) | (h&16)      | ((h&2)<<4) |
                ((h&256)>>2) | ((h&32)<<2) | ((h&4)<<6);
            newState = newState | (h << (9*p));
        }
        return newState;
    }

    clone(): TicTacToeBoardState {
        let result = new TicTacToeBoardState();
        for (let p of [0, 1,2]) {
            result.board[p] = this.board[p];
        }
        result.currentPlayer = this.currentPlayer;
        return result;
    }

    getCellPlayer(row: number, col: number): number {
        let mask = 1<<(row*3+col);
        for (let p of [1,2]) {
            if ((this.board[p] & mask) === mask) return p;
        }
        return 0;
    }

    getCellStyle(row: number, col: number): object {
        return {};
    }

    invalidate() { this.hash = undefined; this.normalized = undefined; }

    printState() {
        console.error(this.toStringArr().join('\n'));
    }

    toStringArr(): string[] {
        let result: string[] = [];
        let line = '';
        for (let i=0; i<9; i++) {
            if (this.board[1] & 1<<i) line += 'X';
            else if (this.board[2] & 1<<i) line += 'O';
            else line += '.';
            if ((i+1) % 3 === 0) {
                result.push(line);
                line = '';
            }
        }
        result.push(`Current Player: ${this.currentPlayer}`);
        return result;
    }
}

export class TicTacToeBoard implements Board<Play> {
    playCache = new Map<bigint, Play[]>();

    start(): TicTacToeBoardState {
        return new TicTacToeBoardState();
    }

    currentPlayer(state: TicTacToeBoardState): number {
        return state.currentPlayer;
    }

    nextPlayer(state: TicTacToeBoardState): number {
        return 3 - state.currentPlayer;
    }

    legalPlays(stateHistory: TicTacToeBoardState[]): Play[] {
        let lastState = stateHistory.at(-1);
        let hash = lastState.getHash();
        let result = this.playCache.get(hash);
        if (result === undefined) {
            result = [];
            for (let i=0; i<9; i++) {
                if ((lastState.board[0] & 1<<i) === 0) {
                    result.push({player: lastState.currentPlayer, square: i});
                }
            }
            this.playCache.set(hash, result);
        }
        return result;
    }

    legalPlayStates(stateHistory: TicTacToeBoardState[]): PlayState<Play>[] {
        let lastState = stateHistory.at(-1);
        let legal = this.legalPlays(stateHistory);
        return this.toPlayStates(lastState, legal)
    }

    toPlayStates(lastState: TicTacToeBoardState, legal: Play[]): PlayState<Play>[] {
        return legal.map(play => {
                    let nextState = this.nextState(lastState, play);
                    let nextStateHash = nextState.getHash();
                    let nextStateNormalized = nextState.normalize();
                    return {play, nextState, nextStateHash, nextStateNormalized};
                });
    }

    nextState(state: TicTacToeBoardState, play: Play): TicTacToeBoardState {
        let result = state.clone();
        this.updateState(result, play);
        return result;
    }

    updateState(state: TicTacToeBoardState, play: Play) {
        let die = (message: string) => {
            state.printState();
            console.error(`Play: ${play.player} to ${play.square}`);
            throw new Error(message);
        };

        if (state.currentPlayer !== play.player) die(`Tried to play on wrong turn`);

        state.currentPlayer = 3-state.currentPlayer;
        if (state.board[0] & (1<<play.square)) die(`Tried to play in occupied square`);

        state.board[play.player] |= 1<<play.square;
        state.board[0] |= 1<<play.square;
    }

    // 1 2 4
    // 8 16 32
    // 64 128 256
    MAGIC_WIN_NUMBERS = [7, 56, 448, 73, 146, 292, 84, 273];
    FULL_BOARD = 511;
    winner(stateHistory: TicTacToeBoardState[]): number {
        let lastState = stateHistory.at(-1);
        for (let p of [1,2]) {
            if (this.MAGIC_WIN_NUMBERS.some(w => (lastState.board[p] & w) === w)) return p;
        }
        if ((lastState.board[0] ^ this.FULL_BOARD) === 0) return -1;
        return 0;
    }

    playToOutput(play: Play): string {
        return this.squareToOutput(play.square);
    }

    squareToOutput(square: number): string {
        return `${Math.floor(square/3)} ${square%3}`;
    }

    playFromInput(state: TicTacToeBoardState, str: string): Play {
        var [row, col] = str.split(' ').map(Number);
        return {player: state.currentPlayer, square: row*3 + col};
    }
}
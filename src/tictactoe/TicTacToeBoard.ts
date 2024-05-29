import { Board, BoardInspector, BoardState, PlayState } from './Board';

export type Play = { player: number; square: number; }

export class TicTacToeBoardState implements BoardState, BoardInspector {
    board = 0; // 18 bits - 2 bits per square (00 is empty, 01 is X, 10 is O, 11 is unused)
    currentPlayer = 1;

    hash: number;
    normalized: number;

    static BOARD_BITS = (1<<18) - 1;

    constructor() { }

    getHash(): number {
        if (this.hash === undefined) this.hash = ((this.currentPlayer-1) << 18) + this.board;
        return this.hash;
    }

    // normalize a state so that the MCTS doesn't have to store rotated/reflected copies of each state
    normalize(): number {
        if (this.normalized !== undefined) return this.normalized;

        let hash = Number(this.getHash());

        let hashes: number[] = [hash, TicTacToeBoardState.mirrorHash(hash)];
        for (let i=0; i<3; i++) {
            hash = TicTacToeBoardState.rotateHash(hash);
            hashes.push(hash, TicTacToeBoardState.mirrorHash(hash));
        }
        this.normalized = hashes.reduce((max, s) => max>s?max:s, 0);

        return this.normalized;
    }

    fromSquares(state: number, mapping: number[]): number {
        let newState = state & 1<<18;
        mapping.forEach((origInd, ind) => {
            let diff = 2*(origInd-ind);
            if (diff > 0) {
                newState |= (state & (3<<(2*origInd)))>>diff;
            } else {
                newState |= (state & (3<<(2*origInd)))<<(-1*diff);
            }
        })
        return newState;
    }

    // mirror
    // 012 036
    // 345 147
    // 678 258
    static mirrorHash(state: number): number {
        //return this.fromSquares(state, [0, 3, 6, 1, 4, 7, 2, 5, 8]);
        return (state&3)      | ((state&192)>>4)  | ((state&12288)>>8)  |
              ((state&12)<<4) | (state&768)       | ((state&49152)>>4) |
              ((state&48)<<8) | ((state&3072)<<4) | (state&196608) |
               (state & (1<<18));
    }

    // 1 2 4
    // 8 16 32
    // 64 128 256

    // 3 12 48
    // 192 768 3072
    // 12288 49152 196608

    // rotate
    // 012 630
    // 345 741
    // 678 852
    static rotateHash(state: number): number {
        //return this.fromSquares(state, [6, 3, 0, 7, 4, 1, 8, 5, 2]);
        return ((state&12288)>>12) | ((state&192)>>4)  | ((state&3)<<4) |
               ((state&49152)>>8)  | (state&768)       | ((state&12)<<8) |
               ((state&196608)>>4) | ((state&3072)<<4) | ((state&48)<<12) |
                (state & (1<<18));
    }

    clone(): TicTacToeBoardState {
        let result = new TicTacToeBoardState();
        result.board = this.board;
        result.currentPlayer = this.currentPlayer;
        return result;
    }

    getCellPlayer(row: number, col: number): number {
        let offset = 2*(row*3+col);
        return (this.board & 3<<offset) >> offset;
    }

    getCellStyle(row: number, col: number): object {
        return {};
    }

    printState() {
        console.error(this.toStringArr().join('\n'));
    }

    toStringArr(): string[] {
        let result: string[] = [];
        let line = '';
        for (let i=0; i<9; i++) {
            let v = this.board & 3<<(2*i);
            if (v === 1<<(2*i)) line += 'X';
            else if (v === 2<<(2*i)) line += 'O';
            else if (v === 3<<(2*i)) line += '%';
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
    playCache = new Map<number, Play[]>();

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
            let mask = 3;
            for (let i=0; i<9; i++) {
                if ((lastState.board & mask) === 0) {
                    result.push({player: lastState.currentPlayer, square: i});
                }
                mask <<= 2;
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
        let die = (message: string) => {
            state.printState();
            console.error(`Play: ${play.player} to ${play.square}`);
            throw new Error(message);
        };

        if (state.currentPlayer !== play.player) die(`Tried to play on wrong turn`);
        if (state.board & (3<<(2*play.square))) die(`Tried to play in occupied square`);

        let result = state.clone();
        result.board |= play.player << (2*play.square);
        result.currentPlayer = 3-state.currentPlayer;
        return result;
    }

    // 012
    // 345
    // 678
    MAGIC_WIN_NUMBERS = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]].map(arr=>arr.reduce((mask, pos) => mask|=1<<(2*pos), 0));
    winner(stateHistory: TicTacToeBoardState[]): number {
        let lastState = stateHistory.at(-1);
        for (let p of [0,1]) {
            if (this.MAGIC_WIN_NUMBERS.some(w => ((lastState.board & (w<<p)) === (w<<p)) && ((lastState.board & (w<<(1-p))) === 0))) return p+1;
        }
        for (let pos = 0; pos < 9; pos++) {
            if ((lastState.board & (3<<(2*pos))) === 0) return 0;
        }
        return -1;
    }

    playToOutput(play: Play): string {
        return this.squareToOutput(play.square);
    }

    squareToOutput(square: number): string {
        return `${Math.floor(square/3)} ${square%3}`;
    }

    squareFromRowCol(row: number, col: number): number {
        return row*3 + col;
    }

    playFromInput(state: TicTacToeBoardState, str: string): Play {
        let [row, col] = str.split(' ').map(Number);
        return {player: state.currentPlayer, square: row*3 + col};
    }
}
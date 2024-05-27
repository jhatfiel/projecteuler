import { Board, BoardState, PlayState } from './Board';

export type Play = { player: number; square: number; }

export class TicTacToeBoardState implements BoardState {
    xBoard = 0;
    oBoard = 0;
    currentPlayer = 1;

    hash: bigint;
    normalized: bigint;

    getHash(): bigint {
        if (this.hash === undefined) this.hash = BigInt(((this.currentPlayer-1) << 18) + (this.oBoard << 9) + this.xBoard);
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
        result.xBoard = this.xBoard;
        result.oBoard = this.oBoard;
        result.currentPlayer = this.currentPlayer;
        return result;
    }

    invalidate() { this.hash = undefined; this.normalized = undefined; }

    printState() {
        console.error(this.toString().join('\n'));
    }

    toString(): string[] {
        let result: string[] = [];
        let line = '';
        for (let i=0; i<9; i++) {
            if (this.xBoard & 1<<i) line += 'X';
            else if (this.oBoard & 1<<i) line += 'O';
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
    start(): TicTacToeBoardState {
        return new TicTacToeBoardState();
    }

    currentPlayer(state: TicTacToeBoardState): number {
        return state.currentPlayer;
    }

    nextPlayer(state: TicTacToeBoardState): number {
        return 3 - state.currentPlayer;
    }

    getPlayerHash(player: number, state: TicTacToeBoardState): number {
        if (player === 0) return state.xBoard;
        else return state.oBoard;
    }

    legalPlays(stateHistory: TicTacToeBoardState[]): Play[] {
        let result: Play[] = [];
        let lastState = stateHistory.at(-1);
        for (let i=0; i<9; i++) {
            if (((lastState.xBoard | lastState.oBoard) & 1<<i) === 0) {
                result.push({player: lastState.currentPlayer, square: i});
            }
        }
        return result;
    }

    legalPlayStates(stateHistory: TicTacToeBoardState[]): {legal: Play[], playStates: PlayState<Play>[]} {
        let lastState = stateHistory.at(-1);
        let legal = this.legalPlays(stateHistory);
        return {legal,
                playStates: legal.map(play => {
                    let nextState = this.nextState(lastState, play);
                    let nextStateHash = nextState.getHash();
                    let nextStateNormalized = nextState.normalize();
                    return {play, nextState, nextStateHash, nextStateNormalized};
                })
        };
    }

    nextState(state: TicTacToeBoardState, play: Play): TicTacToeBoardState {
        let die = (message: string) => {
            state.printState();
            console.error(`Play: ${play.player} to ${play.square}`);
            throw new Error(message);
        };

        if (state.currentPlayer !== play.player) die(`Tried to play on wrong turn`);

        let result = state.clone();
        result.currentPlayer = 3-result.currentPlayer;
        if ((result.xBoard | result.oBoard) & (1<<play.square)) die(`Tried to play in occupied square`);

        if (play.player === 1) result.xBoard |= 1<<play.square;
        else result.oBoard |= 1<<play.square;

        return result;
    }

    // 1 2 4
    // 8 16 32
    // 64 128 256
    MAGIC_WIN_NUMBERS = [7, 56, 448, 73, 146, 292, 84, 273];
    FULL_BOARD = 511;
    winner(stateHistory: TicTacToeBoardState[]): number {
        let lastState = stateHistory.at(-1);
        if (this.MAGIC_WIN_NUMBERS.some(w => (lastState.xBoard & w) === w)) return 1;
        if (this.MAGIC_WIN_NUMBERS.some(w => (lastState.oBoard & w) === w)) return 2;
        if (((lastState.xBoard | lastState.oBoard) ^ this.FULL_BOARD) === 0) return -1;
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
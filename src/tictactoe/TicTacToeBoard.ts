import { Board, PlayState } from './Board';

export type Play = { player: number; square: number; }

export class TicTacToeBoard implements Board<Play, number> {
    start(): number {
        return 0;
    }

    currentPlayer(state: number): number {
        return (state >> 18) + 1;
    }

    nextPlayer(state: number): number {
        return 3 - this.currentPlayer(state);
    }

    getPlayerHash(player: number, hash: number): number {
        return (hash >> (9*(player-1))) & this.FULL_BOARD;
    }

    legalPlays(stateHistory: number[]): Play[] {
        let result: Play[] = [];
        let lastState = stateHistory.at(-1);
        let currentPlayer = this.currentPlayer(lastState);
        let p1 = this.getPlayerHash(1, lastState);
        let p2 = this.getPlayerHash(2, lastState);
        let board = p1 | p2;
        for (let i=0; i<9; i++) {
            if ((board & 1<<i) === 0) {
                result.push({player: currentPlayer, square: i});
            }
        }
        return result;
    }

    legalPlayStates(stateHistory: number[]): {legal: Play[], playStates: PlayState<Play, number>[]} {
        let lastState = stateHistory.at(-1);
        let legal = this.legalPlays(stateHistory);
        return {legal,
                playStates: legal.map(play => {
                    let nextState = this.nextState(lastState, play);
                    let nextStateNormalized = this.normalize(nextState);
                    return {play, nextState, nextStateNormalized};
                })
        };
    }

    nextState(state: number, play: Play): number {
        let die = (message: string) => {
            this.printState(state);
            console.error(`Play: ${play.player} to ${play.square}`);
            throw new Error(message);
        };

        if (this.currentPlayer(state) !== play.player) die(`Tried to play on wrong turn`);
        let result = state ^ (1<<18);

        let p1 = this.getPlayerHash(1, state);
        let p2 = this.getPlayerHash(2, state);
        if ((p1 | p2) & (1<<play.square)) die(`Tried to play in occupied square`);
        result |= 1<<(play.square+9*(play.player-1));
        return result;
    }

    // 1 2 4
    // 8 16 32
    // 64 128 256
    MAGIC_WIN_NUMBERS = [7, 56, 448, 73, 146, 292, 84, 273];
    FULL_BOARD = 511;
    winner(stateHistory: number[]): number {
        let lastState = stateHistory.at(-1);
        let board = 0;
        for (let playerNum of [1, 2]) {
            let hash = this.getPlayerHash(playerNum, lastState);
            if (this.MAGIC_WIN_NUMBERS.some(w => (hash & w) === w)) return playerNum;
            board |= hash;
        }
        if ((board ^ this.FULL_BOARD) === 0) return -1;
        return 0;
    }

    // normalize a state so that the MCTS doesn't have to store rotated/reflected copies of each state
    normalize(state: number): number {
        let states: number[] = [state, this.mirrorState(state)];
        for (let i=0; i<3; i++) {
            state = this.rotateState(state);
            states.push(state, this.mirrorState(state));
        }
        return states.reduce((min, s) => Math.min(min, s), Infinity);
    }

    // 1 2 4
    // 8 16 32
    // 64 128 256

    // mirror
    // 012 036
    // 345 147
    // 678 258
    mirrorState(state: number): number {
        let newState = state & (1<<18);
        for (let p of [0,1]) {
            let h = this.getPlayerHash(p+1, state);
            h = (h & 1)    | ((h&8)>>2)  | ((h&64)>>4)  |
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
    rotateState(state: number): number {
        let newState = state & (1<<18);
        for (let p of [0,1]) {
            let h = this.getPlayerHash(p+1, state);
            h = ((h&64)>>6)  | ((h&8)>>2)  | ((h&1)<<2) |
                ((h&128)>>4) | (h&16)      | ((h&2)<<4) |
                ((h&256)>>2) | ((h&32)<<2) | ((h&4)<<6);
            newState = newState | (h << (9*p));
        }
        return newState;
    }

    printState(state: number) {
        console.error(this.stateToString(state).join('\n'));
    }

    stateToString(state: number): string[] {
        let result: string[] = [];
        let line = '';
        let p1 = this.getPlayerHash(1, state);
        let p2 = this.getPlayerHash(2, state);
        for (let i=0; i<9; i++) {
            if (p1 & 1<<i) line += 'X';
            else if (p2 & 1<<i) line += 'O';
            else line += '.';
            if ((i+1) % 3 === 0) {
                result.push(line);
                line = '';
            }
        }
        result.push(`Current Player: ${this.currentPlayer(state)}`);
        result.push(`Winner? ${this.winner([state])}`);
        return result;
    }

    playToOutput(play: Play): string {
        return this.squareToOutput(play.square);
    }

    squareToOutput(square: number): string {
        return `${Math.floor(square/3)} ${square%3}`;
    }

    playFromInput(state: number, str: string): Play {
        var [row, col] = str.split(' ').map(Number);
        return {player: this.currentPlayer(state), square: row*3 + col};
    }
}
import { Board, PlayState } from './Board';

export type Play = { player: number; square: number; }

// tic tac toe was 3x3=9 squares
// so 2 boards to represent the two players, plus 1 bit to represent the turn
// for ultimate tic tac toe, we'll need 81 squares x 2 = 162, plus the 1 bit for the player.
// additionally, for purposes of caching, it might be nice to store an overall board?
// 81+81+9+9+1 = 181 (shift by 180 to get the player number)
export class UltimateTicTacToeBoard implements Board<Play, bigint> {
    start(): bigint {
        return 0n;
    }

    currentPlayer(state: bigint): number {
        return Number((state >> 180n) + 1n);
    }

    nextPlayer(state: bigint): number {
        return 3 - this.currentPlayer(state);
    }

    getPlayerHash(player: number, hash: bigint): bigint {
        return (hash >> BigInt(81*(player-1))) & this.FULL_BIG_BOARD;
    }

    getPlayerBigBoardHash(player: number, hash: bigint): number {
        return Number((hash >> BigInt(162+9*(player-1)))) & this.FULL_SMALL_BOARD;
    }

    legalPlays(stateHistory: bigint[]): Play[] {
        let result: Play[] = [];
        let lastState = stateHistory.at(-1);
        let currentPlayer = this.currentPlayer(lastState);
        let p1 = this.getPlayerHash(1, lastState);
        let p2 = this.getPlayerHash(2, lastState);
        let board = p1 | p2;
        for (let i=0n; i<81n; i++) {
            if ((board & 1n<<i) === 0n) {
                result.push({player: currentPlayer, square: Number(i)});
            }
        }
        return result;
    }

    legalPlayStates(stateHistory: bigint[]): {legal: Play[], playStates: PlayState<Play, bigint>[]} {
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

    nextState(state: bigint, play: Play): bigint {
        let die = (message: string) => {
            this.printState(state);
            console.error(`Play: ${play.player} to ${play.square}`);
            throw new Error(message);
        };

        if (this.currentPlayer(state) !== play.player) die(`Tried to play on wrong turn`);
        let result = state ^ (1n<<180n);

        let p1 = this.getPlayerHash(1, state);
        let p2 = this.getPlayerHash(2, state);
        if ((p1 | p2) & (1n<<BigInt(play.square))) die(`Tried to play in occupied square`);
        result |= 1n<<(BigInt(play.square+81*(play.player-1)));
        // TODO: need to calculate the cache of the big board here (i.e., keep track of who wins the small games)
        // TODO: When a small board is won, replace it with 9 copies of the winning player (greatly reduces the search space!)
        return result;
    }

    // 1 2 4
    // 8 16 32
    // 64 128 256
    MAGIC_WIN_NUMBERS = [7, 56, 448, 73, 146, 292, 84, 273];
    FULL_BIG_BOARD = (1n<<81n)-1n;
    FULL_SMALL_BOARD = (1<<9)-1;
    winner(stateHistory: bigint[]): number {
        let lastState = stateHistory.at(-1);
        let board = 0n;
        for (let playerNum of [1, 2]) {
            let bigBoardHash = this.getPlayerBigBoardHash(playerNum, lastState);
            let hash = this.getPlayerHash(playerNum, lastState);
            // TODO: need to see if someone has won the big board
            if (this.MAGIC_WIN_NUMBERS.some(w => (bigBoardHash & w) === w)) return playerNum;
            board |= hash;
        }
        if ((board ^ this.FULL_BIG_BOARD) === 0n) return -1;
        return 0;
    }

    // normalize a state so that the MCTS doesn't have to store rotated/reflected copies of each state
    normalize(state: bigint): bigint {
        // TODO: This isn't all that hard, I just don't want to do it yet
        // rotate the WHOLE big board, plus rotate all the individual boards in it
        // mirror the WHOLE big board, plus rotate all the individual boards in it
        return state;
        /*
        let states: number[] = [state, this.mirrorState(state)];
        for (let i=0; i<3; i++) {
            state = this.rotateState(state);
            states.push(state, this.mirrorState(state));
        }
        return states.reduce((min, s) => Math.min(min, s), Infinity);
        */
    }

    // 1 2 4
    // 8 16 32
    // 64 128 256

    // mirror
    // 012 036
    // 345 147
    // 678 258
    mirrorState(state: bigint): bigint {
        /*
        let newState = state & (1<<18);
        for (let p of [0,1]) {
            let h = this.getPlayerHash(p+1, state);
            h = (h & 1)    | ((h&8)>>2)  | ((h&64)>>4)  |
                ((h&2)<<2) | (h&16)      | ((h&128)>>2) |
                ((h&4)<<4) | ((h&32)<<2) | (h&256);
            newState = newState | (h << (9*p));
        }
        return newState;
        */
       return state
    }

    // rotate
    // 012 630
    // 345 741
    // 678 852
    rotateState(state: bigint): bigint {
        /*
        let newState = state & (1<<18);
        for (let p of [0,1]) {
            let h = this.getPlayerHash(p+1, state);
            h = ((h&64)>>6)  | ((h&8)>>2)  | ((h&1)<<2) |
                ((h&128)>>4) | (h&16)      | ((h&2)<<4) |
                ((h&256)>>2) | ((h&32)<<2) | ((h&4)<<6);
            newState = newState | (h << (9*p));
        }
        return newState;
        */
        return state;
    }

    printState(state: bigint) {
        console.error(this.stateToString(state).join('\n'));
    }

    stateToString(state: bigint): string[] {
        let result: string[] = [];
        let line = '';
        let p1 = this.getPlayerHash(1, state);
        let p2 = this.getPlayerHash(2, state);
        for (let i=0n; i<81n; i++) {
            if (p1 & 1n<<i) line += 'X';
            else if (p2 & 1n<<i) line += 'O';
            else line += '.';
            if ((i+1n) % 3n === 0n) line += ' ';
            if ((i+1n) % 9n === 0n) {
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

    playFromInput(state: bigint, str: string): Play {
        var [row, col] = str.split(' ').map(Number);
        return {player: this.currentPlayer(state), square: row*3 + col};
    }
}
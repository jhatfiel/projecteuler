import { Board, BoardInspector, BoardState, PlayState } from './Board';
import { TicTacToeBoard, TicTacToeBoardState } from './TicTacToeBoard';

export type Play = { player: number; board: number, square: number; }

const TTTBoard = new TicTacToeBoard();

export class UltimateTicTacToeBoardState implements BoardState, BoardInspector {
    smallBoard: TicTacToeBoardState[] = Array.from({length: 9}, _ => new TicTacToeBoardState());
    bigBoard = new TicTacToeBoardState(); // keep track of the overall big board
    currentPlayer = 1;
    limitToBoard = 15;

    // hash format
    // 162 bits - 81 squares, 2 bits per square (00 is empty, 01 is X, 10 is O, 11 is unused)
    // +18 for big board state actually, this doesn't need to be stored in the hash!
    //  +4 for "limit to board" so we don't have to go looking through previous states/plays to figure it out
    //  +1 for current player
    // 167 bits
    // bit 0 starts small board 0
    // bit 18 starts small board 1
    // ...
    // bit 18*8=144 starts small board 8
    // bit 162 is player number
    // bit 163 starts limitToBoard (4 bits)
    hash: bigint;
    normalized: bigint;

    constructor() { }

    getHash(): bigint {
        if (this.hash === undefined) {
            this.hash = (BigInt(this.currentPlayer-1) << 162n) | (BigInt(this.limitToBoard) << 163n);
            for (let i=0; i<9; i++) this.hash |= BigInt(TicTacToeBoardState.BOARD_BITS & this.smallBoard[i].getHash())<<BigInt(i*18);
        }
        return this.hash;
    }

    // normalize a state so that the MCTS doesn't have to store rotated/reflected copies of each state
    // sadly the individual small boards can't all be normalized
    // however, we can normalize all of the rotation/reflections of the larger board
    // (and rotate/reflect all the smaller boards in the same way)
    // (while updating the limitToBoard as well)
    normalize(): bigint {
        return this.getHash();
        /*
        if (this.normalized !== undefined) return this.normalized;

        let hash = Number(this.getHash());

        let hashes: number[] = [hash, this.mirrorHash(hash)];
        for (let i=0; i<3; i++) {
            hash = this.rotateHash(hash);
            hashes.push(hash, this.mirrorHash(hash));
        }
        this.normalized = hashes.reduce((max, s) => max>s?max:s, 0);

        return this.normalized;
        */
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
    mirrorHash(state: number): number {
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
    rotateHash(state: number): number {
        //return this.fromSquares(state, [6, 3, 0, 7, 4, 1, 8, 5, 2]);
        return ((state&12288)>>12) | ((state&192)>>4)  | ((state&3)<<4) |
               ((state&49152)>>8)  | (state&768)       | ((state&12)<<8) |
               ((state&196608)>>4) | ((state&3072)<<4) | ((state&48)<<12) |
                (state & (1<<18));
    }

    clone(): UltimateTicTacToeBoardState {
        let result = new UltimateTicTacToeBoardState();
        for (let i=0; i<9; i++) {
            result.smallBoard[i] = this.smallBoard[i];
        }
        result.bigBoard = this.bigBoard;
        result.currentPlayer = this.currentPlayer;
        result.limitToBoard = this.limitToBoard;
        return result;
    }

    getSmallBoardNumber(row: number, col: number): number {
        return Math.floor(row/3)*3 + Math.floor(col/3);
    }

    getCellPlayer(row: number, col: number): number {
        return this.smallBoard[this.getSmallBoardNumber(row, col)].getCellPlayer(row%3, col%3);
    }

    getCellStyle(row: number, col: number): object {
        let backgroundColor = 'black';
        if (this.limitToBoard !== 15 && this.getSmallBoardNumber(row, col) !== this.limitToBoard) backgroundColor = '#222222';
        if (TTTBoard.winner([this.smallBoard[this.getSmallBoardNumber(row, col)]])) backgroundColor = '#444444';
        return { backgroundColor };
    }

    printState() {
        console.error(this.toStringArr().join('\n'));
    }

    toStringArr(): string[] {
        let result: string[] = [];
        for (let row=0; row<9; row++) {
            let line = '';
            for (let col=0; col<9; col++) {
                let board = this.smallBoard[this.getSmallBoardNumber(row, col)];
                line += ['.', 'X', 'O', '%'][board.getCellPlayer(row%3, col%3)];
                if ((col+1) % 3 === 0) line += ' ';
            }
            result.push(line);
        }
        result.push(`Current Player: ${this.currentPlayer}`);
        result.push(`Limit to board: ${this.limitToBoard}`);
        return result;
    }
}

export class UltimateTicTacToeBoard implements Board<Play> {
    start(): UltimateTicTacToeBoardState {
        return new UltimateTicTacToeBoardState();
    }

    currentPlayer(state: UltimateTicTacToeBoardState): number {
        return state.currentPlayer;
    }

    nextPlayer(state: UltimateTicTacToeBoardState): number {
        return 3 - this.currentPlayer(state);
    }

    legalPlays(stateHistory: UltimateTicTacToeBoardState[]): Play[] {
        let result: Play[] = [];
        let lastState = stateHistory.at(-1);
        for (let board=0; board<9; board++) {
            if (lastState.limitToBoard === 15 || lastState.limitToBoard === board) {
                lastState.smallBoard[board].currentPlayer = lastState.currentPlayer;
                lastState.smallBoard[board].invalidate();
                TTTBoard.legalPlays([lastState.smallBoard[board]]).forEach(play => result.push({...play, player: lastState.currentPlayer, board}));
            }
        }
        return result;
    }

    legalPlayStates(stateHistory: UltimateTicTacToeBoardState[]): PlayState<Play>[] {
        let lastState = stateHistory.at(-1);
        let legal = this.legalPlays(stateHistory);
        return this.toPlayStates(lastState, legal)
    }

    toPlayStates(lastState: UltimateTicTacToeBoardState, legal: Play[]): PlayState<Play>[] {
        return legal.map(play => {
                    let nextState = this.nextState(lastState, play);
                    let nextStateHash = nextState.getHash();
                    let nextStateNormalized = nextState.normalize();
                    return {play, nextState, nextStateHash, nextStateNormalized};
                });
    }

    nextState(state: UltimateTicTacToeBoardState, play: Play): UltimateTicTacToeBoardState {
        let die = (message: string) => {
            state.printState();
            console.error(`Play: ${play.player} to ${play.square}`);
            throw new Error(message);
        };

        if (this.currentPlayer(state) !== play.player) die(`Tried to play on wrong turn`);
        if (state.smallBoard[play.board].board & (3<<(2*play.square))) die(`Tried to play in occupied square`);

        let result = state.clone();
        result.smallBoard[play.board] = result.smallBoard[play.board].clone();
        result.smallBoard[play.board].board |= play.player << (2*play.square);
        result.currentPlayer = 3-state.currentPlayer;
        //for (let b=0; b<9; b++) { result.smallBoard[b].currentPlayer = result.currentPlayer; }
        //result.bigBoard.currentPlayer = result.currentPlayer;
        // TODO: need to calculate the cache of the big board here (i.e., keep track of who wins the small games)
        // TODO: When a small board is won, replace it with 9 copies of the winning player (greatly reduces the search space!)
        let smallBoardWinner = TTTBoard.winner([result.smallBoard[play.board]]);
        if (smallBoardWinner > 0) {
            result.bigBoard = result.bigBoard.clone();
            result.bigBoard.board |= play.player << (2*play.board);
            result.smallBoard[play.board].board = this.FULL_OF_X << (play.player-1);
        } else if (smallBoardWinner === -1) { // draw
            result.bigBoard = result.bigBoard.clone();
            result.bigBoard.board |= 3 << (2*play.board);
            result.smallBoard[play.board].board = this.FULL_OF_X | (this.FULL_OF_X<<1);
        }

        // TODO: Update the board we are allowed to play on
        result.limitToBoard = TTTBoard.winner([result.smallBoard[play.square]])===0?play.square:15;
        
        return result;
    }

    FULL_OF_X = 0b010101010101010101;
    winner(stateHistory: UltimateTicTacToeBoardState[]): number {
        let lastState = stateHistory.at(-1);
        return TTTBoard.winner([lastState.bigBoard]);
    }

    playToOutput(play: Play): string {
        return this.squareToOutput(play.board, play.square);
    }

    squareToOutput(board: number, square: number): string {
        return `${Math.floor(board/3)*3 + Math.floor(square/3)} ${(board%3)*3 + square%3}`;
    }

    boardNumFromRowCol(row: number, col: number): number {
        return Math.floor(row/3)*3 + Math.floor(col/3);
    }

    squareFromRowCol(row: number, col: number): number {
        return (row%3)*3 + col%3;
    }

    playFromInput(state: UltimateTicTacToeBoardState, str: string): Play {
        let [row, col] = str.split(' ').map(Number);
        let board = this.boardNumFromRowCol(row, col);
        let square = this.squareFromRowCol(row, col);

        return {player: this.currentPlayer(state), board, square};
    }
}

/*
let bs = new TicTacToeBoardState();
bs.board = 0b111111111111110101;
bs.printState();
console.log(TTTBoard.winner([bs]));
*/
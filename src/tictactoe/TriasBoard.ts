// TriasBoard.ts
import { Board, BoardState, BoardInspector, PlayState } from "./Board";

//
// Define the type for a Trias move:
//   In the placement phase: { player, type:"place", to }
//   In the movement phase: { player, type:"move", from, to }
//
export type TriasPlay = 
    | { player: number, type: "place", to: number }
    | { player: number, type: "move", from: number, to: number };

//
// The board is represented as 9 holes (2 bits per hole):
//   0: empty, 1: player1, 2: player2.
// The holes are arranged as a 3x3 grid where cell 4 is the center.
// For clarity we define the following indices:
//
//   0 | 1 | 2
//   --+---+--
//   3 | 4 | 5
//   --+---+--
//   6 | 7 | 8
//
// We also consider the 8 outer holes arranged in circular order,
// starting at the top-center (index 1) and moving clockwise:
//
const outerCircle = [1, 2, 5, 8, 7, 6, 3, 0];

//
// Define connectivity for movement (only used in the movement phase):
// For each outer hole, allowed moves are to its two neighbors in outerCircle and to the center (4).
// For the center (4), allowed moves are to any outer hole.
//
const NEIGHBORS: { [cell: number]: number[] } = {
    4: [1,2,5,8,7,6,3,0],
};
for (const [i, cell] of outerCircle.entries()) {
    const prev = outerCircle[(i + outerCircle.length - 1) % outerCircle.length];
    const next = outerCircle[(i + 1) % outerCircle.length];
    NEIGHBORS[cell] = [prev, next, 4];
}

//
// TriasBoardState implements BoardState and BoardInspector.
// We follow a similar pattern to TicTacToeBoardState.
//
export class TriasBoardState implements BoardState, BoardInspector {
    // board: 18 bits (2 bits per hole, holes 0-8)
    board: number = 0;
    // current player: 1 or 2
    currentPlayer: number = 1;

    // cached values for hash and normalized state
    hash: number;
    normalized: number;

    static BOARD_BITS = (1 << 18) - 1;

    constructor() { }

    // Create a state from a hash value.
    // Note: Make sure to extract the current player from the upper bits.
    static fromHash(hash: number): TriasBoardState {
        let result = new TriasBoardState();
        // Assume that the upper bits (bits 18 and above) store (currentPlayer-1).
        result.currentPlayer = ((hash >> 18) & 0x3) + 1;
        result.board = hash & TriasBoardState.BOARD_BITS;
        return result;
    }

    getHash(): number {
        if (this.hash === undefined) {
            // Encode currentPlayer in bits 18-19.
            this.hash = ((this.currentPlayer - 1) << 18) | this.board;
        }
        return this.hash;
    }

    // Normalize the state to account for board symmetries.
    // For Trias we assume the symmetry is the same as a tic-tac-toe board,
    // though win conditions and legal moves differ.
    normalize(): number {
        if (this.normalized !== undefined) return this.normalized;
        // For simplicity, we can use the raw hash.
        // (A more complete implementation would try rotations/reflections.)
        this.normalized = this.getHash();
        return this.normalized;
    }

    invalidate() {
        this.hash = this.normalized = undefined;
    }

    clone(): TriasBoardState {
        let result = new TriasBoardState();
        result.board = this.board;
        result.currentPlayer = this.currentPlayer;
        return result;
    }

    // Get the owner of the piece at the given cell (0-8).
    getCellPlayer(cell: number): number {
        let offset = 2 * cell;
        return (this.board >> offset) & 3;
    }

    // For compatibility with BoardInspector: use row and col.
    // Map row,col to cell index using standard 3x3 order.
    getCellPlayerRC(row: number, col: number): number {
        return this.getCellPlayer(row * 3 + col);
    }

    getCellStyle(row: number, col: number): object {
        return {};
    }

    printState() {
        console.error(this.toStringArr().join('\n'));
    }

    toStringArr(): string[] {
        let result: string[] = [];
        for (let row = 0; row < 3; row++) {
            let line = '';
            for (let col = 0; col < 3; col++) {
                let cell = row * 3 + col;
                let p = this.getCellPlayer(cell);
                line += (p === 1 ? 'X' : p === 2 ? 'O' : '.');
            }
            result.push(line);
        }
        result.push(`Current Player: ${this.currentPlayer}`);
        // Indicate phase: placement if total pieces < 6, otherwise movement.
        let count = 0;
        for (let cell = 0; cell < 9; cell++) {
            if (this.getCellPlayer(cell) !== 0) count++;
        }
        result.push(`Phase: ${count < 6 ? 'Placement' : 'Movement'}`);
        return result;
    }
}

//
// TriasBoard implements the Board interface for TriasPlay.
// It provides methods to create a starting state, generate legal moves, update state,
// and determine a winner.
//
export class TriasBoard implements Board<TriasPlay> {
    // We use a cache for legal plays keyed by state hash.
    playCache = new Map<number, TriasPlay[]>();

    start(): TriasBoardState {
        return new TriasBoardState();
    }

    currentPlayer(state: TriasBoardState): number {
        return state.currentPlayer;
    }

    nextPlayer(state: TriasBoardState): number {
        return 3 - state.currentPlayer;
    }

    // Determine whether the state is in placement phase.
    private isPlacementPhase(state: TriasBoardState): boolean {
        let count = 0;
        for (let cell = 0; cell < 9; cell++) {
            if (state.getCellPlayer(cell) !== 0) count++;
        }
        return count < 6;
    }

    // Return legal plays for the given state history.
    legalPlays(stateHistory: TriasBoardState[]): TriasPlay[] {
        const lastState = stateHistory.at(-1);
        const hash = lastState.getHash();
        let result = this.playCache.get(hash);
        if (result === undefined) {
            result = [];
            const placement = this.isPlacementPhase(lastState);
            if (placement) {
                // In placement phase, any empty cell is allowed.
                for (let cell = 0; cell < 9; cell++) {
                    if (lastState.getCellPlayer(cell) === 0) {
                        result.push({ player: lastState.currentPlayer, type: "place", to: cell });
                    }
                }
            } else {
                // In movement phase, the player must move one of their pieces.
                // For each cell that contains the player's piece, try moving to each neighbor that is empty.
                for (let cell = 0; cell < 9; cell++) {
                    if (lastState.getCellPlayer(cell) === lastState.currentPlayer) {
                        const nbrs = NEIGHBORS[cell] || [];
                        for (let nbr of nbrs) {
                            if (lastState.getCellPlayer(nbr) === 0) {
                                result.push({ player: lastState.currentPlayer, type: "move", from: cell, to: nbr });
                            }
                        }
                    }
                }
            }
            this.playCache.set(hash, result);
        }
        return result;
    }

    legalPlayStates(stateHistory: TriasBoardState[]): PlayState<TriasPlay>[] {
        const lastState = stateHistory.at(-1);
        const legal = this.legalPlays(stateHistory);
        return this.toPlayStates(lastState, legal);
    }

    toPlayStates(lastState: TriasBoardState, legal: TriasPlay[]): PlayState<TriasPlay>[] {
        return legal.map(play => {
            const nextState = this.nextState(lastState, play);
            const nextStateHash = nextState.getHash();
            const nextStateNormalized = nextState.normalize();
            return { play, nextState, nextStateHash, nextStateNormalized };
        });
    }

    // Apply a play to the given state, returning a new state.
    nextState(state: TriasBoardState, play: TriasPlay): TriasBoardState {
        const die = (message: string) => {
            state.printState();
            console.error(`Play: ${JSON.stringify(play)}`);
            throw new Error(message);
        };

        // Ensure correct turn.
        if (state.currentPlayer !== play.player) die("Tried to play on wrong turn");

        let result = state.clone();
        if (play.type === "place") {
            if (result.getCellPlayer(play.to) !== 0) die("Tried to place in occupied hole");
            // Place the piece.
            result.board |= play.player << (2 * play.to);
        } else if (play.type === "move") {
            // In a move, ensure that the origin has the player's piece.
            if (result.getCellPlayer(play.from) !== play.player) die("Tried to move a piece not owned");
            // And destination must be empty.
            if (result.getCellPlayer(play.to) !== 0) die("Tried to move into occupied hole");
            // Remove piece from 'from': set that cell to 0.
            const mask = ~(3 << (2 * play.from));
            result.board &= mask;
            // Place piece at 'to'.
            result.board |= play.player << (2 * play.to);
        } else {
            die("Unknown play type");
        }
        // Switch turn.
        result.currentPlayer = 3 - result.currentPlayer;
        result.invalidate();
        return result;
    }

    // Winner detection for Trias.
    // Win if a player has either:
    //   (a) A diameter win: an outer hole, the center, and the diametrically opposite outer hole.
    //       Diametric pairs in our outerCircle: (1,7), (2,6), (5,3), (8,0).
    //   (b) A circumference win: three consecutive outer holes (in circular order) occupied by the same player.
    // Return: 1 or 2 if that player has won, 0 if no winner yet, and -1 if the board is full (draw).
    winner(stateHistory: TriasBoardState[]): number {
        const state = stateHistory.at(-1);
        // Check win conditions for each player.
        for (let player of [1, 2]) {
            // Diameter wins:
            const diameters = [
                [1, 7],
                [2, 6],
                [5, 3],
                [8, 0],
            ];
            for (const [a, b] of diameters) {
                if (state.getCellPlayer(a) === player &&
                    state.getCellPlayer(b) === player &&
                    state.getCellPlayer(4) === player) {
                    return player;
                }
            }
            // Circumference wins: check for any 3 consecutive outer holes.
            // Create an array of the 8 outer holes in circular order.
            const circle = outerCircle;
            for (let i = 0; i < circle.length; i++) {
                const cell1 = circle[i];
                const cell2 = circle[(i + 1) % circle.length];
                const cell3 = circle[(i + 2) % circle.length];
                if (state.getCellPlayer(cell1) === player &&
                    state.getCellPlayer(cell2) === player &&
                    state.getCellPlayer(cell3) === player) {
                    return player;
                }
            }
        }
        // Check if placement phase is still active. (Not a draw if moves remain.)
        if (this.legalPlays([state]).length > 0) return 0;
        return -1;
    }

    // Utility functions for output if desired.
    playToOutput(play: TriasPlay): string {
        if (play.type === "place") {
            return `Place at ${this.holeToOutput(play.to)}`;
        } else {
            return `Move from ${this.holeToOutput(play.from)} to ${this.holeToOutput(play.to)}`;
        }
    }

    holeToOutput(hole: number): string {
        // Convert cell index to row col.
        const row = Math.floor(hole / 3);
        const col = hole % 3;
        return `${row} ${col}`;
    }

    // For input conversion in a UI, similar to playTTT.tsx.
    playFromInput(state: TriasBoardState, str: string): TriasPlay {
        // Expect input format like "fromRow fromCol toRow toCol" for moves
        // or "toRow toCol" for placements.
        const parts = str.split(' ').map(Number);
        if (this.legalPlays([state]).some(p => p.type === "place")) {
            if (parts.length !== 2) throw new Error("Expected two numbers for placement");
            return { player: state.currentPlayer, type: "place", to: parts[0] * 3 + parts[1] };
        } else {
            if (parts.length !== 4) throw new Error("Expected four numbers for movement");
            return { player: state.currentPlayer, type: "move", from: parts[0] * 3 + parts[1], to: parts[2] * 3 + parts[3] };
        }
    }
}

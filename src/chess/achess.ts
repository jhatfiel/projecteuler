import { Puzzle } from '../lib/Puzzle';

export class achess extends Puzzle {
    lineNum = 0;

    sampleMode(): void { };

    _loadData(lines: string[]) { }

    readline() { return this.lines[this.lineNum++]; }

    _runStep(): boolean {
let STATE = new State();

let arr = this.readline().split(' ').map(s => new Position(s.charAt(0), s.charAt(1)));
console.error(`Initial State: ${arr}`);
STATE.addPiece(new King(0, arr[0])); // White King
STATE.addPiece(new Rook(0, arr[1])); // White Rook
STATE.addPiece(new King(1, arr[2])); // Black King
console.error(STATE.toString());
console.error(STATE.debugString().join('\n'));
//console.error(`Equivalent positions: ${STATE.equivalentPositions()}`);

let now = Date.now();
let ENGINE = new Engine(9);
console.error(`Starting engine ${ENGINE.maxDepth}`);

let result = ENGINE.minimax(STATE);
now = Date.now()-now;
console.error(`Engine done ${now}ms`);
console.error(`Known position: ${ENGINE.positionMinimax.size}`);
console.error(`${[...ENGINE.positionMinimax.values()].filter(m => m.depth > result.depth).length} known positions > ${result.depth}`);
/*
[...ENGINE.positionMinimax.values()].filter(m => m.depth > result.depth).forEach(m => {
    console.error(`Known position: ${m.evaluation},${m.depth},${m.moves}`);
})
*/

///  code
console.error(JSON.stringify(result));

let key = STATE.toString();
let moves:string[] = [];

while (result.moves && result.evaluation === 1) {
    console.error(`Result for ${STATE.toString()} = ${JSON.stringify(result)}`);
    let move = result.moves[0];
    //console.error(`Move chosen=${move} (end in ${result.moves.length})`);
    moves.push(move);
    console.log(move);
    STATE.makeMove(STATE.moveFromString(move));
    STATE.nextPlayer();

    if (STATE.evaluate() === 1) {
        console.error(`We WIN!!! [${moves}]`);
        break;
    }
    console.error(`Current position: ${STATE.toString()} ${STATE.isCheck()} ${STATE.getNextStates().size} available moves (next move should be ${result.moves[1]})`);

    key = STATE.toString();
    result = ENGINE.positionMinimax.get(key);

    let oppMoveStr: string = this.readline(); // A move made by the opponent, e.g. a2b1
    if (false && !oppMoveStr) {
        if (!result) throw new Error(`Unknown position: ${key}`);
        oppMoveStr = result.moves[0];
        console.error(`calculated opponent move: ${oppMoveStr}`);
    } else {
        console.error(`opponentMove: ${oppMoveStr}`);
    }

    if (oppMoveStr === undefined) {
        console.error(`Didn't win in time!`);
        break;
    }

    STATE.makeMove(STATE.moveFromString(oppMoveStr));
    STATE.nextPlayer();
    key = STATE.toString();
    result = ENGINE.positionMinimax.get(key);
}
console.error(`Final position: ${STATE.toString()} ${STATE.isCheck()} ${STATE.getNextStates().size} available moves`);
//console.error(STATE.debugString().join('\n'));
if (!STATE.isCheck()) {
    console.error(`!!!!!!!!!!!!!!FAIL!!!!!!!!!!!!!!!!!`);
}
        return false;
    }
}

class Position {
    // file a-h
    // rank 1-8
    fileNum: number;
    rankNum: number;
    constructor(public file: string, public rank: string) {
        this.fileNum = file.charCodeAt(0) - 'a'.charCodeAt(0);
        this.rankNum = rank.charCodeAt(0) - '1'.charCodeAt(0);
    }
    clone() { return new Position(this.file, this.rank); }
    equals(pos: Position) { return pos && this.fileNum === pos.fileNum && this.rankNum === pos.rankNum; }
    getRelativePosition(fDelta: number, rDelta: number): Position {
        if (fDelta === -1 && this.file === 'a') return undefined;
        if (fDelta ===  1 && this.file === 'h') return undefined;
        if (rDelta === -1 && this.rank === '1') return undefined;
        if (rDelta ===  1 && this.rank === '8') return undefined;

        // valid board position, state will have to determine if this is a valid position to move to though
        return new Position(String.fromCharCode(this.file.charCodeAt(0) + fDelta),
                            String.fromCharCode(this.rank.charCodeAt(0) + rDelta));
    }
    distanceTo(pos: Position) { return Math.abs(this.fileNum-pos.fileNum) + Math.abs(this.rankNum-pos.rankNum); }
    toString() { return this.file+this.rank; }
}

abstract class Piece {
    abstract letter: string;
    abstract value: number;
    constructor(public player: number, public position: Position) {} // player=0 is white, 1 is black
    abstract validMoves(state: State): Position[];
    clone(): Piece {
       return new (<any>this.constructor)(this.player, this.position.clone());
    }
    toString() { return `${this.position}=${this.player==0?'W':'B'}${this.letter}`; }
    getPieceLetter() { return this.player===0?this.letter:this.letter.toLowerCase()};
    static Sort(a: Piece, b: Piece): number {
        let property = 'rank';
        if (a.position.rank === b.position.rank) {
            property = 'file';
        }
        return a.position[property] < b.position[property]?-1:a.position[property] > b.position[property]?1:0;
    }
}

type Move = { piece: Piece, position: Position };
function moveToString(move: Move) { return `${move.piece.position.toString()}${move.position.toString()}`; }

class State {
    activePlayer = 0;
    pieces: Piece[] = [];
    nextMoves: string[];
    evaluated = false;
    evaluation: number;

    moveFromString(str: string): Move {
        let pos = new Position(str.charAt(0), str.charAt(1));
        let position = new Position(str.charAt(2), str.charAt(3));
        let piece = this.getPieceAtPosition(pos);
        let pieceThere = this.getPieceAtPosition(position);
        if (piece.player !== this.activePlayer) throw new Error(`Tried to move ${piece} but turn is ${this.activePlayer}`);
        if (pieceThere && piece.player === pieceThere.player) throw new Error(`You can't capture your own piece! ${piece} -> ${pieceThere}`);
        return {piece, position};
    }

    addPiece(p: Piece) { this.pieces.push(p); }
    removePiece(pos: Position) { this.pieces = this.pieces.filter(p => !p.position.equals(pos)); }
    getPieceAtPosition(pos: Position): Piece {  return this.pieces.find(p => p.position.equals(pos)); }

    makeMove(move: Move) {
        this.removePiece(move.position);
        this.getPieceAtPosition(move.piece.position).position = move.position;
        this.evaluated = false;
        this.nextMoves = undefined;
    }

    nextPlayer() {
        this.activePlayer = this.activePlayer===0?1:0;
        this.evaluated = false;
        this.nextMoves = undefined;
    }

    isCheck(): boolean {
        let activePlayerKing = this.pieces.find(p => p instanceof King && p.player === this.activePlayer);
        if (!activePlayerKing) {
            console.error(`activePlayerKing has gone missing...`);
            console.error(this.debugString().join('\n'));
        }
        if (this.pieces.some(p => p.player !== this.activePlayer && p.validMoves(this).some(pos => pos.equals(activePlayerKing.position)))) return true;
        return false;
    }

    getNextMoves(): string[] {
        if (!this.nextMoves) {
            this.nextMoves = [];
            this.pieces.filter(p => p.player === this.activePlayer).forEach(p => {
                //console.error(`getStates trying to move ${p}`);
                p.validMoves(this).forEach(position => {
                    //console.error(`getStates trying move ${position}`);
                    // try this move
                    let state = this.clone();
                    let move = {piece: p.clone(), position};
                    state.makeMove(move);
    
                    // if current player is in check, this is an invalid move
                    if (!state.isCheck()) {
                        state.nextPlayer();
                        this.nextMoves.push(moveToString(move));
                    }
                });
            });

        }
        return this.nextMoves;
    }

    getNextStates(): Map<string, State> {
        let result = new Map<string, State>();
        this.getNextMoves().forEach(moveStr => {
            let state = this.clone();
            state.makeMove(this.moveFromString(moveStr));
            state.nextPlayer();
            result.set(moveStr, state);
        });
        return result;
    }

    static SortWhite([aStr, a]: [string, State], [bStr, b]: [string, State]): number {
        let ae = a.evaluate();
        let be = b.evaluate();

        // undefined just means we don't know who wins this position
        if (ae === undefined && be === undefined) {
            // distance between kings?
            let awk = a.pieces.find(p => p instanceof King && p.player === 0);
            let abk = a.pieces.find(p => p instanceof King && p.player === 1);
            let bwk = b.pieces.find(p => p instanceof King && p.player === 0);
            let bbk = b.pieces.find(p => p instanceof King && p.player === 1);
            let ad = awk.position.distanceTo(abk.position);
            let bd = bwk.position.distanceTo(bbk.position);
            if (ad !== bd) return ad - bd;

            // available moves?
            let ans = a.getNextMoves();
            let bns = b.getNextMoves();
            if (ans !== bns) return ans.length - bns.length;

        }

        if (ae === undefined) return 1;
        if (be === undefined) return -1;
        return be - ae; // just sort by the best score
    }

    static SortBlack([aStr, a]: [string, State], [bStr, b]: [string, State]): number {
        // black should ALWAYS choose the path that takes a piece
        if (a.pieces.length < b.pieces.length) return -1;
        if (b.pieces.length < a.pieces.length) return 1;

        let ae = a.evaluate();
        let be = b.evaluate();

        // undefined just means we don't know who wins this position
        if (ae === undefined && be === undefined) return 0;
        if (ae === undefined) return -1;
        if (be === undefined) return 1;
        return ae - be; // just sort by the best score
    }

    clone() {
        let c = new State();
        c.activePlayer = this.activePlayer;
        c.pieces = this.pieces.map(p => p.clone());
        return c;
    }

    /**
     * evaluate returns 
     * - undefined if we don't know
     * - 0 if we know it ends in a draw
     * - 1 if we know white wins
     * - -1 if we know black wins
     */
    evaluate(): number {
        if (!this.evaluated) {
            // Let's just consider a few cases here.
            if (this.getNextMoves().length === 0) {
                // If the current player is in check and can't escape, checkmate (-1 or 1)
                if (this.isCheck()) {
                    this.evaluation = this.activePlayer===0?-1:1;
                }
                // If the current player is NOT in check and can't move, draw
                else this.evaluation = 0;
            } else if ([...this.getNextStates().values()].some(newState => newState.pieces.filter(p => p instanceof King && p.player === this.activePlayer).length === 0)) {
            // if any next states have my king being captured, this state is illegal, we'll call it a loss
                this.evaluation = this.activePlayer===0?-1:1;
            } else if (this.pieces.filter(p => !(p instanceof King)).length === 0) this.evaluation = 0;
            // If both sides have only a king, it's a draw

            this.evaluated = true;
        }
        return this.evaluation;
    }

    isEndState(): boolean {
        let evaluation = this.evaluate();
        return evaluation === 1 || evaluation === 0 || evaluation === -1;
    }

    toString() {
        //return `${this.activePlayer===0?'W':'B'}:${this.pieces.sort(Piece.Sort).map(p => p.toString()).join('/')}`;
        return `${this.activePlayer===0?'W':'B'}:${
            [this.pieces.find(p => p instanceof King && p.player===0),
             this.pieces.find(p => p instanceof Rook),
             this.pieces.find(p => p instanceof King && p.player===1)
            ].map(p => p?p.position.toString():'  ').join('')}`;
    }

    debugString(): string[] {
        let lines: string[] = [' ABCDEFGH '];
        for (let rank=8; rank>0; rank--) {
            let rankStr = rank.toString();
            let line = rankStr;
            for (let c=0; c<8; c++) {
                let file = String.fromCharCode('a'.charCodeAt(0)+c);
                let piece = this.getPieceAtPosition(new Position(file, rankStr));
                line += piece?.getPieceLetter() ?? '.';
            }
            line += rankStr;
            lines.push(line);
        }
        lines.push(' ABCDEFGH ');
        return lines;
    }
}

type MinimaxResult = {
    evaluation?: number|undefined; // 1=WHITE WIN, 0=DRAW, -1=BLACK WIN, undefined=UNKNOWN
    depth?: number|undefined; // how far deep have we evaluated
    moves?: string[]; // moves to get to the specified evaluation, or empty array for undefined evaluation
}

class Engine {
    positionMinimax = new Map<string, MinimaxResult>();
    evaluating = new Set<string>();

    constructor(public maxDepth: number) {}

    isBetterForWhite(a: MinimaxResult, b: MinimaxResult): boolean {
        if (a.evaluation === 1) return b.evaluation !== 1 || a.depth < b.depth;
        if (a.evaluation === undefined) return b.evaluation !== 1 || a.depth > b.depth;
    }

    // need to clarify what an undefined evaluation means.
    // undefined means we don't know the result after "depth" moves.
    // so undefined/0 should mean we don't know the result RIGHT HERE
    // undefined/5 means "we've looked 5 moves into the full posibility tree and still can't find a definite result"
    // so, is undefined/0 preferred to 1/3?  No.  It might be, but we need to extend them out to the same depth first!
    // then we can confidently say that undefined/3 is WORSE than 1/3

    isPreferredForWhite(a: MinimaxResult, b: MinimaxResult): boolean { return this.isPreferredForPlayer(a, b, 1); }
    isPreferredForBlack(a: MinimaxResult, b: MinimaxResult): boolean { return this.isPreferredForPlayer(a, b, -1); }

    isPreferredForPlayer(a: MinimaxResult, b: MinimaxResult, optimalEvaluation: number): boolean {
        //if (a.evaluation === undefined && b.evaluation !== undefined && a.depth < b.depth) throw new Error(`Can't continue: UNK/${a.depth} vs ${b.evaluation}/${b.depth}`);
        //if (b.evaluation === undefined && a.evaluation !== undefined && b.depth < a.depth) throw new Error(`Can't continue: ${a.evaluation}/${a.depth} vs UNK/${b.depth}`);
        //if ((a.evaluation === undefined && b.evaluation === undefined) && a.depth !== b.depth) throw new Error(`Can't continue: ${a.evaluation}/${a.depth} vs ${b.evaluation}/${b.depth}`);
        //         b.eval:       1         undefined         0          -1
        // a.evaluation:
        //  1                 closer         true          true         true  (a=1 means we KNOW we will win in ad moves.  It's better than undefined/0/-1, As long as that's < bd, we're good!)
        //  undefined         false          false         true         true (we always pick unknown if the alternative is draw or losing)
        //  0                 false          false        further       true (draw games, better than losing! or at least further away)
        //  -1                false          false         false       further (losing sucks, so it's always worse, unless it's further away)
        //if (b.evaluation === Infinity) return false;
        //if (b.evaluation === -Infinity) return true;
        if (a.evaluation === optimalEvaluation) return b.evaluation !== optimalEvaluation || a.depth < b.depth; // winning and closer or b is not winning
        // see, this is tough - a=undefined means we won't lose or draw after depth moves we know.  But if we draw at move 5 and lose at move 6, was it better that we picked a?
        // i.e., is undefined/6 better than 0/5?
        // I think undefined/5 is ALWAYS better than -1/5. This means the game is still going after 5 moves.
        // But draw is a different case.
        // I'm going to say it's better to keep the evaluation undefined for equal or longer than it is to draw or lose
        if (a.evaluation === undefined) return b.evaluation !== optimalEvaluation && (a.depth > b.depth);
        return optimalEvaluation*a.evaluation > optimalEvaluation*b.evaluation || (a.evaluation === b.evaluation && a.depth > b.depth); // put off the draw/loss as long as possible
    }

    minimax(state: State, currentDepth = 0, remainingDepth: number = this.maxDepth, alpha: MinimaxResult = { depth: this.maxDepth+1, moves: [] }, beta: MinimaxResult = { depth: this.maxDepth+1, moves: [] }, debugMoves: string[] = []): MinimaxResult {
        alpha = {...alpha}; alpha.depth = Math.max(alpha.depth-1, 0);
        beta = {...beta}; beta.depth = Math.max(beta.depth-1, 0);
        if (currentDepth > 20) {
            console.error(`WHAT?`);
        }

        let debug = false; //currentDepth<=2;
        const buffer = debug?''.padStart(currentDepth, '+')+debugMoves.join(','):'';

        let result: MinimaxResult = {depth: 0, moves: []};
        let positionKey = state.toString();
        this.evaluating.add(positionKey);
        // process state
        let evaluation = state.evaluate();
        if (debug) console.error(`${buffer}minimax(${state}, ${currentDepth}, ${remainingDepth}, alpha=${alpha.evaluation}/${alpha.depth}, beta=${beta.evaluation}/${beta.depth}) evaluation=${evaluation}`);

        result.evaluation = evaluation;

        if (result.evaluation === undefined && remainingDepth > 0) {
            if (state.activePlayer === 0) {
                let max: MinimaxResult = { evaluation: -1, depth: 1, moves: [] };
                if (debug) console.error(`${buffer}WHITE Next moves: ${[...state.getNextStates()].sort(State.SortWhite).map(([move]) => move)}`);
                for (let [nextMove, nextState] of [...state.getNextStates()].sort(State.SortWhite)) {
                    let nextPositionKey = nextState.toString();
                    if (this.evaluating.has(nextPositionKey)) continue;
                    let nsr = this.positionMinimax.get(nextPositionKey);
                    if (!nsr) {
                        nsr = {depth: 0, moves: []};
                    } else {
                        nsr = {...nsr};
                    }
                    //if (nsr.evaluation === undefined && (nsr.depth < max.depth || (max.evaluation !== 1 && nsr.depth === max.depth))) {
                    if (nsr.evaluation === undefined && nsr.depth < max.depth) {
                        // we have to find out if this gets any better but we probably need to limit it to max.depth yeah?
                        if (debug) console.error(`${buffer}WHITE Trying move: ${nextMove} ${this.positionMinimax.has(nextPositionKey)?'T':'F'}:${nsr.evaluation}/${nsr.depth}`);
                        nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, max.evaluation===1?max.depth:remainingDepth)-1, alpha, beta, [...debugMoves, nextMove])};
                        if (debug) console.error(`${buffer}WHITE For move: ${nextMove}, got ${nsr.evaluation}/${nsr.depth}`);
                    } else {
                        if (debug) console.error(`${buffer}WHITE already calculated ${nextMove}(${nsr.evaluation}/${nsr.depth}) far enough ${max.evaluation}/${max.depth}`);
                    }
                    nsr.depth++;
                    /*
                    if (nsr.evaluation === undefined && nsr.depth >= max.depth && max.evaluation === 1) {
                        if (debug) console.error(`${buffer}WHITE skipping ${nextMove}(${nsr.evaluation}/${nsr.depth}) can't be better ${max.evaluation}/${max.depth}`);
                        continue;
                    }
                    */
                    if (this.isPreferredForWhite(nsr, max)) {
                        //(nsr.evaluation === undefined && nsr.depth < max.depth) ||
                        //(nsr.evaluation === undefined && max.evaluation === undefined && nsr.depth <= max.depth)) 
                        max = nsr;
                        max.moves = [nextMove, ...max.moves];
                        if (currentDepth === 0 || debug) console.error(`${buffer}WHITE found new max: ${max.evaluation} ${max.depth} ${max.moves} (${[...this.positionMinimax.values()].filter(m => m.depth > max.depth).length} known positions > ${max.depth})`);
                        if (beta.evaluation !== undefined && this.isPreferredForWhite(max, beta)) {
                            if (debug) console.error(`${buffer}WHITE BETA BREAK: ${max.evaluation} ${max.depth} ${max.moves}`);
                            break;
                        }
                        if (this.isPreferredForWhite(max, alpha)) {
                            if (debug) console.error(`${buffer}WHITE found new ALPHA: ${max.evaluation} ${max.depth} ${max.moves}`);
                            alpha = {...max};
                        }
                    }
                }
                result = max;
            } else {
                let min: MinimaxResult = { evaluation: 1, depth: 1, moves: [] };
                if (debug) console.error(`${buffer}BLACK Next moves: ${[...state.getNextStates()].sort(State.SortBlack).map(([move]) => move)}`);
                for (let [nextMove, nextState] of [...state.getNextStates()].sort(State.SortBlack)) {
                    let nextPositionKey = nextState.toString();
                    if (this.evaluating.has(nextPositionKey)) continue;
                    let nsr = this.positionMinimax.get(nextPositionKey);
                    if (!nsr) {
                        nsr = {depth: 0, moves: []};
                    } else {
                        nsr = {...nsr};
                    }
                    if (nsr.evaluation === undefined && nsr.depth < min.depth) {
                        // we have to find out if this gets any better but we probably need to limit it to min.depth yeah?
                        if (debug) console.error(`${buffer}BLACK Trying move: ${nextMove} ${this.positionMinimax.has(nextPositionKey)?'T':'F'}:${nsr.evaluation}/${nsr.depth}`);
                        nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, min.evaluation===-1?min.depth:remainingDepth)-1, alpha, beta, [...debugMoves, nextMove])};
                        if (debug) console.error(`${buffer}BLACK For move: ${nextMove}, got ${nsr.evaluation}/${nsr.depth}`);
                    } else {
                        if (debug) console.error(`${buffer}BLACK already calculated ${nextMove}(${nsr.evaluation}/${nsr.depth}) far enough ${min.evaluation}/${min.depth}`);
                    }
                    nsr.depth++;
                    /*
                    if (nsr.evaluation === undefined && nsr.depth >= min.depth && min.evaluation === -1) {
                        if (debug) console.error(`${buffer}BLACK skipping ${nextMove}(${nsr.evaluation}/${nsr.depth}) can't be better ${min.evaluation}/${min.depth}`);
                        continue;
                    }
                    */
                    if (this.isPreferredForBlack(nsr, min)) {
                        //(nsr.evaluation === undefined && nsr.depth < min.depth) ||
                        //(nsr.evaluation === undefined && min.evaluation === undefined && nsr.depth <= min.depth))
                        min = nsr;
                        min.moves = [nextMove, ...nsr.moves];
                        if (debug) console.error(`${buffer}BLACK found new min: ${min.evaluation} ${min.depth} ${min.moves}`);

                        if (alpha.evaluation !== undefined && this.isPreferredForBlack(min, alpha)) {
                            if (debug) console.error(`${buffer}BLACK ALPHA BREAK: ${min.evaluation} ${min.depth} ${min.moves}`);
                            break;
                        }

                        if (this.isPreferredForBlack(min, beta)) {
                            if (debug) console.error(`${buffer}BLACK found new BETA: ${min.evaluation} ${min.depth} ${min.moves}`);
                            beta = {...min};
                        }
                    }
                }
                result = min;
            }
        }

        if (debug) console.error(`${buffer}result: evaluation=${result.evaluation}, depth=${result.depth}, moves: ${result.moves}`);
        this.evaluating.delete(positionKey);
        this.positionMinimax.set(positionKey, result);
        return result;
    }
}

class Rook extends Piece {
    letter = 'R';
    value = 5;
    validMoves(state: State) { 
        let positions: Position[] = [];
        [[ 0, 1], [-1, 0], [ 1, 0], [ 0,-1]].forEach(([fDelta, rDelta]) => {
            let p = this.position;
            while (true) {
                p = p.getRelativePosition(fDelta, rDelta);
                if (p) {
                    let pieceThere = state.getPieceAtPosition(p);
                    if (!pieceThere || pieceThere.player !== this.player) positions.push(p);
                    if (pieceThere) break;
                } else break;
            }
        })

        return positions;
    }
}
class King extends Piece {
    letter = 'K';
    value = 900;
    validMoves(state: State) {
        //console.error(`Asking ${this} for valid moves based on ${state}`);
        return [[-1, 1], [ 0, 1], [ 1, 1],
                [-1, 0],          [ 1, 0],
                [-1,-1], [ 0,-1], [ 1,-1]]
            .map(([fDelta,rDelta]) => this.position.getRelativePosition(fDelta, rDelta))
            .filter(pos => !!pos)
            .filter(pos => {
                let pieceThere = state.getPieceAtPosition(pos);
                return (!pieceThere || pieceThere.player !== this.player);
            });
    }
}

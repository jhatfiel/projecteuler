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
console.error(`Equivalent positions: ${STATE.equivalentPositions()}`);

let now = Date.now();
let ENGINE = new Engine(STATE, 3);
console.error(`Starting engine ${ENGINE.maxDepth}`);
//ENGINE.expandTree();

let result = ENGINE.minimax_2(STATE);
now = Date.now()-now;
console.error(`Engine done ${now}ms ${ENGINE.whiteRevisitCount}/${ENGINE.blackRevisitCount}`);
console.error(`Known position: ${ENGINE.positionDepth.size}`);

/// _2 code
console.error(result);

/*
console.error(`Known position: ${ENGINE.moveTreeForPosition.size}`);

let node = ENGINE.moveTreeRoot;
//while (ENGINE.engineStateForPosition.has(key)) {
while (node && node.potentialMoves.size > 0) {
    let move = '';
    let movesToEnd = Infinity;
    for (let [m, n] of node.potentialMoves.entries()) {
        //console.error(`  Potential Move: ${m} gives ${n.engineState.evaluation} after ${n.engineState.movesToEnd}`);
        if (n.engineState.evaluation === 1 && n.engineState.movesToEnd < movesToEnd) {
            node = n;
            move = m;
            movesToEnd = n.engineState.movesToEnd;
        }
    }

    console.error(`Move chosen=${move} (end in ${movesToEnd})`);
    console.log(move);
    STATE.makeMove(STATE.moveFromString(move));
    STATE.nextPlayer();

    if (STATE.evaluate() === 1) {
        console.error(`We WIN!!!`);
        console.error(`Moves: ${STATE.moves}`);
        break;
    }
    console.error(`Current position: ${STATE.toString()} ${STATE.isCheck()} ${STATE.getNextStates().length} available moves`);

    let oppMoveStr: string = this.readline(); // A move made by the opponent, e.g. a2b1
    if (!oppMoveStr) {
        for (let [m, n] of node.potentialMoves.entries()) {
            console.error(`  Opponent Move: ${m} gives ${n.engineState.evaluation} after ${n.engineState.movesToEnd}`);
            if (n.engineState.evaluation < 1 && n.engineState.movesToEnd > movesToEnd) {
                node = n;
                move = m;
                movesToEnd = n.engineState.movesToEnd;
            }
        }
        oppMoveStr = move;
        console.error(`calculated opponent move: ${oppMoveStr}`);
    } else {
        console.error(`opponentMove: ${oppMoveStr}`);
        if (!node.potentialMoves.has(oppMoveStr)) {
            console.error(`Opponent made unknown move!`);
        }
        node = node.potentialMoves.get(oppMoveStr);
    }

    STATE.makeMove(STATE.moveFromString(oppMoveStr));
    STATE.nextPlayer();
}

console.error(`Final position: ${STATE.toString()} ${STATE.isCheck()} ${STATE.getNextStates().length} available moves`);
if (!STATE.isCheck()) {
    console.error(`!!!!!!!!!!!!!!FAIL!!!!!!!!!!!!!!!!!`);
}
*/
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
    moves: string[] = [];
    nextMoves: string[];
    evaluated = false;
    evaluation: number;
    static Rotate = new Map<string, string>();
    static Reflect = new Map<string, string>();
    static {
        const alp = 'abcdefgh';
        const num = '12345678';
        alp.split('').forEach((c, ind, arr) => this.Reflect.set(c, arr[7-ind]));
    }

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
        this.moves.push(moveToString(move));
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
            console.error(this.moves.map(move => move.toString()).join(' / '));
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

    getNextStates(): State[] {
        return this.getNextMoves().map(moveStr => {
            let state = this.clone();
            state.makeMove(this.moveFromString(moveStr));
            state.nextPlayer();
            return state;
        });
    }

    static SortWhite(a: State, b: State): number {
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

    static SortBlack(a: State, b: State): number {
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
        c.moves = [...this.moves];
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
        if (this.evaluated) return this.evaluation;
        // Let's just consider a few cases here.
        let nextStates = this.getNextStates();
        // if any next states have my king being captured, this state is illegal, we'll call it a loss
        if (nextStates.some(newState => newState.pieces.filter(p => p instanceof King && p.player === this.activePlayer).length === 0)) {
            this.evaluation = this.activePlayer===0?-1:1;
        } else if (nextStates.length === 0) {
            // If the current player is in check and can't escape, checkmate (-1 or 1)
            if (this.isCheck()) {
                this.evaluation = this.activePlayer===0?-1:1;
            }
            // If the current player is NOT in check and can't move, draw
            else this.evaluation = 0;
        } else if (this.pieces.filter(p => !(p instanceof King)).length === 0) this.evaluation = 0;
        // If both sides have only a king, it's a draw

        this.evaluated = true;
        return this.evaluation;
    }

    toString() {
        //return `${this.activePlayer===0?'W':'B'}:${this.pieces.sort(Piece.Sort).map(p => p.toString()).join('/')}`;
        return `${this.activePlayer===0?'W':'B'}:${
            [this.pieces.find(p => p instanceof King && p.player===0),
             this.pieces.find(p => p instanceof Rook),
             this.pieces.find(p => p instanceof King && p.player===1)
            ].map(p => p?p.position.toString():'  ').join('')}`;
    }

    equivalentPositions(): string[] {
        let result: string[] = [];
        let pos = this.toString();
        result.push(pos);
        // rotate it 3 times and remember those positions
        for (let i=0; i<3; i++) {

        }

        // reflect each position that has been found
        result.forEach(pos => {
            result.push(pos.replace(/./g, s => State.Reflect.get(s)??s));
        })

        return result;
    }

    debugString() {
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

type EngineState = {
    evaluation: number;
    depth?: number;
    movesToEnd?: number;
}

type MoveTreeNode = {
    positionKey: string;
    engineState?: EngineState;
    potentialMoves: Map<string, MoveTreeNode>;
    movesToHere: string[];
}

type MinimaxResult_2 = {
    evaluation?: number|undefined; // 1=WHITE WIN, 0=DRAW, -1=BLACK WIN, undefined=UNKNOWN
    depth?: number|undefined; // how far from here the result is found... result=undefined kinda implies depth=undefined
}

class Engine {
    // map from current state into the movetree
    moveTreeForPosition = new Map<string, MoveTreeNode>();
    moveTreeRoot: MoveTreeNode;
    debug=false;
    whiteRevisitCount = 0;
    blackRevisitCount = 0;

    currentLeaves: State[] = [];
    depthForPosition = new Map<string, number>();
    nextExpandDepth = 0;

    constructor(public initialState: State, public maxDepth: number) {
        this.depthForPosition.set(initialState.toString(), this.nextExpandDepth);
        this.currentLeaves.push(initialState);
    }

    isPreferredForWhite(a: EngineState, b: EngineState): boolean {
        //console.error(`Compare A={eval=${a.evaluation}, depth=${a.depth}, toEnd=${a.movesToEnd}} B={eval=${b.evaluation}, depth=${b.depth}, toEnd=${b.movesToEnd}}`);
        //if (a.evaluation === 1 && b.evaluation !== 1) return true;
        /*
        if (a === undefined) console.error(`isPreferredForWhite called with null a`)
        if (b === undefined) console.error(`isPreferredForWhite called with null b`)
        if (a.evaluation === undefined) console.error(`isPreferredForWhite called with null a.evaluation`);
        if (a.movesToEnd === undefined) console.error(`isPreferredForWhite called with null a.movesToEnd`);
        if (b.evaluation === undefined) console.error(`isPreferredForWhite called with null b.evaluation`);
        if (b.movesToEnd === undefined) console.error(`isPreferredForWhite called with null b.movesToEnd`);
        */
        if (a === undefined) return false; // White never wants an unknown engine state
        if (a.evaluation === b.evaluation) return a.movesToEnd < b.movesToEnd;
        else return a.evaluation > b.evaluation;
    }

    isPreferredForBlack(a: EngineState, b: EngineState): boolean {
        //console.error(`Compare A={eval=${a.evaluation}, depth=${a.depth}, toEnd=${a.movesToEnd}} B={eval=${b.evaluation}, depth=${b.depth}, toEnd=${b.movesToEnd}}`);
        //if (a.evaluation === -1 && b.evaluation !== -1) return true;
        //if (a.evaluation === 0 && b.evaluation !== -1) return true;
        // black wants to WIN, or DRAW, or, as a last resort, have an unknown engine state
        if (a === undefined && b === undefined) return false; // who cares
        if (a && a.evaluation === -1 && (!b || b.evaluation > -1)) return true;
        if (a && a.evaluation === 0 && (!b || b.evaluation > 0)) return true;
        if (a === undefined && b !== undefined) return true; // Black WANTS an unknown engine state...
        if (a !== undefined && b === undefined) return true;
        if (a.evaluation === b.evaluation) return a.movesToEnd > b.movesToEnd;
        else return a.evaluation < b.evaluation;
    }

    expandTree() {
        //console.error(`${this.nextExpandDepth} before expandTree; currentLeaves = ${this.currentLeaves.length} size = ${this.depthForPosition.size}`);
        while (this.nextExpandDepth < this.maxDepth) {
            let newLeaves: State[] = [];
            this.currentLeaves.forEach(state => {
                state.getNextStates().forEach(nextState => {
                    let positionKey = nextState.toString();
                    if (this.depthForPosition.has(positionKey)) return;
                    this.depthForPosition.set(positionKey, this.nextExpandDepth+1);
                    let evaluation = nextState.evaluate();
                    if (evaluation === undefined) {
                        newLeaves.push(nextState);
                    }
                })
            });

            this.currentLeaves = newLeaves;
            console.error(`${this.nextExpandDepth} after  expandTree; currentLeaves = ${this.currentLeaves.length} size = ${this.depthForPosition.size}`);
            this.nextExpandDepth++;
        }
    }

    positionDepth = new Map<string, number>();

    isPreferredForWhite_2(a: MinimaxResult_2, b: MinimaxResult_2): boolean {
        if (b.evaluation === Infinity) return false;
        if (a.evaluation ===  1 && (b.evaluation !==  1 || b.depth > a.depth)) return true; // winning, closer
        if (a.evaluation === undefined && b.evaluation !== undefined) return true; // unknown preferred over any known state
        if (a.evaluation ===  0 && (b.evaluation !==  0 || a.depth > b.depth)) return true; // draw, further favored over non-draw closer
        if (a.evaluation === -1 && (b.evaluation !== -1 || a.depth > b.depth)) return true;
        return false;
    }

    isPreferredForBlack_2(a: MinimaxResult_2, b: MinimaxResult_2): boolean {
        if (b.evaluation === -Infinity) return false;
        if (a.evaluation === -1 && (b.evaluation !== -1 || b.depth > a.depth)) return true; // winning, closer
        if (a.evaluation === undefined && b.evaluation !== undefined) return true; // unknown preferred over any known state
        if (a.evaluation ===  0 && (b.evaluation !==  0 || a.depth > b.depth)) return true; // draw, further favored over non-draw closer
        if (a.evaluation ===  1 && (b.evaluation !==  1 || a.depth > b.depth)) return true;
        return false;
    }

    minimax_2(state: State, currentDepth = 0, alpha: MinimaxResult_2 = {evaluation: -Infinity, depth: Infinity}, beta: MinimaxResult_2 = {evaluation: Infinity, depth: Infinity}): MinimaxResult_2 {
        let debug = true//currentDepth<=3;
        let result: MinimaxResult_2 = {depth: 0};
        const buffer = ''.padStart(currentDepth*2);
        let positionKey = state.toString();
        let existingPositionDepth = this.positionDepth.get(positionKey)??Infinity;
        if (existingPositionDepth <= currentDepth) {
            if (debug) console.error(`${buffer}${positionKey} Skipping previously seen state ${state.moves}`);
            // don't process anything we've seen already, even if it's at this same depth?
        } else {
            // process state
            this.positionDepth.set(positionKey, currentDepth);
            let evaluation = state.evaluate();
            if (debug) console.error(`${buffer}${state.moves} minimax(${state}, ${currentDepth}, alpha=${alpha.evaluation}/${alpha.depth}, beta=${beta.evaluation}/${beta.depth}) evaluation=${evaluation}`);

            result.evaluation = evaluation;
            result.depth = 0;

            if (result.evaluation === undefined && currentDepth < this.maxDepth) {
                if (state.activePlayer === 0) {
                    let max: MinimaxResult_2 = {depth: 0};
                    if (debug) console.error(`${buffer}WHITE Next moves: ${state.getNextMoves()}`);
                    for (let nextState of state.getNextStates().sort(State.SortWhite)) {
                        let nsr = this.minimax_2(nextState, currentDepth+1, alpha, beta);
                        nsr.depth++;
                        if (this.isPreferredForWhite_2(nsr, max)) {
                            if (debug) console.error(`${buffer}WHITE found new max: ${nsr.evaluation} ${nsr.depth}`);
                            max = nsr;
                        }
                        if (this.isPreferredForWhite_2(nsr, beta)) {
                            if (debug) console.error(`${buffer}WHITE BETA BREAK: ${nsr.evaluation} ${nsr.depth}`);
                            break;
                        }
                        if (alpha.evaluation === -Infinity || this.isPreferredForWhite_2(nsr, alpha)) {
                            if (debug) console.error(`${buffer}WHITE found new ALPHA: ${nsr.evaluation} ${nsr.depth}`);
                            alpha = nsr;
                        }
                    }
                    result = max;
                } else {
                    let min: MinimaxResult_2 = {depth: 0};
                    if (debug) console.error(`${buffer}BLACK Next moves: ${state.getNextMoves()}`);
                    for (let nextState of state.getNextStates().sort(State.SortBlack)) {
                        let nsr = this.minimax_2(nextState, currentDepth+1, alpha, beta);
                        nsr.depth++;
                        if (this.isPreferredForBlack_2(nsr, min)) {
                            if (debug) console.error(`${buffer}BLACK found new min: ${nsr.evaluation} ${nsr.depth}`);
                            min = nsr;
                        }
                        if (this.isPreferredForBlack_2(nsr, alpha)) {
                            if (debug) console.error(`${buffer}BLACK ALPHA BREAK: ${nsr.evaluation} ${nsr.depth}`);
                            break;
                        }
                        if (beta.evaluation === Infinity || this.isPreferredForBlack_2(nsr, beta)) {
                            if (debug) console.error(`${buffer}BLACK found new BETA: ${nsr.evaluation} ${nsr.depth}`);
                            beta = nsr;
                        }
                    }
                    result = min;
                }
            }
        }

        if (debug) console.error(`${buffer}${state.moves} result: evaluation=${result.evaluation}, depth=${result.depth}`);
        return result;
    }

    minimax(state: State, currentDepth = 0, alpha: EngineState = {evaluation: -Infinity}, beta: EngineState = { evaluation: Infinity}): MoveTreeNode {
        let debug = false//currentDepth<=3;
        const buffer = ''.padStart(currentDepth*2);
        let positionKey = `${state.toString()}`;
        let engineState: EngineState = {evaluation: undefined, depth: currentDepth, movesToEnd: Infinity};
        let potentialMoves = new Map<string, MoveTreeNode>();
        let treeNode: MoveTreeNode = {positionKey, engineState, potentialMoves, movesToHere: [...state.moves]};
        let existingMoveTreeNode = this.moveTreeForPosition.get(positionKey);
        if (existingMoveTreeNode && existingMoveTreeNode.engineState.depth <= currentDepth) {
            // any paths that duplicate a previously seen position can be considered a draw
            engineState.evaluation = 0;
            if (debug) console.error(`${buffer}${state.moves} minimax(${state}, ${currentDepth}, alpha=${alpha.evaluation}/${alpha.depth}/${alpha.movesToEnd}, beta=${beta.evaluation}/${beta.depth}/${beta.movesToEnd}) IGNORING ${existingMoveTreeNode.engineState.depth}`);
            return treeNode;
        }

        if (currentDepth === 0) {
            this.moveTreeRoot = treeNode;
        }

        let evaluation = state.evaluate();
        if (debug) console.error(`${buffer}${state.moves} minimax(${state}, ${currentDepth}, alpha=${alpha.evaluation}/${alpha.depth}/${alpha.movesToEnd}, beta=${beta.evaluation}/${beta.depth}/${beta.movesToEnd}) evaluation=${evaluation} seen=${this.moveTreeForPosition.has(positionKey)}`);
        // if we have an evaluation (-1/0/1), or we have reached maximum depth
        if (evaluation !== undefined || currentDepth === this.maxDepth) {
            // we have reached maxDepth so set the evaluation to TIE
            engineState.evaluation = evaluation??0;
            engineState.evaluation = evaluation;
            engineState.movesToEnd = evaluation===undefined?Infinity:0; // movesToEnd=Infinity indicates we have a draw based on engine depth, not based on move repitition or lack of material or stalemate
        } else {
            //let existingMoveTreeNode = undefined//this.engineStateForPosition.get(positionKey); // TODO: WHY DOES THIS BREAK EVERYTHING???
            let emtn = this.moveTreeForPosition.get(positionKey);
            if (emtn && currentDepth < emtn.engineState.depth) {
                if (debug) {
                    console.error(`${buffer}${state.moves} positionKey=${positionKey} seen previously ${emtn.engineState.depth}`);
                }
            }
            if (state.activePlayer === 0) {
                if (beta.evaluation < 1 && currentDepth >= beta.depth + beta.movesToEnd) {
                    if (debug) console.error(`${buffer}PRUNE because beta.evaluation<1 at depth=${beta.depth}, movesToEnd=${beta.movesToEnd}`);
                    return treeNode;
                }
                if (existingMoveTreeNode) {
                    //console.error(`${buffer}${state.moves} currentDepth=${currentDepth}, Seen already: ${existingMoveTreeNode.engineState.evaluation} movesToEnd=${existingMoveTreeNode.engineState.movesToEnd} depth=${existingMoveTreeNode.engineState.depth} ${existingMoveTreeNode.movesToHere}`);
                    this.whiteRevisitCount++;
                }
                //existingMoveTreeNode = undefined; // TODO why is it broken unless we clear this out???
                let max = engineState;
                max.evaluation = -Infinity;
                /*
                if (existingMoveTreeNode?.engineState.evaluation === 1 && existingMoveTreeNode?.engineState.depth >= currentDepth) {
                    if (true || debug) console.error(`Found faster path to win was ${existingMoveTreeNode.engineState.depth} change to ${currentDepth}`);
                    existingMoveTreeNode.engineState.depth = currentDepth
                    treeNode = existingMoveTreeNode;
                    if (debug) if (evaluation === undefined) console.error(`${state.moves} WHITE FOUND FASTER WIN`);
                    return treeNode;
                }
                */

                if (true || existingMoveTreeNode === undefined || (existingMoveTreeNode.engineState.evaluation < 1 && existingMoveTreeNode.engineState.depth > currentDepth)) {
                    this.moveTreeForPosition.set(positionKey, treeNode);
                    if (debug) console.error(`${buffer}Next moves: ${state.getNextMoves()}`);
                    for (let nextState of state.getNextStates().sort(State.SortWhite)) {
                        let moveStr = nextState.moves.at(-1);
                        let nextTreeNode: MoveTreeNode;
                        // this code may be suspect...
                        if (existingMoveTreeNode && existingMoveTreeNode.potentialMoves.get(moveStr).engineState.movesToEnd !== Infinity) {
                            // we don't need to reevaluate this one, we know the best path already
                            if (debug) console.error(`${buffer}${state.moves} currentDepth=${currentDepth}, Using existing: ${existingMoveTreeNode.engineState.evaluation} movesToEnd=${existingMoveTreeNode.engineState.movesToEnd} depth=${existingMoveTreeNode.engineState.depth} ${existingMoveTreeNode.movesToHere}`);
                            nextTreeNode = existingMoveTreeNode
                            nextTreeNode.movesToHere = state.moves;
                            nextTreeNode.engineState.depth = currentDepth;
                            nextTreeNode.engineState.movesToEnd--;
                        } else {
                            nextTreeNode = this.minimax(nextState, currentDepth+1, alpha, beta);
                        }
                        // try the move, if it's better than max, update max and set last item in moves array to this move
                        potentialMoves.set(moveStr, nextTreeNode);
                        let result = nextTreeNode.engineState;
                        if (result) {
                            result.movesToEnd++;
                            if (this.isPreferredForWhite(result, max)) {
                                max.evaluation = result.evaluation;
                                max.movesToEnd = result.movesToEnd;
                                max.depth = currentDepth;

                                if (currentDepth===0) console.error(`${buffer}Found new MAX: ${max.evaluation} movesToEnd=${max.movesToEnd} bestMove=${nextState.moves.at(-1)}`);

                                if (max.evaluation > beta.evaluation || 
                                    (max.evaluation === beta.evaluation && max.depth+max.movesToEnd < beta.depth+beta.movesToEnd)) {
                                    // black would never make the choice to end up here because white could choose this path which 
                                    // is a less favorable outcome than black has already found
                                    // - we don't have to consider this path
                                    break;
                                }
                                if (max.evaluation > alpha.evaluation || (max.evaluation === alpha.evaluation && max.depth + max.movesToEnd < alpha.depth + alpha.movesToEnd)) {
                                    if (debug) console.error(`${buffer}NEW ALPHA FOUND ${nextState.moves.at(-1)} eval=${max.evaluation} depth=${max.depth} movesToEnd=${max.movesToEnd}`);
                                    alpha = {...max};
                                }
                            }
                        }
                    }
                } else {
                    // use existing path and extend it deeper where necessary (non-trivial)
                    // TODO: debugging in here, check depth vs depth of emtn
                    console.error(`${buffer}WHITE ${positionKey} ${state.moves} Using existingMoveTreeNode: ${existingMoveTreeNode.engineState.depth} at depth=${currentDepth}`);
                    max = existingMoveTreeNode.engineState;
                    existingMoveTreeNode.engineState.depth = currentDepth;
                    existingMoveTreeNode.potentialMoves.forEach((value, moveStr) => {
                        if (value.engineState.movesToEnd === Infinity) {
                            let nextState = state.clone();
                            nextState.makeMove(nextState.moveFromString(moveStr));
                            nextState.nextPlayer();
                        }

                    })
                }
                if (max.evaluation === -Infinity) max.evaluation = 0;
                if (debug) console.error(`${buffer}${state.moves} white chose eval=${max.evaluation} depth=${max.depth} movesToEnd=${max.movesToEnd}`);
            } else {
                if (alpha.evaluation === 1 && currentDepth >= alpha.depth + alpha.movesToEnd) {
                    if (debug) console.error(`${buffer}PRUNE because alpha.evaluation===1 at depth=${alpha.depth}, movesToEnd=${alpha.movesToEnd}`);
                    return treeNode;
                }
                if (existingMoveTreeNode) this.blackRevisitCount++;
                //existingMoveTreeNode = undefined; // TODO why is it broken unless we clear this out???
                let min = engineState;
                min.evaluation = Infinity;
                if (true || existingMoveTreeNode === undefined || (existingMoveTreeNode.engineState.evaluation === 0 && existingMoveTreeNode.engineState.depth > currentDepth)) {
                    this.moveTreeForPosition.set(positionKey, treeNode); // initialize it so nobody below us looks at it
                    if (debug) console.error(`${buffer}Next moves: ${state.getNextMoves()}`);
                    for (let nextState of state.getNextStates().sort(State.SortBlack)) {
                        let moveStr = nextState.moves.at(-1);
                        let nextTreeNode: MoveTreeNode;
                        if (existingMoveTreeNode && existingMoveTreeNode.potentialMoves.has(moveStr) && existingMoveTreeNode.potentialMoves.get(moveStr).engineState.movesToEnd !== Infinity) {
                            // we don't need to reevaluate this one, we know the best path already
                            if (debug) console.error(`${buffer}${state.moves} currentDepth=${currentDepth}, Using existing: ${existingMoveTreeNode.engineState.evaluation} movesToEnd=${existingMoveTreeNode.engineState.movesToEnd} depth=${existingMoveTreeNode.engineState.depth} ${existingMoveTreeNode.movesToHere}`);
                            nextTreeNode = existingMoveTreeNode
                            nextTreeNode.movesToHere = state.moves;
                            nextTreeNode.engineState.depth = currentDepth;
                            nextTreeNode.engineState.movesToEnd--;
                        } else {
                            nextTreeNode = this.minimax(nextState, currentDepth+1, alpha, beta);
                        }
                        // try the move, if it's less than min, update min and set last item in moves array to this move
                        potentialMoves.set(nextState.moves.at(-1), nextTreeNode);
                        let result = nextTreeNode.engineState;
                        if (result) {
                            result.movesToEnd++;
                            if (this.isPreferredForBlack(result, min)) {
                                min.evaluation = result.evaluation;
                                min.movesToEnd = result.movesToEnd;
                                min.depth = currentDepth;
            
                                if (min.evaluation < 1 || 
                                    (min.evaluation === alpha.evaluation && min.depth+min.movesToEnd > alpha.depth+alpha.movesToEnd)) {
                                    // white would never make the choice to end up here because black could choose this path which 
                                    // is a less favorable outcome than white has already found
                                    // - we don't have to consider this path
                                    // white would also never consider this path if black's best option was a loss FURTHER away than white's best current option
                                    break;
                                }
                                if (min.evaluation < beta.evaluation || (min.evaluation === beta.evaluation && min.depth + min.movesToEnd > beta.depth + beta.movesToEnd)) {
                                    if (debug) console.error(`${buffer}NEW BETA FOUND ${nextState.moves.at(-1)} eval=${min.evaluation} depth=${min.depth} movesToEnd=${min.movesToEnd}`);
                                    beta = {...min};
                                }
                            }
                        }
                    }
                } else {
                    // use existing path
                    //console.error(`BLACK ${positionKey} ${state.moves} Using existingMoveTreeNode: ${existingMoveTreeNode.engineState.depth} at depth=${currentDepth}`);
                    min = existingMoveTreeNode.engineState;
                }
                if (min.evaluation === Infinity) min.evaluation = 0;
                if (debug) console.error(`${buffer}${state.moves} black chose eval=${min.evaluation} depth=${min.depth} movesToEnd=${min.movesToEnd}`);
            }
        }
        return treeNode;
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
    value = 100;
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

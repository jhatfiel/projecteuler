import { Puzzle } from '../lib/Puzzle';

export class achess extends Puzzle {
    lineNum = 0;

    sampleMode(): void { };

    _loadData(lines: string[]) { }

    readline() { return this.lines[this.lineNum++]; }

    _runStep(): boolean {
console.error('/*');
let STATE = new State();
let positions: string[][] = [];

let arr = this.readline().split(' ').map(s => Position.fromString(s));
console.error(`Initial State: ${arr.map(pos => pos.toString())}`);
STATE.addPiece(new King(0, arr[0])); // White King
STATE.addPiece(new Rook(0, arr[1])); // White Rook
STATE.addPiece(new King(1, arr[2])); // Black King
console.error(STATE.toString());
positions.push(STATE.debugString());
console.error(STATE.debugString().join('\n'));
//console.error(`Equivalent positions: ${STATE.equivalentPositions()}`);

let now = Date.now();
let ENGINE = new Engine(9);
console.error(`Starting engine ${ENGINE.maxDepth}`);

console.error(`*/obj=`);
let result = ENGINE.minimax(STATE);
console.error(`; /*`);
now = Date.now()-now;
console.error(`Engine done ${now}ms`);
console.error(`NextMoves time: ${State.getNextMovesTime}, NextState time: ${State.getNextStatesTime}, White=${State.getNextStatesSortedWhiteTime}, Black=${State.getNextStatesSortedBlackTime}`);
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
let moveListStr = `${result.depth}: ${STATE.toString()}`;
let moveNum = 1;

while (result && result.move && result.evaluation === 1) {
    console.error(`Result for ${STATE.toString()} = ${JSON.stringify(result)}`);
    let moveStr = result.move;
    //console.error(`Move chosen=${move} (end in ${result.moves.length})`);
    let move = STATE.moveFromString(moveStr);
    moveListStr += ` ${moveNum++}. ${STATE.moveToStandardString(move)}`;
    console.log(moveStr);
    STATE.makeMove(move);
    STATE.nextPlayer();
    positions.push(STATE.debugString());

    if (STATE.evaluate() === 1) {
        moveListStr += '#';
        console.error(`We WIN!!! ${now}ms / ${ENGINE.positionMinimax.size} [${moveListStr}]`);
        break;
    }
    if (STATE.isCheck()) moveListStr += '+';

    key = STATE.toString();
    result = ENGINE.positionMinimax.get(key);
    console.error(`Current position: ${key} ${STATE.isCheck()} ${STATE.getNextStates().size} available moves (next move should be ${result.move})`);

    moveStr = this.readline(); // A move made by the opponent, e.g. a2b1
    if (false || !moveStr) {
        if (!result) throw new Error(`Unknown position: ${key}`);
        moveStr = result.moves[0];
        console.error(`calculated opponent move: ${moveStr}`);
    } else {
        console.error(`opponentMove: ${moveStr}`);
    }
    if (moveStr === undefined) {
        console.error(`Didn't win in time!`);
        break;
    }

    move = STATE.moveFromString(moveStr);
    moveListStr += ` ${STATE.moveToStandardString(move)}`;

    STATE.makeMove(move);
    STATE.nextPlayer();
    positions.push(STATE.debugString());
    //console.error(STATE.debugString().join('\n'));
    key = STATE.toString();
    result = ENGINE.positionMinimax.get(key);
}
console.error(`Final position: ${STATE.toString()} ${STATE.isCheck()} ${STATE.getNextStates().size} available moves`);
console.error(`Game:`);
console.error(positions.reduce((acc, b) => acc.map((line, ind) => line+b[ind]), ['', '', '', '', '', '', '', '', '', '']).join('\n'));
if (!STATE.isCheck()) {
    console.error(`!!!!!!!!!!!!!!FAIL!!!!!!!!!!!!!!!!!`);
    console.error(moveListStr);
}
        console.error('*/');
        return false;
    }
}

export class Position {
    static cmdLookup = [6, 5, 4, 3, 3, 4, 5, 6, 
                        5, 4, 3, 2, 2, 3, 4, 5, 
                        4, 3, 2, 1, 1, 2, 3, 4, 
                        3, 2, 1, 0, 0, 1, 2, 3, 
                        3, 2, 1, 0, 0, 1, 2, 3, 
                        4, 3, 2, 1, 1, 2, 3, 4, 
                        5, 4, 3, 2, 2, 3, 4, 5, 
                        6, 5, 4, 3, 3, 4, 5, 6];

    constructor(public pos: number) {}
    static fromString(s: string): Position {
        return new Position(((s.charCodeAt(0) - 'a'.charCodeAt(0))<<3) + (s.charCodeAt(1) - '1'.charCodeAt(0)));
    }
    getRank(): number { return this.pos%8; }
    getRankStr(): string { return String.fromCharCode('1'.charCodeAt(0) + this.getRank()); }
    getFile(): number { return this.pos>>3; }
    getFileStr(): string { return String.fromCharCode('a'.charCodeAt(0) + this.getFile()); }

    distanceBetween(b: Position): number {
        return Math.abs(this.getRank() - b.getRank()) + Math.abs(this.getFile() - b.getFile());
    }
    distanceFromCenter(): number {
        return Position.cmdLookup[this.pos];
        //return Math.max(3-Math.min(this.getFile(), 7-this.getFile()), 3-Math.min(this.getRank(), 7-this.getRank()));
    }
    equals(b: Position): boolean { return this.pos === b?.pos; }
    toString(): string { return `${this.getFileStr()}${this.getRankStr()}`; }
}

export abstract class Piece {
    abstract letter: string;
    abstract value: number;
    constructor(public player: number, public position: Position) {} // player=0 is white, 1 is black
    abstract potentialMoves(state: State): Position[];
    clone(): Piece {
       return new (<any>this.constructor)(this.player, this.position);
    }
    toString() { return `${this.position.toString()}=${this.player==0?'W':'B'}${this.letter}`; }
    getPieceLetter() { return this.player===0?this.letter:this.letter.toLowerCase()};
}

export type Move = { piece: Piece, position: Position };
export function moveToString(move: Move) { return `${move.piece.position.toString()}${move.position.toString()}`; }

export class State {
    activePlayer = 0;
    pieces: Piece[] = [];
    static nextMovesCache = new Map<string, {sorted: boolean, nextMoves: string[]}>();
    id: string;
    evaluated = false;
    evaluation: number;

    piecesFound = false;
    WHITE_KING: Piece;
    WHITE_ROOK: Piece;
    BLACK_KING: Piece;

    scored = false;
    score: number;

    moveFromString(str: string): Move {
        let pos = Position.fromString(str.substring(0, 2));
        let position = Position.fromString(str.substring(2));
        let piece = this.getPieceAtPosition(pos);
        let pieceThere = this.getPieceAtPosition(position);
        if (piece.player !== this.activePlayer) throw new Error(`Tried to move ${piece} but turn is ${this.activePlayer}`);
        if (pieceThere && piece.player === pieceThere.player) throw new Error(`You can't capture your own piece! ${piece} -> ${pieceThere}`);
        return {piece, position};
    }

    moveToStandardString(move: Move): string {
        // e2h2 should look like Rh2
        // if there was a piece there, it would be Rxh2 
        // TODO: implementing proper capture notation
        return move.piece.letter + move.position.toString();
    }

    addPiece(p: Piece) { this.pieces.push(p); }
    removePiece(pos: Position) {
        this.pieces = this.pieces.filter(p => !p.position.equals(pos));
    }
    getPieceAtPosition(pos: Position): Piece {
        return this.pieces.find(p => p.position.equals(pos));
    }

    makeMove(move: Move) {
        this.removePiece(move.position);
        this.getPieceAtPosition(move.piece.position).position = move.position;
        this.evaluated = false;
        this.id = undefined;
        this.piecesFound = false;
        this.scored = false;
    }

    nextPlayer() {
        this.activePlayer = this.activePlayer===0?1:0;
        this.evaluated = false;
        this.id = undefined;
        this.piecesFound = false;
        this.scored = false;
    }

    getWhiteKing(): Piece {
        this.findPieces();
        return this.WHITE_KING;
    }

    getWhiteRook(): Piece {
        this.findPieces();
        return this.WHITE_ROOK;
    }

    getBlackKing(): Piece {
        this.findPieces();
        return this.BLACK_KING;
    }

    findPieces() {
        if (!this.piecesFound) {
            this.piecesFound = true;
            this.BLACK_KING = this.pieces.find(p => p instanceof King && p.player === 1);
            this.WHITE_ROOK = this.pieces.find(p => p instanceof Rook);
            this.WHITE_KING = this.pieces.find(p => p instanceof King && p.player === 0);
        }
    }

    getActiveKing(): Piece {
        return this.activePlayer === 0 ? this.getWhiteKing() : this.getBlackKing();
    }

    getInactiveKing(): Piece {
        return this.activePlayer === 0 ? this.getBlackKing() : this.getWhiteKing();
    }

    getScore(): number {
        if (!this.scored) {
            this.scored = true;
            let wkp = this.getWhiteKing().position;
            let wrp = this.getWhiteRook()?.position;
            let bkp = this.getBlackKing().position;
            if (!this.getWhiteRook()) {
                this.score = -1000;
            } else if (Math.abs(wrp.getFile() - bkp.getFile()) <= 1 && Math.abs(wrp.getRank() - bkp.getRank()) <= 1 && 
                      !(Math.abs(wrp.getFile() - wkp.getFile()) <= 1 && Math.abs(wrp.getRank() - wkp.getRank()) <= 1)) {
                // if the rook can be attacked by the black king and isn't protected by the white king, that's bad
                this.score = -500;
            } else {
                this.score = 4.7 * bkp.distanceFromCenter() + 1.6 * (14 - bkp.distanceBetween(wkp));

                // if we aren't within attack range of the king, then let's get as close as possible
                //this.score = 1.6 * (7-Math.min(Math.abs(wr.position.getRank() - bk.position.getRank()), Math.abs(wr.position.getFile() - bk.position.getFile())))
                if (wrp.getRank() === bkp.getRank() ||
                    wrp.getFile() === bkp.getFile()) this.score *= 1.5;
            }
        }
        return this.score;
    }

    isCheck(): boolean {
        return this.activePlayer === 1 ?
            [...this.getWhiteKing()?.potentialMoves(this)??[], ...this.getWhiteRook()?.potentialMoves(this)??[]].some(pos => pos && pos.equals(this.getBlackKing()?.position)) :
            this.getBlackKing()?.potentialMoves(this)?.some(pos => pos && pos.equals(this.getWhiteKing()?.position));
    }

    static getNextMovesTime = 0;
    getNextMoves(): string[] {
        //let now = Date.now();
        let nextMovesCache = State.nextMovesCache.get(this.toString());
        if (!nextMovesCache) {
            let nextMoves = [];
            nextMovesCache = { sorted: false, nextMoves };
            State.nextMovesCache.set(this.toString(), nextMovesCache);

            let blackKing = this.getBlackKing();
            let whiteKing = this.getWhiteKing();
            let whiteRook = this.getWhiteRook();
            this.pieces.filter(piece => piece.player === this.activePlayer).forEach(piece => {
                this.removePiece(piece.position);
                piece.potentialMoves(this).forEach(position => {
                    let validMove = true;
                    // there are only 3 pieces to deal with, let's brute force this without creating a bunch of new states...
                    if (this.activePlayer === 0) {
                        // white to move, we just have to make sure we don't put our king near the black king
                        validMove = (piece instanceof Rook && !position.equals(whiteKing.position)) ||
                                    (piece instanceof King && !position.equals(whiteRook?.position) && !blackKing?.potentialMoves(this)?.some(pos => pos.equals(position)));
                    } else {
                        // black to move, we can't move our king to a spot that could be attacked by the white king or white rook
                        validMove = ![...whiteKing.potentialMoves(this)??[], ...whiteRook?.potentialMoves(this)??[]].some(pos => pos.equals(position));
                    }
                    /*
                    // try this move
                    let state = this.clone();
                    let move = {piece: piece.clone(), position};
                    state.makeMove(move);
    
                    // if current player is in check, this is an invalid move
                    if (!state.isCheck()) {
                        state.nextPlayer();
                        nextMoves.push(moveToString(move));
                    }
                    */
                    if (validMove) {
                        nextMoves.push(moveToString({piece, position}));
                    }
                });
                this.addPiece(piece);
            });
        }
        //State.getNextMovesTime += Date.now() - now;
        return nextMovesCache.nextMoves;
    }

    static getNextStatesTime = 0;
    getNextStates(): Map<string, State> {
        //let now = Date.now();
        let result = new Map<string, State>();
        this.getNextMoves().forEach(moveStr => {
            let state = this.clone();
            state.makeMove(this.moveFromString(moveStr));
            state.nextPlayer();
            result.set(moveStr, state);
        });
        //State.getNextStatesTime += Date.now()-now;
        return result;
    }

    static getNextStatesSortedWhiteTime = 0;
    getNextStatesSortedWhite(): Map<string, State> {
        //let now = Date.now();
        let result = [...this.getNextStates()].sort((a,b) => b[1].getScore() - a[1].getScore());
        State.nextMovesCache.set(this.toString(), {sorted: true, nextMoves: result.map(el => el[0])});
        //State.getNextStatesSortedWhiteTime += Date.now() - now;
        return new Map(result);
    }

    static getNextStatesSortedBlackTime = 0;
    getNextStatesSortedBlack(): Map<string, State> {
        //let now = Date.now();
        let result = [...this.getNextStates()].sort((a,b) => a[1].getScore() - b[1].getScore());
        State.nextMovesCache.set(this.toString(), {sorted: true, nextMoves: result.map(el => el[0])});
        //State.getNextStatesSortedBlackTime += Date.now() - now;
        return new Map(result);
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
            } else if ([...this.getNextStates().values()].some(newState => newState.getInactiveKing() === undefined)) {
            // if any next states have my king being captured, this state is illegal, we'll call it a loss
                this.evaluation = this.activePlayer===0?-1:1;
            } else if (this.getWhiteRook() === undefined) this.evaluation = -1;
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
        if (!this.id) {
            //return `${this.activePlayer===0?'W':'B'}:${this.pieces.sort(Piece.Sort).map(p => p.toString()).join('/')}`;
            this.id = `${this.activePlayer===0?'W':'B'}:${
                [this.getWhiteKing(),
                 this.getWhiteRook(),
                 this.getBlackKing()
                ].map(p => p?p.position.toString():'  ').join('')}`;
        }
        return this.id;
    }

    static fromKey(key: string): State {
        let state = new State();
        state.addPiece(new King(0, Position.fromString(key.substring(2, 4))));
        state.addPiece(new Rook(0, Position.fromString(key.substring(4, 6))));
        state.addPiece(new King(1, Position.fromString(key.substring(6, 8))));
        state.activePlayer = key.charAt(0) === 'W'?0:1;
        return state;
    }

    toFEN(): string {
        let fen = '';
        for (let rankNum=7; rankNum>=0; rankNum--) {
            //let rankPieces = this.pieces.filter(p => p.position.rankNum === rankNum).sort((a,b) => a.position.file.localeCompare(b.position.file));
            let line = Array.from({length: 8});
            this.pieces.filter(p => p.position.getRank() === rankNum).forEach(p => line[p.position.getFile()] = p.getPieceLetter());
            let num = 0;
            line.forEach(piece => {
                if (piece) {
                    if (num) {
                        fen += num;
                    }
                    num = 0;
                    fen += piece;
                } else {
                    num++;
                }
            })
            if (num) fen += num;
            if (rankNum>0) fen += '/'
        }
        fen += ' ' + (this.activePlayer===0?'w':'b');
        fen += ' - -';
        return fen;
    }

    debugString(): string[] {
        let lines: string[] = [' ABCDEFGH'];
        for (let rankNum=7; rankNum>=0; rankNum--) {
            let line = (rankNum+1).toString();
            for (let fileNum=0; fileNum<8; fileNum++) {
                line += this.getPieceAtPosition(new Position(rankNum+fileNum*8))?.getPieceLetter() ?? '.';
            }
            lines.push(line);
        }
        lines.push(' ABCDEFGH');
        return lines;
    }
}

export type MinimaxResult = {
    evaluation?: number|undefined; // 1=WHITE WIN, 0=DRAW, -1=BLACK WIN, undefined=UNKNOWN
    depth?: number|undefined; // how far deep have we evaluated
    moves?: string[]; // moves to get to the specified evaluation, or empty array for undefined evaluation
    move?: string;
    unknownMoves?: Map<string, Set<string>>;
}

export class Engine {
    positionMinimax = new Map<string, MinimaxResult>();
    positionDepth = new Map<string, number>();
    deepenCount = 0;

    constructor(public maxDepth: number, public disableDebugging=false) {}

    isPreferredForWhite(a: MinimaxResult, b: MinimaxResult): boolean {
        return this.isPreferredForPlayer(a, b, 1);
    }
    isPreferredForBlack(a: MinimaxResult, b: MinimaxResult): boolean { 
        return this.isPreferredForPlayer(a, b, -1);
    }

    isPreferredForPlayer(a: MinimaxResult, b: MinimaxResult, optimalEvaluation: number): boolean {
        if (a.evaluation === optimalEvaluation) return b.evaluation !== optimalEvaluation || a.depth < b.depth; // winning and closer or b is not winning
        if (a.evaluation === undefined) return b.evaluation !== optimalEvaluation && a.depth >= b.depth; // put off the draw/loss as long as possible
        if (a.evaluation === 0) return b.evaluation === -1*optimalEvaluation;
        return optimalEvaluation*a.evaluation > optimalEvaluation*b.evaluation || (a.evaluation === b.evaluation && a.depth > b.depth); // put off the draw/loss as long as possible
    }

    minimax(state: State, currentDepth = 0, remainingDepth: number = this.maxDepth, alpha: MinimaxResult = undefined, beta: MinimaxResult = undefined, debugMoves: string[] = []): MinimaxResult {
        if (alpha) { alpha = {...alpha}; alpha.depth = Math.max(0, alpha.depth-1); }
        if (beta) { beta = {...beta}; beta.depth = Math.max(0, beta.depth-1); }
        if (currentDepth > 20 || alpha?.depth < 0 || beta?.depth < 0) {
            throw new Error(`Way too deep! ${currentDepth}/${alpha?.depth}/${beta?.depth}`);
        }

        let debug = false; // currentDepth<=2;
        let recordMoves = false || debug;
        if (this.disableDebugging) {
            debug = false;
            recordMoves = false;
        }
        const buffer = debug?''.padStart(2*currentDepth, ' '):'';

        let result: MinimaxResult = {depth: 0, moves: []};
        let positionKey = state.toString();
        this.positionDepth.set(positionKey, currentDepth);
        let cached = this.positionMinimax.get(positionKey);
        if (cached && (cached.evaluation !== undefined || cached.depth >= remainingDepth)) {
            result = cached;
            if (result.depth > remainingDepth) {
                result = {...cached};
                result.depth = remainingDepth;
                if (result.moves) result.moves = result.moves.slice(0, result.depth);
            }
        } else {
            result.evaluation = state.evaluate();
            if (debug) {
                console.error(`${buffer}{`);
                console.error(`${buffer}  positionKey: "${state}", currentDepth: ${currentDepth}, remainingDepth: ${remainingDepth}, alpha: "${alpha?.evaluation}/${alpha?.depth}", beta: "${beta?.evaluation}/${beta?.depth}", evaluation: "${result.evaluation}",`);
                console.error(`${buffer}  movesToHere: "${debugMoves.join(',')}",`);
            }

            if (result.evaluation === undefined && remainingDepth > 0) {
                result.depth = remainingDepth;
                if (state.activePlayer === 0) {
                    let max: MinimaxResult;
                    let nextStates = state.getNextStatesSortedWhite();
                    nextStates.forEach(state => this.positionDepth.set(state.toString(), currentDepth+1));
                    if (debug) console.error(`${buffer}  player: "WHITE", nextMoves: "${[...nextStates].map(([move, state]) => move.toString()+'-'+state.getScore().toFixed(1))}",`);
                    for (let [nextMove, nextState] of [...nextStates]) {
                        let nextPositionKey = nextState.toString();
                        if (this.positionDepth.get(nextPositionKey) < currentDepth+1) continue;
                        let nsr = this.positionMinimax.get(nextPositionKey) ?? { depth: 0, moves: []};
                        let line = '';
                        if (debug) line = `${buffer}  ${nextMove}:`;
                        if (nsr.evaluation === undefined && (!max || nsr.depth+1 < max.depth || max.evaluation !== 1)) {
                            if (debug) console.error(line);
                            nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, max?.evaluation===1?max.depth:remainingDepth)-1, alpha, beta, debug?[...debugMoves, nextMove]:debugMoves)};
                            nsr.depth++;
                            nsr.move = nextMove;
                            if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                            if (debug) console.error(`${buffer}  , ${nextMove}result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: "${nsr.moves}" }, `);
                        } else {
                            if (debug) {
                                line += `{`;
                                if (this.positionMinimax.has(nextPositionKey)) line += ` cached: true, positionKey: "${nextPositionKey}",`;
                                if (nsr.evaluation !== undefined) line += ` status: "evaluationCalculated: ${nsr.evaluation}",`;
                                else if (max.evaluation === 1) line += ` status: "noQuickerWinPossible: ${nsr.depth+1} vs ${max.depth}",`;
                                else if (nsr.depth+1 >= max.depth) line += ` status: "deeperThanMax",`;
                            }
                            nsr = {...nsr};
                            if (nsr.depth+1 > remainingDepth) {
                                if (debug) console.error(`${line} depth: ${nsr.depth+1}, skipReason: "too deep" }, `);
                                nsr.evaluation = undefined;
                                nsr.depth = remainingDepth - 1;
                                if (nsr.moves) nsr.moves = nsr.moves.slice(0, nsr.depth);
                            }
                            nsr.depth++;
                            nsr.move = nextMove;
                            if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                            if (debug) console.error(`${line} result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: "${nsr.moves}" } }, `);
                        }
                        if (!max || this.isPreferredForWhite(nsr, max)) {
                            if (debug) console.error(`${buffer}  ${nextMove}_IS_NEW_MAX: { old_evaluation: ${max?.evaluation}, old_depth: ${max?.depth} }, `);
                            max = nsr;
                            if (beta && this.isPreferredForWhite(max, beta)) {
                                if (debug) console.error(`${buffer}  ${nextMove}_BETA_BREAK: true, `);
                                break;
                            }
                            if (!alpha || this.isPreferredForWhite(max, alpha)) alpha = max;
                        }
                    }
                    if (max) result = max;
                } else {
                    let min: MinimaxResult;
                    let nextStates = state.getNextStatesSortedBlack();
                    nextStates.forEach(state => this.positionDepth.set(state.toString(), currentDepth+1));
                    if (debug) console.error(`${buffer}  player: "BLACK", nextMoves: "${[...nextStates].map(([move]) => move)}",`);
                    for (let [nextMove, nextState] of [...nextStates]) {
                        let nextPositionKey = nextState.toString();
                        //if (this.positionDepth.get(nextPositionKey) < currentDepth+1) continue;
                        let nsr = this.positionMinimax.get(nextPositionKey) ?? { depth: 0, moves: []};
                        let line = '';
                        if (debug) line = `${buffer}  ${nextMove}:`;
                        if (nsr.evaluation === undefined && (!min || nsr.depth+1 < min.depth || min.evaluation !== -1)) {
                            if (debug) console.error(line);
                            nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, min?.evaluation===-1||min?.evaluation===0?min.depth:remainingDepth)-1, alpha, beta, debug?[...debugMoves, nextMove]:debugMoves)};
                            nsr.depth++;
                            nsr.move = nextMove;
                            if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                            if (debug) console.error(`${buffer}  , ${nextMove}result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: "${nsr.moves}" }, `);
                        } else {
                            if (debug) {
                                line += `{`;
                                if (this.positionMinimax.has(nextPositionKey)) line += ` cached: true, positionKey: "${nextPositionKey}",`;
                                if (nsr.evaluation !== undefined) line += ` status: "evaluationCalculated: ${nsr.evaluation}",`;
                                else if (min.evaluation === -1) line += ` status: "noQuickerWinPossible: ${nsr.depth+1} vs ${min.depth}",`;
                                else if (nsr.depth+1 >= min.depth) line += ` status: "deeperThanMin",`;
                            }
                            nsr = {...nsr};
                            if (nsr.depth+1 > remainingDepth) {
                                if (debug) console.error(`${line} depth: ${nsr.depth+1}, skipReason: "too deep" }, `);
                                nsr.evaluation = undefined;
                                nsr.depth = remainingDepth - 1;
                                if (nsr.moves) nsr.moves = nsr.moves.slice(0, nsr.depth);
                            }
                            nsr.depth++;
                            nsr.move = nextMove;
                            if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                            if (debug) console.error(`${line} result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: "${nsr.moves}" } }, `);
                        }
                        if (!min || this.isPreferredForBlack(nsr, min)) {
                            if (debug) console.error(`${buffer}  ${nextMove}_IS_NEW_MIN: { old_evaluation: ${min?.evaluation}, old_depth: ${min?.depth} }, `);
                            min = nsr;
                            if (alpha && this.isPreferredForBlack(min, alpha)) {
                                if (debug) console.error(`${buffer}  ${nextMove}_ALPHA_BREAK: true, `);
                                break;
                            }
                            if (!beta || this.isPreferredForBlack(min, beta)) beta = min;
                        }
                    }
                    if (min) result = min;
                }
            }

            if (debug) {
                console.error(`${buffer}  evaluation: "${result.evaluation}", depth: "${result.depth}", moves: "${result.moves}"`);
                console.error(`${buffer}}`);
            }
            if (cached) {
                this.deepenCount++;
                /*
                let reprocessArr = this.reprocess.get(positionKey);
                if (!reprocessArr) {
                    reprocessArr = [];
                    this.reprocess.set(positionKey, reprocessArr);
                }
                reprocessArr.push({newDepth: remainingDepth, newResult: result, originalDepth: cached.depth, originalResult: cached});
                */
            }
            this.positionMinimax.set(positionKey, result);
        }
        return result;
    }
}

export class Rook extends Piece {
    letter = 'R';
    value = 5;
    potentialMoves(state: State) { 
        let positions: Position[] = [];
        let fileNum = this.position.getFile();
        [1, -1, 8, -8].forEach(delta => {
            let p = this.position.pos + delta;
            let skipFileCheck = Math.abs(delta) > 1;
            while (p >= 0 && p <= 63 && (skipFileCheck || (p>>3) === fileNum)) {
                let newPosition = new Position(p);
                let pieceThere = state.getPieceAtPosition(newPosition);
                positions.push(newPosition);
                if (pieceThere) break;
                p += delta;
            }
        })
        return positions;
    }
}

export class King extends Piece {
    letter = 'K';
    value = 900;
    potentialMoves(state: State) {
        let posRank = this.position.getRank();
        return [-9, -8, -7, -1, 1, 7, 8, 9]
        .filter(delta => !(posRank === 0 && (delta===-9||delta===-1||delta===7)) && !(posRank === 7 && (delta===-7||delta===1||delta===9)))
        .map(delta => this.position.pos + delta)
        .filter(pos => pos >= 0 && pos <= 63)
        .map(pos => new Position(pos));
    }
}

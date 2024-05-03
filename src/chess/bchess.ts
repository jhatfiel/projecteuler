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

let arr = this.readline().split(' ').map(s => positionFromString(s));
console.error(`Initial State: ${arr.map(pos => positionToString(pos))}`);
STATE.addPiece(new King(0, arr[0])); // White King
STATE.addPiece(new Rook(0, arr[1])); // White Rook
STATE.addPiece(new King(1, arr[2])); // Black King
console.error(STATE.toString());
positions.push(STATE.debugString());
console.error(STATE.debugString().join('\n'));
//console.error(`Equivalent positions: ${STATE.equivalentPositions()}`);

let now = Date.now();
let ENGINE = new Engine(11);
console.error(`Starting engine ${ENGINE.maxDepth}`);

console.error(`*/obj=`);
let result = ENGINE.minimax(STATE);
console.error(`; /*`);
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

export function positionFromString(s: string): Position {
    return { fileNum: s.charCodeAt(0) - 'a'.charCodeAt(0),
             rankNum: s.charCodeAt(1) - '1'.charCodeAt(0)};
};
export type Position = {
    fileNum: number; // file a-h
    rankNum: number; // rank 1-8
}
function positionEquals(a: Position, b: Position): boolean {
    return a && b && a.fileNum === b.fileNum && a.rankNum === b.rankNum;
}

function distanceBetween(a: Position, b: Position): number {
    return Math.abs(a.fileNum-b.fileNum) + Math.abs(a.rankNum-b.rankNum);
}
function positionToString(pos: Position) { return String.fromCharCode('a'.charCodeAt(0)+pos.fileNum)+String.fromCharCode('1'.charCodeAt(0)+pos.rankNum); }

export abstract class Piece {
    abstract letter: string;
    abstract value: number;
    constructor(public player: number, public position: Position) {} // player=0 is white, 1 is black
    abstract validMoves(state: State): Position[];
    clone(): Piece {
       return new (<any>this.constructor)(this.player, {...this.position});
    }
    toString() { return `${positionToString(this.position)}=${this.player==0?'W':'B'}${this.letter}`; }
    getPieceLetter() { return this.player===0?this.letter:this.letter.toLowerCase()};
    static Sort(a: Piece, b: Piece): number {
        let property = 'rank';
        if (a.position.rankNum === b.position.rankNum) property = 'file';
        return a.position[property] < b.position[property]?-1:a.position[property] > b.position[property]?1:0;
    }
    getRelativePosition(pos: Position, fDelta: number, rDelta: number): Position {
        if (fDelta === -1 && pos.fileNum === 0) return undefined;
        if (fDelta ===  1 && pos.fileNum === 7) return undefined;
        if (rDelta === -1 && pos.rankNum === 0) return undefined;
        if (rDelta ===  1 && pos.rankNum === 7) return undefined;

        // valid board position, state will have to determine if this is a valid position to move to though
        return {fileNum: pos.fileNum + fDelta, rankNum: pos.rankNum + rDelta};
    }

}

export type Move = { piece: Piece, position: Position };
export function moveToString(move: Move) { return `${positionToString(move.piece.position)}${positionToString(move.position)}`; }

export class State {
    activePlayer = 0;
    pieces: Piece[] = [];
    nextMoves: string[];
    evaluated = false;
    evaluation: number;

    moveFromString(str: string): Move {
        let pos = positionFromString(str.substring(0, 2));
        let position = positionFromString(str.substring(2));
        let piece = this.getPieceAtPosition(pos);
        let pieceThere = this.getPieceAtPosition(position);
        if (piece.player !== this.activePlayer) throw new Error(`Tried to move ${piece} but turn is ${this.activePlayer}`);
        if (pieceThere && piece.player === pieceThere.player) throw new Error(`You can't capture your own piece! ${piece} -> ${pieceThere}`);
        return {piece, position};
    }

    moveToStandardString(move: Move): string {
        // e2h2 should look like Rh2
        // if there was a piece there, it would be Rxh2 (not implementing that right now because there should be no captures in these games...)
        return move.piece.letter + positionToString(move.position);
    }

    addPiece(p: Piece) { this.pieces.push(p); }
    removePiece(pos: Position) { this.pieces = this.pieces.filter(p => !positionEquals(p.position, pos)); }
    getPieceAtPosition(pos: Position): Piece {  return this.pieces.find(p => positionEquals(p.position, pos)); }

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
            console.error(this.debugString().join('\n'));
            throw new Error(`activePlayerKing has gone missing...`);
        }
        if (this.pieces.some(p => p.player !== this.activePlayer && p.validMoves(this).some(pos => positionEquals(pos, activePlayerKing.position)))) return true;
        return false;
    }

    getNextMoves(): string[] {
        if (!this.nextMoves) {
            this.nextMoves = [];
            this.pieces.filter(p => p.player === this.activePlayer).forEach(p => {
                p.validMoves(this).forEach(position => {
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
            // choose the moves that push the black king further into the corners/sides
            
            // distance between kings?
            let awk = a.pieces.find(p => p instanceof King && p.player === 0);
            let abk = a.pieces.find(p => p instanceof King && p.player === 1);
            let bwk = b.pieces.find(p => p instanceof King && p.player === 0);
            let bbk = b.pieces.find(p => p instanceof King && p.player === 1);
            let ad = distanceBetween(awk.position, abk.position);
            let bd = distanceBetween(bwk.position, bbk.position);
            if (ad !== bd) return ad - bd;

            // add in distance between rook and king file/rank - we want to minimize that as well right?
            /*
            let awr = a.pieces.find(p => p instanceof Rook && p.player === 0);
            let bwr = b.pieces.find(p => p instanceof Rook && p.player === 0);
            ad = awr.position.distanceTo(abk.position);
            bd = bwr.position.distanceTo(bbk.position);
            if (ad !== bd) return ad - bd;
            */

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
            ].map(p => p?positionToString(p.position):'  ').join('')}`;
    }

    toFEN(): string {
        let fen = '';
        for (let rankNum=7; rankNum>=0; rankNum--) {
            //let rankPieces = this.pieces.filter(p => p.position.rankNum === rankNum).sort((a,b) => a.position.file.localeCompare(b.position.file));
            let line = Array.from({length: 8});
            this.pieces.filter(p => p.position.rankNum === rankNum).forEach(p => line[p.position.fileNum] = p.getPieceLetter());
            let num = 0;
            Object.keys(line).forEach(f => {
                if (line[f]) {
                    if (num) {
                        fen += num;
                    }
                    num = 0;
                    fen += line[f];
                } else {
                    num++;
                }
            })
            if (num) fen += num;
            if (rankNum>0) fen += '/'
        }
        fen += ' ' + (this.activePlayer===0?'w':'b');
        fen += ' -';
        return fen;
    }

    debugString(): string[] {
        let lines: string[] = [' ABCDEFGH'];
        for (let rankNum=7; rankNum>=0; rankNum--) {
            let line = (rankNum+1).toString();
            for (let fileNum=0; fileNum<8; fileNum++) {
                line += this.getPieceAtPosition({fileNum, rankNum})?.getPieceLetter() ?? '.';
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
}

export class Engine {
    positionMinimax = new Map<string, MinimaxResult>();
    computing = new Set<string>();

    constructor(public maxDepth: number, public disableDebugging=false) {}

    // need to clarify what an undefined evaluation means.
    // undefined means we don't know the result after "depth" moves.
    // so undefined/0 should mean we don't know the result RIGHT HERE
    // undefined/5 means "we've looked 5 moves into the full posibility tree and still can't find a definite result"
    // so, is undefined/0 preferred to 1/3?  No.  It might be, but we need to extend them out to the same depth first!
    // then we can confidently say that undefined/3 is WORSE than 1/3

    isPreferredForWhite(a: MinimaxResult, b: MinimaxResult): boolean {
        if (a.evaluation === 1) return b.evaluation !== 1 || a.depth < b.depth; // winning and closer or b is not winning
        if (a.evaluation === undefined) return b.evaluation !== 1 && (a.depth >= b.depth);
        // white should want to just get it over with, draw is a loss when you get down to it
        return a.evaluation > b.evaluation || (a.evaluation === b.evaluation && a.depth > b.depth);
    }
    isPreferredForBlack(a: MinimaxResult, b: MinimaxResult): boolean { 
        if (a.evaluation === -1) return b.evaluation !== -1 || a.depth < b.depth; // winning and closer or b is not winning
        if (a.evaluation === undefined) return b.evaluation !== -1 && (a.depth >= b.depth);
        // white should want to just get it over with, draw is a loss when you get down to it
        return a.evaluation < b.evaluation || (a.evaluation === b.evaluation && a.depth > b.depth);
    }

    isPreferredForPlayer(a: MinimaxResult, b: MinimaxResult, optimalEvaluation: number): boolean {
        //         b.eval:       1         undefined         0          -1
        // a.evaluation:
        //  1                 closer         true          true         true  (a=1 means we KNOW we will win in ad moves.  It's better than undefined/0/-1, As long as that's < bd, we're good!)
        //  undefined         false          false         true         true (we always pick unknown if the alternative is draw or losing)
        //  0                 false          false        further       true (draw games, better than losing! or at least further away)
        //  -1                false          false         false       further (losing sucks, so it's always worse, unless it's further away)
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
        alpha = {...alpha}; alpha.depth--;
        beta = {...beta}; beta.depth--;
        if (currentDepth > 20 || alpha.depth < 0 || beta.depth < 0) {
            throw new Error(`Way too deep! ${currentDepth}/${alpha.depth}/${beta.depth}`);
        }

        let debug = true; //currentDepth<=2;
        let recordMoves = true || debug;
        if (this.disableDebugging) {
            debug = false;
            recordMoves = false;
        }
        const buffer = debug?''.padStart(2*currentDepth, ' '):'';

        let result: MinimaxResult = {depth: 0, moves: []};
        let positionKey = state.toString();
        this.computing.add(positionKey);
        let evaluation = state.evaluate();
        if (debug) {
            console.error(`${buffer}{`);
            console.error(`${buffer}  positionKey: "${state}", currentDepth: ${currentDepth}, remainingDepth: ${remainingDepth}, alpha: "${alpha.evaluation}/${alpha.depth}", beta: "${beta.evaluation}/${beta.depth}", evaluation: "${evaluation}",`);
            console.error(`${buffer}  movesToHere: "${debugMoves.join(',')}",`);
        }

        result.evaluation = evaluation;

        if (result.evaluation === undefined && remainingDepth > 0) {
            result.depth = remainingDepth;
            if (state.activePlayer === 0) {
                let max: MinimaxResult;
                if (debug) console.error(`${buffer}  player: "WHITE", nextMoves: "${[...state.getNextStates()].sort(State.SortWhite).map(([move]) => move)}",`);
                for (let [nextMove, nextState] of [...state.getNextStates()].sort(State.SortWhite)) {
                    let nextPositionKey = nextState.toString();
                    if (this.computing.has(nextPositionKey)) continue;
                    let nsr = this.positionMinimax.get(nextPositionKey) ?? { depth: 0, moves: []};
                    let line = '';
                    if (debug) line = `${buffer}  ${nextMove}:`;
                    //if (nsr.evaluation === undefined && (!max || nsr.depth+1 < Math.min(remainingDepth, max&&max.evaluation===1?max.depth:remainingDepth) || max.evaluation !== 1)) {
                    if (nsr.evaluation === undefined && (!max || nsr.depth+1 < max.depth || max.evaluation !== 1)) {
                        //if (debug) console.error(`${buffer}WHITE Trying move: ${nextMove} ${this.positionMinimax.has(nextPositionKey)?'T':'F'}:${nsr.evaluation}/${nsr.depth}`);
                        if (debug) console.error(line);
                        nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, max&&max.evaluation===1?max.depth:remainingDepth)-1, alpha, beta, debug?[...debugMoves, nextMove]:debugMoves)};
                        nsr.depth++;
                        nsr.move = nextMove;
                        if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                        //if (debug) console.error(`${buffer}WHITE For move: ${nextMove}, got ${nsr.evaluation}/${nsr.depth}`);
                        if (debug) console.error(`${buffer}  , ${nextMove}result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: ${nsr.moves} }, `);
                    } else {
                        if (debug) {
                            line += `{`;
                            if (this.positionMinimax.has(nextPositionKey)) line += ` cached: true, positionKey: "${nextPositionKey}",`;
                            if (nsr.evaluation !== undefined) line += ` status: "evaluationCalculated: ${nsr.evaluation}",`;
                            else if (max.evaluation === 1) line += ` status: "noQuickerWinPossible: ${nsr.depth+1} vs ${max.depth}",`;
                            else if (nsr.depth+1 >= max.depth) line += ` status: "deeperThanMax",`;
                        }
                        if (nsr.depth+1 > remainingDepth) {
                            let skip = true;
                            if (debug) console.error(`${line} depth: ${nsr.depth+1}, skipReason: "too deep" }, `);
                            if (skip) continue;
                        }
                        nsr = {...nsr};
                    nsr.depth++;
                        nsr.move = nextMove;
                        if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                        if (debug) console.error(`${line} result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: "${nsr.moves}" } }, `);
                        //if (debug) console.error(`${buffer}  ${nextMove}: "${nsr.evaluation}/${nsr.depth}",`);
                        //if (debug) console.error(`${buffer}WHITE already calculated ${nextMove}(${nsr.evaluation}/${nsr.depth}) far enough ${max?.evaluation}/${max?.depth}`);
                    }
                    if (!max || this.isPreferredForWhite(nsr, max)) {
                        if (debug) console.error(`${buffer}  ${nextMove}_IS_NEW_MAX: { old_evaluation: ${max?.evaluation}, old_depth: ${max?.depth} }, `);
                        max = nsr;
                        //if (currentDepth === 0 || debug) console.error(`${buffer}WHITE found new max: ${max.evaluation} ${max.depth} ${max.moves} (${[...this.positionMinimax.values()].filter(m => m.depth > max.depth).length} known positions > ${max.depth})`);
                        if (beta.evaluation !== undefined && this.isPreferredForWhite(max, beta)) {
                            //if (debug) console.error(`${buffer}WHITE BETA BREAK: ${max.evaluation} ${max.depth} ${max.moves}`);
                            break;
                        }
                        if (this.isPreferredForWhite(max, alpha)) {
                            //if (debug) console.error(`${buffer}WHITE found new ALPHA: ${max.evaluation} ${max.depth} ${max.moves}`);
                            alpha = max;
                        }
                    }
                }
                if (max) result = max;
            } else {
                let min: MinimaxResult;
                //if (debug) console.error(`${buffer}  player: "BLACK", nextMoves: "${[...state.getNextStates()].sort(State.SortBlack).map(([move]) => move)}",`);
                if (debug) console.error(`${buffer}  player: "BLACK", nextMoves: "${[...state.getNextStates()].sort(State.SortBlack).map(([move]) => move)}",`);
                for (let [nextMove, nextState] of [...state.getNextStates()].sort(State.SortBlack)) {
                    let nextPositionKey = nextState.toString();
                    if (this.computing.has(nextPositionKey)) continue;
                    let nsr = this.positionMinimax.get(nextPositionKey) ?? { depth: 0, moves: []};
                    let line = '';
                    if (debug) line = `${buffer}  ${nextMove}:`;
                    //if (nsr.evaluation === undefined && (!min || nsr.depth+1 < Math.min(remainingDepth, min&&min.evaluation===-1?min.depth:remainingDepth) || min.evaluation !== -1)) {
                    if (nsr.evaluation === undefined && (!min || min.evaluation !== -1 || nsr.depth+1 < min.depth)) {
                        // in here, nsr.evaluation is undefined AND
                        // - we don't have a min yet
                        // - OR that min is NOT -1 (best possible for black) - in other words, we haven't found a win condition for black yet
                        // - OR, I guess, we DO have a win condition for black, but nsr.depth+1 is < min.depth
                        //if (debug) console.error(`${buffer}BLACK Trying move: ${nextMove} ${this.positionMinimax.has(nextPositionKey)?'T':'F'}:${nsr.evaluation}/${nsr.depth}`);
                        if (debug) console.error(line);
                        nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, min&&min.evaluation===-1?min.depth:remainingDepth)-1, alpha, beta, debug?[...debugMoves, nextMove]:debugMoves)};
                        nsr.depth++;
                        nsr.move = nextMove;
                        if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                        //if (debug) console.error(`${buffer}BLACK For move: ${nextMove}, got ${nsr.evaluation}/${nsr.depth}`);
                        if (debug) console.error(`${buffer}  , ${nextMove}result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: ${nsr.moves} }, `);
                    } else {
                        if (debug) {
                            line += `{`;
                            if (this.positionMinimax.has(nextPositionKey)) line += ` cached: true, positionKey: "${nextPositionKey}",`;
                            if (nsr.evaluation !== undefined) line += ` status: "evaluationCalculated: ${nsr.evaluation}",`;
                            else if (min.evaluation === -1) line += ` status: "noQuickerWinPossible: ${nsr.depth+1} vs ${min.depth}",`;
                            else if (nsr.depth+1 >= min.depth) line += ` status: "deeperThanMin",`;
                        }
                        if (nsr.depth+1 > remainingDepth) {
                            let skip = true;
                            if (debug) console.error(`${line} depth: ${nsr.depth+1}, skipReason: "too deep" }, `);
                            if (skip) continue;
                        }
                        nsr = {...nsr};
                    nsr.depth++;
                        nsr.move = nextMove;
                        if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                        if (debug) console.error(`${line} result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: "${nsr.moves}" } }, `);
                        //if (debug) console.error(`${buffer}BLACK already calculated ${nextMove}(${nsr.evaluation}/${nsr.depth}) far enough ${min?.evaluation}/${min?.depth}`);
                    }
                    if (!min||this.isPreferredForBlack(nsr, min)) {
                        if (debug) console.error(`${buffer}  ${nextMove}_IS_NEW_MIN: { old_evaluation: ${min?.evaluation}, old_depth: ${min?.depth} }, `);
                        min = nsr;
                        //if (debug) console.error(`${buffer}BLACK found new min: ${min.evaluation} ${min.depth} ${min.moves}`);
                        if (alpha.evaluation !== undefined && this.isPreferredForBlack(min, alpha)) {
                            //if (debug) console.error(`${buffer}BLACK ALPHA BREAK: ${min.evaluation} ${min.depth} ${min.moves}`);
                            break;
                        }
                        if (this.isPreferredForBlack(min, beta)) {
                            //if (debug) console.error(`${buffer}BLACK found new BETA: ${min.evaluation} ${min.depth} ${min.moves}`);
                            beta = min;
                        }
                    }
                }
                if (min) result = min;
            }
        }

        if (debug) {
            console.error(`${buffer}  evaluation: "${result.evaluation}", depth: "${result.depth}", moves: "${result.moves}"`);
            console.error(`${buffer}}`);
        }
        this.positionMinimax.set(positionKey, result);
        this.computing.delete(positionKey);
        return result;
    }
}

export class Rook extends Piece {
    letter = 'R';
    value = 5;
    validMoves(state: State) { 
        let positions: Position[] = [];
        [[ 0, 1], [-1, 0], [ 1, 0], [ 0,-1]].forEach(([fDelta, rDelta]) => {
            let p = this.position;
            while (true) {
                p = this.getRelativePosition(p, fDelta, rDelta);
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

export class King extends Piece {
    letter = 'K';
    value = 900;
    validMoves(state: State) {
        //console.error(`Asking ${this} for valid moves based on ${state}`);
        return [[-1, 1], [ 0, 1], [ 1, 1],
                [-1, 0],          [ 1, 0],
                [-1,-1], [ 0,-1], [ 1,-1]]
            .map(([fDelta,rDelta]) => this.getRelativePosition(this.position, fDelta, rDelta))
            .filter(pos => !!pos)
            .filter(pos => {
                let pieceThere = state.getPieceAtPosition(pos);
                return (!pieceThere || pieceThere.player !== this.player);
            });
    }
}

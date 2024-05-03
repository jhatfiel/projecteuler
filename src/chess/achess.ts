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
let ENGINE = new Engine(5);
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

export function positionFromString(s: string): number {
    return 8*(s.charCodeAt(0) - 'a'.charCodeAt(0)) + s.charCodeAt(1) - '1'.charCodeAt(0);
};

function distanceBetween(a: number, b: number): number {
    return Math.abs(Math.floor(a/8)-Math.floor(b/8)) + Math.abs(a%8-b%8);
}
function positionToString(pos: number) { return String.fromCharCode('a'.charCodeAt(0)+Math.floor(pos/8))+String.fromCharCode('1'.charCodeAt(0)+pos%8); }
function distanceFromCenter(pos: number): number {
    return Math.max(3-Math.min(pos%8, 7-pos%8), 3-Math.min(Math.floor(pos/8), 7-Math.floor(pos/8)));
}

export abstract class Piece {
    abstract letter: string;
    abstract value: number;
    constructor(public player: number, public position: number) {} // player=0 is white, 1 is black
    abstract validMoves(state: State): number[];
    clone(): Piece {
       return new (<any>this.constructor)(this.player, this.position);
    }
    toString() { return `${positionToString(this.position)}=${this.player==0?'W':'B'}${this.letter}`; }
    getPieceLetter() { return this.player===0?this.letter:this.letter.toLowerCase()};
}

export type Move = { piece: Piece, position: number };
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
        // if there was a piece there, it would be Rxh2 
        // TODO: implementing proper capture notation
        return move.piece.letter + positionToString(move.position);
    }

    addPiece(p: Piece) { this.pieces.push(p); }
    removePiece(pos: number) { this.pieces = this.pieces.filter(p => p.position !== pos); }
    getPieceAtPosition(pos: number): Piece {  return this.pieces.find(p => p.position === pos); }

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
        if (this.pieces.some(p => p.player !== this.activePlayer && p.validMoves(this).some(pos => pos === activePlayerKing.position))) return true;
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

    getNextStatesSortedWhite(): Map<string, State> {
        type sortingArrayType = {
            nextState: State;
            followingStates: Map<string, State>
            evaluation: number;
            wk: Piece;
            bk: Piece;
        }

        let sortingArray = [...this.getNextStates()].map(v => [v[0], {
            nextState: v[1],
            followingStates: v[1].getNextStates(),
            evaluation: v[1].evaluate(),
            wk: v[1].pieces.find(p => p instanceof King && p.player === 0),
            bk: v[1].pieces.find(p => p instanceof King && p.player === 1)
        }] as [string, sortingArrayType]);

        sortingArray.sort(([aStr, aObj], [bStr, bObj]) => {
            let a = aObj.nextState;
            let b = bObj.nextState;
            let ae = aObj.evaluation;
            let be = bObj.evaluation;
            let ans = aObj.followingStates;
            let bns = bObj.followingStates;
            let awk = aObj.wk;
            let abk = aObj.bk;
            let bwk = bObj.wk;
            let bbk = bObj.bk;

            // undefined just means we don't know who wins this position
            if (ae === undefined && be === undefined) {
                // choose the move that pushes the black king further into the corners/sides
                let aAverageKingDFC = [...ans.values()]
                                        .map(ns => distanceFromCenter(ns.pieces.find(p => p instanceof King && p.player === 1).position))
                                        .reduce((acc, d) => acc += d, 0) / ans.size;
                let bAverageKingDFC = [...bns.values()]
                                        .map(ns => distanceFromCenter(ns.pieces.find(p => p instanceof King && p.player === 1).position))
                                        .reduce((acc, d) => acc += d, 0) / bns.size;
                if (aAverageKingDFC !== bAverageKingDFC) { 
                    //console.error(`Found difference in king DFC: ${bAverageKingDFC} vs ${aAverageKingDFC}`); 
                    return bAverageKingDFC - aAverageKingDFC;
                }
                
                // available moves?
                if (ans.size !== bns.size) return ans.size - bns.size;

                // distance between kings?
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

                return -1;
            }

            if (ae === undefined) return 1//(be <= 0)?1:-1;
            if (be === undefined) return -1//(ae <= 0)?-1:1;
            return be - ae; // just sort by the best score
        });

        return new Map(sortingArray.map(v => [v[0], v[1].nextState]));
    }

    getNextStatesSortedBlack(): Map<string, State> {
        type sortingArrayType = {
            nextState: State;
            evaluation: number;
            bk: Piece;
            numPieces: number;
        }

        let sortingArray = [...this.getNextStates()].map(v => [v[0], {
            nextState: v[1],
            evaluation: v[1].evaluate(),
            bk: v[1].pieces.find(p => p instanceof King && p.player === 1),
            numPieces: v[1].pieces.length
        }] as [string, sortingArrayType]);

        sortingArray.sort(([aStr, aObj], [bStr, bObj]) => {
            let ae = aObj.evaluation;
            let be = bObj.evaluation;
            let abk = aObj.bk;
            let bbk = bObj.bk;

            // black should ALWAYS choose the path that takes a piece
            if (aObj.numPieces !== bObj.numPieces) return aObj.numPieces - bObj.numPieces;

            // undefined just means we don't know who wins this position
            if (ae === undefined && be === undefined) {
                // pick the position that moves the king closest to the center of the board
                // 01234567
                // 01233210
                // 32100123
                let adfc = distanceFromCenter(abk.position);
                let bdfc = distanceFromCenter(bbk.position);
                return adfc - bdfc;
            }
            if (ae === undefined) return -1;
            if (be === undefined) return 1;
            return ae - be; // just sort by the best score
        });

        return new Map(sortingArray.map(v => [v[0], v[1].nextState]));
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
            this.pieces.filter(p => p.position%8 === rankNum).forEach(p => line[Math.floor(p.position/8)] = p.getPieceLetter());
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
        fen += ' -';
        return fen;
    }

    debugString(): string[] {
        let lines: string[] = [' ABCDEFGH'];
        for (let rankNum=7; rankNum>=0; rankNum--) {
            let line = (rankNum+1).toString();
            for (let fileNum=0; fileNum<8; fileNum++) {
                line += this.getPieceAtPosition(rankNum+fileNum*8)?.getPieceLetter() ?? '.';
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
        return this.isPreferredForPlayer(a, b, 1);
    }
    isPreferredForBlack(a: MinimaxResult, b: MinimaxResult): boolean { 
        return this.isPreferredForPlayer(a, b, -1);
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
        if (a.evaluation === undefined) return b.evaluation !== optimalEvaluation && a.depth >= b.depth;
        //return b.evaluation === undefined && (optimalEvaluation*a.evaluation > optimalEvaluation*b.evaluation || (a.evaluation === b.evaluation && a.depth >= b.depth)); // put off the draw/loss as long as possible
        if (a.evaluation === 0) return b.evaluation === -1*optimalEvaluation;
        return false;
    }

    minimax(state: State, currentDepth = 0, remainingDepth: number = this.maxDepth, alpha: MinimaxResult = undefined, beta: MinimaxResult = undefined, debugMoves: string[] = []): MinimaxResult {
        if (alpha) { alpha = {...alpha}; alpha.depth = Math.max(0, alpha.depth-1); }
        if (beta) { beta = {...beta}; beta.depth = Math.max(0, beta.depth-1); }
        if (currentDepth > 20 || alpha?.depth < 0 || beta?.depth < 0) {
            throw new Error(`Way too deep! ${currentDepth}/${alpha?.depth}/${beta?.depth}`);
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
            console.error(`${buffer}  positionKey: "${state}", currentDepth: ${currentDepth}, remainingDepth: ${remainingDepth}, alpha: "${alpha?.evaluation}/${alpha?.depth}", beta: "${beta?.evaluation}/${beta?.depth}", evaluation: "${evaluation}",`);
            console.error(`${buffer}  movesToHere: "${debugMoves.join(',')}",`);
        }

        result.evaluation = evaluation;

        if (result.evaluation === undefined && remainingDepth > 0) {
            result.depth = remainingDepth;
            if (state.activePlayer === 0) {
                let max: MinimaxResult;
                let nextStates = state.getNextStatesSortedWhite();
                if (debug) console.error(`${buffer}  player: "WHITE", nextMoves: "${[...nextStates].map(([move]) => move)}",`);
                for (let [nextMove, nextState] of [...nextStates]) {
                    let nextPositionKey = nextState.toString();
                    if (this.computing.has(nextPositionKey)) continue;
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
                        if (nsr.depth+1 > remainingDepth) {
                            if (debug) console.error(`${line} depth: ${nsr.depth+1}, skipReason: "too deep" }, `);
                            continue;
                        }
                        nsr = {...nsr};
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
                if (debug) console.error(`${buffer}  player: "BLACK", nextMoves: "${[...nextStates].map(([move]) => move)}",`);
                for (let [nextMove, nextState] of [...nextStates]) {
                    let nextPositionKey = nextState.toString();
                    if (this.computing.has(nextPositionKey)) continue;
                    let nsr = this.positionMinimax.get(nextPositionKey) ?? { depth: 0, moves: []};
                    let line = '';
                    if (debug) line = `${buffer}  ${nextMove}:`;
                    if (nsr.evaluation === undefined && (!min || nsr.depth+1 < min.depth || min.evaluation !== -1)) {
                        if (debug) console.error(line);
                        nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, min?.evaluation===-1?min.depth:remainingDepth)-1, alpha, beta, debug?[...debugMoves, nextMove]:debugMoves)};
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
                        if (nsr.depth+1 > remainingDepth) {
                            if (debug) console.error(`${line} depth: ${nsr.depth+1}, skipReason: "too deep" }, `);
                            continue;
                        }
                        nsr = {...nsr};
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
        this.positionMinimax.set(positionKey, result);
        this.computing.delete(positionKey);
        return result;
    }
}

export class Rook extends Piece {
    letter = 'R';
    value = 5;
    validMoves(state: State) { 
        let positions: number[] = [];
        let fileNum = Math.floor(this.position/8);
        [1, -1, 8, -8].forEach(delta => {
            let p = this.position + delta;
            let skipFileCheck = Math.abs(delta) > 1;
            while (p >= 0 && p <= 63 && (skipFileCheck || Math.floor(p/8) === fileNum)) {
                let pieceThere = state.getPieceAtPosition(p);
                if (!pieceThere || pieceThere.player !== this.player) positions.push(p);
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
    validMoves(state: State) {
        //console.error(`Asking ${this} for valid moves based on ${state}`);
        return [-9, -8, -7, -1, 1, 7, 8, 9]
        .filter(delta => !(this.position%8 === 0 && (delta===-9||delta===-1||delta===7)) && !(this.position%8 === 7 && (delta===-7||delta===1||delta===9)))
        .map(delta => this.position + delta)
        .filter(pos => pos >= 0 && pos <= 63)
        .filter(pos => {
            let pieceThere = state.getPieceAtPosition(pos);
            return (!pieceThere || pieceThere.player !== this.player);
        });
    }
}

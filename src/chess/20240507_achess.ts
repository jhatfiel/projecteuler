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
STATE.printDebugString();
//console.error(`Equivalent positions: ${STATE.equivalentPositions()}`);

let now = Date.now();
let ENGINE = new Engine(9);
console.error(`Starting engine ${ENGINE.maxDepth}`);

console.error(`*/obj=`);
let result = ENGINE.minimax(STATE);
console.error(`; /*`);
now = Date.now()-now;
console.error(`Engine done ${now}ms`);
console.error(`Known position: ${ENGINE.positionMinimax.size}`);
console.error(`Deepened positions: ${ENGINE.deepenCount}`);
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
        //moveStr = result.moves[0];
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
    //STATE.printDebugString();
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
        return Math.max(3-Math.min(this.getFile(), 7-this.getFile()), 3-Math.min(this.getRank(), 7-this.getRank()));
    }
    equals(b: Position): boolean { return this.pos === b.pos; }
    toString(): string { return `${this.getFileStr()}${this.getRankStr()}`; }
}

export abstract class Piece {
    abstract letter: string;
    abstract value: number;
    constructor(public player: number, public position: Position) {} // player=0 is white, 1 is black
    abstract validMoves(state: State): Position[];
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
    nextMoves: string[];
    evaluated = false;
    evaluation: number;

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
            this.printDebugString();
            throw new Error(`activePlayerKing has gone missing...`);
        }
        if (this.pieces.some(p => p.player !== this.activePlayer && p.validMoves(this).some(pos => pos.equals(activePlayerKing.position)))) return true;
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
            wr: Piece;
            bk: Piece;
        }

        let sortingArray = [...this.getNextStates()].map(v => [v[0], {
            nextState: v[1],
            followingStates: v[1].getNextStates(),
            evaluation: v[1].evaluate(),
            wk: v[1].pieces.find(p => p instanceof King && p.player === 0),
            wr: v[1].pieces.find(p => p instanceof Rook && p.player === 0),
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
            let awr = aObj.wr;
            let abk = aObj.bk;
            let bwk = bObj.wk;
            let bwr = bObj.wr;
            let bbk = bObj.bk;

            // undefined just means we don't know who wins this position
            if (ae === undefined && be === undefined) {
                // choose the move that pushes the black king further into the corners/sides
                let aAverageKingDFC = [...ans.values()]
                                        .map(ns => ns.pieces.find(p => p instanceof King && p.player === 1).position.distanceFromCenter())
                                        .reduce((acc, d) => acc += d, 0) / ans.size;
                let bAverageKingDFC = [...bns.values()]
                                        .map(ns => ns.pieces.find(p => p instanceof King && p.player === 1).position.distanceFromCenter())
                                        .reduce((acc, d) => acc += d, 0) / bns.size;
                if (aAverageKingDFC !== bAverageKingDFC) return bAverageKingDFC - aAverageKingDFC;
                
                // available moves?
                if (ans.size !== bns.size) return ans.size - bns.size;

                // distance between kings?
                let ad = awk.position.distanceBetween(abk.position);
                let bd = bwk.position.distanceBetween(bbk.position);
                if (ad !== bd) return ad - bd;

                // add in distance between rook and king file/rank - we want to minimize that as well right?

                let aFRDelta = Math.min(Math.abs(awr.position.getFile() - abk.position.getFile()), Math.abs(awr.position.getRank() - abk.position.getRank()));
                let bFRDelta = Math.min(Math.abs(bwr.position.getFile() - bbk.position.getFile()), Math.abs(bwr.position.getRank() - bbk.position.getRank()));

                if (aFRDelta !== bFRDelta) return aFRDelta - bFRDelta;

                return a.toString().localeCompare(b.toString());
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
                let adfc = abk.position.distanceFromCenter();
                let bdfc = bbk.position.distanceFromCenter();
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
     * - 0 if we know it ends in a draw (we're going to call this a black win to simplify)
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
            } else if (this.pieces.filter(p => !(p instanceof King)).length === 0) this.evaluation = -1;
            // If both sides have only a king, it's a draw (which we are calling a win for black and a loss for white)

            this.evaluated = true;
        }
        return this.evaluation;
    }

    isEndState(): boolean {
        let evaluation = this.evaluate();
        return evaluation === 1 || evaluation === 0 || evaluation === -1;
    }

    static fromKey(key: string): State {
        let state = new State();
        state.addPiece(new King(0, Position.fromString(key.substring(2, 4))));
        state.addPiece(new Rook(0, Position.fromString(key.substring(4, 6))));
        state.addPiece(new King(1, Position.fromString(key.substring(6, 8))));
        state.activePlayer = key.charAt(0) === 'W'?0:1;
        return state;
    }

    toString() {
        //return `${this.activePlayer===0?'W':'B'}:${this.pieces.sort(Piece.Sort).map(p => p.toString()).join('/')}`;
        return `${this.activePlayer===0?'W':'B'}:${
            [this.pieces.find(p => p instanceof King && p.player===0),
             this.pieces.find(p => p instanceof Rook),
             this.pieces.find(p => p instanceof King && p.player===1)
            ].map(p => p?p.position.toString():'  ').join('')}`;
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
        fen += ' -';
        return fen;
    }

    printDebugString() { console.error(this.debugString().join('\n')); }
    debugString(): string[] {
        let lines: string[] = [`${this.activePlayer?'b':'w'}ABCDEFGH`];
        for (let rankNum=7; rankNum>=0; rankNum--) {
            let line = (rankNum+1).toString();
            for (let fileNum=0; fileNum<8; fileNum++) {
                line += this.getPieceAtPosition(new Position(rankNum+fileNum*8))?.getPieceLetter() ?? '.';
            }
            lines.push(line);
        }
        lines.push(`${this.isCheck()?'+':' '}ABCDEFGH`);
        return lines;
    }
}

export type MinimaxResult = {
    evaluation?: number|undefined; // 1=WHITE WIN, 0=DRAW, -1=BLACK WIN, undefined=UNKNOWN
    depth: number; // how deep have we evaluated
    move?: string;
    unknownMoves?: Map<string, Set<string>>;
}

// keep cache of:
// move: Map<string, stateKey: string[]> - if we make a move, this is the list of all states that we could end up at for that depth
//
// so, if we haven't done any evaluations yet, we have:
// { evaluation: undefined, depth: 0, move: validMoves() }
//
// later on, we may see something like
// { evaluation: undefined, depth: 2, move: ['a3a4'=>[stateN1, stateN2...], 'a3c3'=>[stateM1,stateM2,stateM3...]]}
// this would mean that we don't know what the result is after 2 moves, but a3a4 and a3c3 both get us to states that are undefined, and those state keys are listed
// keep track of results that didn't get us an answer before running out of engine depth

export class Engine {
    positionMinimax = new Map<string, MinimaxResult>();
    computing = new Set<string>();
    deepenCount = 0;

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
        if (a.evaluation === undefined) return b.evaluation !== optimalEvaluation && a.depth > b.depth;
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
        if (this.disableDebugging) debug = false;
        const buffer = debug?''.padStart(2*currentDepth, ' '):'';

        let positionKey = state.toString();
        let result: MinimaxResult = {depth: 0, unknownMoves: new Map([['', new Set([positionKey])]])};
        result.evaluation = state.evaluate();
        if (debug) {
            console.error(`${buffer}{`);
            console.error(`${buffer}  positionKey: "${state}", currentDepth: ${currentDepth}, remainingDepth: ${remainingDepth}, alpha: "${alpha?.evaluation}/${alpha?.depth}", beta: "${beta?.evaluation}/${beta?.depth}", evaluation: "${result.evaluation}",`);
            console.error(`${buffer}  movesToHere: "${debugMoves.join(',')}",`);
        }

        let cached = this.positionMinimax.get(positionKey);
        if (cached && (cached.evaluation !== undefined || cached.depth === remainingDepth)) {
            result = cached;
        } else {
            let alreadyComputing = new Set(this.computing);
            if (result.evaluation === undefined && remainingDepth > 0) {
                result.depth = remainingDepth;
                let nextStates: {evaluation: number, depth: number, nextMove: Map<string, State[]>} = { evaluation: undefined, depth: 0, nextMove: undefined};
                if (cached && cached.evaluation === undefined && cached.depth > 0) {
                    nextStates.depth = cached.depth;
                    nextStates.nextMove = new Map([...cached.unknownMoves.entries()].map(([nextMove, stateKeySet]) => ([nextMove, [...stateKeySet.values()].map(stateKey=>State.fromKey(stateKey))])));
                }
                if (state.activePlayer === 0) {
                    if (!nextStates.nextMove) {
                        nextStates.nextMove = new Map([...state.getNextStatesSortedWhite().entries()].map(([nextMove, nextState]) => ([nextMove, [nextState]])));
                    }
                    [...nextStates.nextMove.values()].forEach(stateArr => stateArr.forEach(nextState => this.computing.add(nextState.toString())));
                    if (debug) console.error(`${buffer}  player: "WHITE", nextMoves: "${[...nextStates.nextMove.keys()]}",`);
                    let max: MinimaxResult;
                    OUTER_WHITE: for (let [nextMove, stateArr] of nextStates.nextMove) {
                        for (let nextState of stateArr) {
                            let nextPositionKey = nextState.toString();
                            if (alreadyComputing.has(nextPositionKey)) continue;
                            //let nsr = nextStates.depth>0?this.positionMinimax.get(nextPositionKey) ?? { depth: 0 }:{depth:0};
                            let nsr = this.positionMinimax.get(nextPositionKey) ?? { depth: 0 };
                            let line = '';
                            if (debug) line = `${buffer}  ${nextMove}:`;
                            if (nsr.evaluation === undefined && (!max || nsr.depth+1 < max.depth || max.evaluation !== 1)) {
                                if (this.positionMinimax.has(nextPositionKey) && this.positionMinimax.get(nextPositionKey).depth > 0) this.deepenCount++;
                                if (debug) console.error(line);
                                nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, max?.evaluation===1?max.depth:remainingDepth-nextStates.depth)-1, alpha, beta, debug?[...debugMoves, nextMove]:debugMoves)};
                                nsr.depth++;
                                nsr.move = nextMove;
                                if (debug) console.error(`${buffer}  , ${nextMove}result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth} } }, `);
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
                                if (debug) console.error(`${line} result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth} } }, `);
                            }
                            if (!max || this.isPreferredForWhite(nsr, max)) {
                                if (debug) console.error(`${buffer}  ${nextMove}_IS_NEW_MAX: { old_evaluation: ${max?.evaluation}, old_depth: ${max?.depth} }, `);
                                if (!max || nsr.evaluation !== undefined) {
                                    max = {...nsr};
                                    max.unknownMoves = undefined;
                                }
                                if (beta && this.isPreferredForWhite(max, beta)) {
                                    if (debug) console.error(`${buffer}  ${nextMove}_BETA_BREAK: true, `);
                                    break OUTER_WHITE;
                                }
                                if (max.evaluation !== undefined && (!alpha || this.isPreferredForWhite(max, alpha))) alpha = max;
                            }
                            if (nsr.evaluation === undefined && max.evaluation === undefined) {
                                // bring the unresolved move states up to this max so we can return it
                                if (max.unknownMoves === undefined) max.unknownMoves = new Map<string, Set<string>>();
                                max.unknownMoves.set(nextMove, new Set<string>([...nsr.unknownMoves.values()].flatMap(strSet => [...strSet.values()])));
                            }
                        }
                    }
                    if (max) result = max;
                    [...nextStates.nextMove.values()].forEach(stateArr => stateArr.forEach(nextState => this.computing.delete(nextState.toString())));
                } else {
                    if (!nextStates.nextMove) {
                        nextStates.nextMove = new Map([...state.getNextStatesSortedBlack().entries()].map(([nextMove, nextState]) => ([nextMove, [nextState]])));
                    }
                    [...nextStates.nextMove.values()].forEach(stateArr => stateArr.forEach(nextState => this.computing.add(nextState.toString())));
                    if (debug) console.error(`${buffer}  player: "BLACK", nextMoves: "${[...nextStates.nextMove.keys()]}",`);
                    let min: MinimaxResult;
                    OUTER_BLACK: for (let [nextMove, stateArr] of nextStates.nextMove) {
                        for (let nextState of stateArr) {
                            let nextPositionKey = nextState.toString();
                            if (alreadyComputing.has(nextPositionKey)) continue;
                            //let nsr = nextStates.depth>0?this.positionMinimax.get(nextPositionKey) ?? { depth: 0 }:{depth:0};
                            let nsr = this.positionMinimax.get(nextPositionKey) ?? { depth: 0 };
                            let line = '';
                            if (debug) line = `${buffer}  ${nextMove}:`;
                            if (nsr.evaluation === undefined && (!min || nsr.depth+1 < min.depth || min.evaluation !== -1)) {
                                if (this.positionMinimax.has(nextPositionKey) && this.positionMinimax.get(nextPositionKey).depth > 0) this.deepenCount++;
                                if (debug) console.error(line);
                                nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, min?.evaluation===-1||min?.evaluation===0?min.depth:remainingDepth-nextStates.depth)-1, alpha, beta, debug?[...debugMoves, nextMove]:debugMoves)};
                                nsr.depth++;
                                nsr.move = nextMove;
                                if (debug) console.error(`${buffer}  , ${nextMove}result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth} }, `);
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
                                if (debug) console.error(`${line} result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth} } }, `);
                            }
                            if (!min || this.isPreferredForBlack(nsr, min)) {
                                if (debug) console.error(`${buffer}  ${nextMove}_IS_NEW_MIN: { old_evaluation: ${min?.evaluation}, old_depth: ${min?.depth} }, `);
                                if (!min || nsr.evaluation !== undefined) {
                                    min = {...nsr};
                                    min.unknownMoves = undefined;
                                }
                                if (alpha && this.isPreferredForBlack(min, alpha)) {
                                    if (debug) console.error(`${buffer}  ${nextMove}_ALPHA_BREAK: true, `);
                                    break OUTER_BLACK;
                                }
                                if (min.evaluation !== undefined && (!beta || this.isPreferredForBlack(min, beta))) beta = min;
                            }
                            if (nsr.evaluation === undefined && min.evaluation === undefined) {
                                // bring the unresolved move states up to this min so we can return it
                                if (min.unknownMoves === undefined) min.unknownMoves = new Map<string, Set<string>>();
                                min.unknownMoves.set(nextMove, new Set<string>([...nsr.unknownMoves.values()].flatMap(strSet => [...strSet.values()])));
                            }
                        }
                    }
                    if (min) result = min;
                    [...nextStates.nextMove.values()].forEach(stateArr => stateArr.forEach(nextState => this.computing.delete(nextState.toString())));
                }
            }

            if (debug) {
                console.error(`${buffer}  evaluation: "${result.evaluation}", depth: "${result.depth}"`);
                console.error(`${buffer}}`);
            }
            if (result.evaluation !== undefined) result.unknownMoves = undefined;
            this.positionMinimax.set(positionKey, result);
        }
        return result;
    }
}

export class Rook extends Piece {
    letter = 'R';
    value = 5;
    validMoves(state: State) { 
        let positions: Position[] = [];
        let fileNum = this.position.getFile();
        [1, -1, 8, -8].forEach(delta => {
            let p = this.position.pos + delta;
            let skipFileCheck = Math.abs(delta) > 1;
            while (p >= 0 && p <= 63 && (skipFileCheck || (p>>3) === fileNum)) {
                let newPosition = new Position(p);
                let pieceThere = state.getPieceAtPosition(newPosition);
                if (!pieceThere || pieceThere.player !== this.player) positions.push(newPosition);
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
        .filter(delta => !(this.position.getRank() === 0 && (delta===-9||delta===-1||delta===7)) && !(this.position.getRank() === 7 && (delta===-7||delta===1||delta===9)))
        .map(delta => this.position.pos + delta)
        .filter(pos => pos >= 0 && pos <= 63)
        .map(pos => new Position(pos))
        .filter(newPosition => {
            let pieceThere = state.getPieceAtPosition(newPosition);
            return (!pieceThere || pieceThere.player !== this.player);
        });
    }
}

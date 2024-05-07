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
STATE.addPiece('K', arr[0]);
STATE.addPiece('R', arr[1]);
STATE.addPiece('k', arr[2]);
console.error(`FEN: ${STATE.toFEN()}`);
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
console.error(`Recalculated position: ${ENGINE.deepenCount}`);
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
    //console.error(`Move chosen=${move} (end in ${result.moves.length})`);
    moveListStr += ` ${moveNum++}. ${STATE.moveToStandardString(result.move)}`;
    console.log(moveToString(result.move));
    STATE = STATE.makeMove(result.move);
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
    console.error(`Current position: ${key} ${STATE.isCheck()} ${STATE.getNextStateHashes().size} available moves (next move should be ${result.move})`);

    let moveStr = this.readline(); // A move made by the opponent, e.g. a2b1
    if (false || !moveStr) {
        if (!result) throw new Error(`Unknown position: ${key}`);
        moveStr = moveToString(result.moves[0]);
        console.error(`calculated opponent move: ${moveStr}`);
    } else {
        console.error(`opponentMove: ${moveStr}`);
    }
    if (moveStr === undefined) {
        console.error(`Didn't win in time!`);
        break;
    }

    let move = STATE.moveFromString(moveStr);
    moveListStr += ` ${STATE.moveToStandardString(move)}`;

    STATE = STATE.makeMove(move);
    STATE.nextPlayer();
    positions.push(STATE.debugString());
    //console.error(STATE.debugString().join('\n'));
    key = STATE.toString();
    result = ENGINE.positionMinimax.get(key);
}
console.error(`Final position: ${STATE.toString()} ${STATE.isCheck()} ${STATE.getNextStateHashes().size} available moves`);
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
    constructor(public value: number) {}
    static fromString(s: string): number {
        return ((s.charCodeAt(0) - 'a'.charCodeAt(0))<<3) + (s.charCodeAt(1) - '1'.charCodeAt(0));
    }
    static getRank(v: number): number { return v%8; }
    static getRankStr(v: number): string { return String.fromCharCode('1'.charCodeAt(0) + Position.getRank(v)); }
    static getFile(v: number): number { return v>>3; }
    static getFileStr(v: number): string { return String.fromCharCode('a'.charCodeAt(0) + Position.getFile(v)); }
    static distanceFromCenter(v: number): number { 
        return Math.max(3-Math.min(Position.getFile(v), 7-Position.getFile(v)), 3-Math.min(Position.getRank(v), 7-Position.getRank(v)));
    }
    static distanceBetween(a: number, b: number): number { 
        return Math.abs(Position.getRank(a) - Position.getRank(b)) + Math.abs(Position.getFile(a) - Position.getFile(b));
    }

    getRank(): number { return Position.getRank(this.value); }
    getRankStr(): string { return Position.getRankStr(this.value); }
    getFile(): number { return Position.getFile(this.value); }
    getFileStr(): string { return Position.getFileStr(this.value); }

    distanceBetween(b: Position): number {
        return Position.distanceBetween(this.value, b.value);
    }
    distanceFromCenter(): number {
        return Position.distanceFromCenter(this.value);
    }
    equals(b: Position): boolean { return this.value === b.value; }
    toString(): string { return Position.toString(this.value); }
    static toString(p: number) { return `${Position.getFileStr(p)}${Position.getRankStr(p)}`; }
}

export type Move = { from: number, to: number };
export function moveToString(move: Move) { return `${Position.toString(move.from)}${Position.toString(move.to)}`; }

export enum PieceValue {
    PAWN=1,
    KNIGHT=2,
    BISHOP=3,
    ROOK=4,
    QUEEN=5,
    KING=6
}

export class State {
    nextStateHashes: Map<Move, Uint8Array>;
    potMoves: Move[][] = [];
    valMoves: Move[][] = [];
    evaluated = false;
    evaluation: number;
    WHITE_KING_POSITION: number;
    WHITE_ROOK_POSITION: number;
    BLACK_KING_POSITION: number;

    // representing the state as a number has some substantial speed benefits and also allows us to compare/record/etc trivially
    // 0-63 are the board positions, 64 is the state (right now just who's turn it is... 0=white, 1=black)
    constructor(public hash: Uint8Array = undefined) {
        if (!hash) {
            this.hash = new Uint8Array(65);
        } else {
            this.WHITE_KING_POSITION = this.hash.indexOf(PieceValue.KING);
            this.WHITE_ROOK_POSITION = this.hash.indexOf(PieceValue.ROOK)
            this.BLACK_KING_POSITION = this.hash.indexOf(PieceValue.KING | 8);
        }
    }

    // a squareValue gets 1/2/3/4/5/6 if it has a piece, and | 8 if it belongs to black
    // pawn=1, knight=2, bishop=3, rook=4, queen=5, king=6
    static pieceTypeToValue = new Map<string, number>([ ['p', 1], ['n', 2], ['b', 3], ['r', 4], ['q', 5], ['k', 6] ]);
    static valueToPieceType = new Map<number, string>([ [1, 'p'], [2, 'n'], [3, 'b'], [4, 'r'], [5, 'q'], [6, 'k'] ]);
    static valueToPieceLetter(v: number): string {
        let letter = State.valueToPieceType.get(v&7);
        if (State.pieceOwner(v) === 0) letter = letter.toUpperCase();
        return letter;
    }

    // 0 is white
    activePlayer(): number { return this.hash[64] & 0x1; }
    static pieceOwner(squareValue: number): number { return (squareValue >> 3) & 1; }
    static pieceLetter(squareValue: number): string {
        let result = State.valueToPieceType.get(squareValue&7);
        if (State.pieceOwner(squareValue)===0) result = result.toUpperCase();
        return result;
    }

    moveFromString(str: string): Move {
        let from = Position.fromString(str.substring(0, 2));
        let to = Position.fromString(str.substring(2));
        let fromPieceValue = this.hash[from];
        let toPieceValue = this.hash[to];
        if (State.pieceOwner(fromPieceValue) !== this.activePlayer()) throw new Error(`Tried to move ${str} but turn is ${this.activePlayer()}`);
        if (toPieceValue && State.pieceOwner(fromPieceValue) === State.pieceOwner(toPieceValue)) throw new Error(`You can't capture your own piece! ${str}`);
        return {from, to};
    }

    moveToStandardString(move: Move): string {
        // e2h2 should look like Rh2
        // if there was a piece there, it would be Rxh2 
        // TODO: implementing proper capture notation
        return State.pieceLetter(this.hash[move.from]) + move.to.toString();
    }

    addPiece(pieceType: string, pos: number) {
        this.hash[pos] = State.pieceTypeToValue.get(pieceType.toLowerCase()) | (State.pieceTypeToValue.has(pieceType)?8:0);
        if (pieceType === 'K') this.WHITE_KING_POSITION = pos;
        if (pieceType === 'R') this.WHITE_ROOK_POSITION = pos;
        if (pieceType === 'k') this.BLACK_KING_POSITION = pos;
    }

    makeMove(move: Move): State {
        let result = new State(new Uint8Array(this.hash));
        result.hash[move.to] = result.hash[move.from];
        if (move.to === result.WHITE_KING_POSITION) result.WHITE_KING_POSITION = undefined;
        if (move.to === result.WHITE_ROOK_POSITION) result.WHITE_ROOK_POSITION = undefined;
        if (move.to === result.BLACK_KING_POSITION) result.BLACK_KING_POSITION = undefined;
        result.hash[move.from] = 0;
        if (move.from === result.WHITE_KING_POSITION) result.WHITE_KING_POSITION = move.to;
        if (move.from === result.WHITE_ROOK_POSITION) result.WHITE_ROOK_POSITION = move.to;
        if (move.from === result.BLACK_KING_POSITION) result.BLACK_KING_POSITION = move.to;
        return result;
    }

    nextPlayer() {
        this.hash[64] ^= 1;
        this.evaluated = false;
        this.nextStateHashes = undefined;
        this.valMoves = [];
        this.potMoves = [];
    }

    static getPositionMoves(state: State, pos: number): number[] {
        let toArr: number[] = [];
        let squareValue = state.hash[pos];
        if (!squareValue) return toArr;
        let pieceType = State.valueToPieceType.get(squareValue&7);
        let pieceOwner = State.pieceOwner(squareValue);
        switch (pieceType) {
            case 'k':
                toArr = [-9, -8, -7, -1, 1, 7, 8, 9]
                    .filter(delta => !(Position.getRank(pos) === 0 && (delta===-9||delta===-1||delta===7)) && !(Position.getRank(pos) === 7 && (delta===-7||delta===1||delta===9)))
                    .map(delta => pos + delta)
                    .filter(to => to >= 0 && to <= 63)
                    .filter(to => {
                        let toValue = state.hash[to];
                        return (!toValue || State.pieceOwner(toValue) !== pieceOwner);
                    });
                break;
            case 'r':
                    let fileNum = Position.getFile(pos);
                    [1, -1, 8, -8].forEach(delta => {
                        let to = pos + delta;
                        let skipFileCheck = delta === 8 || delta === -8;
                        while (to >= 0 && to <= 63 && (skipFileCheck || Position.getFile(to) === fileNum)) {
                            let toValue = state.hash[to];
                            if (!toValue || State.pieceOwner(toValue) !== pieceOwner) toArr.push(to);
                            if (toValue) break;
                            to += delta;
                        }
                    })
                break;
            default:
                throw new Error(`Cannot handle piece type: ${pieceType}`);
                break;
        }
        return toArr;
    }

    // have to distinguish between potential moves and valid moves
    // potential moves are any moves that your pieces can take
    // potential moves are used to determine if you are actually in check though...
    // valid moves are moves that do not put you in check
    static potentialMoves(state: State, player: number) {
        if (state.potMoves[player] === undefined) {
            state.potMoves[player] = [...state.hash.slice(0,64).keys()].filter(ind => state.hash[ind] && (State.pieceOwner(state.hash[ind]) === player))
                .flatMap(from => State.getPositionMoves(state, from).map(to => ({from, to})));
        }
        return state.potMoves[player];
    }

    potentialMoves(player = this.activePlayer()): Move[] {
        return State.potentialMoves(this, player);
    }

    static validMoves(state: State, player: number): Move[] {
        if (state.valMoves[player] === undefined) {
            state.valMoves[player] = State.potentialMoves(state, player).filter(move => state.makeMove(move).isCheck() === false);
        } 
        return state.valMoves[player];
    }

    validMoves(player = this.activePlayer()): Move[] {
        return State.validMoves(this, player);
    }

    isCheck(): boolean {
        let activePlayerKingPos = this.activePlayer()===0?this.WHITE_KING_POSITION:this.BLACK_KING_POSITION;
        if (activePlayerKingPos === -1) {
            console.error(this.debugString().join('\n'));
            throw new Error(`activePlayerKing has gone missing...`);
        }
        // see if the king could be captured
        return this.potentialMoves(this.activePlayer()^1).some(move => move.to === activePlayerKingPos);
    }

    getNextStateHashes(): Map<Move, Uint8Array> {
        if (!this.nextStateHashes) {
            this.nextStateHashes = new Map<Move, Uint8Array>();
            this.potentialMoves().forEach(move => {
                let state = this.makeMove(move);
                if (!state.isCheck()) {
                    state.nextPlayer();
                    this.nextStateHashes.set(move, state.hash);
                }
            })
        }
        return this.nextStateHashes;
    }

    getNextStatesSortedWhite(): Map<Move, State> {
        type sortingArrayType = {
            nextState: State;
            followingStateHashes: Map<Move, Uint8Array>
            evaluation: number;
            wk: number;
            wr: number;
            bk: number;
        }

        let sortingArray = [...this.getNextStateHashes()].map(v => [v[0], new State(v[1])] as [Move,State]).map(v => [v[0], {
            nextState: v[1],
            followingStateHashes: v[1].getNextStateHashes(),
            evaluation: v[1].evaluate(),
            wk: v[1].WHITE_KING_POSITION,
            wr: v[1].WHITE_ROOK_POSITION,
            bk: v[1].BLACK_KING_POSITION
        }] as [Move, sortingArrayType]);

        sortingArray.sort(([aStr, aObj], [bStr, bObj]) => {
            let a = aObj.nextState;
            let b = bObj.nextState;
            let ae = aObj.evaluation;
            let be = bObj.evaluation;
            let ans = aObj.followingStateHashes;
            let bns = bObj.followingStateHashes;
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
                                        .map(ns => Position.distanceFromCenter(ns.indexOf(PieceValue.KING | 8)))
                                        .reduce((acc, d) => acc += d, 0) / ans.size;
                let bAverageKingDFC = [...bns.values()]
                                        .map(ns => Position.distanceFromCenter(ns.indexOf(PieceValue.KING | 8)))
                                        .reduce((acc, d) => acc += d, 0) / bns.size;
                if (aAverageKingDFC !== bAverageKingDFC) return bAverageKingDFC - aAverageKingDFC;
                
                // available moves?
                if (ans.size !== bns.size) return ans.size - bns.size;

                // distance between kings?
                let ad = Position.distanceBetween(awk, abk);
                let bd = Position.distanceBetween(bwk, bbk);
                if (ad !== bd) return ad - bd;

                // add in distance between rook and king file/rank - we want to minimize that as well right?

                let aFRDelta = Math.min(Math.abs(Position.getFile(awr) - Position.getFile(abk)), Math.abs(Position.getRank(awr) - Position.getRank(abk)));
                let bFRDelta = Math.min(Math.abs(Position.getFile(bwr) - Position.getFile(bbk)), Math.abs(Position.getRank(bwr) - Position.getRank(bbk)));

                if (aFRDelta !== bFRDelta) return aFRDelta - bFRDelta;

                return a.toString().localeCompare(b.toString());
            }

            if (ae === undefined) return 1//(be <= 0)?1:-1;
            if (be === undefined) return -1//(ae <= 0)?-1:1;
            return be - ae; // just sort by the best score
        });

        return new Map(sortingArray.map(v => [v[0], v[1].nextState]));
    }

    getNextStatesSortedBlack(): Map<Move, State> {
        type sortingArrayType = {
            nextState: State;
            evaluation: number;
            bk: number;
            numPieces: number;
        }

        let sortingArray = [...this.getNextStateHashes()].map(v => [v[0], new State(v[1])] as [Move,State]).map(v => [v[0], {
            nextState: v[1],
            evaluation: v[1].evaluate(),
            bk: v[1].BLACK_KING_POSITION,
            numPieces: v[1].hash.filter(v => v > 0).length
        }] as [Move, sortingArrayType]);

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
                let adfc = Position.distanceFromCenter(abk);
                let bdfc = Position.distanceFromCenter(bbk);
                return adfc - bdfc;
            }
            if (ae === undefined) return -1;
            if (be === undefined) return 1;
            return ae - be; // just sort by the best score
        });

        return new Map(sortingArray.map(v => [v[0], v[1].nextState]));
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
            if (this.validMoves().length === 0) {
                // If the current player is in check and can't escape, checkmate (-1 or 1)
                if (this.isCheck()) {
                    this.evaluation = this.activePlayer()===0?-1:1;
                }
                // If the current player is NOT in check and can't move, draw
                else this.evaluation = 0;
            } else if ([...this.getNextStateHashes().values()].some(h => h.slice(0,64).find(v => (v & 7) === PieceValue.KING && State.pieceOwner(v) === (h[64]&1)) === undefined)) {
            // if any next states have my king being captured, this state is illegal, we'll call it a loss
                this.evaluation = this.activePlayer()===0?-1:1;
            } else if (this.hash.filter(v => (v & 7) !== PieceValue.KING).length === 0) this.evaluation = 0;
            // If both sides have only a king, it's a draw

            this.evaluated = true;
        }
        return this.evaluation;
    }

    toString() {
        return `${this.activePlayer()===0?'W':'B'}:${
            [this.WHITE_KING_POSITION,
             this.WHITE_ROOK_POSITION,
             this.BLACK_KING_POSITION
            ].map(p => (p!==-1)?Position.toString(p):'  ').join('')}`;
    }

    toFEN(): string {
        let fen = '';
        for (let rankNum=7; rankNum>=0; rankNum--) {
            let num = 0;
            for (let file=0; file<8; file++) {
                let v = this.hash[rankNum+(file<<3)];
                if (v) {
                    if (num) fen += num;
                    num = 0
                    fen += State.valueToPieceLetter(v);
                } else {
                    num++;
                }
            }

            if (num) fen += num;
            if (rankNum>0) fen += '/'
        }
        fen += ' ' + (this.activePlayer()===0?'w':'b');
        fen += ' - -';
        return fen;
    }

    debugString(): string[] {
        let lines: string[] = [' ABCDEFGH'];
        for (let rankNum=7; rankNum>=0; rankNum--) {
            let line = (rankNum+1).toString();
            for (let fileNum=0; fileNum<8; fileNum++) {
                //line += this.getPieceAtPosition(new Position(rankNum+fileNum*8))?.getPieceLetter() ?? '.';
                let v = this.hash[rankNum+(fileNum<<3)];
                line += v?State.valueToPieceLetter(v):'.';
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
    moves?: Move[]; // moves to get to the specified evaluation, or empty array for undefined evaluation
    move?: Move;
}

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
        if (a.evaluation === undefined) return b.evaluation !== optimalEvaluation && a.depth >= b.depth;
        //return b.evaluation === undefined && (optimalEvaluation*a.evaluation > optimalEvaluation*b.evaluation || (a.evaluation === b.evaluation && a.depth >= b.depth)); // put off the draw/loss as long as possible
        if (a.evaluation === 0) return b.evaluation === -1*optimalEvaluation;
        return false;
    }

    minimax(state: State, currentDepth = 0, remainingDepth: number = this.maxDepth, alpha: MinimaxResult = undefined, beta: MinimaxResult = undefined, debugMoves: Move[] = []): MinimaxResult {
        if (alpha) { alpha = {...alpha}; alpha.depth = Math.max(0, alpha.depth-1); }
        if (beta) { beta = {...beta}; beta.depth = Math.max(0, beta.depth-1); }
        if (currentDepth > 20 || alpha?.depth < 0 || beta?.depth < 0) {
            throw new Error(`Way too deep! ${currentDepth}/${alpha?.depth}/${beta?.depth}`);
        }

        let debug = false; //currentDepth<=2;
        let recordMoves = false || debug;
        if (this.disableDebugging) {
            debug = false;
            recordMoves = false;
        }
        const buffer = debug?''.padStart(2*currentDepth, ' '):'';

        let result: MinimaxResult = {depth: 0, moves: []};
        let positionKey = state.toString();
        this.computing.add(positionKey);
        let evaluation = state.evaluate();
        //console.error(`STATE: ${positionKey}`);
        //console.error(state.debugString().join('\n'));
        if (debug) {
            console.error(`${buffer}{`);
            console.error(`${buffer}  positionKey: "${state}", currentDepth: ${currentDepth}, remainingDepth: ${remainingDepth}, alpha: "${alpha?.evaluation}/${alpha?.depth}", beta: "${beta?.evaluation}/${beta?.depth}", evaluation: "${evaluation}",`);
            console.error(`${buffer}  movesToHere: "${debugMoves.map(move => moveToString(move)).join(',')}",`);
        }

        result.evaluation = evaluation;

        if (result.evaluation === undefined && remainingDepth > 0) {
            result.depth = remainingDepth;
            if (state.activePlayer() === 0) {
                let max: MinimaxResult;
                let nextStates = state.getNextStatesSortedWhite();
                if (debug) console.error(`${buffer}  player: "WHITE", nextMoves: "${[...nextStates].map(([move]) => moveToString(move))}",`);
                for (let [nextMove, nextState] of [...nextStates]) {
                    let nextPositionKey = nextState.toString();
                    if (this.computing.has(nextPositionKey)) continue;
                    let nsr = this.positionMinimax.get(nextPositionKey) ?? { depth: 0, moves: []};
                    let line = '';
                    if (debug) line = `${buffer}  ${moveToString(nextMove)}:`;
                    if (nsr.evaluation === undefined && (!max || nsr.depth+1 < max.depth || max.evaluation !== 1)) {
                        if (this.positionMinimax.has(nextPositionKey)) this.deepenCount++;
                        if (debug) console.error(line);
                        nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, max?.evaluation===1?max.depth:remainingDepth)-1, alpha, beta, debug?[...debugMoves, nextMove]:debugMoves)};
                        nsr.depth++;
                        nsr.move = nextMove;
                        if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                        if (debug) console.error(`${buffer}  , ${moveToString(nextMove)}result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: "${nsr.moves.map(move => moveToString(move))}" }, `);
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
                            nsr.depth = remainingDepth-1;
                            nsr.evaluation = undefined;
                        }
                        nsr.depth++;
                        nsr.move = nextMove;
                        if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                        if (debug) console.error(`${line} result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: "${nsr.moves.map(move => moveToString(move))}" } }, `);
                    }
                    if (!max || this.isPreferredForWhite(nsr, max)) {
                        if (debug) console.error(`${buffer}  ${moveToString(nextMove)}_IS_NEW_MAX: { old_evaluation: ${max?.evaluation}, old_depth: ${max?.depth} }, `);
                        max = nsr;
                        if (beta && this.isPreferredForWhite(max, beta)) {
                            if (debug) console.error(`${buffer}  ${moveToString(nextMove)}_BETA_BREAK: true, `);
                            break;
                        }
                        if (!alpha || this.isPreferredForWhite(max, alpha)) alpha = max;
                    }
                }
                if (max) result = max;
            } else {
                let min: MinimaxResult;
                let nextStates = state.getNextStatesSortedBlack();
                if (debug) console.error(`${buffer}  player: "BLACK", nextMoves: "${[...nextStates].map(([move]) => moveToString(move))}",`);
                for (let [nextMove, nextState] of [...nextStates]) {
                    let nextPositionKey = nextState.toString();
                    if (this.computing.has(nextPositionKey)) continue;
                    let nsr = this.positionMinimax.get(nextPositionKey) ?? { depth: 0, moves: []};
                    let line = '';
                    if (debug) line = `${buffer}  ${moveToString(nextMove)}:`;
                    if (nsr.evaluation === undefined && (!min || nsr.depth+1 < min.depth || min.evaluation !== -1)) {
                        if (this.positionMinimax.has(nextPositionKey)) this.deepenCount++;
                        if (debug) console.error(line);
                        nsr = {...this.minimax(nextState, currentDepth+1, Math.min(remainingDepth, min?.evaluation===-1?min.depth:remainingDepth)-1, alpha, beta, debug?[...debugMoves, nextMove]:debugMoves)};
                        nsr.depth++;
                        nsr.move = nextMove;
                        if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                        if (debug) console.error(`${buffer}  , ${moveToString(nextMove)}result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: "${nsr.moves.map(move => moveToString(move))}" }, `);
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
                            nsr.depth = remainingDepth-1;
                            nsr.evaluation = undefined;
                        }
                        nsr.depth++;
                        nsr.move = nextMove;
                        if (recordMoves) nsr.moves = [nextMove, ...nsr.moves];
                        if (debug) console.error(`${line} result: { evaluation: ${nsr.evaluation}, depth: ${nsr.depth}, moves: "${nsr.moves.map(move => moveToString(move)) }, `);
                    }
                    if (!min || this.isPreferredForBlack(nsr, min)) {
                        if (debug) console.error(`${buffer}  ${moveToString(nextMove)}_IS_NEW_MIN: { old_evaluation: ${min?.evaluation}, old_depth: ${min?.depth} }, `);
                        min = nsr;
                        if (alpha && this.isPreferredForBlack(min, alpha)) {
                            if (debug) console.error(`${buffer}  ${moveToString(nextMove)}_ALPHA_BREAK: true, `);
                            break;
                        }
                        if (!beta || this.isPreferredForBlack(min, beta)) beta = min;
                    }
                }
                if (min) result = min;
            }
        }

        if (debug) {
            console.error(`${buffer}  evaluation: "${result.evaluation}", depth: "${result.depth}", moves: "${result.moves.map(move => moveToString(move))}"`);
            console.error(`${buffer}}`);
        }
        this.positionMinimax.set(positionKey, result);
        this.computing.delete(positionKey);
        return result;
    }
}
import { StockfishWrapper } from './StockfishWrapper';
import { Engine, King, Rook, State, Position } from './achess';

async function testPosition(caseName: string, krkStr: string, solutionDepth: number, depth = 13) {
    if (depth < solutionDepth) return;
    State.nextMovesCache = new Map();
    let STATE = new State();
    let krkArr = krkStr.split(' ');
    let arr = krkArr.map(s => Position.fromString(s));
    STATE.addPiece(new King(0, arr[0])); // White King
    STATE.addPiece(new Rook(0, arr[1])); // White Rook
    STATE.addPiece(new King(1, arr[2])); // Black King
    let stateCopy = STATE.clone();

    let now = Date.now();
    let ENGINE = new Engine(depth, true);
    let result = ENGINE.minimax(STATE);
    now = Date.now()-now;
    process.stdout.write(`${caseName}. [${solutionDepth.toString().padStart(2)}] ${now} / ${ENGINE.positionMinimax.size}`);
    let originalResult = result;
    let moves: string[] = [];

    let predictedMoves: string[] = [];
    while (result?.evaluation === 1 && result?.move) {
        predictedMoves.push(result.move);
        stateCopy.makeMove(stateCopy.moveFromString(result.move))
        stateCopy.nextPlayer();
        result = ENGINE.positionMinimax.get(stateCopy.toString());
    }

    process.stdout.write(` / Predicted(${predictedMoves.length}): ${predictedMoves}`);

    result = originalResult;
    await StockfishWrapper.newGame();
    while (result && result.move) {
        // make white move
        //console.log(``);
        //console.log(`FEN=${STATE.toFEN()}`);
        //console.log(result.move);
        moves.push(result.move);
        STATE.makeMove(STATE.moveFromString(result.move));
        STATE.nextPlayer();

        if (STATE.evaluate() !== undefined) break;

        result = ENGINE.positionMinimax.get(STATE.toString());

        // make black move
        //console.log(`FEN=${STATE.toFEN()}`);
        let moveStr = await StockfishWrapper.getBestMoveForFEN(STATE.toFEN());
        moves.push(moveStr);
        //console.log(`Last move = ${moveStr} we thought it would be ${result.move}`);
        STATE.makeMove(STATE.moveFromString(moveStr));
        STATE.nextPlayer();

        if (STATE.evaluate() !== undefined) break;

        result = ENGINE.positionMinimax.get(STATE.toString());
    }
    let details = (moves.length !== predictedMoves.length || moves.some((v,i) => v!==predictedMoves[i]))?`Actual(${moves.length}): ${moves}`:'';
    if (STATE.evaluate() !== 1 || moves.length !== solutionDepth) {
        details = `FAILED ${originalResult.evaluation} / ${originalResult.depth} / Actual(${moves.length}): ${moves} ${STATE.evaluate()}`;
    }
    console.log(` ${details}`);
}

process.stdout.write(`Initializing stockfish engine...`);
await StockfishWrapper.initEngine();
console.log(`DONE!`);
for (let depth of [1, 3, 5, 7, 9, 11, 13]) {
    console.log(`Depth: ${depth}`);

    await testPosition('S1', 'e3 h5 e1', 1, depth);
    await testPosition('S2', 'f6 d2 g8', 3, depth);
    await testPosition('S3', 'e2 g3 h2', 3, depth);
    await testPosition('S4', 'e2 e3 h1', 5, depth);
    await testPosition('S5', 'e7 f5 g6', 9, depth);
    await testPosition('S6', 'a3 b3 a5', 11, depth);
    await testPosition('S7', 'c7 b6 e8', 13, depth);
    await testPosition('S8', 'c2 b3 e1', 13, depth);
    await testPosition('I3', 'd7 d6 a8', 5, depth);
    await testPosition('I4', 'd7 c5 b6', 9, depth);
    await testPosition('I5', 'c1 c2 e1', 11, depth);
    console.log();
}
StockfishWrapper.terminate();
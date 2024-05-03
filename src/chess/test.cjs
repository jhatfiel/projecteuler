require('esm-hook');
const { Engine, King, Rook, State, positionFromString } = require('../../dist/out-tsc/chess/achess.js');
var INIT_ENGINE = require('../../node_modules/stockfish/src/stockfish-nnue-16.js');

class StockfishWrapper {
    static handle = {
        locateFile: function (path) {
            if (path.indexOf('.wasm') > -1) return 'node_modules/stockfish/src/stockfish-nnue-16.wasm';
            else return __filename;
        },
    };
    static handleResolve; // resolve function to complete callbacks from stockfish

    static async initEngine() {
        return new Promise(resolve => {
            StockfishWrapper.handleResolve = resolve;
            INIT_ENGINE()(StockfishWrapper.handle).then(function () {
                StockfishWrapper.handle.addMessageListener(line => {
                    if (typeof line !== 'string') return;
                    //console.log(`LINE: ${line}`);
                    
                    if (line.indexOf('Load eval file success: 1') > -1) {
                        StockfishWrapper.handleResolve();
                    } else if (line.indexOf('readyok') > -1) {
                        StockfishWrapper.handleResolve();
                    } else if (line.indexOf('bestmove') > -1) {
                        var match = line.match(/bestmove\s+(\S+)/);
                        if (match) StockfishWrapper.handleResolve(match[1]);
                    }
                });

                StockfishWrapper.sendMessageToEngine('setoption name EvalFile value node_modules/stockfish/src/nn-5af11540bbfe.nnue');
                StockfishWrapper.sendMessageToEngine('setoption name Use NNUE value true');
            });
        });
    }

    static sendMessageToEngine(str) {
        //console.log(`sendMessageToEngine.Sending: ${str}`);
        StockfishWrapper.handle.postMessage(str);
    }

    static async newGame() {
        return new Promise(resolve => {
            StockfishWrapper.handleResolve = resolve;
            StockfishWrapper.sendMessageToEngine(`ucinewgame`);
            StockfishWrapper.sendMessageToEngine(`isready`);
        })
    }

    static async getBestMoveForFEN(fen) {
        //console.error(`Calling getMove with ${fen}`);
        return new Promise(resolve => {
            StockfishWrapper.handleResolve = resolve;
            StockfishWrapper.sendMessageToEngine(`position fen ${fen}`);
            StockfishWrapper.sendMessageToEngine('go mate');
        });
    }

    static terminate() {
        StockfishWrapper.handle.terminate();
    }
}

async function testPosition(caseNum, krkStr, solutionDepth, depth = 13) {
    if (depth < solutionDepth) return;
    let STATE = new State();
    let krkArr = krkStr.split(' ');
    let arr = krkArr.map(s => positionFromString(s));
    STATE.addPiece(new King(0, arr[0])); // White King
    STATE.addPiece(new Rook(0, arr[1])); // White Rook
    STATE.addPiece(new King(1, arr[2])); // Black King

    await StockfishWrapper.newGame();

    let now = Date.now();
    let ENGINE = new Engine(depth, true);
    let result = ENGINE.minimax(STATE);
    now = Date.now()-now;
    let originalResult = result;
    let moves = [];
    while (result && result.move) {
        // make white move
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

        result = ENGINE.positionMinimax.get(STATE.toString());
    }
    let details = `${moves}`;
    if (STATE.evaluate() !== 1 || moves.length !== solutionDepth) {
        details = `FAILED ${originalResult.evaluation} / ${originalResult.depth} / ${moves} ${STATE.evaluate()}`;
    }
    console.log(`${caseNum}. [${solutionDepth.toString().padStart(2)}] ${now} / ${ENGINE.positionMinimax.size} / ${ENGINE.deepenCount} ${details}`);
}

if (typeof INIT_ENGINE === 'function') {
    (async () => {
        process.stdout.write(`Initializing stockfish engine...`);
        await StockfishWrapper.initEngine();
        console.log(`DONE!`);
        for (let depth of [1, 3, 5, 7, 9, 11, 13, 15]) {
            console.log(`Depth: ${depth}`);

            await testPosition(1, 'e3 h5 e1', 1, depth);
            await testPosition(2, 'f6 d2 g8', 3, depth);
            await testPosition(3, 'e2 g3 h2', 3, depth);
            await testPosition(4, 'e2 e3 h1', 5, depth);
            await testPosition(5, 'e7 f5 g6', 9, depth);
            await testPosition(6, 'a3 b3 a5', 11, depth);
            await testPosition(7, 'c7 b6 e8', 13, depth);
            await testPosition(8, 'c2 b3 e1', 13, depth);
            console.log();
        }
        StockfishWrapper.terminate();
    })();
}
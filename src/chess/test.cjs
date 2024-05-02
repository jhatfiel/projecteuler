//import { Engine, King, Position, Rook, State } from "./achess.js";
//import jsChessEngine from 'js-chess-engine';
//import { fileURLToPath } from "url";
//import INIT_ENGINE from './stockfish.js';
//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);
require("esm-hook");

const {Engine, King, Rook, State, Position, moveToString} = require('../../dist/out-tsc/chess/achess.js');
var INIT_ENGINE = require("./stockfish.js");

var engine;
engine = {
    locateFile: function (path)
    {
        if (path.indexOf('.wasm') > -1) return require('path').join(__dirname, 'stockfish.wasm');
        else return __filename;
    },
};

function getMove(fen) {
    //console.error(`Calling getMove with ${fen}`);
    return new Promise((resolve, reject) => {
        var Stockfish = INIT_ENGINE();
        Stockfish(engine).then(function ()
        {
            var loadedNets;
            var gotUCI;
            var startedThinking;
            //var position = `fen 6k1/8/5K2/8/8/8/3R4/8 w`;
            var position = `fen ${fen}`;
            
            function send(str) {
                //console.log("Sending: " + str)
                engine.postMessage(str);
            }

            let onLog = (line) => {
                var match;
                if (typeof line !== "string") {
                    //console.log(`NOT string, ${typeof line}`);
                    //console.log(line);
                    return;
                }
                
                //console.log("Line: " + line)
                
                if (!loadedNets && line.indexOf("Stockfish 16") > -1) {
                    loadedNets = true;
                    send("uci");
                } else if (!gotUCI && line === "uciok") {
                    gotUCI = true;
                    send("position " + position);
                    //send("eval");
                    //send("d");
                    send("go mate");
                } else if (line.indexOf("bestmove") > -1) {
                    match = line.match(/bestmove\s+(\S+)/);
                    if (match) {
                        //console.log("Best move: " + match[1]);
                        //engine.terminate();
                        //send('stop');
                        loadedNets = undefined;
                        gotUCI = undefined;
                        startedThinking = undefined;
                        //setTimeout(_ => resolve(match[1]), 1000);
                        //engine.removeMessageListener(onLog);
                        resolve(match[1]);
                    }
                }
            };

            engine.addMessageListener(onLog);
            process.setMaxListeners(0);
            
            send("setoption name Use NNUE value true");
        });
    });
}

async function testPosition(caseNum, krkStr, solutionDepth, depth = 13) {
    if (depth < solutionDepth) return;
    let STATE = new State();
    let krkArr = krkStr.split(' ');
    let arr = krkArr.map(s => new Position(s.charAt(0), s.charAt(1)));
    STATE.addPiece(new King(0, arr[0])); // White King
    STATE.addPiece(new Rook(0, arr[1])); // White Rook
    STATE.addPiece(new King(1, arr[2])); // Black King

    let now = Date.now();
    let ENGINE = new Engine(depth);
    let result = ENGINE.minimax(STATE);
    now = Date.now()-now;
    let originalResult = result;
    let moves = [];
    if (result.depth === solutionDepth) {
        while (result && result.move) {
            //console.log(`FEN: ${STATE.toFEN()}, move=${result.move}`);
            // make white move
            moves.push(result.move);
            STATE.makeMove(STATE.moveFromString(result.move));
            STATE.nextPlayer();

            //game.move(result.move.substring(0, 2), result.move.substring(2));

            if (STATE.evaluate() !== undefined) break;

            result = ENGINE.positionMinimax.get(STATE.toString());

            // make black move
            let moveStr = await getMove(STATE.toFEN());
            //if (false && solutionDepth - moves.length < 20) {
                // ai can handle this
                //game.aiMove(4);
                //game.printToConsole();
                //let lastMove = game.getHistory(true)[0];
                //moveStr = `${lastMove.from}${lastMove.to}`.toLowerCase();
            //} else {
                // need to use the ENGINE to get us going here
                //moveStr = result.move;
                ////game.move(moveStr.substring(0, 2), moveStr.substring(2));
            //}
            moves.push(moveStr);
            //console.log(`Last move = ${moveStr} we thought it would be ${result.move}`);
            STATE.makeMove(STATE.moveFromString(moveStr));
            STATE.nextPlayer();

            result = ENGINE.positionMinimax.get(STATE.toString());
        }
    }
    let details = `${moves}`;
    if (STATE.evaluate() !== 1 || moves.length !== solutionDepth) {
        details = `FAILED ${originalResult.evaluation} / ${originalResult.depth} / ${moves} ${STATE.evaluate()}`;
    }
    console.log(`${caseNum}. [${solutionDepth.toString().padStart(2)}] ${now} / ${ENGINE.positionMinimax.size} ${details}`);
}

if (typeof INIT_ENGINE === "function") {
    (async () => {
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
    })();
}
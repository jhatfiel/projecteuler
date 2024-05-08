import { fileURLToPath } from 'url';
import INIT_ENGINE from 'stockfish/src/stockfish-nnue-16';

export class StockfishWrapper {
    static handle = {
        locateFile: (path: string) => {
            let result = (path.indexOf('.wasm') !== -1)?'node_modules/stockfish/src/stockfish-nnue-16.wasm':fileURLToPath(import.meta.url);
            //console.log(`locateFile: ${path} = ${result}`);
            return result;;
        },
        addMessageListener: (listener: (str: string) => void) => undefined,
        postMessage: (str: string) => undefined,
        terminate: () => undefined,
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

    static async getBestMoveForFEN(fen): Promise<string> {
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

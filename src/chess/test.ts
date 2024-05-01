import { Engine, King, Position, Rook, State } from "./achess";

function testPosition(caseNum: number, krkStr: string, correctMoveList: string[][], depth = 13) {
    if (depth < correctMoveList[0].length) return;
    let STATE = new State();
    let arr = krkStr.split(' ').map(s => new Position(s.charAt(0), s.charAt(1)));
    STATE.addPiece(new King(0, arr[0])); // White King
    STATE.addPiece(new Rook(0, arr[1])); // White Rook
    STATE.addPiece(new King(1, arr[2])); // Black King
    let now = Date.now();
    let ENGINE = new Engine(depth);
    let result = ENGINE.minimax(STATE);
    let originalResult = result;
    now = Date.now()-now;
    let moves = [];
    while (result && result.move) {
        moves.push(result.move);
        STATE.makeMove(STATE.moveFromString(result.move));
        STATE.nextPlayer();
        result = ENGINE.positionMinimax.get(STATE.toString());
    }
    let details = '';
    if (moves.length === correctMoveList[0].length &&
        correctMoveList.some(ml => moves.every((m, ind) => m === ml[ind]))) {
    } else {
        details = `FAILED ${originalResult.evaluation} / ${originalResult.depth} / ${moves}`;
    }
    console.log(`${caseNum}. [${correctMoveList[0].length.toString().padStart(2)}] ${now} / ${ENGINE.positionMinimax.size} ${details}`);
}

[1, 3, 5, 7, 9, 11, 13, 15].forEach(depth => {
    console.log(`Depth: ${depth}`);

    testPosition(1, 'e3 h5 e1', [['h5h1']], depth);
    testPosition(2, 'f6 d2 g8', [["d2h2","g8f8","h2h8"]], depth);
    testPosition(3, 'e2 g3 h2', [["e2f2","h2h1","g3h3"]], depth);
    testPosition(4, 'e2 e3 h1', [["e2f1","h1h2","f1f2","h2h1","e3h3"]], depth);
    testPosition(5, 'e7 f5 g6', [
                                 ["f5e5","g6g7","e5g5","g7h7","e7f6","h7h8","f6f7","h8h7","g5h5"],
                                 ["f5e5","g6g7","e5g5","g7h7","e7f7","h7h6","g5e5","h6h7","e5h5"],
                                 ["e7e6","g6g7","f5g5","g7h7","e6f7","h7h6","g5e5","h6h7","e5h5"],
                                 ["e7e6","g6g7","f5f3","g7g8","e6e7","g8h8","e7f7","h8h7","f3h3"],
                                ], depth);
    testPosition(6, 'a3 b3 a5', [["b3b4","a5a6","a3a4","a6a7","a4a5","a7a8","a5b6","a8b8","b4c4","b8a8","c4c8"]], depth);
    /*
    should be 13 steps, not 11
    testPosition(7, 'c7 b6 e8', [
                                 ["b6e6","e8f8","c7d7","f8g8","d7e8","g8h8","e6g6","h8h7","e8f7","h7h8","g6h6"],
                                 ["b6e6","e8f8","c7d8","f8g8","d8e8","g8h8","e6g6","h8h7","e8f7","h7h8","g6h6"]
                                ], depth);
                                */
    console.log();
})

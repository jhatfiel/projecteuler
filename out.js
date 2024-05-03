/*
Initial State: f6,d2,g8
W:f6d2g8
 ABCDEFGH
8......k.
7........
6.....K..
5........
4........
3........
2...R....
1........
 ABCDEFGH
Starting engine 5
*/obj=
{
  positionKey: "W:f6d2g8", currentDepth: 0, remainingDepth: 5, alpha: "undefined/undefined", beta: "undefined/undefined", evaluation: "undefined",
  movesToHere: "",
  player: "WHITE", nextMoves: "d2h2,d2d8,f6g6,d2d7,d2a2,d2b2,d2c2,d2g2,d2f2,d2e2,d2d1,d2d6,d2d5,d2d4,d2d3,f6e6,f6e7,f6g5,f6f5,f6e5",
  d2h2:
  {
    positionKey: "B:f6h2g8", currentDepth: 1, remainingDepth: 4, alpha: "undefined/undefined", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2h2",
    player: "BLACK", nextMoves: "g8f8",
    g8f8:
    {
      positionKey: "W:f6h2f8", currentDepth: 2, remainingDepth: 3, alpha: "undefined/undefined", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2h2,g8f8",
      player: "WHITE", nextMoves: "h2h8,h2e2,h2g2,h2a2,h2b2,h2c2,h2d2,h2f2,h2h1,h2h7,h2h6,h2h5,h2h4,h2h3,f6g6,f6e6,f6f5,f6g5,f6e5",
      h2h8:
      {
        positionKey: "B:f6h8f8", currentDepth: 3, remainingDepth: 2, alpha: "undefined/undefined", beta: "undefined/undefined", evaluation: "1",
        movesToHere: "d2h2,g8f8,h2h8",
        evaluation: "1", depth: "0", moves: ""
      }
      , h2h8result: { evaluation: 1, depth: 1, moves: "h2h8" }, 
      h2h8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      h2e2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2e2" } }, 
      h2g2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2g2" } }, 
      h2a2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2a2" } }, 
      h2b2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2b2" } }, 
      h2c2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2c2" } }, 
      h2d2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2d2" } }, 
      h2f2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2f2" } }, 
      h2h1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2h1" } }, 
      h2h7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2h7" } }, 
      h2h6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2h6" } }, 
      h2h5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2h5" } }, 
      h2h4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2h4" } }, 
      h2h3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "h2h3" } }, 
      f6g6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g6" } }, 
      f6e6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e6" } }, 
      f6f5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6f5" } }, 
      f6g5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g5" } }, 
      f6e5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e5" } }, 
      evaluation: "1", depth: "1", moves: "h2h8"
    }
    , g8f8result: { evaluation: 1, depth: 2, moves: "g8f8,h2h8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    evaluation: "1", depth: "2", moves: "g8f8,h2h8"
  }
  , d2h2result: { evaluation: 1, depth: 3, moves: "d2h2,g8f8,h2h8" }, 
  d2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
  d2d8:
  {
    positionKey: "B:f6d8g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2d8",
    player: "BLACK", nextMoves: "g8h7",
    g8h7:
    {
      positionKey: "W:f6d8h7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2d8,g8h7",
      player: "WHITE", nextMoves: "f6f7,d8a8,d8b8,d8c8,d8h8,d8f8,d8e8,d8g8,d8d1,d8d2,d8d3,d8d4,d8d5,d8d6,d8d7,f6f5,f6e7,f6e6,f6e5,f6g5",
      f6f7:
      {
        positionKey: "B:f7d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,f6f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f7result: { evaluation: undefined, depth: 1, moves: "f6f7" }, 
      f6f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d8a8:
      {
        positionKey: "B:f6a8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8a8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8a8result: { evaluation: undefined, depth: 1, moves: "d8a8" }, 
      d8a8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8b8:
      {
        positionKey: "B:f6b8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8b8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8b8result: { evaluation: undefined, depth: 1, moves: "d8b8" }, 
      d8b8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8c8:
      {
        positionKey: "B:f6c8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8c8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8c8result: { evaluation: undefined, depth: 1, moves: "d8c8" }, 
      d8c8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8h8:
      {
        positionKey: "B:f6h8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8h8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8h8result: { evaluation: undefined, depth: 1, moves: "d8h8" }, 
      d8h8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8f8:
      {
        positionKey: "B:f6f8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8f8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8f8result: { evaluation: undefined, depth: 1, moves: "d8f8" }, 
      d8f8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8e8:
      {
        positionKey: "B:f6e8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8e8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8e8result: { evaluation: undefined, depth: 1, moves: "d8e8" }, 
      d8e8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8g8:
      {
        positionKey: "B:f6g8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8g8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8g8result: { evaluation: undefined, depth: 1, moves: "d8g8" }, 
      d8g8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8d1:
      {
        positionKey: "B:f6d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8d1result: { evaluation: undefined, depth: 1, moves: "d8d1" }, 
      d8d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8d2:
      {
        positionKey: "B:f6d2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8d2result: { evaluation: undefined, depth: 1, moves: "d8d2" }, 
      d8d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8d3:
      {
        positionKey: "B:f6d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8d3result: { evaluation: undefined, depth: 1, moves: "d8d3" }, 
      d8d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8d4:
      {
        positionKey: "B:f6d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8d4result: { evaluation: undefined, depth: 1, moves: "d8d4" }, 
      d8d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8d5:
      {
        positionKey: "B:f6d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8d5result: { evaluation: undefined, depth: 1, moves: "d8d5" }, 
      d8d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8d6:
      {
        positionKey: "B:f6d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8d6result: { evaluation: undefined, depth: 1, moves: "d8d6" }, 
      d8d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d8d7:
      {
        positionKey: "B:f6d7h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,d8d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d8d7result: { evaluation: undefined, depth: 1, moves: "d8d7" }, 
      d8d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e7:
      {
        positionKey: "B:e7d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,f6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e7result: { evaluation: undefined, depth: 1, moves: "f6e7" }, 
      f6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2d8,g8h7,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6g5"
    }
    , g8h7result: { evaluation: undefined, depth: 2, moves: "g8h7,f6g5" }, 
    g8h7_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8h7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8h7,f6g5"
  }
  , d2d8result: { evaluation: undefined, depth: 3, moves: "d2d8,g8h7,f6g5" }, 
  f6g6:
  {
    positionKey: "B:g6d2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "f6g6",
    player: "BLACK", nextMoves: "g8f8,g8h8",
    g8f8:
    {
      positionKey: "W:g6d2f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "f6g6,g8f8",
      player: "WHITE", nextMoves: "d2e2,g6f6,d2d7,d2a2,d2b2,d2c2,d2h2,d2g2,d2f2,d2d1,d2d6,d2d5,d2d4,d2d3,g6h6,g6f5,g6g5,g6h5,g6h7,d2d8",
      d2e2:
      {
        positionKey: "B:g6e2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2e2result: { evaluation: undefined, depth: 1, moves: "d2e2" }, 
      d2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      g6f6:
      {
        positionKey: "B:f6d2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,g6f6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g6f6result: { evaluation: undefined, depth: 1, moves: "g6f6" }, 
      g6f6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d7:
      {
        positionKey: "B:g6d7f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d7result: { evaluation: undefined, depth: 1, moves: "d2d7" }, 
      d2d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2a2:
      {
        positionKey: "B:g6a2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2a2result: { evaluation: undefined, depth: 1, moves: "d2a2" }, 
      d2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2b2:
      {
        positionKey: "B:g6b2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2b2result: { evaluation: undefined, depth: 1, moves: "d2b2" }, 
      d2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2c2:
      {
        positionKey: "B:g6c2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2c2result: { evaluation: undefined, depth: 1, moves: "d2c2" }, 
      d2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2h2:
      {
        positionKey: "B:g6h2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2h2result: { evaluation: undefined, depth: 1, moves: "d2h2" }, 
      d2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2g2:
      {
        positionKey: "B:g6g2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2g2result: { evaluation: undefined, depth: 1, moves: "d2g2" }, 
      d2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2f2:
      {
        positionKey: "B:g6f2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2f2result: { evaluation: undefined, depth: 1, moves: "d2f2" }, 
      d2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d1:
      {
        positionKey: "B:g6d1f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d1result: { evaluation: undefined, depth: 1, moves: "d2d1" }, 
      d2d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d6:
      {
        positionKey: "B:g6d6f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d6result: { evaluation: undefined, depth: 1, moves: "d2d6" }, 
      d2d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d5:
      {
        positionKey: "B:g6d5f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d5result: { evaluation: undefined, depth: 1, moves: "d2d5" }, 
      d2d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d4:
      {
        positionKey: "B:g6d4f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d4result: { evaluation: undefined, depth: 1, moves: "d2d4" }, 
      d2d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d3:
      {
        positionKey: "B:g6d3f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d3result: { evaluation: undefined, depth: 1, moves: "d2d3" }, 
      d2d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g6h6:
      {
        positionKey: "B:h6d2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,g6h6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g6h6result: { evaluation: undefined, depth: 1, moves: "g6h6" }, 
      g6h6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g6f5:
      {
        positionKey: "B:f5d2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,g6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g6f5result: { evaluation: undefined, depth: 1, moves: "g6f5" }, 
      g6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g6g5:
      {
        positionKey: "B:g5d2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,g6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g6g5result: { evaluation: undefined, depth: 1, moves: "g6g5" }, 
      g6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g6h5:
      {
        positionKey: "B:h5d2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,g6h5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g6h5result: { evaluation: undefined, depth: 1, moves: "g6h5" }, 
      g6h5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g6h7:
      {
        positionKey: "B:h7d2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,g6h7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g6h7result: { evaluation: undefined, depth: 1, moves: "g6h7" }, 
      g6h7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d8:
      {
        positionKey: "B:g6d8f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g6,g8f8,d2d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d8result: { evaluation: undefined, depth: 1, moves: "d2d8" }, 
      d2d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "d2d8"
    }
    , g8f8result: { evaluation: undefined, depth: 2, moves: "g8f8,d2d8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8f8_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8f8,d2d8"
  }
  , f6g6result: { evaluation: undefined, depth: 3, moves: "f6g6,g8f8,d2d8" }, 
  d2d7:
  {
    positionKey: "B:f6d7g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2d7",
    player: "BLACK", nextMoves: "g8f8,g8h8",
    g8f8:
    {
      positionKey: "W:f6d7f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2d7,g8f8",
      player: "WHITE", nextMoves: "d7d8,d7g7,d7e7,d7a7,d7b7,d7c7,d7h7,d7f7,d7d1,d7d2,d7d3,d7d4,d7d5,d7d6,f6g6,f6f5,f6e6,f6g5,f6e5",
      d7d8:
      {
        positionKey: "B:f6d8f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "1",
        movesToHere: "d2d7,g8f8,d7d8",
        evaluation: "1", depth: "0", moves: ""
      }
      , d7d8result: { evaluation: 1, depth: 1, moves: "d7d8" }, 
      d7d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d7g7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7g7" } }, 
      d7e7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7e7" } }, 
      d7a7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7a7" } }, 
      d7b7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7b7" } }, 
      d7c7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7c7" } }, 
      d7h7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7h7" } }, 
      d7f7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7f7" } }, 
      d7d1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7d1" } }, 
      d7d2:{ cached: true, positionKey: "B:f6d2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7d2" } }, 
      d7d3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7d3" } }, 
      d7d4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7d4" } }, 
      d7d5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7d5" } }, 
      d7d6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d7d6" } }, 
      f6g6:{ cached: true, positionKey: "B:g6d7f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g6" } }, 
      f6f5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6f5" } }, 
      f6e6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e6" } }, 
      f6g5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g5" } }, 
      f6e5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e5" } }, 
      evaluation: "1", depth: "1", moves: "d7d8"
    }
    , g8f8result: { evaluation: 1, depth: 2, moves: "g8f8,d7d8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8h8:
    {
      positionKey: "W:f6d7h8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "1/1", evaluation: "undefined",
      movesToHere: "d2d7,g8h8",
      player: "WHITE", nextMoves: "d7g7,f6g6,f6f7,d7a7,d7b7,d7c7,d7f7,d7e7,d7d8,f6g5,f6f5,f6e6,f6e5,d7h7,d7d1,d7d2,d7d3,d7d4,d7d5,d7d6,f6e7",
      d7g7:
      {
        positionKey: "B:f6g7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "0",
        movesToHere: "d2d7,g8h8,d7g7",
        evaluation: "0", depth: "0", moves: ""
      }
      , d7g7result: { evaluation: 0, depth: 1, moves: "d7g7" }, 
      d7g7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      f6g6:
      {
        positionKey: "B:g6d7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,f6g6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g6result: { evaluation: undefined, depth: 1, moves: "f6g6" }, 
      f6g6_IS_NEW_MAX: { old_evaluation: 0, old_depth: 1 }, 
      f6f7:
      {
        positionKey: "B:f7d7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,f6f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f7result: { evaluation: undefined, depth: 1, moves: "f6f7" }, 
      f6f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7a7:
      {
        positionKey: "B:f6a7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7a7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7a7result: { evaluation: undefined, depth: 1, moves: "d7a7" }, 
      d7a7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7b7:
      {
        positionKey: "B:f6b7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7b7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7b7result: { evaluation: undefined, depth: 1, moves: "d7b7" }, 
      d7b7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7c7:
      {
        positionKey: "B:f6c7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7c7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7c7result: { evaluation: undefined, depth: 1, moves: "d7c7" }, 
      d7c7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7f7:
      {
        positionKey: "B:f6f7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7f7result: { evaluation: undefined, depth: 1, moves: "d7f7" }, 
      d7f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7e7:
      {
        positionKey: "B:f6e7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7e7result: { evaluation: undefined, depth: 1, moves: "d7e7" }, 
      d7e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7d8:
      {
        positionKey: "B:f6d8h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7d8result: { evaluation: undefined, depth: 1, moves: "d7d8" }, 
      d7d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5d7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5d7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6d7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5d7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7h7:
      {
        positionKey: "B:f6h7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7h7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7h7result: { evaluation: undefined, depth: 1, moves: "d7h7" }, 
      d7h7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7d1:
      {
        positionKey: "B:f6d1h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7d1result: { evaluation: undefined, depth: 1, moves: "d7d1" }, 
      d7d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7d2:
      {
        positionKey: "B:f6d2h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7d2result: { evaluation: undefined, depth: 1, moves: "d7d2" }, 
      d7d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7d3:
      {
        positionKey: "B:f6d3h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7d3result: { evaluation: undefined, depth: 1, moves: "d7d3" }, 
      d7d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7d4:
      {
        positionKey: "B:f6d4h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7d4result: { evaluation: undefined, depth: 1, moves: "d7d4" }, 
      d7d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7d5:
      {
        positionKey: "B:f6d5h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7d5result: { evaluation: undefined, depth: 1, moves: "d7d5" }, 
      d7d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d7d6:
      {
        positionKey: "B:f6d6h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,d7d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d7d6result: { evaluation: undefined, depth: 1, moves: "d7d6" }, 
      d7d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e7:
      {
        positionKey: "B:e7d7h8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d7,g8h8,f6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e7result: { evaluation: undefined, depth: 1, moves: "f6e7" }, 
      f6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6e7"
    }
    , g8h8result: { evaluation: undefined, depth: 2, moves: "g8h8,f6e7" }, 
    g8h8_IS_NEW_MIN: { old_evaluation: 1, old_depth: 2 }, 
    g8h8_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8h8,f6e7"
  }
  , d2d7result: { evaluation: undefined, depth: 3, moves: "d2d7,g8h8,f6e7" }, 
  d2a2:
  {
    positionKey: "B:f6a2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2a2",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6a2f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2a2,g8f8",
      player: "WHITE", nextMoves: "a2a8,a2g2,a2e2,a2h2,a2f2,a2d2,a2c2,a2b2,a2a1,a2a7,a2a6,a2a5,a2a4,a2a3,f6g6,f6e6,f6f5,f6g5,f6e5",
      a2a8:
      {
        positionKey: "B:f6a8f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "1",
        movesToHere: "d2a2,g8f8,a2a8",
        evaluation: "1", depth: "0", moves: ""
      }
      , a2a8result: { evaluation: 1, depth: 1, moves: "a2a8" }, 
      a2a8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      a2g2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2g2" } }, 
      a2e2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2e2" } }, 
      a2h2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2h2" } }, 
      a2f2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2f2" } }, 
      a2d2:{ cached: true, positionKey: "B:f6d2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2d2" } }, 
      a2c2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2c2" } }, 
      a2b2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2b2" } }, 
      a2a1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2a1" } }, 
      a2a7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2a7" } }, 
      a2a6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2a6" } }, 
      a2a5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2a5" } }, 
      a2a4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2a4" } }, 
      a2a3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "a2a3" } }, 
      f6g6:{ cached: true, positionKey: "B:g6a2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g6" } }, 
      f6e6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e6" } }, 
      f6f5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6f5" } }, 
      f6g5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g5" } }, 
      f6e5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e5" } }, 
      evaluation: "1", depth: "1", moves: "a2a8"
    }
    , g8f8result: { evaluation: 1, depth: 2, moves: "g8f8,a2a8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8h7:
    {
      positionKey: "W:f6a2h7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "1/1", evaluation: "undefined",
      movesToHere: "d2a2,g8h7",
      player: "WHITE", nextMoves: "a2h2,a2a8,f6f7,a2g2,a2f2,a2e2,a2d2,a2c2,a2b2,a2a1,a2a7,a2a6,a2a5,a2a4,a2a3,f6f5,f6g5,f6e7,f6e6,f6e5",
      a2h2:
      {
        positionKey: "B:f6h2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2h2result: { evaluation: undefined, depth: 1, moves: "a2h2" }, 
      a2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      a2a8:
      {
        positionKey: "B:f6a8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2a8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2a8result: { evaluation: undefined, depth: 1, moves: "a2a8" }, 
      a2a8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f7:
      {
        positionKey: "B:f7a2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,f6f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f7result: { evaluation: undefined, depth: 1, moves: "f6f7" }, 
      f6f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2g2:
      {
        positionKey: "B:f6g2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2g2result: { evaluation: undefined, depth: 1, moves: "a2g2" }, 
      a2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2f2:
      {
        positionKey: "B:f6f2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2f2result: { evaluation: undefined, depth: 1, moves: "a2f2" }, 
      a2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2e2:
      {
        positionKey: "B:f6e2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2e2result: { evaluation: undefined, depth: 1, moves: "a2e2" }, 
      a2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2d2:
      {
        positionKey: "B:f6d2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2d2result: { evaluation: undefined, depth: 1, moves: "a2d2" }, 
      a2d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2c2:
      {
        positionKey: "B:f6c2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2c2result: { evaluation: undefined, depth: 1, moves: "a2c2" }, 
      a2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2b2:
      {
        positionKey: "B:f6b2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2b2result: { evaluation: undefined, depth: 1, moves: "a2b2" }, 
      a2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2a1:
      {
        positionKey: "B:f6a1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2a1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2a1result: { evaluation: undefined, depth: 1, moves: "a2a1" }, 
      a2a1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2a7:
      {
        positionKey: "B:f6a7h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2a7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2a7result: { evaluation: undefined, depth: 1, moves: "a2a7" }, 
      a2a7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2a6:
      {
        positionKey: "B:f6a6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2a6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2a6result: { evaluation: undefined, depth: 1, moves: "a2a6" }, 
      a2a6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2a5:
      {
        positionKey: "B:f6a5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2a5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2a5result: { evaluation: undefined, depth: 1, moves: "a2a5" }, 
      a2a5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2a4:
      {
        positionKey: "B:f6a4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2a4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2a4result: { evaluation: undefined, depth: 1, moves: "a2a4" }, 
      a2a4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      a2a3:
      {
        positionKey: "B:f6a3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,a2a3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , a2a3result: { evaluation: undefined, depth: 1, moves: "a2a3" }, 
      a2a3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5a2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5a2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e7:
      {
        positionKey: "B:e7a2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,f6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e7result: { evaluation: undefined, depth: 1, moves: "f6e7" }, 
      f6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6a2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5a2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2a2,g8h7,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6e5"
    }
    , g8h7result: { evaluation: undefined, depth: 2, moves: "g8h7,f6e5" }, 
    g8h7_IS_NEW_MIN: { old_evaluation: 1, old_depth: 2 }, 
    g8h7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8h7,f6e5"
  }
  , d2a2result: { evaluation: undefined, depth: 3, moves: "d2a2,g8h7,f6e5" }, 
  d2b2:
  {
    positionKey: "B:f6b2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2b2",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6b2f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2b2,g8f8",
      player: "WHITE", nextMoves: "b2b8,b2g2,b2e2,b2a2,b2h2,b2f2,b2d2,b2c2,b2b1,b2b7,b2b6,b2b5,b2b4,b2b3,f6g6,f6e6,f6f5,f6g5,f6e5",
      b2b8:
      {
        positionKey: "B:f6b8f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "1",
        movesToHere: "d2b2,g8f8,b2b8",
        evaluation: "1", depth: "0", moves: ""
      }
      , b2b8result: { evaluation: 1, depth: 1, moves: "b2b8" }, 
      b2b8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      b2g2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2g2" } }, 
      b2e2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2e2" } }, 
      b2a2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2a2" } }, 
      b2h2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2h2" } }, 
      b2f2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2f2" } }, 
      b2d2:{ cached: true, positionKey: "B:f6d2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2d2" } }, 
      b2c2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2c2" } }, 
      b2b1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2b1" } }, 
      b2b7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2b7" } }, 
      b2b6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2b6" } }, 
      b2b5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2b5" } }, 
      b2b4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2b4" } }, 
      b2b3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "b2b3" } }, 
      f6g6:{ cached: true, positionKey: "B:g6b2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g6" } }, 
      f6e6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e6" } }, 
      f6f5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6f5" } }, 
      f6g5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g5" } }, 
      f6e5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e5" } }, 
      evaluation: "1", depth: "1", moves: "b2b8"
    }
    , g8f8result: { evaluation: 1, depth: 2, moves: "g8f8,b2b8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8h7:
    {
      positionKey: "W:f6b2h7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "1/1", evaluation: "undefined",
      movesToHere: "d2b2,g8h7",
      player: "WHITE", nextMoves: "b2h2,b2b8,f6f7,b2g2,b2a2,b2f2,b2e2,b2d2,b2c2,b2b1,b2b7,b2b6,b2b5,b2b4,b2b3,f6f5,f6g5,f6e7,f6e6,f6e5",
      b2h2:
      {
        positionKey: "B:f6h2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2h2result: { evaluation: undefined, depth: 1, moves: "b2h2" }, 
      b2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      b2b8:
      {
        positionKey: "B:f6b8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2b8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2b8result: { evaluation: undefined, depth: 1, moves: "b2b8" }, 
      b2b8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f7:
      {
        positionKey: "B:f7b2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,f6f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f7result: { evaluation: undefined, depth: 1, moves: "f6f7" }, 
      f6f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2g2:
      {
        positionKey: "B:f6g2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2g2result: { evaluation: undefined, depth: 1, moves: "b2g2" }, 
      b2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2a2:
      {
        positionKey: "B:f6a2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2a2result: { evaluation: undefined, depth: 1, moves: "b2a2" }, 
      b2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2f2:
      {
        positionKey: "B:f6f2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2f2result: { evaluation: undefined, depth: 1, moves: "b2f2" }, 
      b2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2e2:
      {
        positionKey: "B:f6e2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2e2result: { evaluation: undefined, depth: 1, moves: "b2e2" }, 
      b2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2d2:
      {
        positionKey: "B:f6d2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2d2result: { evaluation: undefined, depth: 1, moves: "b2d2" }, 
      b2d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2c2:
      {
        positionKey: "B:f6c2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2c2result: { evaluation: undefined, depth: 1, moves: "b2c2" }, 
      b2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2b1:
      {
        positionKey: "B:f6b1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2b1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2b1result: { evaluation: undefined, depth: 1, moves: "b2b1" }, 
      b2b1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2b7:
      {
        positionKey: "B:f6b7h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2b7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2b7result: { evaluation: undefined, depth: 1, moves: "b2b7" }, 
      b2b7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2b6:
      {
        positionKey: "B:f6b6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2b6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2b6result: { evaluation: undefined, depth: 1, moves: "b2b6" }, 
      b2b6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2b5:
      {
        positionKey: "B:f6b5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2b5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2b5result: { evaluation: undefined, depth: 1, moves: "b2b5" }, 
      b2b5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2b4:
      {
        positionKey: "B:f6b4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2b4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2b4result: { evaluation: undefined, depth: 1, moves: "b2b4" }, 
      b2b4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      b2b3:
      {
        positionKey: "B:f6b3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,b2b3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , b2b3result: { evaluation: undefined, depth: 1, moves: "b2b3" }, 
      b2b3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5b2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5b2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e7:
      {
        positionKey: "B:e7b2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,f6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e7result: { evaluation: undefined, depth: 1, moves: "f6e7" }, 
      f6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6b2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5b2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2b2,g8h7,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6e5"
    }
    , g8h7result: { evaluation: undefined, depth: 2, moves: "g8h7,f6e5" }, 
    g8h7_IS_NEW_MIN: { old_evaluation: 1, old_depth: 2 }, 
    g8h7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8h7,f6e5"
  }
  , d2b2result: { evaluation: undefined, depth: 3, moves: "d2b2,g8h7,f6e5" }, 
  d2c2:
  {
    positionKey: "B:f6c2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2c2",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6c2f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2c2,g8f8",
      player: "WHITE", nextMoves: "c2c8,c2g2,c2e2,c2a2,c2b2,c2h2,c2f2,c2d2,c2c1,c2c7,c2c6,c2c5,c2c4,c2c3,f6g6,f6e6,f6f5,f6g5,f6e5",
      c2c8:
      {
        positionKey: "B:f6c8f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "1",
        movesToHere: "d2c2,g8f8,c2c8",
        evaluation: "1", depth: "0", moves: ""
      }
      , c2c8result: { evaluation: 1, depth: 1, moves: "c2c8" }, 
      c2c8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      c2g2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2g2" } }, 
      c2e2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2e2" } }, 
      c2a2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2a2" } }, 
      c2b2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2b2" } }, 
      c2h2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2h2" } }, 
      c2f2:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2f2" } }, 
      c2d2:{ cached: true, positionKey: "B:f6d2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2d2" } }, 
      c2c1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2c1" } }, 
      c2c7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2c7" } }, 
      c2c6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2c6" } }, 
      c2c5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2c5" } }, 
      c2c4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2c4" } }, 
      c2c3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "c2c3" } }, 
      f6g6:{ cached: true, positionKey: "B:g6c2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g6" } }, 
      f6e6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e6" } }, 
      f6f5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6f5" } }, 
      f6g5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g5" } }, 
      f6e5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e5" } }, 
      evaluation: "1", depth: "1", moves: "c2c8"
    }
    , g8f8result: { evaluation: 1, depth: 2, moves: "g8f8,c2c8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8h7:
    {
      positionKey: "W:f6c2h7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "1/1", evaluation: "undefined",
      movesToHere: "d2c2,g8h7",
      player: "WHITE", nextMoves: "c2h2,c2c8,f6f7,c2g2,c2a2,c2b2,c2f2,c2e2,c2d2,c2c1,c2c7,c2c6,c2c5,c2c4,c2c3,f6f5,f6g5,f6e7,f6e6,f6e5",
      c2h2:
      {
        positionKey: "B:f6h2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2h2result: { evaluation: undefined, depth: 1, moves: "c2h2" }, 
      c2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      c2c8:
      {
        positionKey: "B:f6c8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2c8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2c8result: { evaluation: undefined, depth: 1, moves: "c2c8" }, 
      c2c8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f7:
      {
        positionKey: "B:f7c2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,f6f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f7result: { evaluation: undefined, depth: 1, moves: "f6f7" }, 
      f6f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2g2:
      {
        positionKey: "B:f6g2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2g2result: { evaluation: undefined, depth: 1, moves: "c2g2" }, 
      c2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2a2:
      {
        positionKey: "B:f6a2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2a2result: { evaluation: undefined, depth: 1, moves: "c2a2" }, 
      c2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2b2:
      {
        positionKey: "B:f6b2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2b2result: { evaluation: undefined, depth: 1, moves: "c2b2" }, 
      c2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2f2:
      {
        positionKey: "B:f6f2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2f2result: { evaluation: undefined, depth: 1, moves: "c2f2" }, 
      c2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2e2:
      {
        positionKey: "B:f6e2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2e2result: { evaluation: undefined, depth: 1, moves: "c2e2" }, 
      c2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2d2:
      {
        positionKey: "B:f6d2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2d2result: { evaluation: undefined, depth: 1, moves: "c2d2" }, 
      c2d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2c1:
      {
        positionKey: "B:f6c1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2c1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2c1result: { evaluation: undefined, depth: 1, moves: "c2c1" }, 
      c2c1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2c7:
      {
        positionKey: "B:f6c7h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2c7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2c7result: { evaluation: undefined, depth: 1, moves: "c2c7" }, 
      c2c7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2c6:
      {
        positionKey: "B:f6c6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2c6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2c6result: { evaluation: undefined, depth: 1, moves: "c2c6" }, 
      c2c6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2c5:
      {
        positionKey: "B:f6c5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2c5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2c5result: { evaluation: undefined, depth: 1, moves: "c2c5" }, 
      c2c5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2c4:
      {
        positionKey: "B:f6c4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2c4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2c4result: { evaluation: undefined, depth: 1, moves: "c2c4" }, 
      c2c4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      c2c3:
      {
        positionKey: "B:f6c3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,c2c3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , c2c3result: { evaluation: undefined, depth: 1, moves: "c2c3" }, 
      c2c3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5c2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5c2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e7:
      {
        positionKey: "B:e7c2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,f6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e7result: { evaluation: undefined, depth: 1, moves: "f6e7" }, 
      f6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6c2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5c2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2c2,g8h7,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6e5"
    }
    , g8h7result: { evaluation: undefined, depth: 2, moves: "g8h7,f6e5" }, 
    g8h7_IS_NEW_MIN: { old_evaluation: 1, old_depth: 2 }, 
    g8h7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8h7,f6e5"
  }
  , d2c2result: { evaluation: undefined, depth: 3, moves: "d2c2,g8h7,f6e5" }, 
  d2g2:
  {
    positionKey: "B:f6g2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2g2",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6g2f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2g2,g8f8",
      player: "WHITE", nextMoves: "g2e2,g2g1,g2g8,g2g7,g2g6,g2g5,g2g4,g2g3,f6e6,g2a2,g2b2,g2c2,g2d2,g2f2,g2h2,f6g6,f6g5,f6f5,f6e5",
      g2e2:
      {
        positionKey: "B:f6e2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2e2result: { evaluation: undefined, depth: 1, moves: "g2e2" }, 
      g2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      g2g1:
      {
        positionKey: "B:f6g1f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2g1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2g1result: { evaluation: undefined, depth: 1, moves: "g2g1" }, 
      g2g1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2g8:
      {
        positionKey: "B:f6g8f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2g8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2g8result: { evaluation: undefined, depth: 1, moves: "g2g8" }, 
      g2g8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2g7:
      {
        positionKey: "B:f6g7f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2g7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2g7result: { evaluation: undefined, depth: 1, moves: "g2g7" }, 
      g2g7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2g6:
      {
        positionKey: "B:f6g6f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2g6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2g6result: { evaluation: undefined, depth: 1, moves: "g2g6" }, 
      g2g6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2g5:
      {
        positionKey: "B:f6g5f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2g5result: { evaluation: undefined, depth: 1, moves: "g2g5" }, 
      g2g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2g4:
      {
        positionKey: "B:f6g4f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2g4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2g4result: { evaluation: undefined, depth: 1, moves: "g2g4" }, 
      g2g4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2g3:
      {
        positionKey: "B:f6g3f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2g3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2g3result: { evaluation: undefined, depth: 1, moves: "g2g3" }, 
      g2g3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6g2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2a2:
      {
        positionKey: "B:f6a2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2a2result: { evaluation: undefined, depth: 1, moves: "g2a2" }, 
      g2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2b2:
      {
        positionKey: "B:f6b2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2b2result: { evaluation: undefined, depth: 1, moves: "g2b2" }, 
      g2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2c2:
      {
        positionKey: "B:f6c2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2c2result: { evaluation: undefined, depth: 1, moves: "g2c2" }, 
      g2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2d2:
      {
        positionKey: "B:f6d2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2d2result: { evaluation: undefined, depth: 1, moves: "g2d2" }, 
      g2d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2f2:
      {
        positionKey: "B:f6f2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2f2result: { evaluation: undefined, depth: 1, moves: "g2f2" }, 
      g2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g2h2:
      {
        positionKey: "B:f6h2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,g2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g2h2result: { evaluation: undefined, depth: 1, moves: "g2h2" }, 
      g2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g6:
      {
        positionKey: "B:g6g2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,f6g6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g6result: { evaluation: undefined, depth: 1, moves: "f6g6" }, 
      f6g6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5g2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5g2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5g2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2g2,g8f8,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6e5"
    }
    , g8f8result: { evaluation: undefined, depth: 2, moves: "g8f8,f6e5" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8f8_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8f8,f6e5"
  }
  , d2g2result: { evaluation: undefined, depth: 3, moves: "d2g2,g8f8,f6e5" }, 
  d2f2:
  {
    positionKey: "B:f6f2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2f2",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6f2f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2f2,g8f8",
      player: "WHITE", nextMoves: "f2e2,f2g2,f2a2,f2b2,f2c2,f2d2,f2h2,f2f1,f2f5,f2f4,f2f3,f6g6,f6e6,f6g5,f6e5,f6f5",
      f2e2:
      {
        positionKey: "B:f6e2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2e2result: { evaluation: undefined, depth: 1, moves: "f2e2" }, 
      f2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      f2g2:
      {
        positionKey: "B:f6g2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2g2result: { evaluation: undefined, depth: 1, moves: "f2g2" }, 
      f2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f2a2:
      {
        positionKey: "B:f6a2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2a2result: { evaluation: undefined, depth: 1, moves: "f2a2" }, 
      f2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f2b2:
      {
        positionKey: "B:f6b2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2b2result: { evaluation: undefined, depth: 1, moves: "f2b2" }, 
      f2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f2c2:
      {
        positionKey: "B:f6c2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2c2result: { evaluation: undefined, depth: 1, moves: "f2c2" }, 
      f2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f2d2:
      {
        positionKey: "B:f6d2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2d2result: { evaluation: undefined, depth: 1, moves: "f2d2" }, 
      f2d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f2h2:
      {
        positionKey: "B:f6h2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2h2result: { evaluation: undefined, depth: 1, moves: "f2h2" }, 
      f2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f2f1:
      {
        positionKey: "B:f6f1f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2f1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2f1result: { evaluation: undefined, depth: 1, moves: "f2f1" }, 
      f2f1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f2f5:
      {
        positionKey: "B:f6f5f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2f5result: { evaluation: undefined, depth: 1, moves: "f2f5" }, 
      f2f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f2f4:
      {
        positionKey: "B:f6f4f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2f4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2f4result: { evaluation: undefined, depth: 1, moves: "f2f4" }, 
      f2f4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f2f3:
      {
        positionKey: "B:f6f3f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f2f3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f2f3result: { evaluation: undefined, depth: 1, moves: "f2f3" }, 
      f2f3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g6:
      {
        positionKey: "B:g6f2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f6g6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g6result: { evaluation: undefined, depth: 1, moves: "f6g6" }, 
      f6g6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6f2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5f2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5f2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5f2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2f2,g8f8,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6f5"
    }
    , g8f8result: { evaluation: undefined, depth: 2, moves: "g8f8,f6f5" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8f8_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8f8,f6f5"
  }
  , d2f2result: { evaluation: undefined, depth: 3, moves: "d2f2,g8f8,f6f5" }, 
  d2e2:
  {
    positionKey: "B:f6e2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2e2",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6e2f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2e2,g8f8",
      player: "WHITE", nextMoves: "e2g2,e2e1,e2e8,e2e7,e2e6,e2e5,e2e4,e2e3,f6g6,e2a2,e2b2,e2c2,e2d2,e2h2,e2f2,f6e6,f6e5,f6f5,f6g5",
      e2g2:
      {
        positionKey: "B:f6g2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2g2result: { evaluation: undefined, depth: 1, moves: "e2g2" }, 
      e2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      e2e1:
      {
        positionKey: "B:f6e1f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2e1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2e1result: { evaluation: undefined, depth: 1, moves: "e2e1" }, 
      e2e1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2e8:
      {
        positionKey: "B:f6e8f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2e8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2e8result: { evaluation: undefined, depth: 1, moves: "e2e8" }, 
      e2e8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2e7:
      {
        positionKey: "B:f6e7f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2e7result: { evaluation: undefined, depth: 1, moves: "e2e7" }, 
      e2e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2e6:
      {
        positionKey: "B:f6e6f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2e6result: { evaluation: undefined, depth: 1, moves: "e2e6" }, 
      e2e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2e5:
      {
        positionKey: "B:f6e5f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2e5result: { evaluation: undefined, depth: 1, moves: "e2e5" }, 
      e2e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2e4:
      {
        positionKey: "B:f6e4f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2e4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2e4result: { evaluation: undefined, depth: 1, moves: "e2e4" }, 
      e2e4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2e3:
      {
        positionKey: "B:f6e3f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2e3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2e3result: { evaluation: undefined, depth: 1, moves: "e2e3" }, 
      e2e3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g6:
      {
        positionKey: "B:g6e2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,f6g6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g6result: { evaluation: undefined, depth: 1, moves: "f6g6" }, 
      f6g6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2a2:
      {
        positionKey: "B:f6a2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2a2result: { evaluation: undefined, depth: 1, moves: "e2a2" }, 
      e2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2b2:
      {
        positionKey: "B:f6b2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2b2result: { evaluation: undefined, depth: 1, moves: "e2b2" }, 
      e2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2c2:
      {
        positionKey: "B:f6c2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2c2result: { evaluation: undefined, depth: 1, moves: "e2c2" }, 
      e2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2d2:
      {
        positionKey: "B:f6d2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2d2result: { evaluation: undefined, depth: 1, moves: "e2d2" }, 
      e2d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2h2:
      {
        positionKey: "B:f6h2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2h2result: { evaluation: undefined, depth: 1, moves: "e2h2" }, 
      e2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e2f2:
      {
        positionKey: "B:f6f2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,e2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e2f2result: { evaluation: undefined, depth: 1, moves: "e2f2" }, 
      e2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6e2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5e2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5e2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5e2f8", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "d2e2,g8f8,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6g5"
    }
    , g8f8result: { evaluation: undefined, depth: 2, moves: "g8f8,f6g5" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8f8_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8f8,f6g5"
  }
  , d2e2result: { evaluation: undefined, depth: 3, moves: "d2e2,g8f8,f6g5" }, 
  d2d1:
  {
    positionKey: "B:f6d1g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2d1",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6d1f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2d1,g8f8",
      player: "WHITE", nextMoves: "d1d8,d1g1,d1e1,d1a1,d1b1,d1c1,d1h1,d1f1,d1d7,d1d6,d1d5,d1d4,d1d3,d1d2,f6g6,f6e6,f6f5,f6g5,f6e5",
      d1d8:{ cached: true, positionKey: "B:f6d8f8", status: "evaluationCalculated: 1", result: { evaluation: 1, depth: 1, moves: "d1d8" } }, 
      d1d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d1g1:{ cached: true, positionKey: "B:f6g1f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1g1" } }, 
      d1e1:{ cached: true, positionKey: "B:f6e1f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1e1" } }, 
      d1a1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1a1" } }, 
      d1b1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1b1" } }, 
      d1c1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1c1" } }, 
      d1h1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1h1" } }, 
      d1f1:{ cached: true, positionKey: "B:f6f1f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1f1" } }, 
      d1d7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1d7" } }, 
      d1d6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1d6" } }, 
      d1d5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1d5" } }, 
      d1d4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1d4" } }, 
      d1d3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1d3" } }, 
      d1d2:{ cached: true, positionKey: "B:f6d2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d1d2" } }, 
      f6g6:{ cached: true, positionKey: "B:g6d1f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g6" } }, 
      f6e6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e6" } }, 
      f6f5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6f5" } }, 
      f6g5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g5" } }, 
      f6e5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e5" } }, 
      evaluation: "1", depth: "1", moves: "d1d8"
    }
    , g8f8result: { evaluation: 1, depth: 2, moves: "g8f8,d1d8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8h7:
    {
      positionKey: "W:f6d1h7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "1/1", evaluation: "undefined",
      movesToHere: "d2d1,g8h7",
      player: "WHITE", nextMoves: "d1h1,d1d8,f6f7,d1g1,d1a1,d1b1,d1c1,d1f1,d1e1,d1d7,d1d6,d1d5,d1d4,d1d3,d1d2,f6f5,f6g5,f6e7,f6e6,f6e5",
      d1h1:
      {
        positionKey: "B:f6h1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1h1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1h1result: { evaluation: undefined, depth: 1, moves: "d1h1" }, 
      d1h1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d1d8:
      {
        positionKey: "B:f6d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1d8result: { evaluation: undefined, depth: 1, moves: "d1d8" }, 
      d1d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f7:
      {
        positionKey: "B:f7d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,f6f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f7result: { evaluation: undefined, depth: 1, moves: "f6f7" }, 
      f6f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1g1:
      {
        positionKey: "B:f6g1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1g1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1g1result: { evaluation: undefined, depth: 1, moves: "d1g1" }, 
      d1g1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1a1:
      {
        positionKey: "B:f6a1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1a1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1a1result: { evaluation: undefined, depth: 1, moves: "d1a1" }, 
      d1a1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1b1:
      {
        positionKey: "B:f6b1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1b1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1b1result: { evaluation: undefined, depth: 1, moves: "d1b1" }, 
      d1b1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1c1:
      {
        positionKey: "B:f6c1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1c1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1c1result: { evaluation: undefined, depth: 1, moves: "d1c1" }, 
      d1c1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1f1:
      {
        positionKey: "B:f6f1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1f1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1f1result: { evaluation: undefined, depth: 1, moves: "d1f1" }, 
      d1f1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1e1:
      {
        positionKey: "B:f6e1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1e1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1e1result: { evaluation: undefined, depth: 1, moves: "d1e1" }, 
      d1e1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1d7:
      {
        positionKey: "B:f6d7h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1d7result: { evaluation: undefined, depth: 1, moves: "d1d7" }, 
      d1d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1d6:
      {
        positionKey: "B:f6d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1d6result: { evaluation: undefined, depth: 1, moves: "d1d6" }, 
      d1d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1d5:
      {
        positionKey: "B:f6d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1d5result: { evaluation: undefined, depth: 1, moves: "d1d5" }, 
      d1d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1d4:
      {
        positionKey: "B:f6d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1d4result: { evaluation: undefined, depth: 1, moves: "d1d4" }, 
      d1d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1d3:
      {
        positionKey: "B:f6d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1d3result: { evaluation: undefined, depth: 1, moves: "d1d3" }, 
      d1d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d1d2:
      {
        positionKey: "B:f6d2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,d1d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d1d2result: { evaluation: undefined, depth: 1, moves: "d1d2" }, 
      d1d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e7:
      {
        positionKey: "B:e7d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,f6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e7result: { evaluation: undefined, depth: 1, moves: "f6e7" }, 
      f6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d1,g8h7,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6e5"
    }
    , g8h7result: { evaluation: undefined, depth: 2, moves: "g8h7,f6e5" }, 
    g8h7_IS_NEW_MIN: { old_evaluation: 1, old_depth: 2 }, 
    g8h7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8h7,f6e5"
  }
  , d2d1result: { evaluation: undefined, depth: 3, moves: "d2d1,g8h7,f6e5" }, 
  d2d6:
  {
    positionKey: "B:f6d6g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2d6",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6d6f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2d6,g8f8",
      player: "WHITE", nextMoves: "d6d8,d6e6,d6a6,d6b6,d6c6,d6d1,d6d2,d6d3,d6d4,d6d5,d6d7,f6g6,f6e6,f6f5,f6g5,f6e5",
      d6d8:{ cached: true, positionKey: "B:f6d8f8", status: "evaluationCalculated: 1", result: { evaluation: 1, depth: 1, moves: "d6d8" } }, 
      d6d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d6e6:{ cached: true, positionKey: "B:f6e6f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d6e6" } }, 
      d6a6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d6a6" } }, 
      d6b6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d6b6" } }, 
      d6c6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d6c6" } }, 
      d6d1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d6d1" } }, 
      d6d2:{ cached: true, positionKey: "B:f6d2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d6d2" } }, 
      d6d3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d6d3" } }, 
      d6d4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d6d4" } }, 
      d6d5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d6d5" } }, 
      d6d7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d6d7" } }, 
      f6g6:{ cached: true, positionKey: "B:g6d6f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g6" } }, 
      f6e6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e6" } }, 
      f6f5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6f5" } }, 
      f6g5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g5" } }, 
      f6e5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e5" } }, 
      evaluation: "1", depth: "1", moves: "d6d8"
    }
    , g8f8result: { evaluation: 1, depth: 2, moves: "g8f8,d6d8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8h7:
    {
      positionKey: "W:f6d6h7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "1/1", evaluation: "undefined",
      movesToHere: "d2d6,g8h7",
      player: "WHITE", nextMoves: "f6f7,d6d8,d6a6,d6b6,d6c6,d6e6,d6d1,d6d2,d6d3,d6d4,d6d5,d6d7,f6g5,f6e7,f6f5,f6e5,f6e6",
      f6f7:
      {
        positionKey: "B:f7d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,f6f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f7result: { evaluation: undefined, depth: 1, moves: "f6f7" }, 
      f6f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d6d8:
      {
        positionKey: "B:f6d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6d8result: { evaluation: undefined, depth: 1, moves: "d6d8" }, 
      d6d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d6a6:
      {
        positionKey: "B:f6a6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6a6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6a6result: { evaluation: undefined, depth: 1, moves: "d6a6" }, 
      d6a6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d6b6:
      {
        positionKey: "B:f6b6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6b6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6b6result: { evaluation: undefined, depth: 1, moves: "d6b6" }, 
      d6b6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d6c6:
      {
        positionKey: "B:f6c6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6c6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6c6result: { evaluation: undefined, depth: 1, moves: "d6c6" }, 
      d6c6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d6e6:
      {
        positionKey: "B:f6e6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6e6result: { evaluation: undefined, depth: 1, moves: "d6e6" }, 
      d6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d6d1:
      {
        positionKey: "B:f6d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6d1result: { evaluation: undefined, depth: 1, moves: "d6d1" }, 
      d6d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d6d2:
      {
        positionKey: "B:f6d2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6d2result: { evaluation: undefined, depth: 1, moves: "d6d2" }, 
      d6d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d6d3:
      {
        positionKey: "B:f6d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6d3result: { evaluation: undefined, depth: 1, moves: "d6d3" }, 
      d6d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d6d4:
      {
        positionKey: "B:f6d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6d4result: { evaluation: undefined, depth: 1, moves: "d6d4" }, 
      d6d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d6d5:
      {
        positionKey: "B:f6d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6d5result: { evaluation: undefined, depth: 1, moves: "d6d5" }, 
      d6d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d6d7:
      {
        positionKey: "B:f6d7h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,d6d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d6d7result: { evaluation: undefined, depth: 1, moves: "d6d7" }, 
      d6d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e7:
      {
        positionKey: "B:e7d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,f6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e7result: { evaluation: undefined, depth: 1, moves: "f6e7" }, 
      f6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d6,g8h7,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6e6"
    }
    , g8h7result: { evaluation: undefined, depth: 2, moves: "g8h7,f6e6" }, 
    g8h7_IS_NEW_MIN: { old_evaluation: 1, old_depth: 2 }, 
    g8h7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8h7,f6e6"
  }
  , d2d6result: { evaluation: undefined, depth: 3, moves: "d2d6,g8h7,f6e6" }, 
  d2d5:
  {
    positionKey: "B:f6d5g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2d5",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6d5f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2d5,g8f8",
      player: "WHITE", nextMoves: "d5d8,d5g5,d5e5,d5a5,d5b5,d5c5,d5h5,d5f5,d5d1,d5d2,d5d3,d5d4,d5d7,d5d6,f6g6,f6e6,f6f5,f6g5,f6e5",
      d5d8:{ cached: true, positionKey: "B:f6d8f8", status: "evaluationCalculated: 1", result: { evaluation: 1, depth: 1, moves: "d5d8" } }, 
      d5d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d5g5:{ cached: true, positionKey: "B:f6g5f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5g5" } }, 
      d5e5:{ cached: true, positionKey: "B:f6e5f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5e5" } }, 
      d5a5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5a5" } }, 
      d5b5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5b5" } }, 
      d5c5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5c5" } }, 
      d5h5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5h5" } }, 
      d5f5:{ cached: true, positionKey: "B:f6f5f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5f5" } }, 
      d5d1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5d1" } }, 
      d5d2:{ cached: true, positionKey: "B:f6d2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5d2" } }, 
      d5d3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5d3" } }, 
      d5d4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5d4" } }, 
      d5d7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5d7" } }, 
      d5d6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d5d6" } }, 
      f6g6:{ cached: true, positionKey: "B:g6d5f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g6" } }, 
      f6e6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e6" } }, 
      f6f5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6f5" } }, 
      f6g5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g5" } }, 
      f6e5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e5" } }, 
      evaluation: "1", depth: "1", moves: "d5d8"
    }
    , g8f8result: { evaluation: 1, depth: 2, moves: "g8f8,d5d8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8h7:
    {
      positionKey: "W:f6d5h7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "1/1", evaluation: "undefined",
      movesToHere: "d2d5,g8h7",
      player: "WHITE", nextMoves: "d5h5,d5d8,f6f7,d5g5,d5a5,d5b5,d5c5,d5f5,d5e5,d5d1,d5d2,d5d3,d5d4,d5d7,d5d6,f6f5,f6g5,f6e7,f6e6,f6e5",
      d5h5:
      {
        positionKey: "B:f6h5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5h5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5h5result: { evaluation: undefined, depth: 1, moves: "d5h5" }, 
      d5h5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d5d8:
      {
        positionKey: "B:f6d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5d8result: { evaluation: undefined, depth: 1, moves: "d5d8" }, 
      d5d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f7:
      {
        positionKey: "B:f7d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,f6f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f7result: { evaluation: undefined, depth: 1, moves: "f6f7" }, 
      f6f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5g5:
      {
        positionKey: "B:f6g5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5g5result: { evaluation: undefined, depth: 1, moves: "d5g5" }, 
      d5g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5a5:
      {
        positionKey: "B:f6a5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5a5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5a5result: { evaluation: undefined, depth: 1, moves: "d5a5" }, 
      d5a5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5b5:
      {
        positionKey: "B:f6b5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5b5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5b5result: { evaluation: undefined, depth: 1, moves: "d5b5" }, 
      d5b5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5c5:
      {
        positionKey: "B:f6c5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5c5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5c5result: { evaluation: undefined, depth: 1, moves: "d5c5" }, 
      d5c5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5f5:
      {
        positionKey: "B:f6f5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5f5result: { evaluation: undefined, depth: 1, moves: "d5f5" }, 
      d5f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5e5:
      {
        positionKey: "B:f6e5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5e5result: { evaluation: undefined, depth: 1, moves: "d5e5" }, 
      d5e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5d1:
      {
        positionKey: "B:f6d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5d1result: { evaluation: undefined, depth: 1, moves: "d5d1" }, 
      d5d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5d2:
      {
        positionKey: "B:f6d2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5d2result: { evaluation: undefined, depth: 1, moves: "d5d2" }, 
      d5d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5d3:
      {
        positionKey: "B:f6d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5d3result: { evaluation: undefined, depth: 1, moves: "d5d3" }, 
      d5d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5d4:
      {
        positionKey: "B:f6d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5d4result: { evaluation: undefined, depth: 1, moves: "d5d4" }, 
      d5d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5d7:
      {
        positionKey: "B:f6d7h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5d7result: { evaluation: undefined, depth: 1, moves: "d5d7" }, 
      d5d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d5d6:
      {
        positionKey: "B:f6d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,d5d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d5d6result: { evaluation: undefined, depth: 1, moves: "d5d6" }, 
      d5d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e7:
      {
        positionKey: "B:e7d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,f6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e7result: { evaluation: undefined, depth: 1, moves: "f6e7" }, 
      f6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d5,g8h7,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6e5"
    }
    , g8h7result: { evaluation: undefined, depth: 2, moves: "g8h7,f6e5" }, 
    g8h7_IS_NEW_MIN: { old_evaluation: 1, old_depth: 2 }, 
    g8h7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8h7,f6e5"
  }
  , d2d5result: { evaluation: undefined, depth: 3, moves: "d2d5,g8h7,f6e5" }, 
  d2d4:
  {
    positionKey: "B:f6d4g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2d4",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6d4f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2d4,g8f8",
      player: "WHITE", nextMoves: "d4d8,d4g4,d4e4,d4a4,d4b4,d4c4,d4h4,d4f4,d4d1,d4d2,d4d3,d4d7,d4d6,d4d5,f6g6,f6e6,f6f5,f6g5,f6e5",
      d4d8:{ cached: true, positionKey: "B:f6d8f8", status: "evaluationCalculated: 1", result: { evaluation: 1, depth: 1, moves: "d4d8" } }, 
      d4d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d4g4:{ cached: true, positionKey: "B:f6g4f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4g4" } }, 
      d4e4:{ cached: true, positionKey: "B:f6e4f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4e4" } }, 
      d4a4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4a4" } }, 
      d4b4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4b4" } }, 
      d4c4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4c4" } }, 
      d4h4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4h4" } }, 
      d4f4:{ cached: true, positionKey: "B:f6f4f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4f4" } }, 
      d4d1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4d1" } }, 
      d4d2:{ cached: true, positionKey: "B:f6d2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4d2" } }, 
      d4d3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4d3" } }, 
      d4d7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4d7" } }, 
      d4d6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4d6" } }, 
      d4d5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d4d5" } }, 
      f6g6:{ cached: true, positionKey: "B:g6d4f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g6" } }, 
      f6e6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e6" } }, 
      f6f5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6f5" } }, 
      f6g5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g5" } }, 
      f6e5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e5" } }, 
      evaluation: "1", depth: "1", moves: "d4d8"
    }
    , g8f8result: { evaluation: 1, depth: 2, moves: "g8f8,d4d8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8h7:
    {
      positionKey: "W:f6d4h7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "1/1", evaluation: "undefined",
      movesToHere: "d2d4,g8h7",
      player: "WHITE", nextMoves: "d4h4,d4d8,f6f7,d4g4,d4a4,d4b4,d4c4,d4f4,d4e4,d4d1,d4d2,d4d3,d4d7,d4d6,d4d5,f6f5,f6g5,f6e7,f6e6,f6e5",
      d4h4:
      {
        positionKey: "B:f6h4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4h4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4h4result: { evaluation: undefined, depth: 1, moves: "d4h4" }, 
      d4h4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d4d8:
      {
        positionKey: "B:f6d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4d8result: { evaluation: undefined, depth: 1, moves: "d4d8" }, 
      d4d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f7:
      {
        positionKey: "B:f7d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,f6f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f7result: { evaluation: undefined, depth: 1, moves: "f6f7" }, 
      f6f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4g4:
      {
        positionKey: "B:f6g4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4g4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4g4result: { evaluation: undefined, depth: 1, moves: "d4g4" }, 
      d4g4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4a4:
      {
        positionKey: "B:f6a4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4a4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4a4result: { evaluation: undefined, depth: 1, moves: "d4a4" }, 
      d4a4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4b4:
      {
        positionKey: "B:f6b4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4b4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4b4result: { evaluation: undefined, depth: 1, moves: "d4b4" }, 
      d4b4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4c4:
      {
        positionKey: "B:f6c4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4c4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4c4result: { evaluation: undefined, depth: 1, moves: "d4c4" }, 
      d4c4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4f4:
      {
        positionKey: "B:f6f4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4f4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4f4result: { evaluation: undefined, depth: 1, moves: "d4f4" }, 
      d4f4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4e4:
      {
        positionKey: "B:f6e4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4e4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4e4result: { evaluation: undefined, depth: 1, moves: "d4e4" }, 
      d4e4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4d1:
      {
        positionKey: "B:f6d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4d1result: { evaluation: undefined, depth: 1, moves: "d4d1" }, 
      d4d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4d2:
      {
        positionKey: "B:f6d2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4d2result: { evaluation: undefined, depth: 1, moves: "d4d2" }, 
      d4d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4d3:
      {
        positionKey: "B:f6d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4d3result: { evaluation: undefined, depth: 1, moves: "d4d3" }, 
      d4d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4d7:
      {
        positionKey: "B:f6d7h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4d7result: { evaluation: undefined, depth: 1, moves: "d4d7" }, 
      d4d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4d6:
      {
        positionKey: "B:f6d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4d6result: { evaluation: undefined, depth: 1, moves: "d4d6" }, 
      d4d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d4d5:
      {
        positionKey: "B:f6d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,d4d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d4d5result: { evaluation: undefined, depth: 1, moves: "d4d5" }, 
      d4d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e7:
      {
        positionKey: "B:e7d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,f6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e7result: { evaluation: undefined, depth: 1, moves: "f6e7" }, 
      f6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d4,g8h7,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6e5"
    }
    , g8h7result: { evaluation: undefined, depth: 2, moves: "g8h7,f6e5" }, 
    g8h7_IS_NEW_MIN: { old_evaluation: 1, old_depth: 2 }, 
    g8h7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8h7,f6e5"
  }
  , d2d4result: { evaluation: undefined, depth: 3, moves: "d2d4,g8h7,f6e5" }, 
  d2d3:
  {
    positionKey: "B:f6d3g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "d2d3",
    player: "BLACK", nextMoves: "g8f8,g8h7,g8h8",
    g8f8:
    {
      positionKey: "W:f6d3f8", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "d2d3,g8f8",
      player: "WHITE", nextMoves: "d3d8,d3g3,d3e3,d3a3,d3b3,d3c3,d3h3,d3f3,d3d1,d3d2,d3d7,d3d6,d3d5,d3d4,f6g6,f6e6,f6f5,f6g5,f6e5",
      d3d8:{ cached: true, positionKey: "B:f6d8f8", status: "evaluationCalculated: 1", result: { evaluation: 1, depth: 1, moves: "d3d8" } }, 
      d3d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d3g3:{ cached: true, positionKey: "B:f6g3f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3g3" } }, 
      d3e3:{ cached: true, positionKey: "B:f6e3f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3e3" } }, 
      d3a3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3a3" } }, 
      d3b3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3b3" } }, 
      d3c3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3c3" } }, 
      d3h3:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3h3" } }, 
      d3f3:{ cached: true, positionKey: "B:f6f3f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3f3" } }, 
      d3d1:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3d1" } }, 
      d3d2:{ cached: true, positionKey: "B:f6d2f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3d2" } }, 
      d3d7:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3d7" } }, 
      d3d6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3d6" } }, 
      d3d5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3d5" } }, 
      d3d4:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "d3d4" } }, 
      f6g6:{ cached: true, positionKey: "B:g6d3f8", status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g6" } }, 
      f6e6:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e6" } }, 
      f6f5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6f5" } }, 
      f6g5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6g5" } }, 
      f6e5:{ status: "noQuickerWinPossible: 1 vs 1", result: { evaluation: undefined, depth: 1, moves: "f6e5" } }, 
      evaluation: "1", depth: "1", moves: "d3d8"
    }
    , g8f8result: { evaluation: 1, depth: 2, moves: "g8f8,d3d8" }, 
    g8f8_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8h7:
    {
      positionKey: "W:f6d3h7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "1/1", evaluation: "undefined",
      movesToHere: "d2d3,g8h7",
      player: "WHITE", nextMoves: "d3h3,d3d8,f6f7,d3g3,d3a3,d3b3,d3c3,d3f3,d3e3,d3d1,d3d2,d3d7,d3d6,d3d5,d3d4,f6f5,f6g5,f6e7,f6e6,f6e5",
      d3h3:
      {
        positionKey: "B:f6h3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3h3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3h3result: { evaluation: undefined, depth: 1, moves: "d3h3" }, 
      d3h3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d3d8:
      {
        positionKey: "B:f6d8h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3d8result: { evaluation: undefined, depth: 1, moves: "d3d8" }, 
      d3d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f7:
      {
        positionKey: "B:f7d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,f6f7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f7result: { evaluation: undefined, depth: 1, moves: "f6f7" }, 
      f6f7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3g3:
      {
        positionKey: "B:f6g3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3g3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3g3result: { evaluation: undefined, depth: 1, moves: "d3g3" }, 
      d3g3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3a3:
      {
        positionKey: "B:f6a3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3a3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3a3result: { evaluation: undefined, depth: 1, moves: "d3a3" }, 
      d3a3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3b3:
      {
        positionKey: "B:f6b3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3b3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3b3result: { evaluation: undefined, depth: 1, moves: "d3b3" }, 
      d3b3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3c3:
      {
        positionKey: "B:f6c3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3c3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3c3result: { evaluation: undefined, depth: 1, moves: "d3c3" }, 
      d3c3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3f3:
      {
        positionKey: "B:f6f3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3f3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3f3result: { evaluation: undefined, depth: 1, moves: "d3f3" }, 
      d3f3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3e3:
      {
        positionKey: "B:f6e3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3e3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3e3result: { evaluation: undefined, depth: 1, moves: "d3e3" }, 
      d3e3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3d1:
      {
        positionKey: "B:f6d1h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3d1result: { evaluation: undefined, depth: 1, moves: "d3d1" }, 
      d3d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3d2:
      {
        positionKey: "B:f6d2h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3d2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3d2result: { evaluation: undefined, depth: 1, moves: "d3d2" }, 
      d3d2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3d7:
      {
        positionKey: "B:f6d7h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3d7result: { evaluation: undefined, depth: 1, moves: "d3d7" }, 
      d3d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3d6:
      {
        positionKey: "B:f6d6h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3d6result: { evaluation: undefined, depth: 1, moves: "d3d6" }, 
      d3d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3d5:
      {
        positionKey: "B:f6d5h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3d5result: { evaluation: undefined, depth: 1, moves: "d3d5" }, 
      d3d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d3d4:
      {
        positionKey: "B:f6d4h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,d3d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d3d4result: { evaluation: undefined, depth: 1, moves: "d3d4" }, 
      d3d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6f5:
      {
        positionKey: "B:f5d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,f6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6f5result: { evaluation: undefined, depth: 1, moves: "f6f5" }, 
      f6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6g5:
      {
        positionKey: "B:g5d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,f6g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6g5result: { evaluation: undefined, depth: 1, moves: "f6g5" }, 
      f6g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e7:
      {
        positionKey: "B:e7d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,f6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e7result: { evaluation: undefined, depth: 1, moves: "f6e7" }, 
      f6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e6:
      {
        positionKey: "B:e6d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,f6e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e6result: { evaluation: undefined, depth: 1, moves: "f6e6" }, 
      f6e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f6e5:
      {
        positionKey: "B:e5d3h7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "1/0", evaluation: "undefined",
        movesToHere: "d2d3,g8h7,f6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f6e5result: { evaluation: undefined, depth: 1, moves: "f6e5" }, 
      f6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "f6e5"
    }
    , g8h7result: { evaluation: undefined, depth: 2, moves: "g8h7,f6e5" }, 
    g8h7_IS_NEW_MIN: { old_evaluation: 1, old_depth: 2 }, 
    g8h7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8h7,f6e5"
  }
  , d2d3result: { evaluation: undefined, depth: 3, moves: "d2d3,g8h7,f6e5" }, 
  f6e6:
  {
    positionKey: "B:e6d2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "f6e6",
    player: "BLACK", nextMoves: "g8g7,g8f8,g8h7,g8h8",
    g8g7:
    {
      positionKey: "W:e6d2g7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "f6e6,g8g7",
      player: "WHITE", nextMoves: "d2g2,d2a2,d2b2,d2c2,d2e2,d2d1,d2d6,d2d5,d2d4,d2d3,e6f5,e6e7,d2f2,d2d7,e6e5,d2h2,d2d8,e6d7,e6d6,e6d5",
      d2g2:
      {
        positionKey: "B:e6g2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2g2result: { evaluation: undefined, depth: 1, moves: "d2g2" }, 
      d2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d2a2:
      {
        positionKey: "B:e6a2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2a2result: { evaluation: undefined, depth: 1, moves: "d2a2" }, 
      d2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2b2:
      {
        positionKey: "B:e6b2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2b2result: { evaluation: undefined, depth: 1, moves: "d2b2" }, 
      d2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2c2:
      {
        positionKey: "B:e6c2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2c2result: { evaluation: undefined, depth: 1, moves: "d2c2" }, 
      d2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2e2:
      {
        positionKey: "B:e6e2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2e2result: { evaluation: undefined, depth: 1, moves: "d2e2" }, 
      d2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d1:
      {
        positionKey: "B:e6d1g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d1result: { evaluation: undefined, depth: 1, moves: "d2d1" }, 
      d2d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d6:
      {
        positionKey: "B:e6d6g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d6result: { evaluation: undefined, depth: 1, moves: "d2d6" }, 
      d2d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d5:
      {
        positionKey: "B:e6d5g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d5result: { evaluation: undefined, depth: 1, moves: "d2d5" }, 
      d2d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d4:
      {
        positionKey: "B:e6d4g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d4result: { evaluation: undefined, depth: 1, moves: "d2d4" }, 
      d2d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d3:
      {
        positionKey: "B:e6d3g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d3result: { evaluation: undefined, depth: 1, moves: "d2d3" }, 
      d2d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e6f5:
      {
        positionKey: "B:f5d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,e6f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e6f5result: { evaluation: undefined, depth: 1, moves: "e6f5" }, 
      e6f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e6e7:
      {
        positionKey: "B:e7d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,e6e7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e6e7result: { evaluation: undefined, depth: 1, moves: "e6e7" }, 
      e6e7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2f2:
      {
        positionKey: "B:e6f2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2f2result: { evaluation: undefined, depth: 1, moves: "d2f2" }, 
      d2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d7:
      {
        positionKey: "B:e6d7g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d7result: { evaluation: undefined, depth: 1, moves: "d2d7" }, 
      d2d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e6e5:
      {
        positionKey: "B:e5d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,e6e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e6e5result: { evaluation: undefined, depth: 1, moves: "e6e5" }, 
      e6e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2h2:
      {
        positionKey: "B:e6h2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2h2result: { evaluation: undefined, depth: 1, moves: "d2h2" }, 
      d2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d8:
      {
        positionKey: "B:e6d8g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,d2d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d8result: { evaluation: undefined, depth: 1, moves: "d2d8" }, 
      d2d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e6d7:
      {
        positionKey: "B:d7d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,e6d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e6d7result: { evaluation: undefined, depth: 1, moves: "e6d7" }, 
      e6d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e6d6:
      {
        positionKey: "B:d6d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,e6d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e6d6result: { evaluation: undefined, depth: 1, moves: "e6d6" }, 
      e6d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e6d5:
      {
        positionKey: "B:d5d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e6,g8g7,e6d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e6d5result: { evaluation: undefined, depth: 1, moves: "e6d5" }, 
      e6d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "e6d5"
    }
    , g8g7result: { evaluation: undefined, depth: 2, moves: "g8g7,e6d5" }, 
    g8g7_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8g7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8g7,e6d5"
  }
  , f6e6result: { evaluation: undefined, depth: 3, moves: "f6e6,g8g7,e6d5" }, 
  f6e7:
  {
    positionKey: "B:e7d2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "f6e7",
    player: "BLACK", nextMoves: "g8g7,g8h7,g8h8",
    g8g7:
    {
      positionKey: "W:e7d2g7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "f6e7,g8g7",
      player: "WHITE", nextMoves: "d2g2,d2d6,e7e6,d2a2,d2b2,d2c2,d2f2,d2e2,d2d1,d2d7,d2d5,d2d4,d2d3,d2d8,d2h2,e7e8,e7d7,e7d8,e7d6",
      d2g2:
      {
        positionKey: "B:e7g2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2g2result: { evaluation: undefined, depth: 1, moves: "d2g2" }, 
      d2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d2d6:
      {
        positionKey: "B:e7d6g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d6result: { evaluation: undefined, depth: 1, moves: "d2d6" }, 
      d2d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e7e6:
      {
        positionKey: "B:e6d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,e7e6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e7e6result: { evaluation: undefined, depth: 1, moves: "e7e6" }, 
      e7e6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2a2:
      {
        positionKey: "B:e7a2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2a2result: { evaluation: undefined, depth: 1, moves: "d2a2" }, 
      d2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2b2:
      {
        positionKey: "B:e7b2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2b2result: { evaluation: undefined, depth: 1, moves: "d2b2" }, 
      d2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2c2:
      {
        positionKey: "B:e7c2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2c2result: { evaluation: undefined, depth: 1, moves: "d2c2" }, 
      d2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2f2:
      {
        positionKey: "B:e7f2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2f2result: { evaluation: undefined, depth: 1, moves: "d2f2" }, 
      d2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2e2:
      {
        positionKey: "B:e7e2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2e2result: { evaluation: undefined, depth: 1, moves: "d2e2" }, 
      d2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d1:
      {
        positionKey: "B:e7d1g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d1result: { evaluation: undefined, depth: 1, moves: "d2d1" }, 
      d2d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d7:
      {
        positionKey: "B:e7d7g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d7result: { evaluation: undefined, depth: 1, moves: "d2d7" }, 
      d2d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d5:
      {
        positionKey: "B:e7d5g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d5result: { evaluation: undefined, depth: 1, moves: "d2d5" }, 
      d2d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d4:
      {
        positionKey: "B:e7d4g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d4result: { evaluation: undefined, depth: 1, moves: "d2d4" }, 
      d2d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d3:
      {
        positionKey: "B:e7d3g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d3result: { evaluation: undefined, depth: 1, moves: "d2d3" }, 
      d2d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d8:
      {
        positionKey: "B:e7d8g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d8result: { evaluation: undefined, depth: 1, moves: "d2d8" }, 
      d2d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2h2:
      {
        positionKey: "B:e7h2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,d2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2h2result: { evaluation: undefined, depth: 1, moves: "d2h2" }, 
      d2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e7e8:
      {
        positionKey: "B:e8d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,e7e8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e7e8result: { evaluation: undefined, depth: 1, moves: "e7e8" }, 
      e7e8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e7d7:
      {
        positionKey: "B:d7d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,e7d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e7d7result: { evaluation: undefined, depth: 1, moves: "e7d7" }, 
      e7d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e7d8:
      {
        positionKey: "B:d8d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,e7d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e7d8result: { evaluation: undefined, depth: 1, moves: "e7d8" }, 
      e7d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e7d6:
      {
        positionKey: "B:d6d2g7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e7,g8g7,e7d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e7d6result: { evaluation: undefined, depth: 1, moves: "e7d6" }, 
      e7d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "e7d6"
    }
    , g8g7result: { evaluation: undefined, depth: 2, moves: "g8g7,e7d6" }, 
    g8g7_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8g7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8g7,e7d6"
  }
  , f6e7result: { evaluation: undefined, depth: 3, moves: "f6e7,g8g7,e7d6" }, 
  f6g5:
  {
    positionKey: "B:g5d2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "f6g5",
    player: "BLACK", nextMoves: "g8f7,g8g7,g8f8,g8h7,g8h8",
    g8f7:
    {
      positionKey: "W:g5d2f7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "f6g5,g8f7",
      player: "WHITE", nextMoves: "d2e2,g5f5,d2d6,d2d7,d2a2,d2b2,d2c2,d2h2,d2g2,d2d1,d2d5,d2d4,d2d3,d2f2,g5h6,g5h5,g5f4,g5g4,g5h4,d2d8",
      d2e2:
      {
        positionKey: "B:g5e2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2e2result: { evaluation: undefined, depth: 1, moves: "d2e2" }, 
      d2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      g5f5:
      {
        positionKey: "B:f5d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,g5f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g5f5result: { evaluation: undefined, depth: 1, moves: "g5f5" }, 
      g5f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d6:
      {
        positionKey: "B:g5d6f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d6result: { evaluation: undefined, depth: 1, moves: "d2d6" }, 
      d2d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d7:
      {
        positionKey: "B:g5d7f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d7result: { evaluation: undefined, depth: 1, moves: "d2d7" }, 
      d2d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2a2:
      {
        positionKey: "B:g5a2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2a2result: { evaluation: undefined, depth: 1, moves: "d2a2" }, 
      d2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2b2:
      {
        positionKey: "B:g5b2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2b2result: { evaluation: undefined, depth: 1, moves: "d2b2" }, 
      d2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2c2:
      {
        positionKey: "B:g5c2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2c2result: { evaluation: undefined, depth: 1, moves: "d2c2" }, 
      d2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2h2:
      {
        positionKey: "B:g5h2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2h2result: { evaluation: undefined, depth: 1, moves: "d2h2" }, 
      d2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2g2:
      {
        positionKey: "B:g5g2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2g2result: { evaluation: undefined, depth: 1, moves: "d2g2" }, 
      d2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d1:
      {
        positionKey: "B:g5d1f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d1result: { evaluation: undefined, depth: 1, moves: "d2d1" }, 
      d2d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d5:
      {
        positionKey: "B:g5d5f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d5result: { evaluation: undefined, depth: 1, moves: "d2d5" }, 
      d2d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d4:
      {
        positionKey: "B:g5d4f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d4result: { evaluation: undefined, depth: 1, moves: "d2d4" }, 
      d2d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d3:
      {
        positionKey: "B:g5d3f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d3result: { evaluation: undefined, depth: 1, moves: "d2d3" }, 
      d2d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2f2:
      {
        positionKey: "B:g5f2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2f2result: { evaluation: undefined, depth: 1, moves: "d2f2" }, 
      d2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g5h6:
      {
        positionKey: "B:h6d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,g5h6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g5h6result: { evaluation: undefined, depth: 1, moves: "g5h6" }, 
      g5h6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g5h5:
      {
        positionKey: "B:h5d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,g5h5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g5h5result: { evaluation: undefined, depth: 1, moves: "g5h5" }, 
      g5h5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g5f4:
      {
        positionKey: "B:f4d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,g5f4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g5f4result: { evaluation: undefined, depth: 1, moves: "g5f4" }, 
      g5f4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g5g4:
      {
        positionKey: "B:g4d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,g5g4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g5g4result: { evaluation: undefined, depth: 1, moves: "g5g4" }, 
      g5g4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      g5h4:
      {
        positionKey: "B:h4d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,g5h4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , g5h4result: { evaluation: undefined, depth: 1, moves: "g5h4" }, 
      g5h4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d8:
      {
        positionKey: "B:g5d8f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6g5,g8f7,d2d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d8result: { evaluation: undefined, depth: 1, moves: "d2d8" }, 
      d2d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "d2d8"
    }
    , g8f7result: { evaluation: undefined, depth: 2, moves: "g8f7,d2d8" }, 
    g8f7_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8f7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8f7,d2d8"
  }
  , f6g5result: { evaluation: undefined, depth: 3, moves: "f6g5,g8f7,d2d8" }, 
  f6f5:
  {
    positionKey: "B:f5d2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "f6f5",
    player: "BLACK", nextMoves: "g8f7,g8g7,g8f8,g8h7,g8h8",
    g8f7:
    {
      positionKey: "W:f5d2f7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "f6f5,g8f7",
      player: "WHITE", nextMoves: "d2d7,d2g2,d2e2,d2a2,d2b2,d2c2,d2h2,d2f2,d2d1,d2d6,d2d5,d2d4,d2d3,f5e5,f5g5,f5f4,f5g4,f5e4,d2d8",
      d2d7:
      {
        positionKey: "B:f5d7f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d7result: { evaluation: undefined, depth: 1, moves: "d2d7" }, 
      d2d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d2g2:
      {
        positionKey: "B:f5g2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2g2result: { evaluation: undefined, depth: 1, moves: "d2g2" }, 
      d2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2e2:
      {
        positionKey: "B:f5e2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2e2result: { evaluation: undefined, depth: 1, moves: "d2e2" }, 
      d2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2a2:
      {
        positionKey: "B:f5a2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2a2result: { evaluation: undefined, depth: 1, moves: "d2a2" }, 
      d2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2b2:
      {
        positionKey: "B:f5b2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2b2result: { evaluation: undefined, depth: 1, moves: "d2b2" }, 
      d2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2c2:
      {
        positionKey: "B:f5c2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2c2result: { evaluation: undefined, depth: 1, moves: "d2c2" }, 
      d2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2h2:
      {
        positionKey: "B:f5h2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2h2result: { evaluation: undefined, depth: 1, moves: "d2h2" }, 
      d2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2f2:
      {
        positionKey: "B:f5f2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2f2result: { evaluation: undefined, depth: 1, moves: "d2f2" }, 
      d2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d1:
      {
        positionKey: "B:f5d1f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d1result: { evaluation: undefined, depth: 1, moves: "d2d1" }, 
      d2d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d6:
      {
        positionKey: "B:f5d6f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d6result: { evaluation: undefined, depth: 1, moves: "d2d6" }, 
      d2d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d5:
      {
        positionKey: "B:f5d5f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d5result: { evaluation: undefined, depth: 1, moves: "d2d5" }, 
      d2d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d4:
      {
        positionKey: "B:f5d4f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d4result: { evaluation: undefined, depth: 1, moves: "d2d4" }, 
      d2d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d3:
      {
        positionKey: "B:f5d3f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d3result: { evaluation: undefined, depth: 1, moves: "d2d3" }, 
      d2d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f5e5:
      {
        positionKey: "B:e5d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,f5e5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f5e5result: { evaluation: undefined, depth: 1, moves: "f5e5" }, 
      f5e5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f5g5:
      {
        positionKey: "B:g5d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,f5g5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f5g5result: { evaluation: undefined, depth: 1, moves: "f5g5" }, 
      f5g5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f5f4:
      {
        positionKey: "B:f4d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,f5f4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f5f4result: { evaluation: undefined, depth: 1, moves: "f5f4" }, 
      f5f4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f5g4:
      {
        positionKey: "B:g4d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,f5g4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f5g4result: { evaluation: undefined, depth: 1, moves: "f5g4" }, 
      f5g4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      f5e4:
      {
        positionKey: "B:e4d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,f5e4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , f5e4result: { evaluation: undefined, depth: 1, moves: "f5e4" }, 
      f5e4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d8:
      {
        positionKey: "B:f5d8f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6f5,g8f7,d2d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d8result: { evaluation: undefined, depth: 1, moves: "d2d8" }, 
      d2d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "d2d8"
    }
    , g8f7result: { evaluation: undefined, depth: 2, moves: "g8f7,d2d8" }, 
    g8f7_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8f7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8f7,d2d8"
  }
  , f6f5result: { evaluation: undefined, depth: 3, moves: "f6f5,g8f7,d2d8" }, 
  f6e5:
  {
    positionKey: "B:e5d2g8", currentDepth: 1, remainingDepth: 2, alpha: "1/2", beta: "undefined/undefined", evaluation: "undefined",
    movesToHere: "f6e5",
    player: "BLACK", nextMoves: "g8f7,g8g7,g8f8,g8h7,g8h8",
    g8f7:
    {
      positionKey: "W:e5d2f7", currentDepth: 2, remainingDepth: 1, alpha: "1/1", beta: "undefined/undefined", evaluation: "undefined",
      movesToHere: "f6e5,g8f7",
      player: "WHITE", nextMoves: "d2d7,d2g2,e5f5,d2d6,d2a2,d2b2,d2c2,d2h2,d2e2,d2d1,d2d5,d2d4,d2d3,d2f2,e5d6,e5d5,e5f4,e5e4,e5d4,d2d8",
      d2d7:
      {
        positionKey: "B:e5d7f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2d7",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d7result: { evaluation: undefined, depth: 1, moves: "d2d7" }, 
      d2d7_IS_NEW_MAX: { old_evaluation: undefined, old_depth: undefined }, 
      d2g2:
      {
        positionKey: "B:e5g2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2g2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2g2result: { evaluation: undefined, depth: 1, moves: "d2g2" }, 
      d2g2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e5f5:
      {
        positionKey: "B:f5d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,e5f5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e5f5result: { evaluation: undefined, depth: 1, moves: "e5f5" }, 
      e5f5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d6:
      {
        positionKey: "B:e5d6f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d6result: { evaluation: undefined, depth: 1, moves: "d2d6" }, 
      d2d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2a2:
      {
        positionKey: "B:e5a2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2a2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2a2result: { evaluation: undefined, depth: 1, moves: "d2a2" }, 
      d2a2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2b2:
      {
        positionKey: "B:e5b2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2b2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2b2result: { evaluation: undefined, depth: 1, moves: "d2b2" }, 
      d2b2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2c2:
      {
        positionKey: "B:e5c2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2c2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2c2result: { evaluation: undefined, depth: 1, moves: "d2c2" }, 
      d2c2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2h2:
      {
        positionKey: "B:e5h2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2h2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2h2result: { evaluation: undefined, depth: 1, moves: "d2h2" }, 
      d2h2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2e2:
      {
        positionKey: "B:e5e2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2e2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2e2result: { evaluation: undefined, depth: 1, moves: "d2e2" }, 
      d2e2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d1:
      {
        positionKey: "B:e5d1f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2d1",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d1result: { evaluation: undefined, depth: 1, moves: "d2d1" }, 
      d2d1_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d5:
      {
        positionKey: "B:e5d5f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d5result: { evaluation: undefined, depth: 1, moves: "d2d5" }, 
      d2d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d4:
      {
        positionKey: "B:e5d4f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d4result: { evaluation: undefined, depth: 1, moves: "d2d4" }, 
      d2d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d3:
      {
        positionKey: "B:e5d3f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2d3",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d3result: { evaluation: undefined, depth: 1, moves: "d2d3" }, 
      d2d3_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2f2:
      {
        positionKey: "B:e5f2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2f2",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2f2result: { evaluation: undefined, depth: 1, moves: "d2f2" }, 
      d2f2_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e5d6:
      {
        positionKey: "B:d6d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,e5d6",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e5d6result: { evaluation: undefined, depth: 1, moves: "e5d6" }, 
      e5d6_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e5d5:
      {
        positionKey: "B:d5d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,e5d5",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e5d5result: { evaluation: undefined, depth: 1, moves: "e5d5" }, 
      e5d5_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e5f4:
      {
        positionKey: "B:f4d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,e5f4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e5f4result: { evaluation: undefined, depth: 1, moves: "e5f4" }, 
      e5f4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e5e4:
      {
        positionKey: "B:e4d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,e5e4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e5e4result: { evaluation: undefined, depth: 1, moves: "e5e4" }, 
      e5e4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      e5d4:
      {
        positionKey: "B:d4d2f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,e5d4",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , e5d4result: { evaluation: undefined, depth: 1, moves: "e5d4" }, 
      e5d4_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      d2d8:
      {
        positionKey: "B:e5d8f7", currentDepth: 3, remainingDepth: 0, alpha: "1/0", beta: "undefined/undefined", evaluation: "undefined",
        movesToHere: "f6e5,g8f7,d2d8",
        evaluation: "undefined", depth: "0", moves: ""
      }
      , d2d8result: { evaluation: undefined, depth: 1, moves: "d2d8" }, 
      d2d8_IS_NEW_MAX: { old_evaluation: undefined, old_depth: 1 }, 
      evaluation: "undefined", depth: "1", moves: "d2d8"
    }
    , g8f7result: { evaluation: undefined, depth: 2, moves: "g8f7,d2d8" }, 
    g8f7_IS_NEW_MIN: { old_evaluation: undefined, old_depth: undefined }, 
    g8f7_ALPHA_BREAK: true, 
    evaluation: "undefined", depth: "2", moves: "g8f7,d2d8"
  }
  , f6e5result: { evaluation: undefined, depth: 3, moves: "f6e5,g8f7,d2d8" }, 
  evaluation: "1", depth: "3", moves: "d2h2,g8f8,h2h8"
}
; /*
Engine done 827ms
Known position: 335
0 known positions > 3
{"depth":3,"moves":["d2h2","g8f8","h2h8"],"evaluation":1,"move":"d2h2"}
Result for W:f6d2g8 = {"depth":3,"moves":["d2h2","g8f8","h2h8"],"evaluation":1,"move":"d2h2"}
Current position: B:f6h2g8 false 1 available moves (next move should be g8f8)
opponentMove: g8f8
Result for W:f6h2f8 = {"depth":1,"moves":["h2h8"],"evaluation":1,"move":"h2h8"}
We WIN!!! 827ms / 335 [3: W:f6d2g8 1. Rh2 Kf8 2. Rh8#]
Final position: B:f6h8f8 true 0 available moves
Game:
 ABCDEFGH ABCDEFGH ABCDEFGH ABCDEFGH
8......k.8......k.8.....k..8.....k.R
7........7........7........7........
6.....K..6.....K..6.....K..6.....K..
5........5........5........5........
4........4........4........4........
3........3........3........3........
2...R....2.......R2.......R2........
1........1........1........1........
 ABCDEFGH ABCDEFGH ABCDEFGH ABCDEFGH
*/

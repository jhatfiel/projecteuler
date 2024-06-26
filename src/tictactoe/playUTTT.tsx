import { MonteCarlo } from "./MonteCarloTreeSearch";
import { Play, UltimateTicTacToeBoard } from "./UltimateTicTacToeBoard";

import React, {useState, useEffect} from 'react';
import {render, useInput, useApp, Text, Box} from 'ink';
import SelectInput from 'ink-select-input';

type GameState = {state: bigint, row: number, col: number};

const Square = ({gameState, rowNum, colNum}: {gameState: GameState, rowNum: number, colNum: number}) => {
    // give the character at the specified square
    const square = BigInt(rowNum*9 + colNum);
    let ch = ' ';
    if ((gameState.state&BOARD.FULL_BIG_BOARD) & 1n<<square) ch = 'X';
    if (((gameState.state>>81n)&BOARD.FULL_BIG_BOARD) & 1n<<square) ch = 'O';

    // highlight the currently selected square
    const hl = { inverse: rowNum === gameState.row && colNum === gameState.col};

    return (
            <Text> <Text {...hl}>{ch}</Text> </Text>
    );
};

const BoardRenderer = ({gameState}: {gameState: GameState}) => {
    // rowNum and colNum logic here just enables iteration over the positions of the board
    // silly reduce function seems to be the required way to join react components together with a separator
    return (
            <Box flexDirection="column" height={9+(9-1)+2} minwidth={3*(3*3) + 3*(3-1) + (3-1) + 2} borderStyle="round" flexGrow={0} flexShrink={0}>
            {
                [...Array(9)].map((_, rowNum) =>
                    <Box key={`row${rowNum}`} flexDirection="row">
                    {
                        [...Array(9)].map((_, colNum) => <Square gameState={gameState} rowNum={rowNum} colNum={colNum}/>)
                                    .reduce((acc, sq, ind) => <>{acc}<Text>{(ind%3)===0?'║':'│'}</Text>{sq}</>)
                    }
                    </Box>
                ).reduce((acc, row, ind) => <>{acc}<Text>{
                    Array.from({length:3}, _=>((ind%3)===0?'═══════════':'───┼───┼───')).join((ind%3)===0?'╬':'║')
                    }
                    </Text>{row}</>)
            }
            </Box>
    );
};

const BOARD = new UltimateTicTacToeBoard();
const AI = new MonteCarlo<Play, bigint>(BOARD, {msFirst: 100, msNormal: 100});

const App = () => {
    let [playerNum, setPlayerNum] = useState(1);
    let aiNum = 3-playerNum;
    let [gameState, setGameState]: [GameState, (GameState)=>void] = useState<GameState>({state: 0n, row: 4, col: 4});
    let [gameMessage, setGameMessage] = useState(`Welcome, please select your player (prese q any time to quit)`);
    let [text, setText] = useState('');
    let [mode, setMode] = useState(0);
    let [playerWins, setPlayerWins] = useState(0);
    let [aiWins, setAiWins] = useState(0);
    const addText = (msg) => { text = `${text}${text?'\n':''}${msg}`; setText(text); }
    const {exit} = useApp();
    const legalPlays = BOARD.legalPlays([gameState.state]);

    useEffect(() => {
        addText(`Initializing AI...`);
        setTimeout(() => {
            startGame();
        }, 1);
    }, []);

    const startGame = () => {
        let now = Date.now();
        AI.replay();
        AI.update(gameState.state);
        AI.stats = [];
        AI.getPlay(); // initialize the engine
        addText(`...DONE ${Date.now()-now}ms ${AI.explored.size} explored states`);
        addText(AI.stats[0]);

        // initialize game state
        gameState.state = 0n;
        gameState.row = 4;
        gameState.col = 4;

        // prepareForNextTurn puts us in the right state for whoever's turn it is
        prepareForNextTurn();
    };

    const selectValidSquare = () => {
        let cnt = 0;
        let selected = gameState.row*9+gameState.col;
        while (legalPlays.find(s => s.player === playerNum && s.square === selected) === undefined && cnt < 82) {
            selected++;
            selected %= 81;
            cnt++;
        }
        let newRow = Math.floor(selected/9);
        let newCol = selected%9;
        if (cnt === 82) gameState.row = gameState.col = -1;
        else if (gameState.row !== newRow || gameState.col !== newCol) {
            gameState.row = newRow;
            gameState.col = newCol;
            setGameState(gameState);
        }
    }

    const prepareForNextTurn = () => {
        setGameState(gameState);
        AI.update(gameState.state);
        const winner = BOARD.winner([gameState.state]);
        if (winner) {
            gameState.row = -1;
            gameState.col = -1;
            let gameMessage = `Game Over!  `;
            if (winner === -1) gameMessage += `DRAW`;
            else if (winner === playerNum) { playerWins++; setPlayerWins(playerWins); gameMessage += `No way!!!  You won!`; }
            else if (winner === aiNum) { aiWins++; setAiWins(aiWins); gameMessage += `I won... don't feel too bad!`; }
            gameMessage += `\nPlayer has won ${playerWins} times, AI has won ${aiWins} times.\n`;
            gameMessage += `\nPlease select your player (or q to quit)`;
            setGameMessage(gameMessage);
            mode=0; setMode(mode);
        } else {
            if (BOARD.currentPlayer(gameState.state) === playerNum) {
                addText(`Waiting for player...`);
            } // wait for human play
            else aiPlay();
        }
    }

    // human makes a play
    const humanPlay = () => {
        let square = gameState.row*9 + gameState.col;
        if (legalPlays.find(s => s.player === playerNum && s.square === square) === undefined) {
            addText(`Invalid square, try again`);
            return;
        }

        text = ''; setText(text);
        //console.error(`Before human play to ${gameState.row}/${gameState.col} = ${square}:`);
        //console.error(`Before state=${gameState.state.toString(2).padStart(181, '0')}`);
        //console.error(`Before p1=${BOARD.getPlayerHash(1, gameState.state).toString(2).padStart(81, '0')}`);
        //console.error(`Before p2=${BOARD.getPlayerHash(2, gameState.state).toString(2).padStart(81, '0')}`);
        //BOARD.printState(gameState.state);
        gameState.state = BOARD.nextState(gameState.state, {player: playerNum, square: square});
        //console.error(`After state=${gameState.state.toString(2).padStart(181, '0')}`);
        //console.error(`After p1=${BOARD.getPlayerHash(1, gameState.state).toString(2).padStart(81, '0')}`);
        //console.error(`After p2=${BOARD.getPlayerHash(2, gameState.state).toString(2).padStart(81, '0')}`);
        //BOARD.printState(gameState.state);

        prepareForNextTurn();
    };

    const aiPlay = () => {
        // ai thinks about a play
        AI.stats = [];
        let play = AI.getPlay();
        if (AI.stats) addText(AI.stats[0]);

        BOARD.legalPlayStates([gameState.state]).playStates.slice(0, 10).forEach(({play, nextStateNormalized}) => {
            let plays = AI.plays[aiNum].get(nextStateNormalized) ?? 1;
            let wins = AI.wins[aiNum].get(nextStateNormalized) ?? 0;
            let p = wins/plays;
            let exploredStr = '';
            let winsInStr = '';
            let losesInStr = '';
            if (AI.explored.has(nextStateNormalized)) exploredStr = ' E';
            if (AI.winsIn[aiNum].has(nextStateNormalized)) winsInStr = ` W${AI.winsIn[aiNum].get(nextStateNormalized)}`;
            if (AI.winsIn[playerNum].has(nextStateNormalized)) losesInStr = ` L${AI.winsIn[playerNum].get(nextStateNormalized)}`;
            addText(`Play: ${JSON.stringify(play)} - ${(100*p).toFixed(2)}% (${AI.wins[aiNum].get(nextStateNormalized)} / ${AI.plays[aiNum].get(nextStateNormalized)})${exploredStr}${winsInStr}${losesInStr}`);
        });

        // make the ai play
        let nextState = BOARD.nextState(gameState.state, play);
        let nextStateNormalized = BOARD.normalize(nextState);

        let wins = AI.wins[aiNum].get(nextStateNormalized);
        let plays = AI.plays[aiNum].get(nextStateNormalized);
        let explored = AI.explored.has(nextStateNormalized);
        let winsIn = AI.winsIn[aiNum].get(nextStateNormalized);
        let losesIn = AI.winsIn[playerNum].get(nextStateNormalized);
        addText(`AI says to play: ${play.square} (${BOARD.playToOutput(play)}) (Win confidence: ${wins}/${plays} = ${(100*wins/plays).toFixed(2)}%) explored=${explored}, winsIn=${winsIn}, losesIn=${losesIn}`);
        gameState.state = nextState;
        prepareForNextTurn();
    };

    const movePosition = (rd: number, cd: number) => {
        const validPairs = legalPlays.map(play => ({row: Math.floor(play.square/9), col: play.square%9}));
        let pos = {row: gameState.row, col: gameState.col};
        let found = false;

        while (!found) {
            if (rd) { // moving rows
                pos.row = (pos.row+rd+9)%9;
                if (validPairs.find(p => p.row === pos.row && p.col === pos.col)) found = true;
                else {
                    // try the other 8 possible cells in this row
                    for (let i=1; i<=9; i++) {
                        if (validPairs.find(p => p.row === pos.row && p.col === pos.col+i*rd)) { found = true; pos.col += i*rd; }
                        if (validPairs.find(p => p.row === pos.row && p.col === pos.col-i*rd)) { found = true; pos.col -= i*rd; }
                    }
                }
            } else { // moving cols
                pos.col = (pos.col+cd+9)%9;
                if (validPairs.find(p => p.row === pos.row && p.col === pos.col)) found = true;
                else {
                    // try the other 8 possible cells in this col
                    for (let i=1; i<=9; i++) {
                        if (validPairs.find(p => p.row === pos.row-i*cd && p.col === pos.col)) { found = true; pos.row -= i*cd; }
                        if (validPairs.find(p => p.row === pos.row+i*cd && p.col === pos.col)) { found = true; pos.row += i*cd; }
                    }
                }
            }
        }

        setGameState({...gameState, row: pos.row, col: pos.col});
    }

    useInput((input, key) => {
        // move cursor
        if (mode === 1) {
            if (key.leftArrow) movePosition(0, -1); 
            if (key.rightArrow) movePosition(0, +1);
            if (key.upArrow) movePosition(-1, 0);
            if (key.downArrow) movePosition(+1, 0);

            if (input === ' ') {
                // human plays in currently selected square
                humanPlay();
            }
        }

        if (input === 'q') exit();
    });

    const choices = [
        { label: 'Play as X (go first)', value: 1},
        { label: 'Play as O (go second)', value: 2},
        { label: 'Random', value: 0},
    ];

    const onChoosePlayer = item => {
        text = ''; setText(text);
        playerNum = item.value?item.value:(1+Math.round(Math.random()));
        setPlayerNum(playerNum);
        aiNum = 3-playerNum;
        
        mode=1; setMode(mode);

        startGame();
    };

    let hintMessage = 'UNKNOWN';
    if (gameState) {
        let selected = gameState.row*9+gameState.col
        if (legalPlays.filter(play => play.player === playerNum && play.square === selected).length) {
            let nextStateNormalized = BOARD.normalize(BOARD.nextState(gameState.state, {player: playerNum, square: selected}));
            let plays = AI.plays[playerNum].get(nextStateNormalized) ?? 1;
            let wins = AI.wins[playerNum].get(nextStateNormalized) ?? 0;
            let p = wins/plays;
            let exploredStr = '';
            let winsInStr = '';
            let losesInStr = '';
            if (AI.explored.has(nextStateNormalized)) exploredStr = ' E';
            if (AI.winsIn[playerNum].has(nextStateNormalized)) winsInStr = ` W${AI.winsIn[playerNum].get(nextStateNormalized)}`;
            if (AI.winsIn[aiNum].has(nextStateNormalized)) losesInStr = ` L${AI.winsIn[aiNum].get(nextStateNormalized)}`;
            hintMessage = `${(100*p).toFixed(2)}% (${AI.wins[playerNum].get(nextStateNormalized)} / ${AI.plays[playerNum].get(nextStateNormalized)})${exploredStr}${winsInStr}${losesInStr}`;
        } else {
            hintMessage = `OCCUPIED`;
        }
    };

    // don't select an occupied square
    selectValidSquare();

    return (
        <Box>
            {/* board always visible */}
            <BoardRenderer gameState={gameState}/>
            {/* mode=0, choose player box visible */}
            <Box flexDirection='column' flexGrow={1} display={mode===0?'flex':'none'}>
                <Text>{gameMessage}</Text>
                <SelectInput items={choices} onSelect={onChoosePlayer} isFocused={mode===0}/>
            </Box>
            {/* mode=1, game status box visible */}
            <Box flexDirection='column' flexGrow={1} display={mode===1?'flex':'none'}>
                <Text>Game Status</Text>
                <Text> Player is: { playerNum===1?'X':'O' }</Text>
                <Text> Position: { gameState.row } / { gameState.col }</Text>
                <Text> AI is: { aiNum===1?'X':'O' }</Text>
                <Text> HINT: { hintMessage }</Text>
            </Box>
            {/* debug box always visible */}
            <Box flexDirection='column' flexGrow={1}>
                <Text>DEBUG</Text>
                <Text>{text}</Text>
            </Box>
        </Box>
    );
};

render(<App/>);
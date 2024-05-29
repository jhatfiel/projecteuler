import { MonteCarlo } from "./MonteCarloTreeSearch";
import { Play, UltimateTicTacToeBoard, UltimateTicTacToeBoardState } from "./UltimateTicTacToeBoard";

import React, {useState, useEffect} from 'react';
import {render, useInput, useApp, Text, Box} from 'ink';
import SelectInput from 'ink-select-input';

type GameState = {state: UltimateTicTacToeBoardState, row: number, col: number};

const Square = ({gameState, rowNum, colNum}: {gameState: GameState, rowNum: number, colNum: number}) => {
    // give the character at the specified square
    const ch = [' ', 'X', 'O', '-'][gameState.state.getCellPlayer(rowNum, colNum)];

    // highlight the currently selected square
    const hl = { ...gameState.state.getCellStyle(rowNum, colNum), inverse: gameState.row === rowNum && gameState.col === colNum };

    return (
            <Text {...hl}> <Text>{ch}</Text> </Text>
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
const AI = new MonteCarlo<Play>(BOARD, {msFirst: 10000, msNormal: 1000});

const App = () => {
    let [playerNum, setPlayerNum] = useState(1);
    let aiNum = 3-playerNum;
    let [gameState, setGameState]: [GameState, (GameState)=>void] = useState<GameState>({state: BOARD.start(), row: 4, col: 4});
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
        gameState.state = BOARD.start();
        gameState.row = 4;
        gameState.col = 4;

        // prepareForNextTurn puts us in the right state for whoever's turn it is
        prepareForNextTurn();
    };

    const positionFromRowCol = (row: number, col: number): number => { return row*9 + col; }
    const rowColFromPosition = (position: number): {row: number, col: number} => {
        return {row: Math.floor(position/9), col: position%9};
    }

    const selectValidSquare = () => {
        let cnt = 0;
        let row = gameState.row;
        let col = gameState.col;
        let position = positionFromRowCol(row, col);
        let board = BOARD.boardNumFromRowCol(row, col);
        let square = BOARD.squareFromRowCol(row, col);
        while (legalPlays.find(s => s.player === playerNum && s.board === board && s.square === square) === undefined && cnt < 82) {
            position++;
            position %= 81;
            cnt++;
            ({row, col} = rowColFromPosition(position));
            board = BOARD.boardNumFromRowCol(row, col);
            square = BOARD.squareFromRowCol(row, col);
        }
        let {row: newRow, col: newCol} = rowColFromPosition(position);
        if (cnt === 82) gameState.row = gameState.col = -1;
        else if (gameState.row !== newRow || gameState.col !== newCol) {
            gameState.row = newRow;
            gameState.col = newCol;
            setGameState(gameState);
        }
    }

    const prepareForNextTurn = () => {
        setGameState(gameState);
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
        let board = BOARD.boardNumFromRowCol(gameState.row, gameState.col);
        let square = BOARD.squareFromRowCol(gameState.row, gameState.col);
        if (legalPlays.find(s => s.player === playerNum && s.board === board && s.square === square) === undefined) {
            addText(`Invalid square, try again`);
            return;
        }

        text = ''; setText(text);
        //console.error(`Before human play to ${gameState.row}/${gameState.col} = ${square}:`);
        //console.error(`Before state=${gameState.state.toString(2).padStart(181, '0')}`);
        //console.error(`Before p1=${BOARD.getPlayerHash(1, gameState.state).toString(2).padStart(81, '0')}`);
        //console.error(`Before p2=${BOARD.getPlayerHash(2, gameState.state).toString(2).padStart(81, '0')}`);
        //BOARD.printState(gameState.state);
        gameState.state = BOARD.nextState(gameState.state, {player: playerNum, board, square});
        //console.error(`After state=${gameState.state.toString(2).padStart(181, '0')}`);
        //console.error(`After p1=${BOARD.getPlayerHash(1, gameState.state).toString(2).padStart(81, '0')}`);
        //console.error(`After p2=${BOARD.getPlayerHash(2, gameState.state).toString(2).padStart(81, '0')}`);
        //BOARD.printState(gameState.state);

        AI.update(gameState.state);
        prepareForNextTurn();
    };

    const getStatLineForStats = (message, s): string => {
            return `${message} - ${s.winPercent} ` +
                `(${s.wins} / ${s.plays})` +
                (s.explored?' E':'') +
                (s.winsIn!==undefined?` W${s.winsIn}`:'') +
                (s.losesIn!==undefined?` L${s.losesIn}`:'');
    }
    const getStatLine = (message: string, play: Play, state: UltimateTicTacToeBoardState): string => {
            let s = AI.getStatsForPlay(play, state);
            return getStatLineForStats(`${message}${JSON.stringify(play)}`, s);
    }

    const aiPlay = () => {
        // ai thinks about a play
        AI.stats = [];
        let play = AI.getPlay();
        if (AI.stats) addText(AI.stats[0]);

        BOARD.legalPlays([gameState.state])
            .map(play => ({play, s: AI.getStatsForPlay(play, gameState.state)}))
            .sort((a, b) => b.s.wins/b.s.plays - a.s.wins/a.s.plays)
            .slice(0, 10)
            .forEach(stats => addText(getStatLineForStats(`Play: ${JSON.stringify(stats.play)}`, stats.s)));

        // make the ai play
        addText(getStatLine('AI says to play: ', play, gameState.state));
        gameState.state = BOARD.nextState(gameState.state, play);
        AI.update(gameState.state);
        prepareForNextTurn();
    };

    const movePosition = (rd: number, cd: number) => {
        const validPairs = legalPlays.map(play => ({row: Math.floor(play.board/3)*3 + Math.floor(play.square/3), col: (play.board%3)*3 + play.square%3}));
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
    if (gameState && gameState.state.currentPlayer === playerNum) {
        let board = BOARD.boardNumFromRowCol(gameState.row, gameState.col);
        let square = BOARD.squareFromRowCol(gameState.row, gameState.col);
        hintMessage = getStatLine('', {player: playerNum, board, square}, gameState.state);
    };

    // don't select an occupied square
    selectValidSquare();

    return (
        <>
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
                <Text> Big: { gameState.state.bigBoard.getHash().toString(2).padStart(19, '0') }</Text>
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
        <Text> State: { gameState.state.getHash().toString(2).padStart(167, '0') }</Text>
        </>
    );
};

render(<App/>);
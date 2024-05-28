import { MonteCarlo } from "./MonteCarloTreeSearch";
import { Play, TicTacToeBoard, TicTacToeBoardState } from "./TicTacToeBoard";

import React, {useState, useEffect} from 'react';
import {render, useInput, useApp, Text, Box} from 'ink';
import SelectInput from 'ink-select-input';

type GameState = {state: TicTacToeBoardState, row: number, col: number};

const Square = ({gameState, rowNum, colNum}: {gameState: GameState, rowNum: number, colNum: number}) => {
    // give the character at the specified square
    let ch = [' ', 'X', 'O'][gameState.state.getCellPlayer(rowNum, colNum)];

    // highlight the currently selected square
    const hl = { ...gameState.state.getCellStyle(rowNum, colNum), inverse: gameState.row === rowNum && gameState.col === colNum };

    return (
            <Text> <Text {...hl}>{ch}</Text> </Text>
    );
}

const GridBoard = ({gameState, rows, cols}: {gameState: GameState, rows: number, cols: number}) => {
    // rowNum and colNum logic here just enables iteration over the positions of the board
    // silly reduce function seems to be the required way to join react components together with a separator
    return (
            <Box flexDirection="column" height={7} width={13} borderStyle="round" flexGrow={0}>
            {
                [...Array(rows)].map((_, rowNum) =>
                    <Box flexDirection="row">
                    {
                        [...Array(cols)].map((_, colNum) => <Square gameState={gameState} rowNum={rowNum} colNum={colNum}/>)
                                    .reduce((acc, sq) => <>{acc}<Text>|</Text>{sq}</>)
                    }
                    </Box>
                ).reduce((acc, row) => <>{acc}<Text>---+---+---</Text>{row}</>)
            }
            </Box>
    );
};

const BOARD = new TicTacToeBoard();
const AI = new MonteCarlo<Play>(BOARD);//, {msFirst: 10, msNormal: 10})//, {msFirst: 10, msNormal: 5});

const App = () => {
    let [playerNum, setPlayerNum] = useState(1);
    let aiNum = 3-playerNum;
    let [gameState, setGameState]: [GameState, (s: GameState)=>void] = useState({state: BOARD.start(), row: 1, col: 1});
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
        AI.stats = [];
        AI.getPlay(); // initialize the engine
        addText(`...DONE ${Date.now()-now}ms ${AI.explored.size} explored states`);
        addText(AI.stats[0]);

        // initialize game state
        gameState.state = BOARD.start();
        gameState.row = 1;
        gameState.col = 1;

        // prepareForNextTurn puts us in the right state for whoever's turn it is
        prepareForNextTurn();
    };

    const selectValidSquare = () => {
        let cnt = 0;
        let {row, col} = gameState;
        let selected = row*3 + col;
        while (legalPlays.find(s => s.player === playerNum && s.square === selected) === undefined && cnt < 10) {
            selected++;
            selected %= 9;
            cnt++;
        }
        row = Math.floor(selected/3);
        col = selected % 3;
        if (cnt === 10) { row = -1; col = -1; }
        else if (row !== gameState.row || col !== gameState.col) {
            gameState.row = row;
            gameState.col = col;
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
    const humanPlay = (square: number) => {
        if (legalPlays.find(s => s.player === playerNum && s.square === square) === undefined) {
            addText(`Invalid square, try again`);
            return;
        }

        text = ''; setText(text);
        gameState.state = BOARD.nextState(gameState.state, {player: playerNum, square: square});
        prepareForNextTurn();
    };

    const getStatLine = (message: string, play: Play, state: TicTacToeBoardState): string => {
            let s = AI.getStatsForPlay(play, state);
            return `${message}${JSON.stringify(play)} - ${s.winPercent} ` +
                `(${s.wins} / ${s.plays})` +
                (s.explored?' E':'') +
                (s.winsIn!==undefined?` W${s.winsIn}`:'') +
                (s.losesIn!==undefined?` L${s.losesIn}`:'');
    }

    const aiPlay = () => {
        // ai thinks about a play
        AI.stats = [];
        let play = AI.getPlay();
        if (AI.stats) addText(AI.stats[0]);

        BOARD.legalPlays([gameState.state]).forEach(play => addText(getStatLine("Play: ", play, gameState.state)));

        // make the ai play
        addText(getStatLine('AI says to play: ', play, gameState.state));
        gameState.state = BOARD.nextState(gameState.state, play);
        prepareForNextTurn();
    };

    const movePosition = (rd: number, cd: number) => {
        const validPairs = legalPlays.map(play => ({row: Math.floor(play.square/3), col: play.square%3}));
        let pos = {row: gameState.row, col: gameState.col};
        let found = false;

        while (!found) {
            if (rd) { // moving rows
                pos.row = (pos.row+rd+3)%3;
                if (validPairs.find(p => p.row === pos.row && p.col === pos.col)) found = true;
                else {
                    // try the other 2 possible cells in this row
                    for (let i=1; i<=2; i++) {
                        if (validPairs.find(p => p.row === pos.row && p.col === pos.col+i*rd)) { found = true; pos.col += i*rd; }
                        if (validPairs.find(p => p.row === pos.row && p.col === pos.col-i*rd)) { found = true; pos.col -= i*rd; }
                    }
                }
            } else { // moving cols
                pos.col = (pos.col+cd+3)%3;
                if (validPairs.find(p => p.row === pos.row && p.col === pos.col)) found = true;
                else {
                    // try the other 2 possible cells in this col
                    for (let i=1; i<=2; i++) {
                        if (validPairs.find(p => p.row === pos.row-i*cd && p.col === pos.col)) { found = true; pos.row -= i*cd; }
                        if (validPairs.find(p => p.row === pos.row+i*cd && p.col === pos.col)) { found = true; pos.row += i*cd; }
                    }
                }
            }
        }

        setGameState({...gameState, ...pos});
    }

    useInput((input, key) => {
        // move cursor
        if (mode === 1) {
            if (key.leftArrow) movePosition(0, -1); 
            if (key.rightArrow) movePosition(0, +1);
            if (key.upArrow) movePosition(-1, 0);
            if (key.downArrow) movePosition(+1, 0);

            if (input === ' ') {
                // select square if legal
                humanPlay(gameState.row*3 + gameState.col);
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
        let selected = gameState.row*3 + gameState.col;
        hintMessage = getStatLine('', {player: playerNum, square: selected}, gameState.state);
    };

    // don't select an occupied square
    selectValidSquare();

    return (
        <Box>
            {/* board always visible */}
            <GridBoard gameState={gameState} rows={3} cols={3}/>
            {/* mode=0, choose player box visible */}
            <Box flexDirection='column' flexGrow={1} display={mode===0?'flex':'none'}>
                <Text>{gameMessage}</Text>
                <SelectInput items={choices} onSelect={onChoosePlayer} isFocused={mode===0}/>
            </Box>
            {/* mode=1, game status box visible */}
            <Box flexDirection='column' flexGrow={1} display={mode===1?'flex':'none'}>
                <Text>Game Status</Text>
                <Text> Player is: { playerNum===1?'X':'O' }</Text>
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
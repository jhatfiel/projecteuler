import { MonteCarlo } from "./MonteCarloTreeSearch";
import { Play, TicTacToeBoard, TicTacToeBoardState } from "./TicTacToeBoard";

import React, {useState, useEffect} from 'react';
import {render, useInput, useApp, Text, Box} from 'ink';
import SelectInput from 'ink-select-input';

const Square = ({gameState, rowNum, colNum}) => {
    // give the character at the specified square
    const square = rowNum*3 + colNum;
    let ch = ' ';
    if (gameState.state.xBoard & 1<<square) ch = 'X';
    if (gameState.state.oBoard & 1<<square) ch = 'O';

    // highlight the currently selected square
    const hl = { inverse: gameState.selected === rowNum*3 + colNum };

    return (
            <Text> <Text {...hl}>{ch}</Text> </Text>
    );
}

const BoardRenderer = ({gameState}) => {
    // rowNum and colNum logic here just enables iteration over the positions of the board
    // silly reduce function seems to be the required way to join react components together with a separator
    return (
            <Box flexDirection="column" height={7} width={13} borderStyle="round" flexGrow={0}>
            {
                [...Array(3)].map((_, rowNum) =>
                    <Box flexDirection="row">
                    {
                        [...Array(3)].map((_, colNum) => <Square gameState={gameState} rowNum={rowNum} colNum={colNum}/>)
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
    let [gameState, setGameState]: [{state: TicTacToeBoardState, selected: number}, (s: {state: TicTacToeBoardState, selected: number})=>void] = useState({state: BOARD.start(), selected: 4});
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
        AI.update(BOARD.start());
        AI.getPlay(); // initialize the engine
        addText(`...DONE ${Date.now()-now}ms ${AI.explored.size} explored states`);
        addText(AI.stats[0]);

        // initialize game state
        gameState.state = BOARD.start();
        gameState.selected = 4;

        // prepareForNextTurn puts us in the right state for whoever's turn it is
        prepareForNextTurn();
    };

    const selectValidSquare = () => {
        let cnt = 0;
        let selected = gameState.selected;
        while (legalPlays.find(s => s.player === playerNum && s.square === selected) === undefined && cnt < 10) {
            selected++;
            selected %= 9;
            cnt++;
        }
        if (cnt === 10) gameState.selected = -1;
        else if (gameState.selected !== selected) {
            gameState.selected = selected;
            setGameState(gameState);
        }
    }

    const prepareForNextTurn = () => {
        setGameState(gameState);
        AI.update(gameState.state);
        const winner = BOARD.winner([gameState.state]);
        if (winner) {
            gameState.selected = -1;
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

    const aiPlay = () => {
        // ai thinks about a play
        AI.stats = [];
        let play = AI.getPlay();
        if (AI.stats) addText(AI.stats[0]);

        BOARD.legalPlayStates([gameState.state]).playStates.forEach(({play, nextStateNormalized}) => {
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
        let nextStateNormalized = nextState.normalize();

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
        const validPairs = legalPlays.map(play => ({row: Math.floor(play.square/3), col: play.square%3}));
        let pos = {row: Math.floor(gameState.selected/3), col: gameState.selected%3};
        let found = false;

        while (!found) {
            if (rd) { // moving rows
                pos.row = (pos.row+rd+3)%3;
                if (validPairs.find(p => p.row === pos.row && p.col === pos.col)) found = true;
                else {
                    // try the other 2 possible cells in this row
                    if (validPairs.find(p => p.row === pos.row && p.col === pos.col+rd)) { found = true; pos.col += rd; }
                    if (validPairs.find(p => p.row === pos.row && p.col === pos.col-rd)) { found = true; pos.col -= rd; }
                    if (validPairs.find(p => p.row === pos.row && p.col === pos.col+2*rd)) { found = true; pos.col += 2*rd; }
                    if (validPairs.find(p => p.row === pos.row && p.col === pos.col-2*rd)) { found = true; pos.col -= 2*rd; }
                }
            } else { // moving cols
                pos.col = (pos.col+cd+3)%3;
                if (validPairs.find(p => p.row === pos.row && p.col === pos.col)) found = true;
                else {
                    // try the other 2 possible cells in this col
                    if (validPairs.find(p => p.row === pos.row-cd && p.col === pos.col)) { found = true; pos.row += cd; }
                    if (validPairs.find(p => p.row === pos.row+cd && p.col === pos.col)) { found = true; pos.row -= cd; }
                    if (validPairs.find(p => p.row === pos.row-2*cd && p.col === pos.col)) { found = true; pos.row -= 2*cd; }
                    if (validPairs.find(p => p.row === pos.row+2*cd && p.col === pos.col)) { found = true; pos.row += 2*cd; }
                }
            }
        }

        setGameState({...gameState, selected: pos.row*3 + pos.col});
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
                humanPlay(gameState.selected);
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
        if (legalPlays.filter(play => play.player === playerNum && play.square === gameState.selected).length) {
            let nextStateNormalized = BOARD.nextState(gameState.state, {player: playerNum, square: gameState.selected}).normalize();
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
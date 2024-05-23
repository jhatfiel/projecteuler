import { MonteCarlo } from "./MonteCarloTreeSearch";
import { Play, TicTacToeBoard } from "./TicTacToeBoard";

import React, {useState, useEffect} from 'react';
import {render, useInput, useApp, Text, Box} from 'ink';
import SelectInput from 'ink-select-input';

const Square = ({gameState, rowNum, colNum}) => {
    // give the character at the specified square
    const at = square => {
        let ch = ' ';
        if ((gameState.state&511) & (1<<square)) ch = 'X';
        if (((gameState.state>>9)&511) & (1<<square)) ch = 'O';
        return ch;
    };

    // highlight the currently selected square
    const hl = square => {
        const squareSelected = square===gameState.selected;
        return {inverse: squareSelected};
        //return {backgroundColor: squareSelected?'gray':'black', bold: squareSelected};
    };

    return (
            <Text> <Text {...hl(rowNum*3+colNum)}>{at(rowNum*3+colNum)}</Text> </Text>
    );
}

const BoardRenderer = ({gameState}) => {
    /*
    return (
        <>
            <Text> State: {gameState.state.toString(2).padStart(19, '0')} </Text>
            <Text> Selected: {gameState.selected} </Text>
                <Box width={7} flexWrap="wrap">
                {
                [...Array(9)].map((_, squareNum) =>
                    <Box key={`square${squareNum}`} borderStyle={{
                        topLeft: ' ',
                        top: squareNum>2?'-':' ',
                        topRight: ' ',
                        left: (squareNum%3)?'|':' ',
                        bottomLeft: ' ',
                        right: 'L'
                    }} borderTop={squareNum>2} borderBottom={false} borderRight={false}><Text {...hl(squareNum)}>{at(squareNum)}</Text></Box>)
                }
                </Box>
        </>
    );*/

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
const AI = new MonteCarlo<Play>(BOARD, {msFirst: 10, msNormal: 5});

const App = () => {
    let [playerNum, setPlayerNum] = useState(1);
    let aiNum = 3-playerNum;
    let [gameState, setGameState] = useState({state: 0, selected: 4});
    let [gameMessage, setGameMessage] = useState(`Welcome, please select your player (prese q any time to quit)`);
    let [text, setText] = useState('');
    let [mode, setMode] = useState(0);
    let [playerWins, setPlayerWins] = useState(0);
    let [aiWins, setAiWins] = useState(0);
    const addText = (msg) => { text = `${text}${text?'\n':''}${msg}`; setText(text); }
    const {exit} = useApp();

    useEffect(() => {
        addText(`Initializing AI...`);
        let now = Date.now();
        AI.update(gameState.state);
        setTimeout(() => {
            AI.stats = [];
            AI.getPlay(); // initialize the engine
            addText(`...DONE ${Date.now()-now}ms ${AI.explored.size} explored states`);
            addText(AI.stats[0]);

            // prompt for player choice (play first-x, play second-o, random start)
            mode=0; setMode(mode);

            startGame();
        }, 1);
    }, []);

    const startGame = () => {
        AI.replay();

        // initialize game state
        gameState.state = 0;
        gameState.selected = 4;

        // prepareForNextTurn puts us in the right state for whoever's turn it is
        prepareForNextTurn();
    };

    const selectValidSquare = () => {
        while (BOARD.legalPlays([gameState.state]).find(s => s.player === playerNum && s.square === gameState.selected) === undefined) {
            gameState.selected++;
            gameState.selected = gameState.selected%9;
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
                // don't select an occupied square
                selectValidSquare();
                addText(`Waiting for player...`);
            } // wait for human play
            else aiPlay();
        }
    }

    // human makes a play
    const humanPlay = (square: number) => {
        if (BOARD.legalPlays([gameState.state]).find(s => s.player === playerNum && s.square === square) === undefined) {
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

    useInput((input, key) => {
        // move cursor
        if (mode === 1) {
            if (key.leftArrow && gameState.selected%3 > 0) setGameState({...gameState, selected: gameState.selected-1});
            if (key.rightArrow && gameState.selected%3 < 2) setGameState({...gameState, selected: gameState.selected+1});
            if (key.upArrow && gameState.selected/3 >= 1) setGameState({...gameState, selected: gameState.selected-3});
            if (key.downArrow && gameState.selected/3 < 2) setGameState({...gameState, selected: gameState.selected+3});

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
        if (BOARD.legalPlays([gameState.state]).filter(play => play.player === playerNum && play.square === gameState.selected).length) {
            let nextStateNormalized = BOARD.normalize(BOARD.nextState(gameState.state, {player: playerNum, square: gameState.selected}));
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
    }

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
                <Text> State: {gameState?.state.toString(2).padStart(19, '0')}</Text>
                <Text> Selected: {gameState?.selected}</Text>
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
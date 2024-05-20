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
const AI = new MonteCarlo<Play>(BOARD, {msFirst: 2000, msNormal: 500});

const App = () => {
    let [playerNum, setPlayerNum] = useState(1);
    let aiNum = 3-playerNum;
    let [gameState, setGameState] = useState({state: 0, selected: 4});
    let [gameMessage, setGameMessage] = useState(`Welcome, please select your player (prese q any time to quit)`);
    let [text, setText] = useState('');
    let [mode, setMode] = useState(0);
    let [playerWins, setPlayerWins] = useState(0);
    let [aiWins, setAiWins] = useState(0);
    const addText = (msg) => { text = `${text}\n${msg}`; setText(text); }
    const {exit} = useApp();

    useEffect(() => {
        addText(`Initializing AI...`);
        AI.update(gameState.state);
        setTimeout(() => {
            AI.getPlay(); // initialize the engine
            addText(`...DONE`);

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

    const prepareForNextTurn = () => {
        setGameState(gameState);
        AI.update(gameState.state);
        const winner = BOARD.winner([gameState.state]);
        if (winner) {
            let gameMessage = `Game Over!  `;
            if (winner === -1) gameMessage += `DRAW`;
            else if (winner === playerNum) { playerWins++; setPlayerWins(playerWins); gameMessage += `No way!!!  You won!`; }
            else if (winner === aiNum) { aiWins++; setAiWins(aiWins); gameMessage += `I won... don't feel too bad!`; }
            gameMessage += `\nPlayer has won ${playerWins} times, AI has won ${aiWins} times.\n`;
            gameMessage += `\nPlease select your player (or q to quit)`;
            setGameMessage(gameMessage);
            mode=0; setMode(mode);
        } else {
            if (BOARD.currentPlayer(gameState.state) === playerNum) { addText(`Waiting for player...`); } // wait for human play
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
        let play = AI.getPlay();

        let legal = BOARD.legalPlays([gameState.state]);
        let playStates = legal.map(play => ({play, nextState: BOARD.nextState(gameState.state, play)}));
        playStates.forEach(({play, nextState}) => {
            let plays = AI.plays[aiNum].get(nextState) ?? 1;
            let wins = AI.wins[aiNum].get(nextState) ?? 0;
            let p = wins/plays;
            let exploredStr = '';
            let winsInStr = '';
            let losesInStr = '';
            if (AI.explored.has(nextState)) exploredStr = ' E';
            if (AI.winsIn[aiNum].has(nextState)) winsInStr = ` W${AI.winsIn[aiNum].get(nextState)}`;
            if (AI.winsIn[playerNum].has(nextState)) losesInStr = ` L${AI.winsIn[playerNum].get(nextState)}`;
            addText(`Play: ${JSON.stringify(play)} - ${(100*p).toFixed(2)}% (${AI.wins[aiNum].get(nextState)} / ${AI.plays[aiNum].get(nextState)}})${exploredStr}${winsInStr}${losesInStr}`);
        });

        // make the ai play
        let nextState = BOARD.nextState(gameState.state, play);

        let wins = AI.wins[aiNum].get(nextState);
        let plays = AI.plays[aiNum].get(nextState);
        let explored = AI.explored.has(nextState);
        let winsIn = AI.winsIn[aiNum].get(nextState);
        let losesIn = AI.winsIn[playerNum].get(nextState);
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
        addText(`chose to be ${item.value}`);
        playerNum = item.value?item.value:(1+Math.round(Math.random()));
        setPlayerNum(playerNum);
        aiNum = 3-playerNum;
        
        mode=1; setMode(mode);

        startGame();
    };

    let hintMessage = 'UNKNOWN';
    if (gameState) {
        let nextState: number;
        if (BOARD.legalPlays([gameState.state]).filter(play => play.player === playerNum && play.square === gameState.selected).length) {
            nextState = BOARD.nextState(gameState.state, {player: playerNum, square: gameState.selected});
            if (AI.explored.has(nextState)) {
                hintMessage = `EXPLORED`;
                if (AI.winsIn[playerNum].has(nextState)) hintMessage += ` wins in ${AI.winsIn[playerNum].get(nextState)}`;
                else if (AI.winsIn[aiNum].has(nextState)) hintMessage += ` loses in ${AI.winsIn[aiNum].get(nextState)}`;
                else { hintMessage += ' DRAW'; };
            }

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
                <SelectInput items={choices} onSelect={onChoosePlayer}/>
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
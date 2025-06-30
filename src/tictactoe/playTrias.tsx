// playTrias.tsx
import { MonteCarlo } from "./MonteCarloTreeSearch";
import { TriasPlay, TriasBoard, TriasBoardState } from "./TriasBoard";

import React, { useState, useEffect } from 'react';
import { render, useInput, useApp, Text, Box } from 'ink';
import SelectInput from 'ink-select-input';

type GameState = { state: TriasBoardState, row: number, col: number };

const Square = ({ gameState, rowNum, colNum }: { gameState: GameState, rowNum: number, colNum: number }) => {
    const cell = rowNum * 3 + colNum;
    const ch = [' ', 'X', 'O', '-'][gameState.state.getCellPlayer(cell)];
    const hl = { ...gameState.state.getCellStyle(rowNum, colNum), inverse: gameState.row === rowNum && gameState.col === colNum };
    return (
        <Text> <Text {...hl}>{ch}</Text> </Text>
    );
};

const GridBoard = ({ gameState, rows, cols }: { gameState: GameState, rows: number, cols: number }) => {
    return (
        <Box flexDirection="column" borderStyle="round">
            {
                [...Array(rows)].map((_, rowNum) =>
                    <Box key={rowNum} flexDirection="row">
                        {
                            [...Array(cols)].map((_, colNum) => (
                                <Square gameState={gameState} rowNum={rowNum} colNum={colNum} />
                            )).reduce((acc, sq) => <>{acc}<Text>|</Text>{sq}</>)
                        }
                    </Box>
                )
            }
        </Box>
    );
};

const BOARD = new TriasBoard();
// Use a Monte Carlo instance as before (adjust timing parameters as desired).
const AI = new MonteCarlo<TriasPlay>(BOARD, { msFirst: 10, msNormal: 5 });

const App = () => {
    let [playerNum, setPlayerNum] = useState(1);
    let aiNum = 3 - playerNum;
    let [gameState, setGameState] = useState<GameState>({ state: BOARD.start(), row: 1, col: 1 });
    let [gameMessage, setGameMessage] = useState(`Welcome to Trias! Please select your player (press q any time to quit)`);
    let [text, setText] = useState('');
    let [mode, setMode] = useState(0); // mode 0: player selection, mode 1: game in progress
    let [playerWins, setPlayerWins] = useState(0);
    let [aiWins, setAiWins] = useState(0);
    const { exit } = useApp();

    const addText = (msg: string) => {
        setText(prev => prev + (prev ? '\n' : '') + msg);
    };

    const legalPlays = BOARD.legalPlays([gameState.state]);

    useEffect(() => {
        addText(`Initializing AI...`);
        setTimeout(() => {
            startGame();
        }, 1);
    }, []);

    const startGame = () => {
        // reset the game state
        const startState = BOARD.start();
        setGameState({ state: startState, row: 1, col: 1 });
        AI.replay();
        AI.update(startState);
        AI.stats = [];
        AI.getPlay(); // initialize the engine
        addText(`...DONE. Explored states: ${AI.explored.size}`);
        addText(AI.stats[0] || "");
        prepareForNextTurn();
    };

    const selectValidSquare = () => {
        let cnt = 0;
        let selected = gameState.row * 3 + gameState.col;
        while (!legalPlays.find(s => {
            if (s.type === "place") return s.to === selected;
            else return s.from === selected || s.to === selected;
        }) && cnt < 10) {
            selected = (selected + 1) % 9;
            cnt++;
        }
        const newRow = Math.floor(selected / 3);
        const newCol = selected % 3;
        if (cnt < 10 && (gameState.row !== newRow || gameState.col !== newCol)) {
            setGameState({ ...gameState, row: newRow, col: newCol });
        }
    };

    const prepareForNextTurn = () => {
        setGameState({ ...gameState });
        const winner = BOARD.winner([gameState.state]);
        if (winner) {
            let msg = `Game Over! `;
            if (winner === -1) msg += `DRAW`;
            else if (winner === playerNum) { setPlayerWins(playerWins + 1); msg += `You win!`; }
            else if (winner === aiNum) { setAiWins(aiWins + 1); msg += `AI wins!`; }
            msg += `\nScore: Player ${playerWins} - AI ${aiWins}\nSelect your player to start a new game.`;
            setGameMessage(msg);
            setMode(0);
        } else {
            if (BOARD.currentPlayer(gameState.state) === playerNum) {
                addText(`Your turn...`);
            } else {
                aiPlay();
            }
        }
    };

    const humanPlay = () => {
        // In placement phase, the human intends to place at the currently selected cell.
        // In movement phase, we assume the human selects a piece to move by highlighting a cell that contains their piece,
        // then (for simplicity) the move is made automatically to the only available neighbor if legal.
        const currentLegalPlays = BOARD.legalPlays([gameState.state]);
        let chosenPlay: TriasPlay;
        if (currentLegalPlays.some(p => p.type === "place")) {
            // placement move: selected cell must be legal.
            const square = gameState.row * 3 + gameState.col;
            if (!currentLegalPlays.find(s => s.type === "place" && s.to === square)) {
                addText(`Invalid placement, try again`);
                return;
            }
            chosenPlay = { player: playerNum, type: "place", to: square };
        } else {
            // movement phase: if the selected cell contains the player's piece,
            // and it has an available neighbor, choose the first legal move.
            const cell = gameState.row * 3 + gameState.col;
            const moves = currentLegalPlays.filter(s => s.type === "move" && s.from === cell);
            if (moves.length === 0) {
                addText(`No legal move from that cell, try again`);
                return;
            }
            chosenPlay = moves[0];
        }
        setText('');
        const newState = BOARD.nextState(gameState.state, chosenPlay);
        setGameState({ state: newState, row: gameState.row, col: gameState.col });
        AI.update(newState);
        prepareForNextTurn();
    };

    const aiPlay = () => {
        AI.stats = [];
        const play = AI.getPlay();
        if (AI.stats.length) addText(AI.stats[0]);
        addText(`AI chooses: ${BOARD.playToOutput(play)}`);
        const newState = BOARD.nextState(gameState.state, play);
        setGameState({ ...gameState, state: newState });
        AI.update(newState);
        prepareForNextTurn();
    };

    const movePosition = (rd: number, cd: number) => {
        const newRow = (gameState.row + rd + 3) % 3;
        const newCol = (gameState.col + cd + 3) % 3;
        setGameState({ ...gameState, row: newRow, col: newCol });
    };

    useInput((input, key) => {
        if (mode === 1) {
            if (key.leftArrow) movePosition(0, -1);
            if (key.rightArrow) movePosition(0, 1);
            if (key.upArrow) movePosition(-1, 0);
            if (key.downArrow) movePosition(1, 0);
            if (input === ' ') {
                humanPlay();
            }
        }
        if (input === 'q') exit();
    });

    const choices = [
        { label: 'Play as X (go first)', value: 1 },
        { label: 'Play as O (go second)', value: 2 },
        { label: 'Random', value: 0 },
    ];

    const onChoosePlayer = (item: { label: string, value: number }) => {
        const chosen = item.value ? item.value : (1 + Math.round(Math.random()));
        setPlayerNum(chosen);
        aiNum = 3 - chosen;
        setMode(1);
        startGame();
    };

    // Update the hint message from AI stats for the currently highlighted cell.
    let hintMessage = 'UNKNOWN';
    {
        const cell = gameState.row * 3 + gameState.col;
        const playsForCell = legalPlays.filter(p => {
            if (p.type === "place") return p.to === cell;
            else return p.from === cell;
        });
        if (playsForCell.length > 0) hintMessage = BOARD.playToOutput(playsForCell[0]);
    }

    // Ensure a valid square is highlighted.
    selectValidSquare();

    return (
        <Box flexDirection="column">
            <GridBoard gameState={gameState} rows={3} cols={3} />
            <Box flexDirection='column' display={mode === 0 ? 'flex' : 'none'}>
                <Text>{gameMessage}</Text>
                <SelectInput items={choices} onSelect={onChoosePlayer} isFocused={mode === 0} />
            </Box>
            <Box flexDirection='column' display={mode === 1 ? 'flex' : 'none'}>
                <Text>Game Status</Text>
                <Text>Player is: {playerNum === 1 ? 'X' : 'O'}</Text>
                <Text>AI is: {aiNum === 1 ? 'X' : 'O'}</Text>
                <Text>HINT: {hintMessage}</Text>
            </Box>
            <Box flexDirection='column'>
                <Text>DEBUG</Text>
                <Text>{text}</Text>
            </Box>
        </Box>
    );
};

render(<App />);
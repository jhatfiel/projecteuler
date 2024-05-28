export type PlayState<PlayType> = {
    play: PlayType;
    nextState: BoardState;
    nextStateHash: bigint|number;
    nextStateNormalized: bigint|number;
}

export interface BoardState {
    getHash(): bigint|number;
    normalize(): bigint|number;
}

export interface BoardInspector {
    getCellPlayer(row: number, col: number): number;
    getCellStyle(row: number, col: number): object;
}

export interface Board<PlayType> {
    start(): BoardState;
    currentPlayer(state: BoardState): number;
    nextPlayer(state: BoardState): number;
    legalPlays(stateHistory: BoardState[]): PlayType[];
    legalPlayStates(stateHistory: BoardState[]): PlayState<PlayType>[];
    toPlayStates(lastState: BoardState, plays: PlayType[]): PlayState<PlayType>[];
    nextState(state: BoardState, play: PlayType): BoardState;
    updateState(state: BoardState, play: PlayType);
    winner(stateHistory: BoardState[]): number;
};
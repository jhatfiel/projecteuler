export type PlayState<PlayType> = {
    play: PlayType;
    nextState: BoardState;
    nextStateHash: bigint;
    nextStateNormalized: bigint;
}

export interface BoardState {
    getHash(): bigint;
    normalize(): bigint;
}

export interface Board<PlayType> {
    start(): BoardState;
    currentPlayer(state: BoardState): number;
    nextPlayer(state: BoardState): number;
    legalPlays(stateHistory: BoardState[]): PlayType[];
    legalPlayStates(stateHistory: BoardState[]): {legal: PlayType[], playStates: PlayState<PlayType>[]};
    nextState(state: BoardState, play: PlayType): BoardState;
    winner(stateHistory: BoardState[]): number;
};
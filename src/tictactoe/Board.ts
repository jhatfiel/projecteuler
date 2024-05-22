export type PlayState<PlayType, StateType=number> = {
    play: PlayType;
    nextState: StateType;
    nextStateNormalized: StateType;
}

export interface Board<PlayType, StateType = number> {
    start(): StateType;
    currentPlayer(state: StateType): number;
    nextPlayer(state: StateType): number;
    legalPlays(stateHistory: StateType[]): PlayType[];
    legalPlayStates(stateHistory: StateType[]): {legal: PlayType[], playStates: PlayState<PlayType, StateType>[]};
    nextState(state: StateType, play: PlayType): StateType;
    winner(stateHistory: StateType[]): number;
    normalize(state: StateType): StateType;
};
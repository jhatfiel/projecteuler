export interface Board<PlayType, StateType = number> {
    start(): StateType;
    currentPlayer(state: StateType): number;
    nextPlayer(state: StateType): number;
    legalPlays(stateHistory: StateType[]): PlayType[];
    nextState(state: StateType, play: PlayType): StateType;
    winner(stateHistory: StateType[]): number;
};
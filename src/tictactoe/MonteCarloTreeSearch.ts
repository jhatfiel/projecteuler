import { Board } from "./Board";
function choice<T>(arr: T[]): T {
    return arr[Math.floor(Math.random()*arr.length)];
}

export class MonteCarlo<PlayType, StateType=number> {
    msFirst = 900;
    msNormal = 80;
    ms: number;

    maxPlays = 100; // how far to look ahead
    C = 1.4; // larger values encourage more exploration, smaller values cause the AI to focus on known good moves

    states: StateType[] = [];
    wins: Map<StateType, number>[] = [];
    plays: Map<StateType, number>[] = [];
    maxDepth = 0;
    running = false;
    stats: string[] = [];

    constructor(private board: Board<PlayType, StateType>, params: { [key: string]: any } = {}) {
        if (params['msFirst'] !== undefined) this.msFirst = params['msFirst'];
        if (params['msNormal'] !== undefined) this.msNormal = params['msNormal'];
        if (params['maxPlays'] !== undefined) this.maxPlays = params['maxPlays'];
        if (params['C'] !== undefined) this.C = params['C'];
        this.ms = this.msFirst;
        this.wins[1] = new Map<StateType, number>();
        this.wins[2] = new Map<StateType, number>();
        this.plays[1] = new Map<StateType, number>();
        this.plays[2] = new Map<StateType, number>();
    }

    replay() {
        this.states = [];
    }

    update(state: StateType) {
        this.states.push(state);
    }

    getPlay(): PlayType {
        if (this.running) return;
        this.running = true;
        let now = Date.now();
        this.maxDepth = 0;
        let state = this.states.at(-1);
        let player = this.board.currentPlayer(state);
        let legal = this.board.legalPlays(this.states);

        if (!legal) {this.running = false; return; }
        if (legal.length === 1) { this.running = false; return legal[0]; }

        let games = 0;
        while (Date.now() - now < this.ms) {
            this.runSimluation();
            games++;
        }
        this.stats.push(`MonteCarlo: ${games} played, ${Date.now()-now}ms`);

        let playStates = legal.map(p => ({play: p, nextState: this.board.nextState(state, p)}));

        let highestPercentage = -Infinity;
        let bestPlay: PlayType;
        playStates.forEach(({play, nextState}) => {
            let plays = this.plays[player].get(nextState) ?? 1;
            let wins = this.wins[player].get(nextState) ?? 0;
            let p = wins/plays;
            if (p > highestPercentage) {
                highestPercentage = p;
                bestPlay = play;
            }
        });

        this.ms = this.msNormal;
        this.running = false;
        return bestPlay;
    }

    getStats(): string[] {
        let result = this.stats;
        this.stats = [];
        result.push('getPlay() playStates:');
        let state = this.states.at(-1);
        let player = this.board.currentPlayer(state);
        let legal = this.board.legalPlays(this.states);
        let playStates = legal.map(p => ({play: p, nextState: this.board.nextState(state, p)}));
        playStates.forEach(({play, nextState}) => {
            let wins = this.wins[player].get(nextState) ?? 0;
            let plays = this.plays[player].get(nextState) ?? 1;
            let p = wins/plays;
            result.push(`Play: ${JSON.stringify(play)} - ${(100*p).toFixed(2)}% (${this.wins[player].get(nextState)} / ${this.plays[player].get(nextState)}})`);
        });

        result.push(`Maximum depth searched: ${this.maxDepth}`);
        return result;
    }

    printStats() {
        this.getStats().forEach(line => console.error(line));
    }

    runSimluation() {
        let visitedStates: Set<StateType>[] = [];
        let statesCopy = this.states.slice();
        let state = statesCopy.at(-1);
        let player = this.board.currentPlayer(state);
        let expand = true;
        let winner: number;

        visitedStates[1] = new Set<StateType>();
        visitedStates[2] = new Set<StateType>();

        for (let t=0; t < this.maxPlays; t++) {
            let legal = this.board.legalPlays(statesCopy);
            let playStates = legal.map(p => ({play: p, nextState: this.board.nextState(state, p)}));

            let play: PlayType;
            if (playStates.map(ps => ps.nextState).every(ns => this.plays[player].has(ns))) {
                // we have stats on all of the legal moves here, use them
                const logTotal = Math.log(playStates.map(ps => ps.nextState).map(ns => this.plays[player].get(ns)).reduce((total, cnt) => total+=cnt, 0));

                let best = -Infinity;
                playStates.forEach(({play: p, nextState}) => {
                    let wins = this.wins[player].get(nextState);
                    let plays = this.plays[player].get(nextState);
                    let score = wins/plays + this.C*Math.sqrt(logTotal / plays);
                    if (score > best) {
                        best = score;
                        play = p;
                        state = nextState;
                    }
                });
            } else {
                // if we haven't explored every move yet, just choose randomly
                play = choice(legal);
                state = this.board.nextState(state, play);
            }
            statesCopy.push(state);

            if (expand && !this.plays[player].has(state)) {
                expand = false;
                this.plays[player].set(state, 0);
                this.wins[player].set(state, 0);
                if (t > this.maxDepth) this.maxDepth = t;
            }

            visitedStates[player].add(state);

            player = this.board.currentPlayer(state);
            winner = this.board.winner(statesCopy);
            if (winner) break;
        }

        for (player of [1,2]) {
            for (state of visitedStates[player]) {
                if (!this.plays[player].has(state)) continue;
                this.plays[player].set(state, this.plays[player].get(state)+1);
                if (player === winner) this.wins[player].set(state, this.wins[player].get(state)+1);
            }
        }
    }
}
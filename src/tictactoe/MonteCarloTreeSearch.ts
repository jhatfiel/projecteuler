import { Board, PlayState } from "./Board";
function choice<T>(arr: T[]): T {
    return arr[Math.floor(Math.random()*arr.length)];
}

// we can convert StateType to a normalized state to handle rotations and reflections
// Board has to know how to do that then
// Board<StateType>.normalize(state: StateType): StateType
// then anywhere we're referencing wins, winsIn, plays, explored, we need to use the normalized version

export class MonteCarlo<PlayType, StateType=number> {
    msFirst = 5000;
    msNormal = 100;
    ms: number;

    maxPlays = 100; // how far to look ahead
    C = 1.4; // larger values encourage more exploration, smaller values cause the AI to focus on known good plays
    skipExplored = true;

    states: StateType[] = [];
    wins: Map<StateType, number>[] = [];
    winsIn: Map<StateType, number>[] = [];
    plays: Map<StateType, number>[] = [];
    explored = new Set<StateType>();
    maxDepth = 0;
    running = false;
    stats: string[] = [];

    constructor(private board: Board<PlayType, StateType>, params: { msFirst?: number, msNormal?: number, maxPlays?: number, c?: number, C?: number, skipExplored?: boolean } = {}) {
        if (params['msFirst'] !== undefined) this.msFirst = params.msFirst;
        if (params['msNormal'] !== undefined) this.msNormal = params.msNormal;
        if (params['maxPlays'] !== undefined) this.maxPlays = params.maxPlays;
        if (params['C'] !== undefined) this.C = params.C;
        if (params['skipExplored'] !== undefined) this.skipExplored = params.skipExplored;
        this.ms = this.msFirst;
        this.wins[1] = new Map<StateType, number>();
        this.wins[2] = new Map<StateType, number>();
        this.winsIn[1] = new Map<StateType, number>();
        this.winsIn[2] = new Map<StateType, number>();
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
        let stateNormalized = this.board.normalize(state);
        let player = this.board.currentPlayer(state);
        let {legal, playStates} = this.board.legalPlayStates(this.states);

        if (!legal) {this.running = false; return; }
        if (legal.length === 1) { this.running = false; return legal[0]; }

        let games = 0;
        // if the base state is marked as explored.... we're done, even if enough time hasn't passed.
        while (Date.now() - now < this.ms && !this.explored.has(stateNormalized)) {
            this.runSimluation();
            games++;
        }
        this.stats.push(`MonteCarlo: ${games} games played, ${Date.now()-now}ms ${this.explored.size} explored nodes, ${this.explored.has(stateNormalized)?'FULLY EXPLORED':''}`);

        let bestPlay: PlayType;
        if (this.explored.has(stateNormalized)) {
            // fully explored, pick one of the best plays
            ({play: bestPlay} = this.pickBestCasePlay(stateNormalized, player, playStates));
        } else {
            // if we KNOW we can win, we shouldn't pass that up, should we?
            let winners = playStates.filter(ps => this.winsIn[player].has(ps.nextStateNormalized));
            if (winners.length) {
                let fastestWinIn = winners.map(ps => this.winsIn[player].get(ps.nextStateNormalized)).reduce((acc, i) => Math.min(acc, i), Infinity);
                ({play: bestPlay} = choice(winners.filter(ps => this.winsIn[player].get(ps.nextStateNormalized) === fastestWinIn)));
            } else {
                // pick the play that has historically given the best outcome, while at the same time NOT picking something that we KNOW will lose
                let highestPercentage = -Infinity;
                bestPlay = choice(playStates).play; // if all states are losing, we wouldn't end up picking a state here
                playStates
                    .filter(ps => !this.winsIn[3-player].has(ps.nextStateNormalized)) // don't pick a state that is losing
                    .filter(ps => !this.board.legalPlayStates([ps.nextState]).playStates.some(nps => this.winsIn[3-player].has(nps.nextStateNormalized))) // don't pick a state where the opponent can pick a winning state
                    .forEach(({play, nextStateNormalized}) => {
                        let plays = this.plays[player].get(nextStateNormalized) ?? 1;
                        let wins = this.wins[player].get(nextStateNormalized) ?? 0;
                        let p = wins/plays;
                        if (p > highestPercentage) {
                            highestPercentage = p;
                            bestPlay = play;
                        }
                    });
            }
        }

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
        this.board.legalPlayStates(this.states).playStates.forEach(({play, nextStateNormalized}) => {
            let wins = this.wins[player].get(nextStateNormalized) ?? 0;
            let plays = this.plays[player].get(nextStateNormalized) ?? 1;
            let p = wins/plays;
            result.push(`Play: ${JSON.stringify(play)} - ${(100*p).toFixed(2)}% (${this.wins[player].get(nextStateNormalized)} / ${this.plays[player].get(nextStateNormalized)}})`);
        });

        result.push(`Maximum depth searched: ${this.maxDepth}`);
        return result;
    }

    printStats() {
        this.getStats().forEach(line => console.error(line));
    }

    pickBestCasePlay(stateNormalized: StateType, player: number, playStates: PlayState<PlayType, StateType>[], updateStats=false): PlayState<PlayType, StateType> {
        // we have fully explored the child states - there's no point in continuing
        // pick a random "best case" and return
        let bestCaseWinIn = new Map<number, PlayState<PlayType, StateType>[]>();
        let bestCaseLoseIn = new Map<number, PlayState<PlayType, StateType>[]>();
        // to be more generic, I guess we should track how far away the draw would be
        let bestCaseDraw: PlayState<PlayType, StateType>[] = [];
        playStates.forEach(ps => {
            let winsIn = this.winsIn[player].get(ps.nextStateNormalized);
            let losesIn = this.winsIn[3-player].get(ps.nextStateNormalized);
            if (winsIn !== undefined) {
                if (!bestCaseWinIn.has(winsIn)) bestCaseWinIn.set(winsIn, []);
                bestCaseWinIn.get(winsIn).push(ps);
            } else if (losesIn !== undefined) {
                if (!bestCaseLoseIn.has(losesIn)) bestCaseLoseIn.set(losesIn, []);
                bestCaseLoseIn.get(losesIn).push(ps);
            } else {
                bestCaseDraw.push(ps);
            }
        });
        let bestArr: PlayState<PlayType, StateType>[] = [];
        if (bestCaseWinIn.size) {
            let fastestWinIn = [...bestCaseWinIn.keys()].reduce((acc, i) => Math.min(acc, i), Infinity);
            if (updateStats) this.winsIn[player].set(stateNormalized, fastestWinIn+1);
            bestArr = bestCaseWinIn.get(fastestWinIn);
        } else if (bestCaseDraw.length) {
            bestArr = bestCaseDraw;
        } else {
            let furthestLossIn = [...bestCaseLoseIn.keys()].reduce((acc, i) => Math.max(acc, i), 0);
            if (updateStats) this.winsIn[3-player].set(stateNormalized, furthestLossIn+1);
            bestArr = bestCaseLoseIn.get(furthestLossIn);
        }

        return choice(bestArr);
    }

    runSimluation() {
        let visitedStates: Set<StateType>[] = [];
        let statesCopy = this.states.slice();
        let state = statesCopy.at(-1);
        let stateNormalized = this.board.normalize(state);
        let player = this.board.currentPlayer(state);
        let expand = true;
        let winner: number;

        visitedStates[1] = new Set<StateType>();
        visitedStates[2] = new Set<StateType>();

        visitedStates[player].add(stateNormalized);

        for (let t=0; t < this.maxPlays; t++) {
            let {playStates} = this.board.legalPlayStates(statesCopy);
            let unexploredStates = playStates.filter(ps => !this.skipExplored || !this.explored.has(ps.nextStateNormalized));
            if (unexploredStates.length === 0) {
                // all child states are explored
                this.explored.add(stateNormalized);
                if (!this.plays[3-player].has(stateNormalized)) {
                    this.plays[3-player].set(stateNormalized, 0);
                    this.wins[3-player].set(stateNormalized, 0);
                }

                // pick the best state and stop the simulation, while marking this state correctly
                let nextPS = this.pickBestCasePlay(stateNormalized, player, playStates, true);

                // setup everything so that we fall out of the for loop
                ({nextState: state, nextStateNormalized: stateNormalized} = nextPS);
                statesCopy.push(state);
                visitedStates[player].add(stateNormalized);
                if (this.winsIn[player].has(stateNormalized)) winner = player
                else if (this.winsIn[3-player].has(stateNormalized)) winner = 3-player;
                else winner = -1;
            } else {
                if (unexploredStates.map(ps => ps.nextStateNormalized).every(ns => this.plays[player].has(ns))) {
                    // we have stats on all of the unexplored plays here, use them
                    const logTotal = Math.log(unexploredStates.map(ps => ps.nextStateNormalized).map(ns => this.plays[player].get(ns)).reduce((total, cnt) => total+=cnt, 0));

                    let best = -Infinity;
                    unexploredStates.forEach(({nextStateNormalized: ns}) => {
                        let wins = this.wins[player].get(ns);
                        let plays = this.plays[player].get(ns);
                        let score = wins/plays + this.C*Math.sqrt(logTotal / plays);
                        if (score > best) {
                            best = score;
                            state = ns;
                        }
                    });
                    stateNormalized = this.board.normalize(state);
                } else {
                    // if we haven't tried every play at least once yet, just choose randomly
                    ({nextState: state, nextStateNormalized: stateNormalized} = choice(unexploredStates));
                }
                statesCopy.push(state);
                visitedStates[player].add(stateNormalized);
                winner = this.board.winner(statesCopy);
                if (winner > 0) this.winsIn[player].set(stateNormalized, 0);
            }

            if ((winner || expand) && !this.plays[player].has(stateNormalized)) {
                expand = false;
                this.plays[player].set(stateNormalized, 0);
                this.wins[player].set(stateNormalized, 0);
                if (t > this.maxDepth) this.maxDepth = t;
            }

            if (winner) {
                this.explored.add(stateNormalized);
                break;
            }
            player = this.board.currentPlayer(state);
        }

        for (player of [1,2]) {
            for (let stateNormalized of visitedStates[player]) {
                if (!this.plays[player].has(stateNormalized)) continue;
                this.plays[player].set(stateNormalized, this.plays[player].get(stateNormalized)+1);
                if (player === winner) this.wins[player].set(stateNormalized, this.wins[player].get(stateNormalized)+1);
            }
        }
    }
}
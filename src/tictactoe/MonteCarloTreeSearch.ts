import { Board, BoardState, PlayState } from "./Board";
function choice<T>(arr: T[]): T {
    return arr[Math.floor(Math.random()*arr.length)];
}

// we can convert StateType to a normalized state to handle rotations and reflections
// Board has to know how to do that then
// Board<StateType>.normalize(state: StateType): StateType
// then anywhere we're referencing wins, winsIn, plays, explored, we need to use the normalized version

export class MonteCarlo<PlayType> {
    msFirst = 5000;
    msNormal = 100;
    ms: number;

    maxPlays = 100; // how far to look ahead
    C = 1.4; // larger values encourage more exploration, smaller values cause the AI to focus on known good plays
    skipExplored = true;

    states: BoardState[] = [];
    wins: Map<bigint|number, number>[] = [];
    winsIn: Map<bigint|number, number>[] = [];
    plays: Map<bigint|number, number>[] = [];
    explored = new Set<bigint|number>();
    maxDepth = 0;
    running = false;
    stats: string[] = [];

    constructor(private board: Board<PlayType>, params: { msFirst?: number, msNormal?: number, maxPlays?: number, c?: number, C?: number, skipExplored?: boolean } = {}) {
        if (params['msFirst'] !== undefined) this.msFirst = params.msFirst;
        if (params['msNormal'] !== undefined) this.msNormal = params.msNormal;
        if (params['maxPlays'] !== undefined) this.maxPlays = params.maxPlays;
        if (params['C'] !== undefined) this.C = params.C;
        if (params['skipExplored'] !== undefined) this.skipExplored = params.skipExplored;
        this.ms = this.msFirst;
        this.wins[1] = new Map<bigint|number, number>();
        this.wins[2] = new Map<bigint|number, number>();
        this.winsIn[1] = new Map<bigint|number, number>();
        this.winsIn[2] = new Map<bigint|number, number>();
        this.plays[1] = new Map<bigint|number, number>();
        this.plays[2] = new Map<bigint|number, number>();
        this.states = [];
    }

    replay() {
        this.states = [];
    }

    update(state: BoardState) {
        this.states.push(state);
    }

    getPlay(): PlayType {
        if (this.running) return;
        this.running = true;
        let now = Date.now();
        this.maxDepth = 0;
        let state = this.states.at(-1);
        let stateNormalized = state.normalize();
        let player = this.board.currentPlayer(state);
        let plays = this.board.legalPlays(this.states);

        if (!plays) {this.running = false; return; }
        if (plays.length === 1) { this.running = false; return plays[0]; }

        let games = 0;
        // if the base state is marked as explored.... we're done, even if enough time hasn't passed.
        while (Date.now() - now < this.ms && !this.explored.has(stateNormalized)) {
            this.runSimluation();
            games++;
        }
        this.stats.push(`MonteCarlo: ${games} games played, ${Date.now()-now}ms ${this.explored.size} explored nodes, ${this.explored.has(stateNormalized)?'FULLY EXPLORED':''}`);

        let playStates = this.board.toPlayStates(this.states.at(-1), plays);

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
                    .filter(ps => !this.board.legalPlayStates([ps.nextState]).some(nps => this.winsIn[3-player].has(nps.nextStateNormalized))) // don't pick a state where the opponent can pick a winning state
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
        this.board.legalPlayStates(this.states).forEach(({play, nextStateNormalized}) => {
            let wins = this.wins[player].get(nextStateNormalized) ?? 0;
            let plays = this.plays[player].get(nextStateNormalized) ?? 1;
            let p = wins/plays;
            result.push(`Play: ${JSON.stringify(play)} - ${(100*p).toFixed(2)}% (${this.wins[player].get(nextStateNormalized)} / ${this.plays[player].get(nextStateNormalized)}})`);
        });

        result.push(`Maximum depth searched: ${this.maxDepth}`);
        return result;
    }

    getStatsForPlay(play: PlayType, state: BoardState): {plays: number, wins: number, winPercent: string, explored: boolean, winsIn: number, losesIn: number} {
        let currentPlayer = this.board.currentPlayer(state);
        let plays: number;
        let wins: number;
        let winPercent: string;
        let explored: boolean;
        let winsIn: number;
        let losesIn: number;

        if (this.board.legalPlays([state]).find(s => Object.keys(s).every(k => s[k] === play[k]))) {
            let nextStateNormalized = this.board.nextState(state, play).normalize();

            plays = this.plays[currentPlayer].get(nextStateNormalized)?? 1;
            wins = this.wins[currentPlayer].get(nextStateNormalized)?? 0;
            winPercent = (100*wins/plays).toFixed(2) + '%';
            explored = this.explored.has(nextStateNormalized);
            winsIn = this.winsIn[currentPlayer].get(nextStateNormalized);
            losesIn = this.winsIn[3-currentPlayer].get(nextStateNormalized);
        }

        return {plays, wins, winPercent, explored, winsIn, losesIn};
    }

    printStats() {
        this.getStats().forEach(line => console.error(line));
    }

    pickBestCasePlay(stateNormalized: bigint|number, player: number, playStates: PlayState<PlayType>[], updateStats=false): PlayState<PlayType> {
        // we have fully explored the child states - there's no point in continuing
        // pick a random "best case" and return
        let bestCaseWinIn = new Map<number, PlayState<PlayType>[]>();
        let bestCaseLoseIn = new Map<number, PlayState<PlayType>[]>();
        // to be more generic, I guess we should track how far away the draw would be
        let bestCaseDraw: PlayState<PlayType>[] = [];
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
        let bestArr: PlayState<PlayType>[] = [];
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
        let visitedStates: Set<bigint|number>[] = [];
        let statesCopy = this.states.slice();
        let state = statesCopy.at(-1);
        let stateNormalized = state.normalize();
        let player = this.board.currentPlayer(state);
        let expand = true;
        let winner: number;

        visitedStates[1] = new Set<bigint|number>();
        visitedStates[2] = new Set<bigint|number>();

        visitedStates[player].add(stateNormalized);

        for (let t=0; t < this.maxPlays; t++) {
            let playStates = this.board.legalPlayStates(statesCopy);
            /*
            // quickly mark each child state if it's an endgame state
            // this way we are guaranteed to NOT select something that will cause us to lose immediately
            playStates
                .filter(ps => !this.explored.has(ps.nextStateNormalized) && this.board.winner([ps.nextState]))
                .forEach(ps => {
                    if (!this.plays[3-player].has(ps.nextStateNormalized)) {
                        this.plays[3-player].set(ps.nextStateNormalized, 1);
                        this.wins[3-player].set(ps.nextStateNormalized, 0);
                    }
                    let winner = this.board.winner([ps.nextState]);
                    if (winner === player) this.wins[player].set(ps.nextStateNormalized, this.wins[player].get(ps.nextStateNormalized)+1);
                    else if (winner === 3-player) this.wins[3-player].set(ps.nextStateNormalized, this.wins[3-player].get(ps.nextStateNormalized)+1);
                    this.explored.add(ps.nextStateNormalized);
                });
                */
            let unexploredStates = playStates.filter(ps => !this.skipExplored || !this.explored.has(ps.nextStateNormalized));
            if (unexploredStates.length === 0) {
                // all child states are explored
                this.explored.add(stateNormalized);
                if (!this.plays[3-player].has(stateNormalized)) {
                    this.plays[3-player].set(stateNormalized, 0);
                    this.wins[3-player].set(stateNormalized, 0);
                }

                // pick the best state and stop the simulation, while marking this state correctly
                // setup everything so that we fall out of the for loop
                ({nextState: state, nextStateNormalized: stateNormalized} = this.pickBestCasePlay(stateNormalized, player, playStates, true));
                statesCopy.push(state);
                visitedStates[player].add(stateNormalized);
                if (this.winsIn[player].has(stateNormalized)) winner = player
                else if (this.winsIn[3-player].has(stateNormalized)) winner = 3-player;
                else winner = -1;
            } else {
                if (unexploredStates.every(ps => this.plays[player].has(ps.nextStateNormalized))) {
                    // we have stats on all of the unexplored plays here, use them
                    const logTotal = Math.log(unexploredStates.map(ps => this.plays[player].get(ps.nextStateNormalized)).reduce((total, cnt) => total+=cnt, 0));

                    let best = -Infinity;
                    unexploredStates.forEach(({nextState: ns, nextStateNormalized: nsn}) => {
                        let wins = this.wins[player].get(nsn);
                        let plays = this.plays[player].get(nsn);
                        let score = wins/plays + this.C*Math.sqrt(logTotal / plays);
                        if (score > best) {
                            best = score;
                            state = ns;
                            stateNormalized = nsn;
                        }
                    });
                } else {
                    // if we haven't tried every play at least once yet, just choose randomly
                    // should we limit the search to the unexplored states or all states? This encourages filling out the tree faster, but that may not be desirable
                    //({nextState: state, nextStateNormalized: stateNormalized} = choice(unexploredStates.filter(ps => !this.plays[player].has(ps.nextStateNormalized))));
                    //({nextState: state, nextStateNormalized: stateNormalized} = choice(playStates));
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
import { Puzzle } from '../lib/Puzzle';

export class acvz extends Puzzle {
    lineNum = 0;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        Sim.initialInput = [...lines];
    }

    _runStep(): boolean {
let STATE = Sim.ReadInitialStateFromInput();
let choices: CompoundStrategy[] = [];
let potentialStrategies = Object.keys(Strategy);

let simStart = Date.now();
let strategiesTried = 0;
potentialStrategies.forEach(sNameA => {
    // first try with just sNameA to get baseline for this strategy
    let strategyName = sNameA;
    let baseCs: CompoundStrategy = {strategyOnTurn: [strategyName], turnCount: 0, score: 0};
    checkStrategy(STATE, baseCs);
    strategiesTried++;
    if (baseCs.score) choices.push(baseCs);

    potentialStrategies.filter(s => s != sNameA).forEach(sNameB => {
        for (let changeTurn = baseCs.turnCount-1; changeTurn > 0; changeTurn--) {
            let cs: CompoundStrategy = {strategyOnTurn: Array.from({length: baseCs.turnCount}, (_, ind) => ind < changeTurn ? sNameA : sNameB), turnCount: 0, score: 0};
            checkStrategy(STATE, cs);
            strategiesTried++;
            if (cs.score) choices.push(cs);
            if (changeTurn < baseCs.turnCount-1) {
                // some time after we switch to this strategy, switch to another strategy
                let randomCs = {strategyOnTurn: [...cs.strategyOnTurn], turnCount:0, score:0};
                randomCs.strategyOnTurn[Math.floor(changeTurn+Math.random()*(cs.turnCount-changeTurn))] = potentialStrategies[Math.floor(Math.random()*potentialStrategies.length)];
                checkStrategy(STATE, randomCs);
                strategiesTried++;
                if (randomCs.score) choices.push(randomCs);
            }
            /*
            let randomCs = {strategyOnTurn: [...cs.strategyOnTurn], turnCount:0, score:0};
            randomCs.strategyOnTurn[Math.floor(Math.random()*cs.turnCount)] = potentialStrategies[Math.floor(Math.random()*potentialStrategies.length)];
            checkStrategy(STATE, randomCs);
            strategiesTried++;
            if (randomCs.score) choices.push(randomCs);
            */
        }
    });
})
simStart = Date.now() - simStart;

// select best choice
let strategyOnTurn: string[];
let bestScore = -Infinity;
choices.forEach(cs => {
    if (cs.score > bestScore) {
        bestScore = cs.score;
        strategyOnTurn = cs.strategyOnTurn;
    }
})

console.error(`Selected strategy: ${describeStrategyOnTurnArray(strategyOnTurn).join(' / ')}, total sim time: ${simStart}ms (${strategiesTried} strategies tried)`);
/*
let turn = 0;

while (true) {
    let stratName = strategyOnTurn[turn];
    STATE.ash.message = stratName;
    Strategy[stratName](STATE);
    turn++;

    Sim.SimulateTurn(STATE);

    //console.error(`----- PREDICTED NEXT STATE -----`);
    //Sim.DebugState(STATE);

    if (Sim.IsFinished(STATE)) {
        console.error(`Strategy = ${describeStrategyOnTurnArray(strategyOnTurn).join(' / ')}, score = ${bestScore}`);
        printChoices(choices);
        Sim.ShowInput();
        break;
    }

    console.log(Sim.GetMoveStr(STATE));
    Sim.UpdateStateFromInput(STATE);
}
*/
        printChoices(choices);
        return false;
    }
}

// we have roughly 1.5s of time before we fail on time
const ZOMBIE_SPEED = 400;
const ASH_SPEED = 1000;
const ASH_RANGE = 2000;

type Pair = {
    x: number;
    y: number;
};

let [p1,p2]=[1,0]; 
let killValueCache = Array.from({length: 30}, _ => {[p1,p2] = [p1+p2,p1]; return p1;});
function killValue(cnt: number): number {
    if (cnt === 0) return 1;
    if (cnt === 1) return 2;
    let cached = killValueCache[cnt];
    if (cached === undefined) {
        cached = killValue(cnt-1) + killValue(cnt-2);
        killValueCache[cnt] = cached;
    }
    return cached;
}

export class Character {
    constructor(public type: number, public id: number, public name: string) {
        if (name === 'Ash') {
            this.speed = ASH_SPEED;
            this.range = ASH_RANGE;
        } else if (type === 1) {
            this.speed = ZOMBIE_SPEED;
        }
        this.rangeSquared = this.range**2;
        this.speedSquared = this.speed**2;
    }
    speed = 0;
    speedSquared = 0;
    range = 0;
    rangeSquared = 0;
    position: Pair;
    nextPosition: Pair;
    target: Pair;
    message = '';
    alive = true;

    toString(): string {
        let moves = this.speed > 0;
        return `${this.name} ` +
               `(${this.position?.x},${this.position?.y})` +
               (this.alive?(moves?` ${this.nextPosition?.x},${this.nextPosition?.y} T=${this.target?.x},${this.target?.y}`:''):' DEAD');
    }

    clone(): Character {
        let result = new Character(this.type, this.id, this.name);
        result.position = {...this.position};
        result.nextPosition = {...this.nextPosition};
        result.target = {...this.target};
        result.alive = this.alive;

        return result;
    }

    closest(arr: (Pair|Character)[]): Pair {
        let pairArr = arr.filter(p => !(p instanceof Character) || p.alive).map(p => (p instanceof Character)?p.position:p);
        let result: Pair;
        let resultDS = Infinity;
        pairArr.forEach(p => {
            let ds = this.distanceSquared(p);
            if (ds < resultDS) {
                resultDS = ds;
                result = p;
            }
        })
        return result;
    }

    targetClosest(arr: (Pair|Character)[]) {
        this.setTarget(this.closest(arr));
    }

    setTarget(t: Pair|Character) {
        let p = (t instanceof Character)?t.position:t;
        this.target = {...p};

        let dx = this.target.x - this.position.x;
        let dy = this.target.y - this.position.y;
        let distance = Math.sqrt(dx**2 + dy**2);
        if (distance < this.speed) this.nextPosition = {...this.target};
        else this.nextPosition = {x: this.position.x+Math.floor(dx*this.speed/distance), y: this.position.y+Math.floor(dy*this.speed/distance)};
    }

    // useful for quickly judging closeness
    distanceSquared(pos: Pair): number {
        return (pos.x-this.position.x)**2 + (pos.y-this.position.y)**2;
    }

    distance(pos: Pair): number {
        return Math.sqrt(this.distanceSquared(pos));
    }

    move() {
        this.position = this.nextPosition;
    }
}

export type SimulationState = {
    ash: Character;
    humans: Character[];
    zombies: Character[];
    score: number;
};

export class Sim {
    static initialInput: string[] = [];
    static initialized = false;
    static CloneState(ss: SimulationState): SimulationState {
        return { ...ss,
                 ash: ss.ash.clone(),
                 humans: ss.humans.map(h => h.clone()),
                 zombies: ss.zombies.map(z => z.clone())};
    }

    static readline() {
        let str: string;
        try {
            str = global.readline();
            if (!Sim.initialized) Sim.initialInput.push(str);
        } catch (e) {
            str = this.initialInput.shift();
        }
        return str;
    }

    static ShowInput() {
        Sim.initialInput.forEach(str => console.error(str));
    }

    static ReadInitialStateFromInput(): SimulationState {
        let state: SimulationState = {ash: new Character(0, 100, 'Ash'), humans: [], zombies: [], score: 0};
        Sim.UpdateStateFromInput(state);
        Sim.initialized = true;
        return state;
    }

    static UpdateStateFromInput(ss: SimulationState) {
        let str = Sim.readline();
        let [x, y] = str.split(' ').map(Number);
        if (ss.ash.position?.x !== x || ss.ash.position?.y !== y) {
            this.InputUpdateError(`Updating position of ${ss.ash} to (${x},${y})`);
            ss.ash.position = {x,y};
            this.InputUpdateError(`${ss.ash}`);
        }

        this.UpdateCharacters(ss.humans, 0, Number(Sim.readline()));
        this.UpdateCharacters(ss.zombies, 1, Number(Sim.readline()));
    }

    static UpdateCharacters(arr: Character[], type: number, count: number) {
        let alive: number[] = [];
        for (let i = 0; i < count; i++) {
            let [id, x, y, xNext, yNext] = Sim.readline().split(' ').map(Number);
            alive.push(id);
            let c = arr[id];
            if (!c) {
                c = new Character(type, id, `${type===0?'H':'Z'}${id}`);
                arr[id] = c;
                this.InputUpdateError(`${c} CREATED`);
            }
            if (c.position?.x !== x || c.position?.y !== y) {
                this.InputUpdateError(`Updating position of ${c} to (${x},${y})`);
                c.position = {x, y};
            }
            if (xNext !== undefined && yNext !== undefined) {
                if (c.nextPosition?.x !== xNext || c.nextPosition?.y !== yNext) {
                    this.InputUpdateError(`Updating nextPosition of ${c} to (${xNext},${yNext})`);
                    c.nextPosition = {x: xNext, y: yNext};
                }
            }
            if (!c.alive) {
                this.InputUpdateError(`${c} is now ALIVE`);
                c.alive = true;
            }
        }
        arr.filter(c => c.alive && alive.indexOf(c.id) === -1)
           .forEach(c => this.InputUpdateError(`${c} is actually DEAD`));
    }

    static DebugState({ash, humans, zombies, score}: SimulationState) {
        console.error(`Current Score: ${score}`);
        console.error(ash.toString());
        humans.forEach(h => console.error(`Human ${h.id}: ${h}`));
        zombies.forEach(z => console.error(`Zombie ${z.id}: ${z}`));
    }

    static InputUpdateError(msg: string) {
        if (Sim.initialized) {
            console.error(`INPUT: ${msg}`);
            throw new Error(`State not correctly predicted, ERROR!!`);
        }
    }

    static IsFinished({ash, humans, zombies}: SimulationState): boolean {
        return Sim.IsLoss({ash, humans}) || !zombies.filter(z => z.alive).length;
    }

    static IsLoss({ash, humans}: {ash: Character, humans: Character[]}) {
        return !ash.alive || !humans.filter(h => h.alive).length
    }

    static GetMoveStr({ash}: SimulationState) {
        return `${ash.target.x} ${ash.target.y} ${ash.message}`;
    }

    /**
     * Modify the state - make a copy yourself if you need to run multiple simulations
     */
    static SimulateTurn(ss: SimulationState) {
        let zombiesKilled = 0;

        // 1. Zombies move towards their targets
        // Implied here is that they move to their nextPosition - we don't technically know what their target is
        //console.error(`1.`);
        ss.zombies.forEach(z => z.move());

        // 2. Ash moves towards his target (the target is the output from the previous turn, so we know this)
        //console.error(`2.`);
        ss.ash.move();
        
        // 3. Any zombie within 2000 of Ash is destroyed
        //console.error(`3.`);
        let roundScore = 0;
        ss.zombies.filter(z => z.alive && z.distanceSquared(ss.ash.position) <= ss.ash.rangeSquared)
                  .filter(z => {
                    roundScore += killValue(zombiesKilled);
                    //console.error(`ASH SHOT ${z}`);
                    zombiesKilled++;
                    z.alive = false;
                  });
        if (roundScore) ss.score += roundScore * ss.humans.filter(h => h.alive).length**2 * 10;
                  
        //console.error(`4.`);
        // 4. Zombies eat any human they share coordinates with
        ss.zombies.filter(z => z.alive)
                  .forEach(z => ss.humans.filter(h => h.alive && h.distanceSquared(z.position) === 0)
                                         .forEach(h => h.alive = false));

        //console.error(`5.`);
        // (implied task)
        // Acquire new target for zombies and set nextPosition
        ss.zombies.forEach(z => z.targetClosest([ss.ash, ...ss.humans]));
        //console.error(`DONE`);
    }

    static CalculateCentroid(points: (Character|Pair)[]): Pair {
        let pSum = {x: 0, y: 0};
        let pCount = 0;

        points.filter(z => !(z instanceof Character) || z.alive)
              .map(z => z instanceof Character?z.position:z)
              .filter(p => { pSum.x += p.x; pSum.y += p.y; pCount++; });
        return {x: Math.round(pSum.x/pCount), y: Math.round(pSum.y/pCount)};
    }
}

export type StrategyFunction = (ss: SimulationState) => void;

export const Strategy: { [key: string]: StrategyFunction } = {
    ProtectClosest({ash, humans}: SimulationState) {
        ash.targetClosest(humans);
    },

    TargetClosest({ash, zombies}: SimulationState) {
        ash.targetClosest(zombies);
    },

    ProtectMostEndangered({ash, humans, zombies}: SimulationState) {
        let mostEndangered: Character;
        let closestZombiePosition: Pair;
        let distanceToClosestZombie = Infinity;
        humans.filter(h => h.alive)
              .forEach(h => {
                let zPosition = h.closest(zombies);
                let d = h.distanceSquared(zPosition);
                if (d < distanceToClosestZombie) {
                    distanceToClosestZombie = d;
                    closestZombiePosition = {...zPosition};
                    mostEndangered = h;
                }
              });
        ash.setTarget(closestZombiePosition);
    },

    ProtectMostEndangeredIfPossible({ash, humans, zombies}: SimulationState) {
        let mostEndangered: Character;
        let closestZombiePosition: Pair;
        let distanceToClosestZombie = Infinity;
        humans.filter(h => h.alive)
              .forEach(h => {
                let zPosition = h.closest(zombies);
                let d = h.distance(zPosition);
                if (d < distanceToClosestZombie) {
                    let turnsTillDeath = Math.ceil(d / ZOMBIE_SPEED);
                    if (Math.ceil((ash.distance(h.position)-ASH_RANGE) / ASH_SPEED) > turnsTillDeath) {
                    } else {
                        distanceToClosestZombie = d;
                        closestZombiePosition = {...zPosition};
                        mostEndangered = h;
                    }
                }
              });
        if (closestZombiePosition) {
            ash.setTarget(closestZombiePosition);
        } else {
            // just go protect the closest human...
            ash.setTarget(humans.filter(h => h.alive)[0]);
        }
    },

    // simply move towards the center of all living zombies
    MoveTowardsCentroid({ash, humans, zombies}: SimulationState) {
        ash.message = '⚔️';
        ash.setTarget(Sim.CalculateCentroid(zombies));
    },

    // simply move away from the centroid (move far away if the centroid is close.  Move slightly if the centroid is far away...)
    // this one should probably decide to step into the mass of zombies if they are all within range at some point
    // because it will just run away forever otherwise.
    // like, if all zombies are within ASH_RANGE of the centroid, stop running away?
    MoveAwayFromCentroidStraight({ash, humans, zombies}: SimulationState) {
        let centroid = Sim.CalculateCentroid(zombies);
        if (zombies.filter(z => z.alive).some(z => z.distanceSquared(centroid) > ash.rangeSquared)) {
            ash.message = '😱';
            let factor = ash.rangeSquared / ash.distanceSquared(centroid);
            let dx = ash.position.x - centroid.x;
            let dy = ash.position.y - centroid.y;
            ash.setTarget({x: Math.floor(ash.position.x + factor*dx), y: Math.floor(ash.position.y + factor*dy)});
            if (ash.target.x < 16000 && ash.target.y < 9000 && ash.target.x >= 0 && ash.target.y >= 0) return;
        }
        // we couldn't run away anymore, just attack the centroid
        ash.message = '⚔️';
        ash.setTarget(centroid);
    },

    /*
    // start with the MoveAwayFromCentroidStraight heading and bring it around CW as far as possible without being in range
    // what does in range mean if you are surrounded?
    MoveAwayFromCentroidCW({ash, humans, zombies}: SimulationState) {
    },

    // same as MoveAwayFromCentroidCW but CCW
    MoveAwayFromCentroidCCW({ash, humans, zombies}: SimulationState) {
    },

    // this is probably too complex to calculate
    AggroAndKiteClosestThreat({ash, humans, zombies}: SimulationState) {

    },
    */
}

// what if we allowed ourselves to switch strategies during the game?
export type CompoundStrategy = {
    strategyOnTurn: string[];
    turnCount: number;
    score: number;
}

export function describeStrategyOnTurnArray(strategyOnTurn: string[]): string[] {
    let currentStrat = strategyOnTurn[0];
    let strats: string[] = [`${currentStrat}:0`];
    strategyOnTurn.forEach((s, ind) => {
        if (s !== currentStrat) {
            strats.push(`${s}:${ind}`);
            currentStrat = s;
        }
    });
    return strats;
}

export function printChoices(choices: CompoundStrategy[]) {
    choices.sort((a, b) => b.score - a.score)//.slice(0, 20)
           .forEach(cs => {
                console.error(`Strategy ${describeStrategyOnTurnArray(cs.strategyOnTurn).join(' / ')}: ${cs.turnCount} turns: ${cs.score}`);
           });
}

export function checkStrategy(baseState: SimulationState, cs: CompoundStrategy) {
    let testState = Sim.CloneState(baseState);
    let stratName: string;
    let turn: number;
    for (turn = 0; turn < 1000; turn++) {
        if (turn < cs.strategyOnTurn.length) stratName = cs.strategyOnTurn[turn];
        else cs.strategyOnTurn.push(stratName);
        Strategy[stratName](testState);
        Sim.SimulateTurn(testState);

        if (Sim.IsFinished(testState)) break;
    }

    cs.turnCount = turn;
    if (!Sim.IsLoss(testState)) {
        cs.score = testState.score;
    }
}

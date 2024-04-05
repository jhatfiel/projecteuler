import { Permutations } from '../lib/CombiPerm';
import { FigurateNumberGenerator } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0061 extends Puzzle {
    input: number;
    figurateNumbersArr: number[][] = [];

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);

        for (let i=3; i<=8; i++) {
            let arr = [...FigurateNumberGenerator(i, 9999)].filter(n => n >= 1000 && n%100 > 9);
            this.figurateNumbersArr.push(arr);
        }
    }

    _runStep(): boolean {
        // it's best to work with the most restrictive numbers
        let n = this.figurateNumbersArr[this.input-1][this.stepNumber-1];
        let moreToDo = this.stepNumber < this.figurateNumbersArr[0].length;

        this.log(`[${this.stepNumber.toString().padStart(5)}] n=${n}`);

        // find all numbers from the other buckets that start with the first two digits of this number

        let picked: number[] = Array.from({length: this.input});
        picked[this.input-1] = n;
        let trials: PotentialSolution[] = [{last: n, picked}];

        while (trials.length) {
            let t = trials.pop();
            let h = t.last % 100;
            let remain = this.input - t.picked.filter(n => n !== undefined).length;
            for (let i=0; i<this.input-1; i++) {
                if (t.picked[i] === undefined) {
                    // if this is the last selected number, it has to match the first 2 digits of the first select number (which is at index this.input-1)
                    for (let candidate of this.figurateNumbersArr[i].filter(n => Math.trunc(n/100) === h && (remain > 1 || n%100 === Math.trunc(t.picked[this.input-1]/100)))) {
                        //this.log(`Could use ${candidate} for ${i}`);
                        let picked = [...t.picked];
                        picked[i] = candidate;
                        let tNew: PotentialSolution = {last: candidate, picked};
                        trials.push(tNew);
                    }
                }
            }
            if (remain === 0) {
                this.log(`Found solution: ${t.picked}`);
                this.result = t.picked.reduce((sum, n)=>sum+=n,0).toString();
                moreToDo = false;
                break;
            }
        }

        return moreToDo;
    }
}

type PotentialSolution = {
    last: number;
    picked: number[];
}
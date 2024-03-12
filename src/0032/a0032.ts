import { Permutations } from '../lib/CombiPerm';
import { Puzzle } from '../lib/Puzzle';

export class a0032 extends Puzzle {
    input: number;
    permutationGen: Generator<number[]>;
    found = new Set<number>();
    bInd: number;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.permutationGen = Permutations(Array.from({length: this.input}, (_, ind) => ind+1));
        this.log(`input: ${this.input}`);
        this.bInd = Math.ceil(this.input/2);
    }

    _runStep(): boolean {
        let next = this.permutationGen.next();
        let moreToDo = !next.done;
        if (moreToDo) {
            let arr = next.value;
            // n digit * m digit = n+m or n+m-1 digits
            // so if we know n, we know n+m+(n+m)=i or n+m+(n+m-1)=i, so m=(i-2n)/2 or m=(i-2n+1)/2
            // 1 digit, m=(9-2)/2=3.5=>Math.ceil=4 or m=(9-2+1)/2=4=>Math.ceil=4
            // 2 digit, m=(9-4)/2=2.5=>Math.ceil=3 or m=(9-4+1)/2=3=>Math.ceil=4
            // 3 digit, m=(9-6)/2=>2
            // 4 digit, m=(9-8)/2=>1
            // 5 digit is not possible
            let a=0;
            let p=arr.slice(this.bInd).reduce((sum, n) => sum*10+n, 0);
            for (let aInd=1; aInd<this.bInd; aInd++) {
                a = a*10 + arr[aInd-1];
                let b=arr.slice(aInd, this.bInd).reduce((sum, n) => sum*10+n, 0);
                if (a > b) break;
                let product = a*b;
                if (product === p && a < b) {
                    this.log(`[${this.stepNumber.toString().padStart(6, ' ')}] num=${arr.join('')} a=${a} b=${b} p=${p}`);
                    this.found.add(p);
                    this.result = [...this.found.values()].reduce((sum, n) => sum+n, 0).toString();
                }
            }
        }
        return moreToDo;
    }
}

import { Permutations, Subsets } from '../lib/CombiPerm';
import { IsPrime, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0060 extends Puzzle {
    input: number;
    primes: number[];
    pairWorks = new Map<number, Map<number, boolean>>();
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.primes = [...PrimeGeneratorMax(100000000)];
    }

    doesPairWork(a: number, b: number): boolean {
        if (!this.pairWorks.has(a)) this.pairWorks.set(a, new Map());
        if (!this.pairWorks.has(b)) this.pairWorks.set(b, new Map());
        if (this.pairWorks.get(a).has(b)) return this.pairWorks.get(a).get(b);
        // we don't know about this one yet so figure it out
        let works = IsPrime(Number(a.toString()+b.toString())) && IsPrime(Number(b.toString()+a.toString()));
        this.pairWorks.get(a).set(b, works);
        this.pairWorks.get(b).set(a, works);
        return works;
    }

    _runStep(): boolean {
        // stepNumber is which prime we will use up to
        let moreToDo = false;
        let lowest = Infinity;
        for (let s of Subsets(this.primes.slice(1).filter(p => p < 10000), this.input, (subset) => {
            let arr = [...subset];
            if (arr.reduce((sum,n)=>sum+=n,0) > lowest) return false;
            //this.log(`okSoFar Current subset: ${arr}, should inspect ${arr.slice(-1)}`);
            let n2 = arr[arr.length-1];
            return arr.slice(0,-1).every(n1 => {
                return this.doesPairWork(n1, n2);
            })
        })) {
            let sum = [...s].reduce((sum, n) => sum+=n,0);
            this.log(`valid: sum=${sum}, numbers=${[...s]}`);
            lowest = sum;
        }

        this.log(`[${this.stepNumber.toString().padStart(5)}] ${lowest}`);
        this.result = lowest.toString();
        return moreToDo;
    }
}

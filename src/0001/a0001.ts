import { Puzzle } from '../lib/Puzzle';

export class a0001 extends Puzzle {
    max: number;
    total = 0;

    sampleMode(): void { };

    sumDiv(n: number, k: number) {
        // what is the sum of all numbers <=n divisible by k?
        // k, 2k, 3k, ..., xk
        // so how many x are there?  Math.floor(n/k)
        // arithmetic progression sum formula = x(k + xk)/2
        let x = Math.floor(n/k);
        return x*(k+x*k)/2;
    }

    _loadData(lines: string[]) { 
        this.max = Number(this.lines[0]);
        // calculate
        let sum3 = this.sumDiv(this.max-1, 3);
        let sum5 = this.sumDiv(this.max-1, 5);
        let sum15 =this.sumDiv(this.max-1, 15);
        //this.log(`3-sum=${sum3}, 5-sum=${sum5}, 15-sum=${sum15}`);
        this.result = (sum3+sum5-sum15).toString();
    }

    _runStep(): boolean {
        /*
        MANUAL METHOD 
        let i = this.stepNumber+1;
        let moreToDo = (i + 1 < this.max);
        if (i % 3 === 0 || i % 5 === 0) {
            this.total += i;
        }
        this.result = this.total.toString();
        return moreToDo;
        */
       return false;
    }
}
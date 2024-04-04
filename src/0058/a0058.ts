import { IsPrime } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0058 extends Puzzle {
    input: number;
    cornerNumberCount = 1;
    primeCount = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let w = this.stepNumber*2 + 1;
        let br = w**2;
        this.cornerNumberCount += 4;
        for (let i=3; i>=0; i--) {
            let n = br-i*(w-1);
            if (IsPrime(n)) this.primeCount++;
        }
        //this.cornerNumberCount++; // don't count the bottom right which is a perfect square and obviously not prime

        let percentPrime = this.primeCount/this.cornerNumberCount;
        this.result = w.toString();
        let moreToDo = this.stepNumber < 3 || percentPrime > this.input;
        if (!moreToDo) this.log(`[${this.stepNumber.toString().padStart(5)}] ${br} ${this.primeCount}/${this.cornerNumberCount} = ${(100*percentPrime).toFixed(2)}%`);
        return moreToDo;
    }
}

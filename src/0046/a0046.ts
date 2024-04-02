import { IsPrime, PrimeGenerator, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0046 extends Puzzle {
    input: number;
    doubleSquare: number[];
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.doubleSquare = [0];
    }

    getDoubleSquare(n: number): number {
        let result = this.doubleSquare[n];
        if (result === undefined) {
            result = 2*n**2
            this.doubleSquare[n] = result;
        }
        return result;
    }

    _runStep(): boolean {
        let n = this.stepNumber;
        // only process odd composites
        if (IsPrime(n) || n % 2 === 0 || n === 1) return true;
        let found = false;
        for (let p of PrimeGenerator()) {
            if (p > n) break;
            // find what square can be doubled and added to this p to get odd composite n
            for (let dsInd = 1; ; dsInd++) {
                let ds = this.getDoubleSquare(dsInd);
                if (p + ds === n) {
                    //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] n = ${n} = ${p} + 2*${dsInd}^2`);
                    found = true;
                }
                if (p + ds > n) break;
            }
            if (found === true) break;
        }
        if (!found) {
            this.result = n.toString();
        }
        return found && n < 100000;
    }
}

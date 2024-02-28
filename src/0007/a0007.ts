import { PrimeGenerator } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0007 extends Puzzle {
    index: number;
    primeGenerator: Generator<number>;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.index = Number(lines[0]);
        this.primeGenerator = PrimeGenerator();
    }

    _runStep(): boolean {
        let nextPrime = this.primeGenerator.next().value;
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] ${this.result}`);
        if (this.stepNumber >= this.index) {
            this.result = nextPrime;
            return false;
        }
        return true;
    }
}
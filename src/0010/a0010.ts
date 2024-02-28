import { PrimeGenerator, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0010 extends Puzzle {
    input: number;
    sum = 0;
    primeGenerator: Generator<number>;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        //this.primeGenerator = PrimeGenerator(); // this is hundreds of times slower for large maximum values
        this.primeGenerator = PrimeGeneratorMax(this.input);
    }

    _runStep(): boolean {
        let nextPrime = this.primeGenerator.next().value;

        if (nextPrime < this.input) {
            //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] ${nextPrime.value}`);

            this.sum += nextPrime;
            this.result = this.sum.toString();
            return true;
        }
        return false;
    }
}
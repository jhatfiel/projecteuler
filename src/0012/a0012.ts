import { GetDivisors, PrimeFactors, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0012 extends Puzzle {
    input: number;
    tn = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        this.tn += this.stepNumber;
        let factors = PrimeFactors(this.tn);
        let numDivisors = [...factors.keys()].reduce((sum, f) => sum *= factors.get(f)+1, 1);
        //let divisors = GetDivisors(this.tn);
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] tn=${this.tn} factors=${[...factors.keys()].map(f => `${f}^${factors.get(f)}`)} divisors=${numDivisors}`);
        if (numDivisors > this.input) {
            this.result = this.tn.toString();
            return false;
        }
        return true;
    }
}
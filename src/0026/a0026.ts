import { GetPeriod, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0026 extends Puzzle {
    input: number;
    primes: number[];
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        // the longest repeating series has to be in a 1/PRIME format because . . . reasons.  
        // Informally because otherwise k=d*f means 1/k would have the same length of repeating series as 1/(d*f) so we need prime denominators
        // additionally, start at the largest prime and work backwards
        this.primes = [...PrimeGeneratorMax(this.input)].reverse();
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.primes.length-1;
        let prime = this.primes[this.stepNumber-1];
        let period = GetPeriod(prime);
        this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] prime=${prime}, period of unit fraction=${period}`);
        moreToDo = moreToDo && period+1!==prime;

        this.result = prime.toString();
        return moreToDo;
    }
}

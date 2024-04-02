import { IsPrime, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0050 extends Puzzle {
    input: number;
    primes: number[];
    primeSet: Set<number>;
    most = 0;
    mostPrime = 0;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.primes = [...PrimeGeneratorMax(this.input)];
    }

    _runStep(): boolean {
        let p = this.primes[this.stepNumber-1];
        // if we have found a sequence of this.most already, we would want this sequence to be better.
        // if it's impossible for this sequence to be any better, then we are done, we've found the best sequence.
        if (p*(this.most+1) > this.input) return false;
        let sum = p;
        let num = 1;
        let most = 1;
        let mostP = p;
        while (sum < this.input) {
            if (IsPrime(sum)) {
                //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] prime=${p}, num=${num}, sum=${sum}`);
                most = num;
                mostP = sum;
            }
            sum += this.primes[this.stepNumber-1+num];
            num++;
        }
        if (most > this.most) {
            this.most = most;
            this.mostPrime = mostP;
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] New best starting at: prime=${p}, most=${most}, mostP=${mostP}`);
            this.result = mostP.toString();
        }

        return this.stepNumber < this.primes.length;
    }
}

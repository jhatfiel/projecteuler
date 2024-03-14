import { IsPrime, PrimeGenerator, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0035 extends Puzzle {
    input: number;
    max = 0;
    generator: Generator<number>;
    circularPrimes = new Set<number>();
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        // pregenerator all the primes
        this.max = 10**this.input
        for (let p of PrimeGeneratorMax(this.max))
            ;
        this.generator = PrimeGenerator();
    }

    _runStep(): boolean {
        let next = this.generator.next();
        let moreToDo = next.value < this.max;
        if (moreToDo) {
            let p: number = next.value;
            // skip if we've already seen this one
            if (this.circularPrimes.has(p)) return moreToDo;
            let arr = p.toString().split('');

            let allPrime = true;
            let numSet = new Set<number>();
            for (let i=0; i<arr.length; i++) {
                let num = Number([...arr.slice(i), ...arr.slice(0, i)].join(''));
                if (!IsPrime(num)) {
                    //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] arr=${arr.join()} failed on num=${num}`);
                    allPrime = false;
                    break;
                } else {
                    numSet.add(num);
                }
            }
            if (allPrime) {
                this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] arr=${arr.join()}`);
                [...numSet].forEach(n => this.circularPrimes.add(n));
            }
        } else {
            this.result = this.circularPrimes.size.toString();
        }
        return moreToDo;
    }
}

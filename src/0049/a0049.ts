import { PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';
import { CountOccurrences, SameOccurrences } from '../lib/String';

export class a0049 extends Puzzle {
    input: number;
    primes: number[];
    primeSet: Set<number>;
    found = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.primes = [...PrimeGeneratorMax(10000)].filter(n => n >= 1000);
        this.primeSet = new Set(this.primes); 
    }

    _runStep(): boolean {
        let p = this.primes[this.stepNumber-1];
        let p1Map = CountOccurrences(p.toString().split(''));
        let p2Map = CountOccurrences((p+3330).toString().split(''));
        let p3Map = CountOccurrences((p+6660).toString().split(''));
        if (this.primeSet.has(p+3330) && this.primeSet.has(p+6660) && SameOccurrences(p1Map, p2Map) && SameOccurrences(p1Map, p3Map)) {
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] prime=${p}`);
            this.found++;
            this.result = p.toString() + (p+3330).toString() + (p+6660).toString();
        }
        return this.found < this.input && this.stepNumber < this.primes.length;
    }
}

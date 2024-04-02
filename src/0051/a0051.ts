import { Combinations } from '../lib/CombiPerm';
import { IsPrime, PrimeGeneratorMax, Primes } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0051 extends Puzzle {
    input: number;
    generator: Generator<number>;
    bestPCount = 0;
    combinations = new Map<number, number[][]>();
    min = 10000;
    max = 1000000000;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        let place = [0,1,2,3]; // don't replace the last position (because only odd replacements would work)
        for (let i=5; i<12; i++) {
            this.combinations.set(i, Combinations(place, 2)); 
            place.push(i-1);
        }
        for (let _ of PrimeGeneratorMax(this.max))
            ;
        this.generator = Primes;
    }

    _runStep(): boolean {
        let p = this.generator.next().value;
        if (p < this.min) return true;
        let pDigits = p.toString().split('');
        let bestPCount = 0;
        if (this.stepNumber % 1000000 === 0) this.log(`[${this.stepNumber.toString().padStart(5)}] p=${p}`);
        for (let c of this.combinations.get(pDigits.length)) {
            let ind1 = c[0];
            let ind2 = c[1];
            //if (this.stepNumber % 100000 === 0) this.log(`[${this.stepNumber.toString().padStart(5)}] p=${p} Combination: ${ind1}/${ind2}`);
            let pCount = 0;
            for (let d=(ind1===0)?1:0; d<10; d++) {
                let digitsCopy = [...pDigits];
                digitsCopy[ind1] = d.toString();
                digitsCopy[ind2] = d.toString();
                let num = Number(digitsCopy.join(''));
                //this.log(`d=${d} num=${num}`);
                if (IsPrime(num)) pCount++;
                if (pCount+9-d <= this.bestPCount) break; // not enough numbers left for this one to be better
            }
            //this.log(`Combination: ${ind1}/${ind2}: pCount=${pCount}`);
            if (pCount > bestPCount) {
                bestPCount = pCount;
            }
        }
        //this.log(`BestPCount: ${bestPCount}`);
        if (bestPCount > this.bestPCount) {
            this.log(`[${this.stepNumber.toString().padStart(5)}] prime=${p} BestPCount: ${bestPCount}`);
            this.bestPCount = bestPCount;
            this.result = p.toString();
        }
        return this.bestPCount < this.input;
    }
}

import { Combinations } from '../lib/CombiPerm';
import { IsPrime, PrimeGenerator, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0051 extends Puzzle {
    input: number;
    generator: Generator<number>;
    bestPCount = 0;
    combinations = new Map<number, number[][]>();
    min = 10;
    max = 1000000;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        let place = [0]; // don't replace the last position (because only odd replacements would work)
        for (let i=2; i<12; i++) {
            let combinations = [];
            for (let j=1; j<=place.length; j++) {
                combinations = [...combinations, ...Combinations(place, j)];
            }
            this.combinations.set(i, combinations);
            place.push(i-1);
        }
        for (let _ of PrimeGeneratorMax(this.max))
            ;
        this.generator = PrimeGenerator();
        this.log(`_loadData done`);
    }

    _runStep(): boolean {
        let p = this.generator.next().value;
        if (p < this.min) return true;
        let pDigits = p.toString().split('');
        let bestPCount = 0;
        let bestNum = 0;
        let bestDescription = '';
        //this.log(`[${this.stepNumber.toString().padStart(5)}] p=${p} combinations=${this.combinations.get(pDigits.length).join(' / ')}`);
        for (let c of this.combinations.get(pDigits.length)) {
            let digitsCopy = [...pDigits];
            //if (this.stepNumber % 100000 === 0) this.log(`[${this.stepNumber.toString().padStart(5)}] p=${p} Combination: ${ind1}/${ind2}`);
            let pCount = 0;
            let firstMatch: number;
            let works = '';
            for (let d=(c[0]===0)?1:0; d<10; d++) {
                for (let ind of c) digitsCopy[ind] = d.toString();
                let num = Number(digitsCopy.join(''));
                //this.log(`d=${d} num=${num}`);
                if (IsPrime(num)) {
                    if (firstMatch === undefined) firstMatch = num;
                    works += `${d},`;
                    pCount++;
                }
                if (pCount+9-d <= this.bestPCount) break; // not enough numbers left for this one to be better
            }
            if (pCount > bestPCount) {
                //this.log(`Best for ${p} is Combination: [${c}]: pCount=${pCount}`);
                bestPCount = pCount;
                bestNum = firstMatch;
                bestDescription = `replace positions: ${c} - works ${works}`;
            }
        }
        //this.log(`BestPCount: ${bestPCount}`);
        if (bestPCount > this.bestPCount) {
            this.log(`[${this.stepNumber.toString().padStart(5)}] prime=${p} bestNum=${bestNum} BestPCount: ${bestPCount} Description: ${bestDescription}`);
            this.bestPCount = bestPCount;
            this.result = bestNum.toString();
        }
        return this.bestPCount < this.input && p < this.max;
    }
}

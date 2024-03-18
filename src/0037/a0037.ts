import { IsPrime, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0037 extends Puzzle {
    input: number;
    max: number;
    min = 11;
    primeGenerator: Generator<number>;
    truncatablePrimes = new Set<number>();
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.max = 1000000;
        this.primeGenerator = PrimeGeneratorMax(this.max);
        // skip 2,3,5,7
        this.primeGenerator.next(); // 2
        this.primeGenerator.next(); // 3
        this.primeGenerator.next(); // 5
        this.primeGenerator.next(); // 7
    }

    isTruncatable(p: number): boolean {
        let result = true;
        //let digitMod = 10**Math.floor(Math.log10(p));
        let leftT = Math.floor(p/10);
        //let rightT = p % digitMod; // this is slower than just splitting and building the number
        while (leftT > 0) {
            if (!IsPrime(leftT)) return false;
            //if (!IsPrime(rightT)) return false;
            leftT = Math.floor(leftT/10);
            //digitMod /= 10;
            //rightT = rightT % digitMod; 
        }
        let digits = p.toString().split('');
        for (let i=1; i<digits.length; i++) {
            if (!IsPrime(Number(digits.slice(i).join('')))) return false;
        }

        return result;
    }

    _runStep(): boolean {
        let nextPrime = this.primeGenerator.next();
        let p: number = nextPrime.value;
        if (this.isTruncatable(p)) {
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] p=${p}`);
            this.truncatablePrimes.add(p);
            this.result = [...this.truncatablePrimes.values()].reduce((sum, p) => sum += p, 0).toString();
        }

        let moreToDo = this.truncatablePrimes.size < this.input;
        return moreToDo;
    }
}

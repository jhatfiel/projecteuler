import { IsPrime, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0027 extends Puzzle {
    input: number;
    max = 0;
    a: number;
    b: number;
    bIndex = 0;
    primes: number[];
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.primes = [...PrimeGeneratorMax(this.input)];
        this.bIndex = 0;
        this.b = this.primes[this.bIndex];
        this.setA();
    }

    setA() {
        this.a = -1 * (this.b-1);
        if (this.a%2 === 0) this.a++;
    }
    nextA() {
        do {
            this.a+=2;
        } while (!IsPrime(this.a+this.b+1) && this.a < this.input);
    }

    generatePrimes(a: number, b: number): number[] {
        let f=(n) => n**2+a*n+b
        let result: number[] = [];
        for (let n=0; ; n++) {
            let gen = f(n);
            if (IsPrime(gen)) result.push(gen)
            else break;
        }
        return result;
    }

    _runStep(): boolean {
        let generatedPrimes = this.generatePrimes(this.a,this.b);
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] a=${this.a}, b=${this.b}, count=${generatedPrimes.length}: [${generatedPrimes}]`);
        if (generatedPrimes.length > this.max) {
            this.max = generatedPrimes.length;
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] a=${this.a}, b=${this.b}, count=${generatedPrimes.length}: [${generatedPrimes}]`);
            this.result = (this.a*this.b).toString();
        }

        // prepare next values
        this.nextA();
        if (this.a >= this.input) {
            this.bIndex++;
            this.b = this.primes[this.bIndex];
            this.setA();
        }
        let moreToDo = this.b !== undefined
        return moreToDo;
    }
}

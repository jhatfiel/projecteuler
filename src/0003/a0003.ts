import { Puzzle } from '../lib/Puzzle';

export class a0003 extends Puzzle {
    n: number;
    primeGenerator: Generator<number, any, unknown>;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.n = Number(lines[0]);
        this.log(`Factors of ${this.n}`);
        this.primeGenerator = this.nextPrime();
    }

    *nextPrime(): Generator<number> {
        let primes: number[] = [2];
        let i=3;
        while (true) {
            if (primes.every(n => i % n !== 0)) {
                primes.push(i);
                yield i;
            }
            i++;
        }
    }

    _runStep(): boolean {
        let nextPrime = this.primeGenerator.next().value;
        let moreToDo = nextPrime < this.n;

        //this.log(`Trying ${nextPrime}`);
        if (this.n % nextPrime === 0) {
            this.log(`${this.n} is divisible by ${nextPrime}`);
            while (this.n % nextPrime === 0) {
                this.n = this.n/nextPrime;
            }
            this.result = nextPrime.toString();
        }

        return moreToDo;
    }
}
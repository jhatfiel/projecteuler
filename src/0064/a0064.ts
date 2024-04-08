import { SQRTContinuedFraction } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0064 extends Puzzle {
    input: number;
    count = 0;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let N = this.stepNumber;
        let moreToDo = N < this.input;
        let sqrt = Math.floor(Math.sqrt(N));
        if (sqrt**2 !== N) { // skip perfect squares
            //this.log(`[${this.stepNumber.toString().padStart(5)}] n=${N} ${sqrt}`);
            let cfRep = new SQRTContinuedFraction(N);
            let scf = new SimpleContinuedFraction(Math.sqrt(N));
            //this.log(`[SQRT(${N})]=${RepeatingContinuedFraction.toString(cfRep)} period=${cfRep.len}`);
            //this.log(`[SQRT(${N})]=${scf.toString()}`);
            if (cfRep.rep.len % 2 === 1) {
                //this.log(`[SQRT(${N})]=${ContinuedFraction.toString(cfRep)} period=${cfRep.len}`)
                this.count++;
            }
            //if (scf.period !== cfRep.len) moreToDo = false;
        }

        if (!moreToDo) {
            this.result = this.count.toString();
        }
        return moreToDo;
    }
}

// this doesn't work because decimal precision isn't good enough...
// https://r-knott.surrey.ac.uk/Fibonacci/cfINTRO.html
class SimpleContinuedFraction {
    digits: number[] = [];
    period = NaN;
    constructor(public num: number, public maxDigits: number=50) {
        let x = num;
        let seen = new Map<string, number>();
        while (Number.isFinite(x) && this.digits.length < maxDigits) {
            let a = Math.floor(x);
            let e = x-a;
            let key = `${a},${e.toFixed(5)}`;
            //console.log(`x=${x},a,e=(${key})`);
            if (seen.has(key)) {
                this.period = this.digits.length-1 - seen.get(key);
                break;
            }
            this.digits.push(a);
            seen.set(key, this.digits.length-2);
            x = 1/e;
        }
    }

    toString(): string {
        return `[${this.digits[0]};${this.digits.slice(1)}] ${this.period?'Period '+this.period:''}`;
    }
}
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
            let cfRep = new RepeatingContinuedFraction(N, sqrt, 1).getRepeatingRepresentation();
            let scf = new SimpleContinuedFraction(Math.sqrt(N));
            //this.log(`[SQRT(${N})]=${RepeatingContinuedFraction.toString(cfRep)} period=${cfRep.len}`);
            //this.log(`[SQRT(${N})]=${scf.toString()}`);
            if (cfRep.len % 2 === 1) {
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

// This is a very very specialized ContinuedFraction class - it works for sqrt calculations and nothing else
class RepeatingContinuedFraction {
    constructor(public base: number, public int: number, public num: number, public denDiff: number = int, public approx: number = int) {}

    getRepeatingRepresentation(): {digits: number[], len: number} {
        let digits: number[] = [];
        let len = 0;
        let seen = new Map<string, number>();

        //console.log(`${this.debug()} START`);
        digits.push(this.int);
        while (!seen.has(this.partialToString())) {
            len++;
            seen.set(this.partialToString(), seen.size);
            this.next();
            digits.push(this.int);
            //console.log(`${this.debug()}`);
        }
        len--;
        digits.pop();
        //len = seen.size - seen.get(this.partialToString());

        return {digits, len};
    }

    next() {
        // multiplying by the reciprical of the denominator
        this.num = (this.base - this.denDiff**2) / this.num; // dividing by this.num might not always give us a natural number, but it does for these purposes...
        // the int part is how many den's we need to get us down to approx (but not go over)
        // i.e., we want max n such that SQRT(base) - n*den > 0 (n will be our new int)
        this.int = Math.floor((this.denDiff+this.approx)/this.num);
        // everything leftover after we subtract from this.int * this.num gives us our new denDiff
        this.denDiff = this.int*this.num - this.denDiff;
    }

    debug(): string { return `${this.int},${this.num}/SQRT(${this.base})-${this.denDiff}`; }

    partialToString(): string {return `${this.base},${this.int},${this.num},${this.denDiff}`; }

    static toString(rep: {digits: number[], len: number}): string {
        return `[${rep.digits[0]};${rep.digits.slice(1,rep.digits.length-rep.len)}${(rep.digits.length-rep.len>1)?',':''}(${rep.digits.slice(rep.digits.length-rep.len)})]`;
    }
}
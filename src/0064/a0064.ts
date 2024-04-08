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
            let cfRep = new ContinuedFraction(N, sqrt, 1).getRepeatingRepresentation();
            //this.log(`[SQRT(${N})]=${ContinuedFraction.toString(cfRep)} period=${cfRep.len}`)
            if (cfRep.len % 2 === 1) {
                //this.log(`[SQRT(${N})]=${ContinuedFraction.toString(cfRep)} period=${cfRep.len}`)
                this.count++;
            }
        }

        if (!moreToDo) {
            this.result = this.count.toString();
        }
        return moreToDo;
    }
}

// This is a very very specialized ContinuedFraction class - it works for sqrt calculations and nothing else
class ContinuedFraction {
    constructor(public base: number, public int: number, public num: number, public denDiff: number = int, public approx: number = int) {}

    getRepeatingRepresentation(): {digits: number[], len: number} {
        let digits: number[] = [];
        let len = 0;
        let seen = new Map<string, number>();

        //console.log(`${this.debug()} START`);
        while (this.int < 2*this.approx) {//!seen.has(this.partialToString())) {
            len++;
            digits.push(this.int);
            seen.set(this.partialToString(), seen.size);
            this.next();
            //console.log(`${this.debug()}`);
        }
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
        return `[${rep.digits[0]};${rep.digits.slice(1,rep.digits.length-rep.len)}${(rep.digits.length-rep.len>1)?',':''}${rep.digits.slice(rep.digits.length-rep.len)}]`;
    }
}
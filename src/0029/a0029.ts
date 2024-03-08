import { GCD, PrimeFactors } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0029 extends Puzzle {
    input: number;
    uniqueResults = new Map<BigInt, string>();
    numUniqueResults = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber+1 < this.input;
        /*
        // Simple exhaustive search method
        let a = BigInt(this.stepNumber+1);
        let val = a;
        for (let b=2; b <= this.input; b++) {
            val *= a;
            let str = `${a}^${b}`
            //this.log(`${str} = ${val}`);
            if (this.uniqueResults.has(val)) {
                this.log(`Duplicated result: ${str} is also ${this.uniqueResults.get(val)}`);
            } else {
                this.uniqueResults.set(val, str);
            }
        }
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] input=${this.input}`);
        this.result = this.uniqueResults.size.toString();
        /*/
        let a = this.stepNumber+1;
        let factors = PrimeFactors(a);
        let aPrev = factors.keys().next().value;
        let aPrevPower = factors.get(aPrev);
        if (factors.size > 1) {
            // find GCD of all powers
            let gcd: bigint;
            [...factors.values()].forEach(f => {
                if (gcd === undefined) gcd = BigInt(f);
                else gcd = GCD(gcd, f);
            })
            if (gcd > 1n) {
                aPrevPower = Number(gcd);
                aPrev = 1;
                for (let pair of factors.entries()) {
                    aPrev *= pair[0] ** pair[1]/aPrevPower;
                }
            } else {
                aPrev = 0;
            }
        }

        if (aPrev && aPrev !== a) {
            //this.log(`Check ${a} closely as it's ${aPrev}^${aPrevPower}`);
            // a is a power of aPrev, check if all possible combinations of aPrev could match b's power
            for (let b=2; b <= this.input; b++) {
                let canComposite = false;
                for (let k=2; k <= aPrevPower; k++) {
                    if (b * aPrevPower % (k-1) === 0 && b*aPrevPower/(k-1) <= this.input) {
                        //this.log(`Duplicated result: ${a}^${b} is also ${aPrev**(k-1)}^${b * aPrevPower / (k-1)}`);
                        canComposite = true;
                        break;
                    }
                }
                if (!canComposite) {
                    this.numUniqueResults++;
                }
            }
        } else {
            this.numUniqueResults += this.input-1;
        }

        this.result = this.numUniqueResults.toString();
        // */
        return moreToDo;
    }
}

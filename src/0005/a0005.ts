import { LCM, PrimeFactors, PrimeGenerator } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0005 extends Puzzle {
    max: number;
    primePowers = new Map<number, number>();
    lcm = 1n;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.max = Number(lines[0]);

        /*
        for (let p of PrimeGenerator()) {
            if (p >= this.max) break;
            //this.log(`prime: ${p}`);
            this.primePowers.set(p, 0);
        }
        */
    }

    _runStep(): boolean {
        // LCM is 4x the speed of keeping track of the powers, somehow.
        // Initialization of the primes takes about as long as the whole solution using LCM.
        return this._runStepLCM();
        //return this._runStepPowers();
    }

    _runStepLCM(): boolean {
        this.lcm = LCM(this.lcm, BigInt(this.stepNumber));

        let moreToDo = this.stepNumber < this.max;
        if (!moreToDo) {
            this.result = this.lcm.toString();
        }
        return moreToDo;
    }

    _runStepPowers(): boolean {
        //this.log(`Step: ${this.stepNumber}`);
        let pf = PrimeFactors(this.stepNumber);
        //let line='';
        //pf.forEach((cnt, f) => { line += `[${f}]=${cnt} `})
        //this.log(`Step: ${this.stepNumber}: ${line}`);
        pf.forEach((cnt, f) => {
            this.primePowers.set(f, Math.max(this.primePowers.get(f), cnt));
        })

        //line='';
        //this.primePowers.forEach((cnt, f) => { line += `[${f}]=${cnt} `})
        //this.log(`Step: ${this.stepNumber}: ${line}`);

        //let result = 1n;
        //this.primePowers.forEach((cnt, f) => { result = result * BigInt(f**cnt)});
        //this.log(`Step: ${this.stepNumber}: ${this.lcm} vs ${result}`);

        let moreToDo = this.stepNumber < this.max;
        if (!moreToDo) {
            let result = 1n;
            this.primePowers.forEach((cnt, f) => result *= BigInt(f)**BigInt(cnt));
            this.result = result.toString();
        }
        return moreToDo;
    }
}
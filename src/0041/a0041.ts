import { Permutations } from '../lib/CombiPerm';
import { IsPrime, PrimeGenerator, PrimeGeneratorMax } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';
import { CountOccurrences } from '../lib/String';

export class a0041 extends Puzzle {
    input: number;
    generator: Generator<number>;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.generator = PrimeGeneratorMax(7654321);
        /*
        for (let p of PrimeGeneratorMax(7654321))
            ;
            */
        this.log(`Input = ${this.input}`);
    }

    isPanDigital(n) {
        let str = n.toString();
        for (let i=1; i<=str.length; i++) {
            if (str.indexOf(i.toString()) === -1) return false;
        }
        return true;
    }

    _runStep(): boolean {
        let next = this.generator.next();
        let p = next.value;
        let moreToDo = !next.done && p < 10**this.input;
        if (moreToDo) {
            if (this.isPanDigital(p)) {
                //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] p=${p}`);
                this.result = p.toString();
            }
        } else {
            /*
            // this takes about as long because I still have to setup the prime array for IsPrime to work
            for (let arr of Permutations(['1','2','3','4','5','6','7'])) {
                let p = Number(arr.join(''));
                if (IsPrime(p)) {
                    this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] num=${p}`);
                    this.result = p.toString();
                }
            }
            */
        }
        return moreToDo;
    }
}

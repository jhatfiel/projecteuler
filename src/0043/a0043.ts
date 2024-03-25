import { Permutations } from '../lib/CombiPerm';
import { Puzzle } from '../lib/Puzzle';

export class a0043 extends Puzzle {
    input: number;
    sum = 0;
    primes = [2, 3, 5, 7, 11, 13, 17];
    generator: Generator<string[]>;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.generator = Permutations(['0','1','2','3','4','5','6','7','8','9'], (len: number, data: string[]) => {
            if (len < 4) return true;
            let sub = Number(data.slice(len-3, len).join(''));
            return sub % this.primes[len-4] === 0;
        });
    }

    _runStep(): boolean {
        let next = this.generator.next();
        let moreToDo = !next.done;
        if (moreToDo) {
            let isDivisible = true;
            let num: string = next.value.join('');
            for (let i=0; i<this.primes.length; i++) {
                let str = num.substring(i+1, i+4);
                let p = this.primes[i];
                //this.log(`Checking: ${str} div by ${p}`);
                if (Number(str) % p !== 0) {
                    isDivisible = false;
                    break;
                }
            }
            if (isDivisible) {
                this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] num=${num}`);
                this.sum += Number(num);
                this.result = this.sum.toString();
            }
        }
        return moreToDo;
    }
}

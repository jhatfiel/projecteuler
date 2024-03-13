import { Fraction } from '../lib/Fraction';
import { Puzzle } from '../lib/Puzzle';

export class a0033 extends Puzzle {
    input: number;
    max: number;
    runningProduct = new Fraction(1);

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.max = 10**(this.input)-1;
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.max;
        let [a, b] = this.stepNumber.toString().padStart(2, '0').split('').map(Number);
        // 2 different cases: (X can be any positive integer)
        // ab / aX = b/X
        // this means: 
        // (10*a + b) / (10*a + X) = b / X
        // X / (10*a + X) = b / (10*a + b)
        // 10aX + bX = 10ab + bX
        // 10aX = 10ab
        // X = b
        // ab / bX = a/X
        // 1. (10*a + b) / (10*b + X) = a/X
        // 2. 10aX + bX = 10ab + aX
        // 3. X(10a + b - a) = 10ab
        // 4. X = 10ab / (10a + b - a)

        // ab / bX = a/X
        // try it with 49 / 98
        // a=4, b=9 (X=8)
        // 1. (10*4 + 9)/(10*9 + 8) = 4/8 YES
        // 2. 320 + 72 = 360 + 32 yes
        // 3. 8(40 + 4 + 9) = 490
        // 10*4*9 / (10*4 + 9 - 4)
        // 360 / 45

        let n = 10*a*b;
        let d = 9*a + b;
        if (n % d === 0) {
            let x = n / d;
            if (x !== 0 && x !== b) {
                let frac = new Fraction(a, x).reduce();
                this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] input=${this.input} ${a} ${b}`);
                this.log(`${a}${b} / ${b}${x}  === ${a} / ${x} === ${frac.toString()}`);
                this.runningProduct.multiply(frac).reduce();
            }
        }

        this.result = this.runningProduct.toString();
        return moreToDo;
    }
}

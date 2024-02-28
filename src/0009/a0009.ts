import { Puzzle } from '../lib/Puzzle';

export class a0009 extends Puzzle {
    input: number;
    inputSquared: number;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.inputSquared = this.input**2;
    }

    _runStep(): boolean {
        // a < b < c
        // a^2 + b^2 = c^2
        // input is a+b+c
        // a + b + c = n
        // a^2 + b^2 = c^2
        // c = n-a-b
        // a^2 + b^2 = (n-a-b)^2
        // a^2 + b^2 = n^2 - 2na - 2nb + a^2 - 2ab + b^2
        // 0 = n^2 - 2na - 2nb - 2ab
        // b(n-a) = (n^2)/2 - na
        // b = ((n^2)/2 - na) / (n-a)
        // a=3, n=12 => 
        // b = (72 - 36) / (12-3) = 36 / 9 = 4 
        // so, if n^2/2 - na % n-a === 0, we have a solution?
        let moreToDo = true;

        let a = this.stepNumber;
        let num = this.inputSquared / 2 - this.input * a;
        let den = this.input - a;

        if (num % den === 0) {
            let b = num/den;
            let c = Math.sqrt(a**2+b**2);
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] a=${a}, num=${num}, den=${den}, b=${b}, c=${c}`);
            moreToDo = false;
            this.result = (a*b*c).toString();
        }

        return moreToDo;
    }
}
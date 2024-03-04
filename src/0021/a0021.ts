import { GetDivisors } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0021 extends Puzzle {
    input: number;
    sum = 0;
    sampleMode(): void { };

    isAmicable(n: number): boolean {
        if (n <= 1) return false;
        let a = this.sumProperDivisors(n);
        let b = this.sumProperDivisors(a);
        return b === n && a !== b && a < this.input && b < this.input;

    }
    sumProperDivisors(n: number): number {
        return GetDivisors(n).filter(d => d !== n).reduce((sum, d) => sum+=d, 0);
    }

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input;
        if (this.isAmicable(this.stepNumber)) {
            //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] d=${this.isAmicable(this.stepNumber)} ${this.sumProperDivisors(this.stepNumber)}`);
            this.sum += this.stepNumber;
        }
        this.result = this.sum.toString();
        return moreToDo;
    }
}

import { Puzzle } from '../lib/Puzzle';
import { IsPalindrome } from '../lib/String';

export class a0036 extends Puzzle {
    input: number;
    sum = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input;
        if (this.stepNumber % 2 === 1 && IsPalindrome(this.stepNumber.toString()) && IsPalindrome(this.stepNumber.toString(2))) {
            this.sum += this.stepNumber;
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] ${this.sum}`);
            this.result = this.sum.toString();
        }
        return moreToDo;
    }
}

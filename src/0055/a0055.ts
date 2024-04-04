import { Puzzle } from '../lib/Puzzle';
import { IsPalindrome } from '../lib/String';

export class a0055 extends Puzzle {
    max = 50;
    failed = 0;
    input: number;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input;
        let n = this.stepNumber;
        let count = 1;
        let trial = n+Number(n.toString().split('').reverse().join(''));
        while (!IsPalindrome(trial.toString()) && count < this.max) {
            trial = trial+Number(trial.toString().split('').reverse().join(''));
            count++;
        }
        if (count === this.max) {
            this.failed++;
            this.result = this.failed.toString();
            this.log(`[${this.stepNumber.toString().padStart(5)}] n=${n} FAILED`);
        } else {
            //this.log(`[${this.stepNumber.toString().padStart(5)}] n=${n} final=${trial} count=${count}`);
        }
        return moreToDo;
    }
}

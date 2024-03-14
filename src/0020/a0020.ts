import { Factorial } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0020 extends Puzzle {
    input: number;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = false;
        let factorial = Factorial(this.input);
        let sumDigits = factorial.toString().split('').reduce((sum, d) => sum+=Number(d), 0);
        this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] input=${this.input}, sum ! digits: ${sumDigits}`);
        this.result = sumDigits.toString();
        return moreToDo;
    }
}
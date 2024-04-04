import { Puzzle } from '../lib/Puzzle';

export class a0057 extends Puzzle {
    input: number;
    num: bigint = 1n;
    den: bigint = 1n;
    count = 0;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input;
        [this.num, this.den] = [this.den+this.den+this.num, this.num+this.den];
        if (this.num.toString().length > this.den.toString().length) {
            this.count++;
            this.result = this.count.toString();
            this.log(`[${this.stepNumber.toString().padStart(5)}] ${this.num}/${this.den}`);
        }

        return moreToDo;
    }
}

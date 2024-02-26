import { Puzzle } from '../lib/Puzzle';

export class a0002 extends Puzzle {
    max: number;
    last = 1;
    next = 2;
    sum = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.max = Number(lines[0]);
    }

    _runStep(): boolean {
        this.result = 'Result';
        if (this.next % 2 === 0) {
            this.log(`${this.stepNumber}: Adding ${this.next}`)
            this.sum += this.next;
        }

        [this.last, this.next] = [this.next, this.last+this.next];

        this.result = this.sum.toString();

        return this.next <= this.max;
    }
}
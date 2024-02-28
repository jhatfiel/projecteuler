import { Puzzle } from '../lib/Puzzle';

export class a0013 extends Puzzle {
    sum = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.lines.length;
        this.sum += Number(this.lines[this.stepNumber-1].substring(0, 11));
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] sum=${this.sum}`);
        if (!moreToDo) this.result = (this.sum.toString().substring(0, 10))
        return moreToDo;
    }
}
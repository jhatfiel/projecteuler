import { Puzzle } from '../lib/Puzzle';

export class atictactoe extends Puzzle {
    input: number;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = false;
        this.log(`[${this.stepNumber.toString().padStart(5)}] input=${this.input}`);
        this.result = 'Result';
        return moreToDo;
    }
}

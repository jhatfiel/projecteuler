import { Puzzle } from '../lib/Puzzle';

export class a0018 extends Puzzle {
    input: number[][];
    max: number[];
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = lines.map(line => line.trim().split(' ').map(Number));
        this.max = [...this.input[this.input.length-1]]; // max for the last row is just the last row
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input.length-1;
        let i = this.input.length - this.stepNumber - 1;
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] max is ${this.max.join(' ')}`);
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] row is ${this.input[i].join(' ')}`);
        this.input[i].forEach((v, ind) => this.max[ind] = v + Math.max(this.max[ind], this.max[ind+1]));
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] max is ${this.max.join(' ')}`);
        this.result = this.max[0].toString();
        return moreToDo;
    }
}
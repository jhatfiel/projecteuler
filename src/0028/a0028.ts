import { Puzzle } from '../lib/Puzzle';

export class a0028 extends Puzzle {
    input: number;
    lastCorner = 1;
    sum = 1;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        // inner ring (1) is ring 0;
        let ring = this.stepNumber;
        let width = ring*2+1;
        let moreToDo = width < this.input;

        this.lastCorner = this.lastCorner + ring*8;
        let thisRingSum = 4*this.lastCorner - 6*(width-1);
        this.sum += thisRingSum;

        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] width=${width} nextCorner=${this.lastCorner} thisRingSum=${thisRingSum} sum=${this.sum}: `);
        this.result = this.sum.toString();
        return moreToDo;
    }
}

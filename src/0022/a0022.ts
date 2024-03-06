import { Puzzle } from '../lib/Puzzle';

export class a0022 extends Puzzle {
    names: string[];
    scoreSum = 0;
    letterOffset = 'A'.charCodeAt(0)-1;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.names = lines[0].split(',').map(s => s.substring(1, s.length-1)).sort();
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.names.length;
        let name = this.names[this.stepNumber-1];
        let score = name.split('').reduce((sum, c) => sum += c.charCodeAt(0) - this.letterOffset, 0);
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] name=${name} score=${score}`);
        this.scoreSum += this.stepNumber * score;
        this.result = this.scoreSum.toString();
        return moreToDo;
    }
}

import { Puzzle } from '../lib/Puzzle';

export class a0016 extends Puzzle {
    input: number;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        /*
        let moreToDo = this.stepNumber < this.input;
        let pow = 2n**BigInt(this.stepNumber);
        let sum = pow.toString().split('').reduce((acc, d) => acc += Number(d), 0)
        this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] 2^${this.stepNumber}=${pow} sum=${sum}`);
        this.result = sum.toString();
        return moreToDo;
        */
        let pow = 2n**BigInt(this.input);
        let sum = pow.toString().split('').reduce((acc, d) => acc += Number(d), 0)
        //this.log(`[${this.input.toString().padStart(5, ' ')}] 2^${this.input}=${pow} sum=${sum}`);
        this.result = sum.toString();
        return false;
    }
}
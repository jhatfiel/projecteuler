import { Fibonacci } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0025 extends Puzzle {
    input: number;
    fibGen: Generator<BigInt>;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.fibGen = Fibonacci();
    }

    _runStep(): boolean {
        let nextFib = this.fibGen.next();
        let numDigits = nextFib.value.toString().length;
        let moreToDo = numDigits < this.input
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] nextFib=${nextFib.value} ${numDigits}`);
        this.result = this.stepNumber.toString();
        return moreToDo;
    }
}

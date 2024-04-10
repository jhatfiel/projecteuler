import { Totient } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0069 extends Puzzle {
    input: number;
    max = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let n = this.stepNumber+1;
        let moreToDo = n < this.input;
        let t = Totient(n);
        let val = n/t;
        if (val > this.max) {
            this.log(`[${this.stepNumber.toString().padStart(5)}] n=${n}, Totient=${t}, n/Totient=${val}`);
            this.max = val;
            this.result = n.toString();
        }
        return moreToDo;
    }
}

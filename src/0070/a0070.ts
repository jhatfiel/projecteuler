import { Totient } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0070 extends Puzzle {
    input: number;
    min = Infinity;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let n = this.stepNumber+1;
        let moreToDo = n < this.input;
        let t = Totient(n);
        let val = n/t;
        if (val < this.min) {
            let nStr = n.toString();
            let tStr = t.toString();
            if (nStr.length === tStr.length && nStr.split('').sort().join('') === tStr.split('').sort().join('')) {
                this.log(`[${this.stepNumber.toString().padStart(5)}] n=${n}, Totient=${t}, n/Totient=${val}`);
                this.min = val;
                this.result = n.toString();
            }
        }
        return moreToDo;
    }
}

import { NChooseK } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0053 extends Puzzle {
    input: number;
    total = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let n = this.stepNumber;
        let moreToDo = n < this.input
        for (let k=1; k<=n; k++) {
            let num = NChooseK(n, k);
            if (num >= 1000000) {
                //this.log(`${NChooseK(n,k-1)}, ${NChooseK(n, k)}, ${NChooseK(n, k+1)}, ${NChooseK(n, k+2)}, ${NChooseK(n,k+3)}, ${NChooseK(n, k+4)}`)
                this.total += n+1-2*k;
                break;
            }
        }
        this.log(`[${this.stepNumber.toString().padStart(5)}] ${this.total}`);
        this.result = this.total.toString();
        return moreToDo;
    }
}

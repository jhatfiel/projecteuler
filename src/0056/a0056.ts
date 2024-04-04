import { Puzzle } from '../lib/Puzzle';

export class a0056 extends Puzzle {
    maxSum = 0;
    input: number;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input;
        let maxSum = 0;
        let best = '';
        let a = BigInt(this.stepNumber);
        for (let b=BigInt(this.input); b > 0n; b--) {
            let n = a**b
            let sum = n.toString().split('').map(Number).reduce((sum, d) => sum += d, 0);
            if (sum > maxSum) {
                maxSum = sum;
                best = `${a}^${b} = ${n}`;
            }
        }
        if (maxSum > this.maxSum) {
            this.maxSum = maxSum;
            this.result = maxSum.toString();
        }
        this.log(`[${this.stepNumber.toString().padStart(5)}] best: ${best} = ${maxSum}`);
        return moreToDo;
    }
}

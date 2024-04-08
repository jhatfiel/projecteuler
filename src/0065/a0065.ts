import { Puzzle } from '../lib/Puzzle';

export class a0065 extends Puzzle {
    input: number;
    nums: bigint[] = [1n,2n];

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let c = ((this.stepNumber+1)%3 === 0)?(2n*BigInt(this.stepNumber+1)/3n):1n;
        let n = c*this.nums.at(-1) + this.nums.at(-2);
        this.nums.push(n);

        //this.log(`[${this.stepNumber.toString().padStart(5)}] ${n}`);
        if (this.nums.length > this.input) {
            this.result = n.toString().split('').map(Number).reduce((sum, d) => sum+=d,0).toString();
            return false;
        }
        return true;
    }
}

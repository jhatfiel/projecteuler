import { PrimeFactors } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0047 extends Puzzle {
    count = 0;
    input: number;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let factors = PrimeFactors(this.stepNumber);
        if (factors.size === this.input) {
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] factors=${factors.size}`);
            this.count++;
            if (this.count === 1) {
                this.result = this.stepNumber.toString();
            }
            if (this.count === this.input) return false;
        } else {
            this.count = 0;
        }
        return true;
    }
}

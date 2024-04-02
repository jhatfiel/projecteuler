import { Puzzle } from '../lib/Puzzle';

export class a0045 extends Puzzle {
    numFound = 0;
    input: number;
    tn = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    isPentagonal(n: number): boolean {
        return Math.sqrt(24*n + 1) % 6 === 5;
    }

    _runStep(): boolean {
        let n = this.stepNumber
        if (n % 2 === 0) return true;
        this.tn += 2*n-1;
        if (this.isPentagonal(this.tn)) {
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] tn=${this.tn} pentagonal`);
            this.numFound++;
            this.result = this.tn.toString();
            return (this.numFound < this.input);
        }
        return true;
    }
}

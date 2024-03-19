import { Puzzle } from '../lib/Puzzle';

export class a0040 extends Puzzle {
    input: number[];
    inputIndex = 0;
    nextPos = 1;
    product = 1;
    position = 1;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = lines[0].split(',').map(Number);
        this.nextPos = this.input[0];
    }

    numDigits(n: number): number {
        let pot = 10;
        let num = 1;
        while (n >= pot) {
            pot *= 10;
            num++;
        }
        return num;
    }

    _runStep(): boolean {
        let thisSize = this.numDigits(this.stepNumber);
        if (this.position + thisSize > this.nextPos) {
            let thisStr = this.stepNumber.toString().charAt(this.nextPos - this.position);
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] position=${this.position} nextPos=${this.nextPos} thisStr=${thisStr}`);
            this.product *= Number(thisStr);

            this.nextPos = this.input[++this.inputIndex];
            if (this.nextPos === undefined) {
                this.result = this.product.toString();
                return false;
            }
        }
        this.position += thisSize;
        return true;
    }
}

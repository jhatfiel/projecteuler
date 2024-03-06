import { GetProperDivisors } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0023 extends Puzzle {
    input: number;
    abundant = new Set<number>();
    sum = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    isAbundant(n: number): boolean {
        let pd = GetProperDivisors(n);
        return pd.reduce((sum, n) => sum+=n,0) > n;
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input;
        // if we can make this using abundant numbers, add it to the list
        let foundSum = false;
        for (let a of this.abundant.keys()) {
            if (a > this.stepNumber/2) break;
            if (this.abundant.has(this.stepNumber-a)) {
                foundSum = true;
                break;
            }
        }
        if (!foundSum) {
            //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] Cannot be written as sum: ${[...this.abundant.keys()]}`);
            this.sum += this.stepNumber;
        }

        let isAbundant = this.isAbundant(this.stepNumber);
        if (isAbundant) {
            this.abundant.add(this.stepNumber);
        }

        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] abundant=${isAbundant}`);
        this.result = this.sum.toString();
        return moreToDo;
    }
}

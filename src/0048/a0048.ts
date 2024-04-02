import { ModPow } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0048 extends Puzzle {
    input: number;
    sum = 0n;
    modLimit = 10n**10n;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input;
        let n = ModPow(this.stepNumber, this.stepNumber, this.modLimit);
        this.sum = (this.sum + n) % this.modLimit;
        // ModPow is maybe faster than just straight up using BigInt for the calculation
        //this.sum = (this.sum + BigInt(this.stepNumber)**BigInt(this.stepNumber)) % this.modLimit;
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] modPow()=${n} ${this.sum} ${this.sum2.toString().substring(this.sum2.toString().length-10)}`);
        if (!moreToDo) this.result = this.sum.toString();
        return moreToDo;
    }
}

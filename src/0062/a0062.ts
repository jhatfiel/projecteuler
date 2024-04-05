import { Puzzle } from '../lib/Puzzle';

export class a0062 extends Puzzle {
    input: number;
    orderedDigitBin = new Map<string, number[]>();

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = true;
        let n = this.stepNumber**3;
        let od = n.toString().split('').sort().join('');
        let odArr = this.orderedDigitBin.get(od) ?? [];
        odArr.push(n);
        this.orderedDigitBin.set(od, odArr);
        if (odArr.length === this.input) {
            this.log(`[${this.stepNumber.toString().padStart(5)}] ${odArr}`);
            moreToDo = false;
            this.result = odArr[0].toString();
        }

        return moreToDo;
    }
}

import { Puzzle } from '../lib/Puzzle';

export class a0044 extends Puzzle {
    input: number;
    pnums = new Set<number>();
    pnumArr: number[] = [];
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = true;
        let n = this.stepNumber;
        let pnum = n*(3*n-1)/2;
        for (let i=0; i<this.pnumArr.length; i++) {
            let num = this.pnumArr[i];
            if (num*2 > pnum) break;
            let remain = pnum - num;
            if (!this.pnums.has(remain)) continue;
            let diff = Math.abs(remain-num);
            if (this.pnums.has(diff)) {
                this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] pnum=${pnum} = ${num} + ${remain} and ${diff} is also a Pentagon Number`);
                moreToDo = false;
                this.result = diff.toString();
                break;
            }
        }

        this.pnums.add(pnum);
        this.pnumArr.push(pnum);
        return moreToDo;
    }
}

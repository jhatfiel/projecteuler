import { SQRTContinuedFraction } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0066 extends Puzzle {
    input: number;
    largestX = 0n;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let D = this.stepNumber+1;
        let sqrt = Math.floor(Math.sqrt(D));
        if (sqrt**2 === D) return true;
        let moreToDo = D < this.input; 
        let scf = new SQRTContinuedFraction(D);
        let p = scf.rep.len;
        let k = (p%2===0)?p-1:2*p-1;
        let frac = scf.toFraction(k);
        if (frac.num > this.largestX) {
            this.log(`[${D.toString().padStart(5)}] ${scf.toString()} ${frac.toString()}`);
            this.largestX = frac.num;
            this.result = D.toString();
        }
        return moreToDo;
    }
}

/*
3+(1/(1+1/(1+1)))
3+(1/(1+1/2))
3+(1/(3/2))
3+(2/3)
11/3
*/
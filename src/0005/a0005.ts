import { PrimeFactors, PrimeGenerator } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0005 extends Puzzle {
    max: number;
    primeCounts = new Map<number, number>();

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.max = Number(lines[0]);

        for (let p of PrimeGenerator()) {
            if (p > this.max) break;
            //this.log(`prime: ${p}`);
            this.primeCounts.set(p, 1);
        }
    }

    _runStep(): boolean {
        //this.log(`Step: ${this.stepNumber}`);
        PrimeFactors(this.stepNumber).forEach((cnt, f) => {
            this.primeCounts.set(f, Math.max(this.primeCounts.get(f), cnt));
        })

        //let line='';
        //this.primeCounts.forEach((cnt, f) => { line += `[${f}]=${cnt} `})
        //this.log(`Step: ${this.stepNumber}: ${line}`);

        let moreToDo = this.stepNumber < this.max;
        if (!moreToDo) {
            let result = 1;
            this.primeCounts.forEach((cnt, f) => { result *= f**cnt });
            this.result = result.toString();
        }
        return moreToDo;
    }
}
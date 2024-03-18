import { Puzzle } from '../lib/Puzzle';
import { CountOccurrences } from '../lib/String';

export class a0038 extends Puzzle {
    input: number;
    max = 10**9;
    best = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    largestPandigital(num: number): {pandigital: number, n: number} {
        let pandigital = num;
        let n = 1;
        let nextPart = num;

        while (true) {
            n++;
            nextPart += num;
            let nextP = pandigital * 10**(Math.floor(Math.log10(nextPart))+1) + nextPart;
            //this.log(`n=${n}, nextPart=${nextPart}, nextP = ${nextP}`);
            if (nextP < this.max) pandigital = nextP;
            else break;
        }
        
        let counts = CountOccurrences(pandigital.toString().split(''));
        if (counts.size === 9 && !counts.has('0')) return {pandigital, n: n-1};
        else return undefined;
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input;
        let lp = this.largestPandigital(this.stepNumber);
        //if (lp) this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] lp=${JSON.stringify(lp)}`);
        if (lp && lp.pandigital > this.best) {
            this.best = lp.pandigital;
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] lp=${JSON.stringify(lp)} NEW BEST`);
            this.result = this.best.toString();
        }
        return moreToDo;
    }
}

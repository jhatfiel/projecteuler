import { Puzzle } from '../lib/Puzzle';
import { CountOccurrences, SameOccurrences } from '../lib/String';

export class a0052 extends Puzzle {
    input: number;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        let moreToDo = true;
        let nStr = '1' + (this.stepNumber + 10000).toString()
        let n = Number(nStr);
        let nOccurrences = CountOccurrences(nStr.split(''));
        let works = true;
        for (let i=2; i<=this.input; i++) {
            let t = i * n;
            let tOccurrences = CountOccurrences(t.toString().split(''));
            if (!SameOccurrences(nOccurrences, tOccurrences)) {
                works = false;
                break;
            }
        }
        if (works) {
            this.log(`[${this.stepNumber.toString().padStart(5)}] n=${n} 2*n=${2*n} works`);
            moreToDo = false;
            this.result = 'Result';
        }
        return moreToDo;
    }
}

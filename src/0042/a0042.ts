import { Puzzle } from '../lib/Puzzle';

export class a0042 extends Puzzle {
    input: string[];
    cnt = 0;
    triangleNumbers = new Set<number>();
    aCharCode = 'A'.charCodeAt(0);

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = lines[0].replaceAll('"','').split(',');

        let sum = 0;
        let i = 1;
        while (sum < 26*30) {
            sum += i;
            i++;
            this.triangleNumbers.add(sum);
        }
    }

    isTriangleWord(word: string): boolean {
        let sum = word.split('').map(c => c.charCodeAt(0) - this.aCharCode + 1).reduce((s,n) => s+=n, 0);
        return this.triangleNumbers.has(sum);
    }

    _runStep(): boolean {
        let word = this.input.pop();
        let moreToDo = word !== undefined;
        if (moreToDo) {
            if (this.isTriangleWord(word)) {
                //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] word=${word}`);
                this.cnt++;
            }
        } else {
            this.result = this.cnt.toString();
        }
        return moreToDo;
    }
}

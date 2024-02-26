import { Puzzle } from '../lib/Puzzle';

export class a0004 extends Puzzle {
    n: number;
    sampleMode(): void { };
    max: number;

    static IsPalindrome(n: number) {
        let s = n.toString();
        for (let i=0; i<Math.floor(s.length/2); i++) {
            if (s[i] !== s[s.length-i-1]) return false;
        }
        return true;
    }

    _loadData(lines: string[]) {
        this.n = Number(lines[0]);
        this.max = Number(''.padStart(this.n, '9'));
    }

    _runStep(): boolean {
        let moreToDo = false;

        OUTER: for (let i=0; i<this.max; i++) {
            for (let j=Math.floor(i/2); j>=0; j--) {
                let a = this.max-j;
                let b = this.max-(i-j);
                let num = a*b;
                //this.log(`Trying ${a} and ${b} = ${num}`);
                if (a0004.IsPalindrome(num)) {
                    this.result = num.toString();
                    break OUTER;
                }
            }
        }

        return moreToDo;
    }
}
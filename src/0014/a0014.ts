import { Puzzle } from '../lib/Puzzle';

export class a0014 extends Puzzle {
    input: number;
    longest = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    _runStep(): boolean {
        if (this.stepNumber < this.input/2) return true;
        let moreToDo = this.stepNumber < this.input;
        //let parentPath = [];
        //let n=this.stepNumber;
        let len = this.calculateCollatzLength(this.stepNumber);
        //while (n) { parentPath.push(n); n = this.collatzParent[n]; }
        if (len > this.longest) {
            this.longest = len;
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] step=${this.stepNumber}, collatzLength: ${len}`);
            this.result = this.stepNumber.toString();
        }
        return moreToDo;
    }

    //collatzParent: number[] = Array.from({length: 1000000})
    //collatzLength: number[] = Array.from({length: 1000000});
    collatzLength = new Map<number, number>();
    calculateCollatzLength(n: number): number {
        if (n === 1) {
            //this.collatzParent[n] = 0;
            //this.collatzLength[n] = 1;
            this.collatzLength.set(1, 1);
        }
        //if (this.collatzLength[n] === undefined) {
        if (this.collatzLength.get(n) === undefined) {
            if (n%2===0) {
                //this.collatzParent[n] = n/2;
                //this.collatzLength[n] = 1+this.calculateCollatzLength(n/2);
                this.collatzLength.set(n, 1+this.calculateCollatzLength(n/2));
            } else {
                //this.collatzParent[n] = 3*n+1;
                //this.collatzLength[n] = 1+this.calculateCollatzLength(3*n+1);
                this.collatzLength.set(n, 2+this.calculateCollatzLength((3*n+1)/2));
            }
        }

        return this.collatzLength.get(n);
    }
}
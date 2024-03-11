import { Puzzle } from '../lib/Puzzle';

export class a0030 extends Puzzle {
    input: number;
    powers: number[];
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    *make(place=0, num=0, sum=0): Generator<number> {
        // another digit could increase the sum by 0 up to this.powers[9]
        // the digit could increase the num by 0 up to 9**place
        if (num === sum) yield num;
        //this.log(`place=${place}, num=${num}, sum=${sum}:  num could be [${num*10}-${num*10+9}] sum could be [${sum}-${sum+this.powers[9]}]`);
        if (num*10 > sum+this.powers[9]) return;
        for (let i=(place===0)?1:0; i<10; i++) {
            yield* this.make(place+1, num*10 + i, sum + this.powers[i]);
        }
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input;
        //if (moreToDo) return moreToDo;
        this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] n=${this.stepNumber}`);
        this.powers = [0];
        for (let i=1; i<10; i++) {
            //this.log(`${i}^${this.input}=${i**this.input}`);
            this.powers.push(i**this.stepNumber);
        }

        let sum = 0;
        for (let n of this.make()) {
            if (n > 1) sum += n;
            this.log(`${n}: ${n.toString().split('').map(Number).map(n => n**this.stepNumber).join('+')} = ${n.toString().split('').map(Number).map(n => n**this.stepNumber).reduce((sum,n) =>sum+=n, 0)}`);
        }

        /*
        //brute force for confirmation
        for (let i=2; i<(this.stepNumber+1)*this.powers[9]; i++) {
            let num = i.toString().split('').map(Number).map(n => n**this.stepNumber).reduce((sum,n)=>sum+n,0)
            if (num === i) {
                //sum += num
                this.log(`brute force found: ${i}`);
            }
        }
        // */
        this.log(`sum = ${sum}`);
        this.result = sum.toString();
        return moreToDo;
    }
}

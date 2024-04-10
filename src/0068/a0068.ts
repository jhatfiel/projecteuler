import { Permutations } from '../lib/CombiPerm';
import { Puzzle } from '../lib/Puzzle';

/**
 * 9    4,3,2; 6,2,1; 5,1,3
 * 9	4,2,3; 5,3,1; 6,1,2
 * 9	4,3,2; 6,2,1; 5,1,3
 * 10	2,3,5; 4,5,1; 6,1,3
 * 10	2,5,3; 6,3,1; 4,1,5
 * 11	1,4,6; 3,6,2; 5,2,4
 * 11	1,6,4; 5,4,2; 3,2,6
 * 12	1,5,6; 2,6,4; 3,4,5
 * 12	1,6,5; 3,5,4; 2,4,6
 * 
 * The pattern is:
 * a,b,c; d,c,e; f,e,b
 * Or, in words, we will have n sets, m=2*n, using the numbers 1..m.
 * - The middle element of the i+1'th set is the last element of the i'th set.
 * - The middle element of the 1st set is the last element of the n'th set.
 * Why?
 * - Minimum of 9
 *     maximum number (6) has to be in at least 1 set.  Minimum numbers we could add to 6 are 1 & 2.  6+1+2 = 9;
 *     Or, another way of thinking: outer ring numbers should be the large numbers (4,5,6)
 *     that leaves 1,2,3 to be used twice for the other numbers
 *     avg(4,5,6) + 2 * avg(1,2,3) = 5 + 2*2 = 9
 * - Maximum of 12
 *     outer ring numbers should be the small numbers (1,2,3)
 *     that leaves 4,5,6 to be used twice for the other numbers
 *     avg(1,2,3) + 2 * avg(4,5,6) = 2 + 2*5 = 12
 * - So, lowerAvg = ((m/2)+1)/2 = (2+m)/2/2 = (2+m)/4
 * - and higherAvg = (m+m/2+1)/2 = (2+3m)/2/2 = (2+3m)/4
 * - Minimum = 2*la + ha = 2*(2+m)/4 + (2+3m)/4 = (4+2m+2+3m)/4 = (5m+6)/4
 * - Maximum = 2*ha + la = 2*(2+3m)/4 + (2+m)/4 = (4+6m+2+m)/4 =  (7m+6)/4
 */

export class a0068 extends Puzzle {
    input: number;
    indArr: number[];
    generator: Generator<number[]>;
    stringLen = 16;
    max = 0;

    sampleMode(): void { this.stringLen = 9; }

    getSetNumbers(arr: number[], setIndex: number): number[] {
        // the 0th sum is easy, it's 0,1,2
        // everything between 0 and n-1 needs to take the next 2 numbers and the middle of the one before it
        let first = (setIndex===0)?arr[0]:arr[1+setIndex*2];
        let middle = (setIndex===0)?arr[1]:this.getSetNumbers(arr, setIndex-1)[2];
        let last = (setIndex===0)?arr[2]:((setIndex===this.input-1)?this.getSetNumbers(arr, 0)[1]:arr[2+setIndex*2]);
        return [first, middle, last];
    }

    calcSum(arr: number[], setIndex: number): number {
        //this.log(`calcSum of ${setIndex}=${this.getSetNumbers(arr,setIndex)}`);
        return this.getSetNumbers(arr, setIndex).reduce((acc,n)=>acc+=n,0);
    }

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        let n = this.input;
        this.indArr = Array.from({length: n}, (_,ind)=>ind);
        let m=2*n;
        let numbers = Array.from({length: m}, (_, ind) => m-ind);
        let minSum = (5*m+6)/4;
        let maxSum = (7*m+6)/4;
        this.log(`Magic nubmers will be (inclusive) between ${minSum} and ${maxSum}`);
        this.generator = Permutations(numbers, (len: number, data: number[]) => {
            //this.log(`Checking permutation: ${data.slice(0, len)}`);
            let sum = 0;
            if (len >= 3) {
                sum = this.calcSum(data, 0);
                if (sum < minSum || sum > maxSum) {
                    //this.log(`Excluding ${data.slice(0,len)} because sum=${sum}`);
                    return false;
                }
                // ensure the first number of the first set is the lowest (indexes: 0, 3, 5)
                // len=4 is the first time this triggers, then for every 2 we get another i
                for (let i=1; i<Math.floor(len/2); i++) {
                    if (data[0] > data[3+2*(i-1)]) return false;
                }

                // ensure each new set matches our sum
                // len-3 % 2 === 0 OR len === this.input
                // len=5 should give set 1
                if (len > 3 && (len - 3) % 2 === 0 && this.calcSum(data, (len-3)/2) !== sum) return false;
                if (len === 2*this.input && this.calcSum(data, this.input-1) !== sum) return false;
            }
            return true;
        })
    }

    _runStep(): boolean {
        let next = this.generator.next();
        let moreToDo = !next.done;
        if (moreToDo) {
            let values: number[] = next.value;
            let str = this.indArr.flatMap(i=>this.getSetNumbers(values,i)).join('');
            if (str.length === this.stringLen) {
                let num = Number(str);
                if (num > this.max) {
                    this.log(`[${this.stepNumber.toString().padStart(5)}] sum: ${this.calcSum(values, 0)} numbers=${this.indArr.map(i=>this.getSetNumbers(values,i)).join('; ')} ${str}`);
                    this.max = num;
                    this.result = num.toString();
                }
            }
        }
        return moreToDo;
    }
}

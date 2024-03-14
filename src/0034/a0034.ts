import { UnorderedSamplingWithReplacement } from '../lib/CombiPerm';
import { Factorial } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0034 extends Puzzle {
    input: number;
    sum = 0;
    numDigits = 0;
    factorials = new Map<number, number>();
    generator: Generator<number[]>;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        for (let i=0; i<10; i++) {
            this.factorials.set(i, Number(Factorial(i)));
        }
        // when does 999...9 stop being less than 9!+9!+9!+...+9!?
        // n*9! > 10^n - 1
        for (let n=1; n<10; n++) {
            if (n*this.factorials.get(9) < 10**n-1) {
                this.numDigits = n;
                break;
            }
        }
        this.generator = UnorderedSamplingWithReplacement(this.numDigits, 10);
    }

    // See if the number formed by adding up the factorials of the digits in arr has those same digits.  Remove leading 0's one by one to test all values
    matchingNum(arr: number[]): number {
        let doAgain = false;
        do {
            let sum = arr.reduce((sum, d) => sum += this.factorials.get(d), 0);
            let sumArr = sum.toString().split('').map(Number).sort();
            // compare digits
            if (arr.length === sumArr.length && arr.every((d, index) => d===sumArr[index])) {
                return sum;
            }
            if (arr[0] === 0) {
                doAgain = true;
                arr = arr.slice(1);
            } else {
                doAgain = false;
            }
        } while (doAgain);
        return 0;
    }

    _runStep(): boolean {
        let arr = this.generator.next();
        let moreToDo = !arr.done;
        if (moreToDo) {
            let matchingNum = this.matchingNum(arr.value);
            if (matchingNum) {
                this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] arr=${arr.value} => ${matchingNum}`);
                if (matchingNum > 2) {
                    this.sum += matchingNum;
                    this.result = this.sum.toString();
                }
            }
        }
        return moreToDo;
    }
}

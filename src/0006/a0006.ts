import { ArithmeticProgressionSum } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0006 extends Puzzle {
    max: number;
    sumOfSquares = 0;
    sums = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.max = Number(lines[0]);
        // arithmetic summation formula (from problem 1)
        // how many * (first + last) / 2
        // ArithmeticProgressionSum(first, last, step) = Math.floor((last-first)/step) * ((first + last) / 2)
        //let sums = this.max * (1 + this.max) / 2;
        let squareOfSums = ArithmeticProgressionSum(1, this.max) ** 2;

        // square summation formula
        let sumOfSquares = this.max*(this.max+1)*(2*this.max+1)/6;
        this.log(`[${this.stepNumber.toString().padStart(3, ' ')}] sumOfSquares = ${sumOfSquares} squareOfSums = ${squareOfSums}, difference = ${squareOfSums - sumOfSquares}`);
        this.result = (squareOfSums - sumOfSquares).toString();
    }

    _runStep(): boolean {
        return false;
        /*
        Manual method
        let moreToDo = this.stepNumber < this.max;
        this.sumOfSquares += this.stepNumber**2;
        this.sums += this.stepNumber;
        if (!moreToDo) {
            this.log(`[${this.stepNumber.toString().padStart(3, ' ')}] sumOfSquares = ${this.sumOfSquares} squareOfSums = ${this.sums**2}, difference = ${this.sums**2 - this.sumOfSquares}`)
            this.result = (this.sums**2 - this.sumOfSquares).toString();
        }
        return moreToDo;
        */
    }
}
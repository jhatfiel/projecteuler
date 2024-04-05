import { Puzzle } from '../lib/Puzzle';

export class a0063 extends Puzzle {
    found = 0;

    // 10^n will be n+1 digits.
    // so an n digit number can't be a nth power of a number larger than 9
    _runStep(): boolean {
        let b = this.stepNumber;
        let e = 1;
        // count all successive powers of b until the result fails to be at least "e" digits
        // starting with 10, this will fail immediately (and no further numbers would work) so we are done
        while (Math.floor(Math.log10(b ** e)) === e-1) {
            this.found++;
            e++;
        }
        //this.log(`[${this.stepNumber.toString().padStart(5)}] b=${b} found: ${e-1}`);
        this.result = this.found.toString();
        return e > 1;
    }
}

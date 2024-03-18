import { GCD, LCM } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0039 extends Puzzle {
    input: number;
    maxCombinations = 0;
    max = 0;
    best = 0;
    reducedIntegralTriangle = new Map<string, number>();
    lcm = 1;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.max = this.input / 2;
    }

    getSolutions(p: number): string {
        // a <= b < c
        // a + b must be > c
        // a > 1 (because otherwise there's no way to get a+b > c with b < c)
        // a <= Math.floor((p-1)/3)

        // 3 4 5 is probably smallest integer right triangle (perimeter = 12)
        // a^2 + b^2 = c^2
        // given a & a+b+c = p, what are b & c?
        // c^2 = a^2 + b^2
        // c = (p-a) - b
        // c^2 = (p-a)^2 - 2(p-a)b + b^2
        // a^2 + b^2 = (p-a)^2 - 2(p-a)b + b^2
        // a^2 = (p-a)^2 - 2(p-a)b
        // 2(p-a)b = (p-a)^2 - a^2
        // b = ((p-a)^2 - a^2) / 2(p-a)

        // b^2 = c^2 - a^2 (a is known)
        // b = (p-a) - c (a and p are known)
        // b^2 = (p-a)^2 - 2(p-a)c + c^2
        // c^2 - a^2 = (p-a)^2 - 2(p-a)c + c^2
        // 2(p-a)c = a^2 - (p-a)^2
        // c = (a^2 - (p-a)^2) / 2*(p-a)
         
        for (let a=2; a<=Math.floor((p-1)/3); a++) {
            let b = ((p-a)**2 - a**2) / (2*(p-a));
            //this.log(`Trying a=${a} makes b=${b}`);
            if (b >= a && Math.floor(b) === b) {
                let c = p - a - b;
                //this.log(`We like b=${b} && c=${c}`);
                if (a**2 + b**2 === c**2) {
                    return `${a},${b},${c}`;
                }
            }
        }

        return undefined;
    }

    _runStep(): boolean {
        let moreToDo = true;
        let p = this.stepNumber;
        // see if this number is a multiple of a previous reducedIntegralTriangle
        let multipleOf = [...this.reducedIntegralTriangle.values()].filter(rp => Number(LCM(rp, p)) === p);
        if (multipleOf.length === 0) {
            let solution = this.getSolutions(p);
            if (solution) {
                // Found a reducedIntegralTriangle
                this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] Found one: ${solution}`);
                this.reducedIntegralTriangle.set(solution, p);
                let newLcm = Number(LCM(p, this.lcm));
                if (newLcm < this.input) {
                    this.lcm = newLcm;
                } else {
                    this.result = this.lcm.toString();
                    moreToDo = false;
                }
            }
        }

        return moreToDo;
    }
}

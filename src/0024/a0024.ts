import { OrderedPermutations, Permutations, Rotations } from '../lib/CombiPerm';
import { Puzzle } from '../lib/Puzzle';

export class a0024 extends Puzzle {
    input: number;
    permutationGenerator: Generator<number[]>;
    select = 1000000;
    sampleMode(): void {
        this.select = 5;
    };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        let arr: number[] = [];
        for (let i=0; i<= this.input; i++) {
            arr.push(i);
        }
        this.permutationGenerator = OrderedPermutations(arr);

    }

    _runStep(): boolean {
        let nextPerm = this.permutationGenerator.next();
        let moreToDo = this.stepNumber < this.select;
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] nextPerm=${JSON.stringify(nextPerm)}`);
        if (!moreToDo) this.result = nextPerm.value.join('');
        return moreToDo;
    }
}

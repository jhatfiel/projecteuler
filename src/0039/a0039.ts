import { LCM, PythagoreanTriples } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0039 extends Puzzle {
    input: number;
    lcm = 1;
    generator: Generator;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.generator = PythagoreanTriples();
    }

    _runStep(): boolean {
        let moreToDo = true;
        let t = this.generator.next().value;
        let newLcm = Number(LCM(t.a+t.b+t.c, this.lcm));
        if (newLcm < this.input) {
            this.lcm = newLcm;
        } else {
            this.result = this.lcm.toString();
            moreToDo = false;
        }

        return moreToDo;
    }
}

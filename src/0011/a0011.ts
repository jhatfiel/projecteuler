import { Puzzle } from '../lib/Puzzle';

export class a0011 extends Puzzle {
    input: number[][];
    width: number;
    height: number;
    highest = 0;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = lines.map(line => line.split(' ').map(Number))
        this.width = this.input[0].length;
        this.height = this.input.length;
    }

    highestProduct(row: number, col: number): number {
        // try NE, E, SE, S (the other 4 directions will be handled already)
        let highest = 0;
        [{r:-1, c: 1},
         {r: 0, c: 1},
         {r: 1, c: 1},
         {r: 1, c: 0}].forEach(({r, c}) => {
            let p = this.getValueAt(row, col, 1)
                * this.getValueAt(r+row, c+col, 1)
                * this.getValueAt(2*r+row, 2*c+col, 1)
                * this.getValueAt(3*r+row, 3*c+col, 1)
            if (p > highest) {
                highest = p;
            }
         });
        return highest;
    }

    getValueAt(row: number, col: number, defaultValue: number = NaN): number {
        if (row > 0 && col > 0 && row < this.height && col < this.width) return this.input[row][col];
        else return defaultValue;
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.width * this.height;
        let row = Math.floor((this.stepNumber-1) / this.width);
        let col = (this.stepNumber-1) % this.width;
        let highest = this.highestProduct(row, col);

        if (highest > this.highest) {
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] ${row},${col} = ${highest}`);
            this.highest = highest;
        }

        this.result = this.highest.toString();
        return moreToDo;
    }
}
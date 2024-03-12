import { Puzzle } from '../lib/Puzzle';

export class a0031 extends Puzzle {
    values = [200, 100, 50, 20, 10, 5, 2, 1];
    coinCombos: number[][] = [Array.from({length:this.values.length}, _ => 0)];
    memoize = new Map<number, Map<number, number>>();

    input: number;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        this.log(`input=${this.input}`);
    }

    numWays(amount: number, maxCoinIndex: number): number {
        if (maxCoinIndex === this.values.length-1) return 1;
        else {
            let map = this.memoize.get(amount);
            if (!map) {
                map = new Map<number, number>();
                this.memoize.set(amount, map);
            }
            let result = map.get(maxCoinIndex);
            if (result === undefined) {
                result = 0;
                let value = this.values[maxCoinIndex]
                //this.log(`${''.padStart(maxCoinIndex)}numWays: ${amount} value=${value}`);
                for (let i=0; i<=Math.floor(amount/value); i++) {
                    result += this.numWays(amount - i*value, maxCoinIndex+1);
                }
                map.set(maxCoinIndex, result);
            }

            return result;
        }
    }

    _runStep(): boolean {
        let moreToDo = false;
        let numWays = this.numWays(this.input, 0);
        this.result = numWays.toString();
        return moreToDo;
        // 510
        // 502
        // 031
        // 023
        // 015
        // 007
    }
}

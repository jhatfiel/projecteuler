import { Permutations } from '../lib/CombiPerm';
import { Subsets } from '../lib/CombiPerm';
import { Puzzle } from '../lib/Puzzle';

export class aspotIt extends Puzzle {
    symbolArr: string[] = [];
    cards: Set<number>[] = [];
    p: number;

    sampleMode(): void { };

    _loadData(lines: string[]) {
        // input is the number of symbols per card = s
        // p (needs to be prime) = s-1
        // total symbols (n) will be  p^2 + p + 1
        this.p = Number(lines[0])-1;
        let n = (this.p)**2 + this.p + 1;
        this.log(`p: ${this.p}, n: ${n}`);
        for (let i=0; i<n; i++) {
            if (i < 26) this.symbolArr.push(String.fromCharCode('A'.charCodeAt(0)+i));
            else if (i < 36) this.symbolArr.push(String.fromCharCode('0'.charCodeAt(0)+(i-26)));
            else if (i < 62) this.symbolArr.push(String.fromCharCode('a'.charCodeAt(0)+(i-36)));
            else this.symbolArr.push((1+i).toString());
            this.cards.push(new Set<number>());
        }
        console.log(`Symbols: ${this.symbolArr.join()}`);
        this.cards[0].add(0);
    }

    countMatches(a: Set<number>, b: Set<number>): number {
        let result = 0;
        for (let s of a.values()) {
            if (b.has(s)) result++;
        }
        return result;
    }

    cardToString(card: Set<number>): string {
        return [...card.values()].sort().map(n => this.symbolArr[n]).join(',');
    }

    // https://math.stackexchange.com/a/3633871
    _runStep(): boolean {
        let i = this.stepNumber-1;
        let moreToDo = this.stepNumber <= this.p;
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}]`);

        for (let j=0; j<this.p; j++) {
            let index = 1 + i*this.p + j;
            //this.log(`1 Card ${index} add ${i}`);
            this.cards[index].add(i);
            this.cards[i].add(index);
        }

        if (moreToDo) {
            // runs every time except the final loop, this is at i=p+1;
            for (let j=0; j<this.p; j++) {
                for (let k=0; k<this.p; k++) {
                    //this.log(`2 Card ${1 + this.p + i*this.p + k} add ${1 + this.p + j*this.p + ((i*j - k) % this.p + this.p)  % this.p}`);
                    this.cards[1 + this.p + i*this.p + k].add(1 + this.p + j*this.p + ((i*j - k) % this.p + this.p)  % this.p);
                }
            }
        }

        this.result = `[${this.cards.length.toString().padStart(2, ' ')}] ${this.cards.map(c => this.cardToString(c)).join(' / ')}`;
        return moreToDo;
    }
}

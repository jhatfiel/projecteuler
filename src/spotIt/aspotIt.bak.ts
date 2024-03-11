import { Subsets } from '../lib/CombiPerm';
import { Puzzle } from '../lib/Puzzle';

export class aspotIt extends Puzzle {
    input: number;
    symbolArr: string[] = [];
    bestCards: Set<string>[] = [];
    sampleMode(): void { };

    _loadData(lines: string[]) {
        // input is the number of symbols per card = s
        // total symbols (n) will be  (s-1)^2 + (s-1) + 1
        this.input = Number(lines[0])-1;
        let n = this.input**2 + this.input + 1;
        for (let i=0; i<n; i++) {
            if (n <= 26) this.symbolArr.push(String.fromCharCode('A'.charCodeAt(0)+i));
            else this.symbolArr.push((1+i).toString().padStart(2, ' '));
        }
        this.log(`Input: ${this.input+1}`);
    }

    countMatches(a: Set<string>, b: Set<string>): number {
        let result = 0;
        for (let astr of a.values()) {
            if (b.has(astr)) result++;
        }
        return result;
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input+1;
        // let stepNumber be the number of symbols chosen per card
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] input=${this.input}`);
        let picked: Set<string>[] = [];
        //let potCards = [...Subsets(this.symbolArr, this.stepNumber)].map(s => [...s.keys()].reverse().join(','));
        let potCards = [...Subsets(this.symbolArr, this.stepNumber)];
        //this.log(`Number of potential cards: ${potCards.length}`);
        /*
        for (let s of Subsets(this.alphaArr.slice(0, this.input), this.stepNumber)) {
            this.log(`subset: ${[...s.keys()]}`);
        }
        */

        while (potCards.length) {
            //this.log(`Number of potential cards: ${potCards.length}`);
            //potCards.forEach(c => this.log(`Potential Card: ${[...c.values()].reverse().join('')}`));

            // pick first card that leaves the most cards
            let card: Set<string>;
            let remaining = -1;
            if (picked.length === 0) {
                card = potCards.values().next().value;
            } else {
                potCards.forEach(pick => {
                    let numRemaining = potCards.filter(c => this.countMatches(pick, c) === 1).length;
                    //this.log(`Picking ${[...pick.values()].reverse().join('')} would leave us with: ${numRemaining} cards`);
                    if (numRemaining > remaining) {
                        remaining = numRemaining;
                        card = pick;
                    }
                });
            }
            if (card) {
                picked.push(card);
                //this.log(`Picking ${[...card.values()].reverse().join('')}`);
                potCards = potCards.filter(c => this.countMatches(card, c) === 1 && c !== card);
            }
        }

        this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] Picked: [${picked.length.toString().padStart(2, ' ')}] ${picked.map(c => [...c.values()].reverse().join('')).join(',')}`);
        // the best set of cards is the set that maximizes the number of cards * the number of symbols on each card
        if (this.bestCards.length === 0 || picked.length*picked[0].size > this.bestCards.length*this.bestCards[0].size) {
            this.bestCards = picked;
        }

        if (picked.length === 1 && this.stepNumber > 1) {
            moreToDo = false;
        }

        this.result = `[${this.bestCards.length.toString().padStart(2, ' ')}] ${this.bestCards.map(c => [...c.values()].reverse().join('')).join(' / ')}`;
        return moreToDo;
    }
}

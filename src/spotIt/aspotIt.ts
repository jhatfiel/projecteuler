import { Subsets } from '../lib/CombiPerm';
import { Puzzle } from '../lib/Puzzle';

export class aspotIt extends Puzzle {
    input: number;
    symbolArr: string[] = [];
    cards: Set<string>[] = [];
    used = new Map<string, Map<string, boolean>>();
    sampleMode(): void { };

    _loadData(lines: string[]) {
        // input is the number of symbols per card = s
        // total symbols (n) will be  (s-1)^2 + (s-1) + 1
        this.input = Number(lines[0]);
        let n = (this.input-1)**2 + this.input;
        this.log(`n: ${n}`);
        for (let i=0; i<n; i++) {
            if (i < 26) this.symbolArr.push(String.fromCharCode('A'.charCodeAt(0)+i));
            else if (i < 36) this.symbolArr.push(String.fromCharCode('0'.charCodeAt(0)+(i-26)));
            else if (i < 62) this.symbolArr.push(String.fromCharCode('a'.charCodeAt(0)+(i-36)));
            else this.symbolArr.push((1+i).toString());
        }
        console.log(`Symbols: ${this.symbolArr.join()}`);
        this.symbolArr.forEach(a => {
            let map = new Map<string, boolean>();
            this.used.set(a, map);
            this.symbolArr.forEach(b => map.set(b, b===a));
        })
        this.log(`Input: ${this.input}`);
    }

    countMatches(a: Set<string>, b: Set<string>): number {
        let result = 0;
        for (let astr of a.values()) {
            if (b.has(astr)) result++;
        }
        return result;
    }

    cardToString(card: Set<string>): string {
        return [...card.values()].join(',');
    }

    recordCard(card: Set<string>) {
        this.cards.push(card);
        [...card.values()].forEach(a => [...card.values()].forEach(b => this.used.get(a).set(b, true)));
    }

    completeCard(card: Set<string>): Set<string> {
        if (card.size === this.input) return card;

        for (let char of this.symbolArr) {
            if (!card.has(char) && ![...card.values()].some(v => this.used.get(v).get(char))) {
                let newCard = new Set<string>(card);
                newCard.add(char);
                newCard = this.completeCard(newCard);
                if (newCard) return newCard;
            }
        }
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input-1;
        this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] input=${this.input}`);

        if (this.stepNumber === 1) {
            // generate first set of cards
            let firstCard = new Set(this.symbolArr.slice(0, this.input));

            this.log(`First Card ${this.cardToString(firstCard)}`);
            this.recordCard(firstCard);

            let secondChar = this.symbolArr[this.input];
            this.log(`Make new card with each character of firstCard and use ${secondChar} as second character`);
            [...firstCard.values()].forEach(char => {
                let card = new Set<string>();
                card.add(char);
                card.add(secondChar);
                card = this.completeCard(card);
                if (card) {
                    this.log(`Made new card: ${this.cardToString(card)}`);
                    this.recordCard(card);
                }
            });
        } else {
            // 
            this.symbolArr.slice(0, this.input).forEach(char => {
                let card = new Set<string>();
                card.add(char);
                card = this.completeCard(card);
                if (card) {
                    this.log(`Made new card: ${this.cardToString(card)}`);
                    this.recordCard(card);
                }
            })
        }

        this.result = `[${this.cards.length.toString().padStart(2, ' ')}] ${this.cards.map(c => this.cardToString(c)).join(' / ')}`;
        return moreToDo;
    }
}

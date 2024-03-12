import { Permutations } from '../lib/CombiPerm';
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
        this.symbolArr.forEach(s => {
            let map = new Map<string, boolean>();
            this.used.set(s, map);
            this.symbolArr.forEach(t => map.set(t, t===s));
        })
        this.log(`Input: ${this.input}`);
    }

    countMatches(a: Set<string>, b: Set<string>): number {
        let result = 0;
        for (let s of a.values()) {
            if (b.has(s)) result++;
        }
        return result;
    }

    cardToString(card: Set<string>): string {
        return [...card.values()].join(',');
    }

    recordCard(card: Set<string>) {
        this.cards.push(card);
        // this sets all pairings of letters to true
        [...card.values()].forEach(a => [...card.values()].forEach(b => this.used.get(a).set(b, true)));
    }

    completeCard(card: Set<string>): Set<string> {
        if (card.size === this.input) return card;
        let pad = `${''.padStart(card.size)}`;

        let potentialSymbols = this.symbolArr.filter(s => !card.has(s) && [...card.values()].every(t => !this.used.get(s).get(t)));
        this.log(`${pad}Complete Card: ${this.cardToString(card)}, potentialSymbols: ${potentialSymbols}`);
        if (potentialSymbols.length + card.size >= this.input) {
            let potCombinations = Subsets(potentialSymbols, this.input - card.size);
            this.log(`${pad}Potential Subsets: ${[...potCombinations].length}`);
            for (let pick of Subsets(potentialSymbols, this.input - card.size)) {
                //this.log(`${pad}Trying: pick=${this.cardToString(pick)}`);
                let valid = true;
                for (let pair of Subsets([...pick.values()], 2)) {
                    let [a,b] = [...pair.values()];
                    //this.log(`Trying: pair=${this.cardToString(pair)} ${a} ${b}`);
                    if (this.used.get(a).get(b)) {
                        valid = false;
                        //this.log(`Invalid: ${a} ${b}`);
                        break;
                    }
                }
                if (valid) {
                    this.log(`${pad}Found subset that works: ${this.cardToString(pick)}`);
                    [...pick.values()].reverse().forEach(s => card.add(s));
                    return card;
                }
                /*
                if ([...pick.values()].every(a => [...pick.values()].every(b => !this.used.get(a).get(b)))) {
                    break;
                }
                */
            }
            /*
            for (let char of potentialSymbols) {
                let newCard = new Set<string>(card);
                newCard.add(char);
                newCard = this.completeCard(newCard);
                if (newCard) return newCard;
            }
            */
        }

        this.log(`${''.padStart(card.size)}Unable to complete card...`);
        return undefined;
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
            let firstSymbol = this.symbolArr.slice(0, this.input);
            for (let p of Permutations(firstSymbol)) {
                let valid = true;
                // some permutation of generating cards should work, yes?
                let madeCards: Set<string>[] = [];
                for (let s of p) {
                    //let s = this.symbolArr[i];
                    let card = new Set<string>();
                    card.add(s);
                    card = this.completeCard(card);
                    if (card) {
                        this.log(`Made new card: ${this.cardToString(card)}`);
                        this.recordCard(card);
                        madeCards.push(card);
                    } else {
                        // unrecord all the cards and try the next permutation
                        this.log(`***************** Unmaking those cards, we failed!`);
                        madeCards.forEach(c => {
                            this.cards.pop();
                            let arr = [...c.values()];
                            arr.forEach(s => arr.filter(t => t !== s).forEach(t => this.used.get(s).set(t, false)));
                        })
                        valid = false;
                        break;
                    }
                }
                if (valid) {
                    this.log(`Successfully made cards`);
                    break;
                }
            }
        }

        this.result = `[${this.cards.length.toString().padStart(2, ' ')}] ${this.cards.map(c => this.cardToString(c)).join(' / ')}`;
        return moreToDo;
    }
}

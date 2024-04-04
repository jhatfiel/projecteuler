import { Puzzle } from '../lib/Puzzle';
import { CountOccurrences } from '../lib/String';

export class a0054 extends Puzzle {
    p1WinCount = 0;

    sampleMode(): void { };

    _loadData(lines: string[]) { }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.lines.length;
        let line = this.lines[this.stepNumber-1];
        let cards = line.split(' ');
        let p1Cards = cards.slice(0, 5);
        let p2Cards = cards.slice(5);
        let p1 = new PokerHand(p1Cards);
        let p2 = new PokerHand(p2Cards);
        let p1Rank = p1.getRank();
        let p2Rank = p2.getRank();
        let winner = 'P2';
        if (p1Rank > p2Rank) {
            winner = 'P1';
            this.p1WinCount++;
            this.result = this.p1WinCount.toString();
        }
        this.log(`[${this.stepNumber.toString().padStart(5)}]: [${line}]  /  P1 = ${p1.toString().padEnd(25)}  /  P2 = ${p2.toString().padEnd(25)} winner=${winner}`);

        return moreToDo;
    }
}

type Card = {
    value: number;
    suit: string;
}

class PokerHand {
    cards: Card[] = [];
    rank = 0;
    setCards: Card[] = [];
    offCards: Card[] = [];

    constructor(public input: string[]) {
        for (let card of input) {
            let [v, suit] = card.split('');
            let value = Number(v);
            if (Number.isNaN(value)) {
                switch (v) {
                    case 'T': value = 10; break;
                    case 'J': value = 11; break;
                    case 'Q': value = 12; break;
                    case 'K': value = 13; break;
                    case 'A': value = 14; break;
                    default: break;
                }
            }
            this.cards.push({value, suit});
        }

        let occurrences = CountOccurrences(this.cards.map(c => c.value));
        let sortedOccurrences = [...occurrences].sort((pa, pb) => pb[1] - pa[1]);
        let mostValue = Number(sortedOccurrences[0][0]);
        let mostCount = sortedOccurrences[0][1];
        let min = 15;
        let max = 0;
        this.cards.forEach(c => { min = Math.min(min, c.value); max = Math.max(max, c.value); });

        let mostValueCards = this.cards.filter(c => c.value === mostValue);
        let notMostValueCards = this.cards.filter(c => c.value !== mostValue);
        if (this.allSameSuit() && this.cards.every(c => c.value >= 10)) {
            // 9) Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
            this.rank = 9;
            this.setCards = this.cards;
            this.offCards = [];
        } else if (this.allSameSuit() && max-min === 4) { 
            // 8) Straight Flush: All cards are consecutive values of same suit.
            this.rank = 8;
            this.setCards = this.cards;
            this.offCards = [];
        } else if (occurrences.size === 2) {
            // 7) Four of a Kind: Four cards of the same value.
            if (mostCount === 4) this.rank = 7;
            // 6) Full House: Three of a kind and a pair.
            else this.rank = 6;
            this.setCards = mostValueCards;
            this.offCards = notMostValueCards;
        } else if (this.allSameSuit()) {
            // 5) Flush: All cards of the same suit.
            this.rank = 5;
            this.setCards = this.cards;
            this.offCards = [];
        } else if (max - min === 4 && occurrences.size === 5) {
            // 4) Straight: All cards are consecutive values.
            this.rank = 4;
            this.setCards = this.cards;
            this.offCards = [];
        } else if (occurrences.size === 3) {
            // 3) Three of a Kind: Three cards of the same value.
            if (mostCount === 3) {
                this.rank = 3;
                this.setCards = mostValueCards;
                this.offCards = notMostValueCards;
            } else {
                // 2) Two Pairs: Two different pairs.
                // little bit complicated - we need the highest value of the pairs and finally the offCards are the one card that is left
                this.rank = 2;
                this.setCards = this.cards.filter(c => c.value === Number(sortedOccurrences[0][0]) || c.value === Number(sortedOccurrences[1][0]));
                this.offCards = this.cards.filter(c => c.value !== Number(sortedOccurrences[0][0]) && c.value !== Number(sortedOccurrences[1][0]));
            }
        } else if (occurrences.size === 4) {
            // 1) One Pair: Two cards of the same value.
            this.rank = 1;
            this.setCards = mostValueCards;
            this.offCards = notMostValueCards;
        } else {
            // 0) High Card: Highest value card.
            this.rank = 0;
            this.setCards = [];
            this.offCards = this.cards;
        }
    }

    allSameSuit(): boolean {
        return this.cards.every(c => this.cards[0].suit === c.suit);
    }

    static cardsToString(cards: Card[]): string {
        return cards.sort((a, b) => b.value - a.value).map(PokerHand.cardToString).join('');
    }

    static cardToString(c: Card): string {
        return c.value.toString().padStart(2, '0');
    }

    getRank(): string {
        return `${this.rank}.${PokerHand.cardsToString(this.setCards)}${PokerHand.cardsToString(this.offCards)}`;
    }

    toString(): string {
        return `${this.rank}: ${this.setCards.sort((a,b) => b.value - a.value).map(c => `${c.value}${c.suit}`)} [${this.offCards.sort((a,b) => b.value - a.value).map(c => `${c.value}${c.suit}`)}]`;
    }
}
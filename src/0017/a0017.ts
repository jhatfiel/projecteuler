import { Puzzle } from '../lib/Puzzle';

export class a0017 extends Puzzle {
    input: number;
    totalLetters = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
    }

    toWords(n: number): string {
        // handles numbers up to 99,999, maybe even 999,999 if you're supposed to put "and" in the thousands part? British English is different from what I'm used to.
        // probably wouldn't be that complicated to extend it higher (indefinitely through known words for "thousand" units)
        let result = '';
        let thousands = Math.floor(n / 1000);
        if (thousands) {
            result += this.toWords(thousands) + 'thousand';
        }
        n = n % 1000;
        let hundreds = Math.floor(n / 100);
        if (hundreds) {
            result += this.toWords(hundreds) + 'hundred';
        }
        let part2 = '';
        n = n % 100;
        let tens = Math.floor(n / 10);
        if (tens >= 2) {
            part2 += ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'][tens-2] + this.toWords(n%10);
        } else if (tens === 1) {
            part2 += ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'][n-10];
        } else {
            part2 += ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][n];
        }
        return `${result}${result&&part2?'and':''}${part2}`;
    }

    _runStep(): boolean {
        let moreToDo = this.stepNumber < this.input;
        let words = this.toWords(this.stepNumber);
        this.totalLetters += words.length;
        //this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] words=${words} ${words.length}`);
        this.result = this.totalLetters.toString();
        return moreToDo;
    }
}
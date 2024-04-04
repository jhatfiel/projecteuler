import { Puzzle } from '../lib/Puzzle';
import { CountOccurrences } from '../lib/String';

export class a0059 extends Puzzle {
    input: number[];
    key: number[] = [];
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = lines[0].split(',').map(Number);
        this.key.push('a'.charCodeAt(0));
        this.key.push('a'.charCodeAt(0));
        this.key.push('a'.charCodeAt(0));
    }

    /**
     * https://www.ascii-code.com/characters/printable-characters
     * ASCII printable characters are the 95 characters in the ASCII 
     * character set that can be displayed on screen or printed on paper.
     * They include letters, numbers, symbols, and punctuation marks,
     * and are represented by codes 32 to 126. These characters are used
     *  to create written text and other visual content. 
     **/

    asciiToString(num: number[]): string {
        return num.map(n => String.fromCharCode(n)).join('')
    }

    _runStep(): boolean {
        let moreToDo = true;
        let decode: number[] = [];
        for (let i=0; i<this.input.length; i++) {
            let ch = this.input[i];
            ch = ch ^ this.key[i%3];
            if (ch >= 32 && ch <= 126) {
                decode.push(ch);
            } else {
                break;
            }
        }
        if (decode.length === this.input.length && CountOccurrences(decode).get('e'.charCodeAt(0).toString()) > 150) {
            let charSum = decode.reduce((sum, c) => sum+=c, 0).toString();
            this.log(`[${this.stepNumber.toString().padStart(5)}] ${this.asciiToString(this.key)}: [${charSum}] ${this.asciiToString(decode)}`);
            this.result = charSum;
        }
        this.key[2]++;
        if (this.key[2] > 'z'.charCodeAt(0)) {
            this.key[2] = 'a'.charCodeAt(0);
            this.key[1]++;
        }
        if (this.key[1] > 'z'.charCodeAt(0)) {
            this.key[1] = 'a'.charCodeAt(0);
            this.key[0]++;
        }
        if (this.key[0] > 'z'.charCodeAt(0)) {
            moreToDo = false;
        }
        return moreToDo;
    }
}

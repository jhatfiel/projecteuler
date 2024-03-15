import { Puzzle } from '../lib/Puzzle';

/*
From: https://www.reddit.com/r/adventofcode/comments/1bejcvc/pi_coding_quest/
https://ivanr3d.com/projects/pi/
 */
export class aivanPi extends Puzzle {
    input: string;
    key: number[];
    keyLen = 0;
    msg = '';

    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = lines[0];
        this.key = Math.PI.toString().replace('\.', '').substring(0,16).split('').map(Number);
        this.keyLen = this.key.length;
        this.log(`input=${this.input}, keyLen=${this.keyLen}`);
        this.result = '';
    }

    _runStep(): boolean {
        let i = this.stepNumber - 1;
        let moreToDo = i < this.input.length - 1;
        let ch = this.input.charAt(i);
        if ('a' <= ch && ch <= 'z') {
            ch = String.fromCharCode(ch.charCodeAt(0) - this.key[i%this.keyLen]);
            if (ch < 'a') ch = String.fromCharCode(ch.charCodeAt(0) + 26);
            this.msg += ch;
        }
        if ('A' <= ch && ch <= 'Z') {
            ch = String.fromCharCode(ch.charCodeAt(0) - this.key[i%this.keyLen]);
            if (ch < 'A') ch = String.fromCharCode(ch.charCodeAt(0) + 26);
            this.msg += ch.toLowerCase();
        }
        this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] [${ch}]`);
        this.result += ch;
        if (!moreToDo) {
            let product = 1;
            this.log(`${this.result}`);
            this.log(`${this.msg}`);
            ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].forEach((word, num) => {
                let start = this.msg.indexOf(word);
                while (start > 0) {
                    product *= num;
                    this.log(`Found ${word}[${num}] at ${start}`);
                    start = this.msg.indexOf(word, start+1);
                }
            });
            this.result = product.toString();
        }
        return moreToDo;
    }
}

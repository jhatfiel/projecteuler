import { Puzzle } from '../lib/Puzzle';

export class a0019 extends Puzzle {
    //        J   F   M   A   M   J   J   A   S   O   N   D
    mDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // leap year is year div 4 but not century unless div 400
    year = 1900
    month = 0;
    dow = 1;
    startYear: number;
    endYear: number;
    sundays = 0;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.startYear = Number(lines[0]);
        this.endYear = Number(lines[1]);
    }

    getDaysInMonth(): number {
        let result = this.mDays[this.month];
        if (this.month === 1 && ((this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0))) result++;

        return result;
    }

    _runStep(): boolean {
        this.dow = (this.dow+this.getDaysInMonth())%7;
        // setup next one
        this.month++;
        if (this.month === 12) {
            this.month = 0;
            this.year++;
        }
        if (this.year >= this.startYear && this.year <= this.endYear && this.dow === 0) {
            // include in counts
            this.log(`[${this.stepNumber.toString().padStart(5, ' ')}] year${this.year}/month${this.month} starts on ${this.dow}`);
            this.sundays++;
            this.result = this.sundays.toString();
        }
        return this.year <= this.endYear;
    }
}
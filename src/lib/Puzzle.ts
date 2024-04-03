import { performance } from "perf_hooks";

export abstract class Puzzle {
    constructor(public fn: string, protected log: (...data: any[]) => void = Puzzle._log) {
        performance.mark('start');
        if (fn && fn.startsWith('sample')) {
            this.log('SAMPLE MODE ACTIVE');
            this.inSampleMode = true;
        }
    }
    inSampleMode = false;
    lines: string[];
    result = '';
    stepNumber = 0;

    static _log(...data: any[]) {
        console.log(`[${performance.measure('elapsed', 'start').duration.toFixed(2).toString().padStart(12, ' ')}ms]: ${data.toString()}`);
    }

    loadData(lines: Array<string>) {
        if (this.inSampleMode) this.sampleMode();
        this.lines = lines;
        this._loadData(lines);
    }
    _loadData(lines: Array<string>) { };

    /**
     * 
     * @returns boolean true if there is more to do, false if we are done (`this.result` should how the answer at this point)
     */
    runStep(): boolean { this.stepNumber++; return this._runStep(); }
    abstract _runStep(): boolean;
    sampleMode() { };
};
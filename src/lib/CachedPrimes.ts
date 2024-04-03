import { createWriteStream } from "fs";
import { PrimeGeneratorMax } from "./NumberTheory";

export class CachedPrimes {
    constructor() {
    }

    static initCache(max: number = 100000000) {
        let cache = createWriteStream('cache/primes.txt');
        for (let p of PrimeGeneratorMax(max))
            cache.write(`${p}\n`);
        cache.close();
    }
}

CachedPrimes.initCache();
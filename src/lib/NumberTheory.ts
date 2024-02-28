let _NUMBERS_PRIME_cache: number[] = [];
let _NUMBERS_PRIME_lastChecked = 2;

/**
 * Generate all prime numbers <= max;
 * @param max Maximum prime number that will be generated.  The generator is invalid above that number (it will not generate any prime above max)
 */
export function* PrimeGeneratorMax(max: number): Generator<number> {
    // initialize to false - index into array is n = 2(i+1)+1 (so index 0 is 3, index 1 is 5, etc, and we only need n/2 length)
    // reverse is: i = (n-1)/2 - 1;
    let length = Math.floor((max-1)/2);
    let oddPrimes = Array.from({length}, _ => true);
    let crossover = Math.ceil((Math.sqrt(max) - 1)/2) - 1;
    //console.log(`Setting up, max=${n}, length=${length}, crossover=${crossover}`);
    yield 2;
    for (let i=0; i<crossover; i++) {
        //console.log(`${i}: ${oddPrimes.map(b => b?1:0).join(' ')}`);
        if (oddPrimes[i]) {
            let p = 2*(i+1)+1;
            yield p;
            // mark everything above p^2 as false
            for (let j=(p*p - 1)/2 - 1; j < length; j += p) {
                oddPrimes[j] = false;
            }
        }
    }

    for (let i=crossover; i < length; i++) {
        //console.log(`${i}: ${oddPrimes.map(b => b?1:0).join(' ')}`);
        if (oddPrimes[i]) {
            let p = 2*(i+1)+1;
            yield p;
        }
    }
}

/**
 * Simple, dumb prime number generator.  DO NOT USE if you expect to get primes over a few hundred thousand because it's too slow.
 * 
 * Use PrimeGeneratorMax instead
 */
export function* PrimeGenerator(): Generator<number> {
    _NUMBERS_PRIME_cache.push(_NUMBERS_PRIME_lastChecked);
    yield _NUMBERS_PRIME_lastChecked;
    _NUMBERS_PRIME_lastChecked++;
    while (true) {
        if (_NUMBERS_PRIME_cache.every(n => _NUMBERS_PRIME_lastChecked % n !== 0)) {
            _NUMBERS_PRIME_cache.push(_NUMBERS_PRIME_lastChecked);
            //console.log(`Found prime: ${_NUMBERS_PRIME_lastChecked}`);
            yield _NUMBERS_PRIME_lastChecked;
        }
        _NUMBERS_PRIME_lastChecked+=2;
    }
}

let Primes = PrimeGenerator();

export function PrimeFactors(n: number): Map<number, number> {
    let result = new Map<number, number>();
    let sqr_n = Math.sqrt(n);
    while (_NUMBERS_PRIME_lastChecked < sqr_n) {
        PrimeGenerator().next();
    }
    _NUMBERS_PRIME_cache.filter(p => n%p === 0).forEach(p => {
        let cnt = 0;
        while (n % p === 0) {
            cnt++;
            n /= p;
        }
        result.set(p, cnt);
    })
    return result;
}

export function GCD(x: bigint, y: bigint): bigint {
    return (y === 0n)?x:GCD(y, x%y);
}

export function LCM(x: bigint, y: bigint): bigint {
    return x*(y/GCD(x, y));
}

export function ArithmeticProgressionSum(first: number, last: number, step=1): number {
    return (Math.floor((last-first)/step) + 1) * ((first + last) / 2)
}

export { Primes };
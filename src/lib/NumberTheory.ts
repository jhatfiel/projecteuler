let _NUMBERS_PRIME_cache: number[] = [2];
let _NUMBERS_PRIME_lastChecked = 3;

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
    _NUMBERS_PRIME_cache = [2];
    _NUMBERS_PRIME_lastChecked=3;
    yield 2;
    for (let i=0; i<crossover; i++) {
        //console.log(`${i}: ${oddPrimes.map(b => b?1:0).join(' ')}`);
        if (oddPrimes[i]) {
            let p = 2*(i+1)+1;
            _NUMBERS_PRIME_cache.push(p);
            _NUMBERS_PRIME_lastChecked=p;
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
            _NUMBERS_PRIME_cache.push(p);
            _NUMBERS_PRIME_lastChecked=p;
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
    for (let p of _NUMBERS_PRIME_cache) {
        yield p;
    }
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

/**
 * Return the prime factorization of n 
 * @param n Number to factor
 * @returns 
 * Mapping of prime factors to their power
 */
export function PrimeFactors(n: number): Map<number, number> {
    let result = new Map<number, number>();
    if (n === 0) {
        return result;
    }
    let sqr_n = Math.sqrt(n);
    //console.log(`PrimeFactors(${n}) ${_NUMBERS_PRIME_lastChecked}`);
    while (_NUMBERS_PRIME_lastChecked < sqr_n) {
        Primes.next();
    }
    //console.log(`Finding factors (cache=${_NUMBERS_PRIME_cache})`);
    _NUMBERS_PRIME_cache.filter(p => n%p === 0).forEach(p => {
        //console.log(`Finding factors ${n}`);
        let cnt = 0;
        while (n % p === 0) {
            cnt++;
            n /= p;
        }
        result.set(p, cnt);
    })
    if (n !== 1) result.set(n, 1);
    return result;
}

/**
 * Return the actual divisors of a number as a list
 * @param n the number
 * @returns 
 * list of divisors (1, ..., n)
 */
export function GetDivisors(n: number): number[] {
    return PermuteFactors(PrimeFactors(n));
}

export function GetProperDivisors(n: number): number[] {
    let arr = PermuteFactors(PrimeFactors(n));
    return arr.slice(0, arr.length-1);
}

/**
 * helper function to build divisors given a list of factors
 * @param factors 
 * @returns 
 * list of divisors based on inputted factors
 */
function PermuteFactors(factors: Map<number, number>): number[] {
    if (factors.size === 0) return [1];
    else {
        let remainingFactors = new Map(factors);
        let aFactor = factors.entries().next().value;
        remainingFactors.delete(aFactor[0]);
        let remaining = PermuteFactors(remainingFactors);
        return Array.from({length: aFactor[1]+1}, (_, ind) => aFactor[0]**ind).flatMap(f => remaining.map(r => r*f));
    }
}

export function GCD(x: bigint, y: bigint): bigint {
    return (y === 0n)?x:GCD(y, x%y);
}

export function LCM(x: bigint, y: bigint): bigint {
    return x*(y/GCD(x, y));
}

export function ArithmeticProgressionSum(first: number, last: number, step=1): number {
    return (Math.floor((last-first)/step) + 1) * ((first + last) / 2);
}

export function Factorial(n: bigint): bigint {
    if (n<=1) return 1n;
    else return n*Factorial(n-1n);
}

/**
 * N Choose K or Binomial Coefficient - defined as 
 * 
 *  `n! / ( k! * (n-k)!)`
 *
 *  To reduce the size of the factorials, we just manually compute the leftover n! in the numerator and the leftover part of the denominator
 * @param n of N Choose K
 * @param k of N Choose K 
 * @returns 
 */
export function NChooseK(n: number, k: number): bigint {
    // 10,4 would be 10*9*8*7*6*5*4*3*2             = 10*9*8*7
    //                        6*5*4*3*2 * 4*3*2*1     4*3*2*1
    // 10,3 would be 10*9*8*7*6*5*4*3*2             = 10*9*8
    //                      7*6*5*4*3*2 * 3*2*1       3*2*1
    // or, n*(n-1)*...*(Math.max(k, n-k)+1) / (Math.min(k, n-k))*(-1)*...*(1)
    // i=1..Math.min(k, n-k)
    //   num*=n-i+1
    //   den*=i
    let bn = BigInt(n),
        num = 1n,
        den = 1n;
    for (let i=1n; i<Math.min(k, n-k); i++) {
        num *= bn-i+1n;
        den *= i;
    }
    return num/den;
}

export { Primes };
import LargeSet from "large-set";
import { BooleanArray } from "./BooleanArray";
import { PriorityHeap } from "./priorityHeap";

let _NUMBERS_PRIME_cache: number[] = [2];
let _NUMBERS_PRIME_lookup = new LargeSet<number>();
let _NUMBERS_PRIME_lastChecked = 2;

/**
 * Generate all prime numbers <= max;
 * @param max Maximum prime number that will be generated.  The generator is invalid above that number (it will not generate any prime above max)
 */
export function* PrimeGeneratorMax(max: number): Generator<number> {
    // initialize to false - index into array is n = 2(i+1)+1 (so index 0 is 3, index 1 is 5, etc, and we only need n/2 length)
    // reverse is: i = (n-1)/2 - 1;
    let length = Math.floor((max-1)/2);
    console.log(`PrimeGeneratorMax: allocate oddPrimes array ${length}`);
    //let oddPrimes = Array.from({length}, _ => true);
    let oddPrimes = new BooleanArray(length, true);
    console.log(`PrimeGeneratorMax: allocate done`);
    let crossover = Math.ceil((Math.sqrt(max) - 1)/2) - 1;
    //console.log(`Setting up, max=${n}, length=${length}, crossover=${crossover}`);
    _NUMBERS_PRIME_cache = [2];
    _NUMBERS_PRIME_lookup.add(2);
    _NUMBERS_PRIME_lastChecked=2;
    yield 2;
    for (let i=0; i<crossover; i++) {
        //console.log(`${i}: ${oddPrimes.map(b => b?1:0).join(' ')}`);
        if (oddPrimes.get(i)) {
        //if (oddPrimes[i]) {
            let p = 2*(i+1)+1;
            _NUMBERS_PRIME_cache.push(p);
            _NUMBERS_PRIME_lookup.add(p);
            _NUMBERS_PRIME_lastChecked=p;
            yield p;
            // mark everything above p^2 as false
            for (let j=(p*p - 1)/2 - 1; j < length; j += p) {
                oddPrimes.set(j, false);
                //oddPrimes[j] = false;
            }
        }
    }

    //console.log(`Crossover: ${crossover}, length=${length}`);
    for (let i=crossover; i < length; i++) {
        //console.log(`${i}: ${oddPrimes.map(b => b?1:0).join(' ')}`);
        //if (i % 10000000 === 0) console.log(`After crossover, index: ${i}`);
        if (oddPrimes.get(i)) {
        //if (oddPrimes[i]) {
            let p = 2*(i+1)+1;
            //if (i > 155124118) console.log(`After crossover, found prime ${i} = ${p} ${_NUMBERS_PRIME_cache.length}`);
            _NUMBERS_PRIME_cache.push(p);
            //if (i > 155124118) console.log(`After crossover, found prime ${i} = ${p} ${_NUMBERS_PRIME_lookup.size}`);
            _NUMBERS_PRIME_lookup.add(p);
            //if (i > 155124118) console.log(`After crossover, found prime ${i} = ${p}`);
            _NUMBERS_PRIME_lastChecked=p;
            yield p;
        }
    }
    console.log(`PrimeGeneratorMax: done`);
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
    _NUMBERS_PRIME_lastChecked++;
    while (true) {
        if (_NUMBERS_PRIME_cache.every(n => _NUMBERS_PRIME_lastChecked % n !== 0)) {
            _NUMBERS_PRIME_cache.push(_NUMBERS_PRIME_lastChecked);
            _NUMBERS_PRIME_lookup.add(_NUMBERS_PRIME_lastChecked);
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
    while (_NUMBERS_PRIME_lastChecked <= sqr_n) {
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

export function IsPrime(n: number): boolean {
    if (_NUMBERS_PRIME_lastChecked >= n) return _NUMBERS_PRIME_lookup.has(n);

    while (_NUMBERS_PRIME_lastChecked < Math.sqrt(n)) {
        Primes.next();
    }
    return _NUMBERS_PRIME_cache.every(p => n % p !== 0);
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

export function GCD(x: bigint|number, y: bigint|number): bigint {
    let bx = BigInt(x),
        by = BigInt(y);
    return (by === 0n)?bx:GCD(y, bx%by);
}

export function LCM(x: bigint|number, y: bigint|number): bigint {
    let bx = BigInt(x),
        by = BigInt(y);
    return bx*(by/GCD(x, y));
}

export function ArithmeticProgressionSum(first: number, last: number, step=1): number {
    return (Math.floor((last-first)/step) + 1) * ((first + last) / 2);
}

let _NUMBERS_FACTORIAL_lookup: bigint[] = [1n, 1n];
export function Factorial(n: number): bigint {
    let result = _NUMBERS_FACTORIAL_lookup[n];
    if (result === undefined) {
        result = BigInt(n)*Factorial(n-1);
        _NUMBERS_FACTORIAL_lookup[n] = result;
    }
    return result;
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
    // N!/(k!*(n-k)!)
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
    for (let i=1n; i<=Math.min(k, n-k); i++) {
        num *= bn-i+1n;
        den *= i;
    }
    return num/den;
}

export function* Fibonacci(): Generator<BigInt> {
    let arr = [1n,1n];
    yield arr[0];
    yield arr[1];
    for (;;) {
        [arr[0], arr[1]] = [arr[1], arr[0]+arr[1]];
        yield arr[1];
    }
}

/**
 * Return the period of the unit fraction 1/`d`
 * @param d denominator
 */
export function GetPeriod(d: number): number {
    let nPos = new Map<number, number>();
    let n = 10;
    let pos = 0;
    while (!nPos.has(n)) {
        nPos.set(n, pos++);
        n = (n % d) * 10;
    }
    return n>0?pos - nPos.get(n):0;
}

export type Triple = {
    a: number;
    b: number;
    c: number;
}

/**
 * Generate Pythagorean Triples, in increasing order of perimeter
 * 
 * Details: https://en.wikipedia.org/wiki/Pythagorean_triple 
 * @returns a,b,c triples
 */
export function PythagoreanTriples(): Generator<Triple> {
    let shouldPrecede = function(t1: Triple, t2: Triple) {
        let t1P = t1.a + t1.b + t1.c;
        let t2P = t2.a + t2.b + t2.c;
        if (t1P !== t2P) return t1P > t2P;
        else return t1.a >= t2.a;
    };

    let heap = new PriorityHeap(shouldPrecede);
    heap.enqueue({a: 3, b: 4, c: 5});

    return function* backtrack(): Generator<Triple> {
        while (true) {
            let t = heap.dequeue();
            // compute the 3 new triples and enqueue them
            if (t.a > t.b) yield {a: t.b, b: t.a, c: t.c};
            else yield t;
            heap.enqueue({a: t.a - 2*t.b + 2*t.c, b: 2*t.a - t.b + 2*t.c, c: 2*t.a - 2*t.b + 3*t.c});
            heap.enqueue({a: t.a + 2*t.b + 2*t.c, b: 2*t.a + t.b + 2*t.c, c: 2*t.a + 2*t.b + 3*t.c});
            heap.enqueue({a: -t.a + 2*t.b + 2*t.c, b: -2*t.a + t.b + 2*t.c, c: -2*t.a + 2*t.b + 3*t.c});
        }
    }();
}

export function ModPow(b: bigint|number, e: bigint|number, m: bigint|number): bigint {
    let result = 1n;
    let _b = BigInt(b);
    let _e = BigInt(e);
    let _m = BigInt(m);
    if (_m <= 1) return 0n;
    _b = _b % _m;
    while (_e > 0) {
        if (_e % 2n === 1n) result = (result * _b) % _m;
        _e = _e >> 1n;
        _b = (_b*_b) % _m;
    }

    return result;
}

export { Primes };
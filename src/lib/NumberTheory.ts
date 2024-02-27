let _NUMBERS_PRIME_cache: number[] = [];
let _NUMBERS_PRIME_lastChecked = 2;

export function* PrimeGenerator(): Generator<number> {
    while (true) {
        if (_NUMBERS_PRIME_cache.every(n => _NUMBERS_PRIME_lastChecked % n !== 0)) {
            _NUMBERS_PRIME_cache.push(_NUMBERS_PRIME_lastChecked);
            //console.log(`Found prime: ${_NUMBERS_PRIME_lastChecked}`);
            yield _NUMBERS_PRIME_lastChecked;
        }
        _NUMBERS_PRIME_lastChecked++;
    }
}

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
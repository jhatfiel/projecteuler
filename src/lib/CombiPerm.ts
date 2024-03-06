// https://stackoverflow.com/a/53685501
export function Combinations<T>(arr: T[], n: number): T[][] {
    return arr.reduce((p,c,i,a) => n>1?[...p, ...Combinations(a.slice(i+1), n-1).map(e => [c, ...e])]:[...p, [c]], ([] as T[][]));
};

/**
 * Permute values in lexigraphical order
 * 
 * https://stackoverflow.com/a/32551801
 * @param arr array of values to permute (in priority order)
 */
export function OrderedPermutations<T>(arr: T[]): Generator<T[]> {
    var length = arr.length,
        used = Array.from({length}, _ => false),
        data = Array<T>(length);
    return function* backtracking(pos: number): Generator<T[]> {
        if (pos === length) yield data.slice();
        else
            for (var i=0; i < length; i++)
                if (!used[i]) {
                    used[i] = true;
                    data[pos] = arr[i];
                    yield* backtracking(pos+1);
                    used[i] = false;
                }
    }(0);
}

/**
 * Permute values
 * I'm not sure why I would use this one (found on stackoverflow) vs the OrderedPermutations one which seems much cleaner to me and is actually faster...
 * @param arr arr of values to permute
 */
export function* Permutations<T>(arr: T[]): Generator<T[], void, unknown> {
    if (arr.length < 2) yield arr;
    else {
        for (const p of Permutations(arr.slice(1))) {
            for (const r of Rotations(p, arr[0])) {
                yield r;
            }
        }
    }
}

export function* Rotations<T>(arr: T[], v: T): Generator<T[], void, unknown> {
    if (arr.length === 0) yield [v];
    else
        yield *IterableChain(
            [[v, ...arr]],
            IterableMap(Rotations(arr.slice(1), v), r => [arr[0], ...r])
        );
}

export function* IterableMap<T>(iterable: IterableIterator<T>, fun: (e:T) => T): Generator<T, void, unknown> {
    for (const e of iterable) yield fun(e);
}

export function* IterableChain<T>(...ts: [T[][], IterableIterator<T[]>]): Generator<T[], void, unknown> {
    for (const t of ts)
        for (const e of t)
            yield e;
}
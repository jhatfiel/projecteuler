/**
 * Return all combinations of length n of an array (order doesn't matter)
 * 
 * `[1,2,3,4],2 => [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]`
 * 
 * https://stackoverflow.com/a/53685501
 * @param arr Array of values to select combinations from
 * @param n length of each combination
 */
export function Combinations<T>(arr: T[], n: number): T[][] {
    return arr.reduce((p,c,i,a) => n>1?[...p, ...Combinations(a.slice(i+1), n-1).map(e => [c, ...e])]:[...p, [c]], ([] as T[][]));
};

/**
 * Generator that returns all permutations of an array in lexigraphical order
 * 
 * `[1,2,3] => [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]`
 * 
 * https://stackoverflow.com/a/32551801
 * @param arr Array of values to permute (in priority/lexigraphical order)
 */
export function Permutations<T>(arr: T[]): Generator<T[]> {
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

export function* Subsets<T>(arr: T[], length: number, start: number = 0): Generator<Set<T>> {
    if (start >= arr.length || length < 1) yield new Set();
    else {
        while (start <= arr.length - length) {
            let first = arr[start];
            for (let subset of Subsets(arr, length - 1, start + 1)) {
                subset.add(first);
                yield subset;
            }
            start++;
        }
    }
}

/**
 * Generate an array of increasing "indexes", of `numDigits` length, picking from a bag containing `length` items.
 * 00...00, 00...01, up to 89...99, then finally 99...99
 * 
 * This is unordered sampling with replacement
 * @param numDigits number of digits to produce
 * @returns Generator that produces arrays of "indexes" given the available choices
 */
export function UnorderedSamplingWithReplacement(numDigits: number, length = 10): Generator<number[]> {
    return function* backtrack(arr: number[] = []): Generator<number[]> {
        if (arr.length === numDigits) yield arr;
        else {
            let prevIndex = arr.length>0?arr[arr.length-1]:0;
            for (let i=prevIndex; i<length; i++) {
                yield* backtrack([...arr, i]);
            }
        }
    }();
}

/**
 * Generate an array of increasing "indexes", of `numDigits` length, picking from a bag containing `length` items.
 * 
 * This is unordered sampling with replacement
 * 
 * 000000
 * 000001
 * 000011
 * 000111
 * 001111
 * 011111
 * 111111
 * 000002
 * 000012
 * 000112
 * 001112
 * 011112
 * 111112
 * 000022
 * @param numDigits number of digits to produce
 * @returns Generator that produces arrays of "indexes" given the available choices
 */
export function UnorderedSamplingWithReplacementSmallestFirst(numDigits: number, length = 10): Generator<number[]> {
    return function* backtrack(arr: number[] = []): Generator<number[]> {
        if (arr.length === numDigits) yield arr;
        else {
            let max = arr.length>0?arr[0]+1:length;
            for (let i=0; i<max; i++) {
                yield* backtrack([i, ...arr]);
            }
        }
    }();
}
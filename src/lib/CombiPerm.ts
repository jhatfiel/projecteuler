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

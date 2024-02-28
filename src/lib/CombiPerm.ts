// https://stackoverflow.com/a/53685501
export function Combinations<T>(arr: T[], n: number): T[][] {
    return arr.reduce((p,c,i,a) => n>1?[...p, ...Combinations(a.slice(i+1), n-1).map(e => [c, ...e])]:[...p, [c]], ([] as T[][]));
};

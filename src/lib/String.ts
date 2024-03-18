export function IsPalindrome(str: string): boolean {
    for (let i=0; i<Math.floor(str.length/2); i++) {
        let j = str.length - i - 1;
        if (str[i] !== str[j]) return false;
    }
    return true;
}

export function CountOccurrences(arr: Array<any>): Map<string, number> {
    return new Map(Object.entries(arr.reduceRight((acc, cur) => { acc[cur]?++acc[cur]:acc[cur]=1; return acc; }, {})));
}
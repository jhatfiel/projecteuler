export function IsPalindrome(str: string): boolean {
    for (let i=0; i<Math.floor(str.length/2); i++) {
        let j = str.length - i - 1;
        if (str[i] !== str[j]) return false;
    }
    return true;
}
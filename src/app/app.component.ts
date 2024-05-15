import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavService } from './nav.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
    @ViewChild('sidebar') sidebar: ElementRef;
    sidebarVisible = false;
    navItems: MenuItem[] = [
        {label: 'Home', routerLink: '/'},
        //{label: '15: Beverage Bandits', routerLink: '2018/15/a', queryParams: { files: ['a', 'sample', 'sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6', 'input']}},
        {label: '1-25', items: [
            {label: '0001: 3 or 5', routerLink: '0001/a'},
            {label: '0002: Even Fibonacci Numbers', routerLink: '0002/a'},
            {label: '0003: Largest Prime Factor', routerLink: '0003/a'},
            {label: '0004: Largest Palindrome Product', routerLink: '0004/a'},
            {label: '0005: Smallest Multiple', routerLink: '0005/a'},
            {label: '0006: Sum Square Difference', routerLink: '0006/a'},
            {label: '0007: 10001st Prime', routerLink: '0007/a'},
            {label: '0008: Largest Product in a Series', routerLink: '0008/a'},
            {label: '0009: Special Pythagorean Triplet', routerLink: '0009/a'},
            {label: '0010: Summation of Primes', routerLink: '0010/a'},
            {label: '0011: Largest Product in a Grid', routerLink: '0011/a'},
            {label: '0012: Highly Divisible Triangular Number', routerLink: '0012/a'},
            {label: '0013: Large Sum', routerLink: '0013/a'},
            {label: '0014: Longest Collatz Sequence', routerLink: '0014/a'},
            {label: '0015: Lattice Paths', routerLink: '0015/a'},
            {label: '0016: Power Digit Sum', routerLink: '0016/a'},
            {label: '0017: Number Letter Counts', routerLink: '0017/a'},
            {label: '0018: Maximum Path Sum I', routerLink: '0018/a'},
            {label: '0019: Counting Sundays', routerLink: '0019/a'},
            {label: '0020: Factorial Digit Sum', routerLink: '0020/a'},
            {label: '0021: Amicable Numbers', routerLink: '0021/a'},
            {label: '0022: Names Scores', routerLink: '0022/a'},
            {label: '0023: Non-Abundant Sums', routerLink: '0023/a'},
            {label: '0024: Lexicographic Permutations', routerLink: '0024/a'},
            {label: '0025: 1000-digit Fibonacci Number', routerLink: '0025/a'},
        ]},
        {label: '26-50', items: [
            {label: '0026: Reciprocal Cycles', routerLink: '0026/a'},
            {label: '0027: Quadratic Primes', routerLink: '0027/a'},
            {label: '0028: Number Spiral Diagonals', routerLink: '0028/a'},
            {label: '0029: Distinct Powers', routerLink: '0029/a'},
            {label: '0030: Digit Fifth Powers', routerLink: '0030/a'},
            {label: '0031: Coin Sums', routerLink: '0031/a'},
            {label: '0032: Pandigital Products', routerLink: '0032/a'},
            {label: '0033: Digit Cancelling Fractions', routerLink: '0033/a'},
            {label: '0034: Digit Factorials', routerLink: '0034/a'},
            {label: '0035: Circular Primes', routerLink: '0035/a'},
            {label: '0036: Double-base Palindromes', routerLink: '0036/a'},
            {label: '0037: Truncatable Primes', routerLink: '0037/a'},
            {label: '0038: Pandigital Multiples', routerLink: '0038/a'},
            {label: '0039: Integer Right Triangles', routerLink: '0039/a'},
            {label: "0040: Champernowne's Constant", routerLink: '0040/a'},
            {label: '0041: Pandigital Prime', routerLink: '0041/a'},
            {label: '0042: Coded Triangle Numbers', routerLink: '0042/a'},
            {label: '0043: Sub-string Divisibility', routerLink: '0043/a'},
            {label: '0044: Pentagon Numbers', routerLink: '0044/a'},
            {label: '0045: Triangular, Pentagonal, and Hexagonal', routerLink: '0045/a'},
            {label: `0046: Goldbach's Other Conjecture`, routerLink: '0046/a'},
            {label: '0047: Distinct Primes Factors', routerLink: '0047/a'},
            {label: '0048: Self Powers', routerLink: '0048/a'},
            {label: '0049: Prime Permutations', routerLink: '0049/a'},
            {label: '0050: Consecutive Prime Sum', routerLink: '0050/a'},
        ]},
        {label: '51-75', items: [
            {label: '0051: Prime Digit Replacements', routerLink: '0051/a'},
            {label: '0052: Permuted Multiples', routerLink: '0052/a'},
            {label: '0053: Combinatoric Selections', routerLink: '0053/a'},
            {label: '0054: Poker Hands', routerLink: '0054/a'},
            {label: '0055: Lychrel Numbers', routerLink: '0055/a'},
            {label: '0056: Powerful Digit Sum', routerLink: '0056/a'},
            {label: '0057: Square Root Convergents', routerLink: '0057/a'},
            {label: '0058: Spiral Primes', routerLink: '0058/a'},
            {label: '0059: XOR Decryption', routerLink: '0059/a'},
            {label: '0060: Prime Pair Sets', routerLink: '0060/a'},
            {label: '0061: Cyclical Figurate Numbers', routerLink: '0061/a'},
            {label: '0062: Cubic Permutations', routerLink: '0062/a'},
            {label: '0063: Powerful Digit Counts', routerLink: '0063/a'},
            {label: '0064: Odd Period Square Roots', routerLink: '0064/a'},
            {label: '0065: Convergents of e', routerLink: '0065/a'},
            {label: '0066: Diophantine Equation', routerLink: '0066/a'},
            {label: '0067: Maximum Path Sum II', routerLink: '0067/a'},
            {label: '0068: Magic 5-gon Ring', routerLink: '0068/a'},
            {label: '0069: Totient Maximum', routerLink: '0069/a'},
            {label: '0070: Totient Permutation', routerLink: '0070/a'},
        ]},
        {label: '76-100', items: [
        ]},
        {label: '101-125', items: [
        ]},
        {label: '126-150', items: [
        ]},
        {label: 'Other', items: [
            {label: 'Spot-It!: Combination finder', routerLink: 'spotIt/a'},
            {label: 'PI day puzzle (/u/IvanR3D)', routerLink: 'ivanPi/a'},
            {label: 'Chess (CodinGame)', routerLink: 'chess/a'},
            {label: 'Code VS Zombies (CodinGame)', routerLink: 'cvz/a'},
        ]},
    ];

    constructor(private navService: NavService) { }

    ngAfterViewInit(): void {
        this.navService.appComponent = this;
        this.assignCommand(this.navItems);
    }

    assignCommand(items: MenuItem[]) {
        items.forEach(mi => {
            if (mi.items) this.assignCommand(mi.items);
            if (mi.routerLink) mi.command = _ => this.sidebarVisible = false;
        })
    }
}

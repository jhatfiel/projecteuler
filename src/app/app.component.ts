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
        ]},
        {label: 'Other', items: [
            {label: 'Spot-It!: Combination finder', routerLink: 'spotIt/a'},
            {label: 'PI day puzzle (/u/IvanR3D)', routerLink: 'ivanPi/a'},
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

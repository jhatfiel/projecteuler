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

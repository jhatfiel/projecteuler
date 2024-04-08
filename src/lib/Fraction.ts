import { GCD, LCM } from "./NumberTheory";

export class Fraction {
    num: bigint;
    den: bigint;

    constructor(num: number|bigint, den: number|bigint = 1n) {
        this.num = BigInt(num);
        this.den = BigInt(den);
    }

    reduce(): Fraction {
        return this.scale(1/Number(GCD(this.num, this.den)));
    }

    scale(factor): Fraction {
        this.num *= factor;
        this.den *= factor;
        return this;
    }

    add(b: Fraction): Fraction {
        let lcm = LCM(this.den, b.den);
        this.scale(lcm/this.den);
        this.num += b.num * (lcm/b.den);
        return this;
    }

    subtract(b: Fraction): Fraction {
        let lcm = LCM(this.den, b.den);
        this.scale(lcm/this.den);
        this.num -= b.num * (lcm/b.den);
        return this;
    }

    multiply(by: Fraction): Fraction {
        this.num *= by.num;
        this.den *= by.den;
        return this;
    }

    divide(by: Fraction): Fraction {
        return this.multiply(by.copy().invert());
    }

    invert(): Fraction {
        [this.num, this.den] = [this.den, this.num];
        return this;
    }

    copy(): Fraction {
        return new Fraction(this.num, this.den);
    }
    
    toString(): string {
        return `${this.num}/${this.den}`;
    }
}
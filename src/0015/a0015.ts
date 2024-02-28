import { Factorial } from '../lib/NumberTheory';
import { Puzzle } from '../lib/Puzzle';

export class a0015 extends Puzzle {
    input: number;
    sampleMode(): void { };

    _loadData(lines: string[]) {
        this.input = Number(lines[0]);
        // lattice paths
        // size 1 = 1*2  2 paths = how many ways can you arrange RD?  RD and DR
        // size 2 = 3*2  6 paths = how many ways can you arrange RRDD?  RRDD, RDRD, RDDR, DDRR, DRDR, DRRD
        // size 3 = 10*2 20 paths= how many ways can you arrange RRRDDD?  RRRDDD, RRDRDD, RRDDRD, RRDDDR, RDRRDD, RDRDRD, RDRDDR, RDDRRD, RDDRDR, RDDDRR (and opposite)
        // binomial coefficient  (n choose k)
        // bc(n,k) = n! / k!(n-k)!
        // 2*n things to choose, we can choose them n different ways, so n = 2*n, k = 2
        let size = BigInt(this.input);
        this.result = (Factorial(2n*size)/Factorial(size)/Factorial(size)).toString();
    }

    _runStep(): boolean {
        return false;
    }
}
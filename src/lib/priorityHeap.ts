//class PriorityHeap<T=number>{constructor(private p=(a:T,b:T)=>b<=a){}private A=new Array<T>(1000);private I=0;size():number{return this.I;}truncate(n:number){if(this.I>=n){this.I=n}}enqueue(e:T):number{this.A[this.I]=e;this.I++;return this.U()}private U(i=this.I-1):number{const e=this.A[i];while(i>0){let p=Math.floor((i-1)/2);let t=this.A[p];if(this.p(e,t))break;this.A[p]=e;this.A[i]=t;i=p}return i}dequeue():T{const m=this.A[0];const e=this.A[this.I-1];this.I=Math.max(0,this.I-1);if(this.I>=0){this.A[0]=e;this.s()}return m}private s(i=0){const l=this.I;const e=this.A[0];while(true){let L=2*i+1;let R=2*i+2;let M:T,N:T;let s:number=null;if(L<l){M=this.A[L];if(this.p(e,M))s=L;}if(R<l){N=this.A[R];if((s===null&&this.p(e,N))||(s!==null&&this.p(M,N)))s=R;}if(s===null)break;this.A[i]=this.A[s];this.A[s]=e;i=s}return i}reorder(f:(o:T)=>boolean){let i=this.A.findIndex(f);if(i!==-1)this.U(this.s(i));}};
export class PriorityHeap<T=number> {
    constructor(private shouldPrecede: (a: T, b: T) => boolean = (a: T, b: T) => a <= b ) { }
    private values = new Array<T>(10000); // decent sized heap to reduce memory thrash
    private nextIdx = 0;

    size(): number { return this.nextIdx; }

    truncate(at: number) {
        if (this.nextIdx >= at) {
            this.nextIdx = at;
        }
    }

    enqueue(e: T): number {
        this.values[this.nextIdx] = e;
        this.nextIdx++;
        return this.bubbleUp();
    }

    private bubbleUp(idx = this.nextIdx-1): number {
        const e = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx-1)/2);
            let parent = this.values[parentIdx];
            if (this.shouldPrecede(e, parent)) break;
            this.values[parentIdx] = e;
            this.values[idx] = parent;
            idx = parentIdx;
        }
        return idx;
    }

    dequeue(): T {
        const max = this.values[0];
        const end = this.values[this.nextIdx-1];
        this.nextIdx = Math.max(0, this.nextIdx-1);
        
        if (this.nextIdx >= 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return max;
    }

    private sinkDown(idx = 0) {
        const length = this.nextIdx;
        const e = this.values[0];
        while (true) {
            let leftChildIdx = 2*idx + 1;
            let rightChildIdx = 2*idx + 2;
            let leftChild: T, rightChild: T;
            let swap: number = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (this.shouldPrecede(e, leftChild)) swap = leftChildIdx;
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if ((swap === null && this.shouldPrecede(e, rightChild)) ||
                    (swap !== null && this.shouldPrecede(leftChild, rightChild))) swap = rightChildIdx;
            }

            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = e;
            idx = swap;
        }
        return idx;
    }

    reorder(findObj: (o: T) => boolean) {
        let idx = this.values.findIndex(findObj);
        if (idx !== -1) this.bubbleUp(this.sinkDown(idx));
    }

    debugArray() {
        //console.debug(this.values);
        let str = '';
        let ind = 0;
        let pow = 0;
        while (ind < this.nextIdx) {
            str += '[' + this.values.slice(ind, ind+Math.pow(2, pow)).map(obj => JSON.stringify(obj)).join(',') + '] / ';
            ind += Math.pow(2, pow);
            pow++;
        }
        console.debug(str);
    }
}

/*
type PHTest = {
    n: number;
    s: string;
}
let ph = new PriorityHeap<PHTest>((a, b) => b.n <= a.n);

ph.enqueue({n: 1, s: 'a1'}); ph.debugArray();
ph.enqueue({n: 4, s: 'b4'}); ph.debugArray();
ph.enqueue({n: 9, s: 'c9'}); ph.debugArray();
ph.enqueue({n: 16, s: 'd16'}); ph.debugArray();
ph.enqueue({n: 25, s: 'e25'}); ph.debugArray();
ph.enqueue({n: 36, s: 'f36'}); ph.debugArray();
ph.enqueue({n: 49, s: 'g49'}); ph.debugArray();
ph.enqueue({n: 64, s: 'h64'}); ph.debugArray();
ph.enqueue({n: 81, s: 'i81'}); ph.debugArray();
ph.enqueue({n: 100, s: 'j100'}); ph.debugArray();
ph.enqueue({n: 90, s: 'k90'}); ph.debugArray();
ph.enqueue({n: 80, s: 'l80'}); ph.debugArray();
ph.enqueue({n: 70, s: 'm70'}); ph.debugArray();
ph.enqueue({n: 60, s: 'n60'}); ph.debugArray();
ph.enqueue({n: 50, s: 'o50'}); ph.debugArray();
ph.enqueue({n: 40, s: 'p40'}); ph.debugArray();
ph.enqueue({n: 30, s: 'q30'}); ph.debugArray();
ph.enqueue({n: 20, s: 'r20'}); ph.debugArray();
let obj = {n: 10, s: 's10'};
ph.enqueue(obj); ph.debugArray();
obj.n = 3; obj.s = 's3';
ph.reorder(obj);

while (ph.size()) {
    console.debug(`Next: ${ph.dequeue().s}`);
}
*/
/*
let ph = new PriorityHeap((a, b) => b <= a);

ph.enqueue(1); ph.debugArray();
ph.enqueue(4); ph.debugArray();
ph.enqueue(9); ph.debugArray();
ph.enqueue(16); ph.debugArray();
ph.enqueue(25); ph.debugArray();
ph.enqueue(36); ph.debugArray();
ph.enqueue(49); ph.debugArray();
ph.enqueue(64); ph.debugArray();
ph.enqueue(81); ph.debugArray();
ph.enqueue(100); ph.debugArray();

ph.enqueue(90); ph.debugArray();
ph.enqueue(80); ph.debugArray();
ph.enqueue(70); ph.debugArray();
ph.enqueue(60); ph.debugArray();
ph.enqueue(50); ph.debugArray();
ph.enqueue(40); ph.debugArray();
ph.enqueue(30); ph.debugArray();
ph.enqueue(20); ph.debugArray();
ph.enqueue(10); ph.debugArray();

while (ph.size()) {
    console.debug(`Next: ${ph.dequeue()}`);
}
*/
type NestedNumber = number | NestedNumber[];
class DefaultGraph {
    operations: Operation[] = [];
    placeholders: Placeholder[] = [];
    variables: Variable[] = [];
}

abstract class GraphNode {
    consumers = [];
    output: any;

    constructor() { }
};

function variable(value: NestedNumber): Variable { return new Variable(value); }
class Variable extends GraphNode {
    constructor(public value: NestedNumber) {
        super();
        _defaultGraph.variables.push(this);
    }
}

function placeholder(name: string): Placeholder { return new Placeholder(name); }
class Placeholder extends GraphNode {
    constructor(public name: string) {
        super();
        _defaultGraph.placeholders.push(this);
    }
}

abstract class Operation extends GraphNode {
    constructor(public inputNodes: GraphNode[] = []) {
        super();
        inputNodes.forEach(inNode => inNode.consumers.push(this));
        _defaultGraph.operations.push(this);
    }

    abstract compute(): NestedNumber;
}

function add(a: GraphNode, b: GraphNode): AddOperation { return new AddOperation(a, b); }
class AddOperation extends Operation {
    constructor(public a: GraphNode, public b: GraphNode) { super([a, b]); }

    compute(): NestedNumber {
        //console.error(`Calling compute on AddOperation`);
        function add(a: NestedNumber, b: NestedNumber) {
            let result: NestedNumber = undefined;
            if (typeof a === 'number' && typeof b === 'number') { result = a + b; }
            else if (a instanceof Array && b instanceof Array && a.length === b.length) {
                result = Array(a.length);
                for (let i=0; i<a.length; i++) {
                    result[i] = add(a[i], b[i]);
                }
            } else if (a instanceof Array && a[0] instanceof Array && b instanceof Array && a[0].length === b.length) {
                // add b to each element of a
                result = Array(a.length);
                for (let i=0; i<a.length; i++) {
                    result[i] = add(a[i], b);
                }
            } else {
                throw new Error(`Incompatible types: ${JSON.stringify(a)} and ${JSON.stringify(b)}`);
            }
            while (result instanceof Array && result.length === 1) result = result[0];
            return result;
        }
        //this.inputNodes.forEach(input => console.error(`--`, input.output));
        return add(this.a.output, this.b.output);
    }
}

function matmul(a: GraphNode, b: GraphNode): MatMulOperation { return new MatMulOperation(a, b); }
class MatMulOperation extends Operation {
    constructor(public a: GraphNode, public b: GraphNode) { super([a, b]); }

    compute(): NestedNumber {
        function scalarMul(k: number, m: NestedNumber): NestedNumber {
            let result: NestedNumber = undefined;
            if (typeof m === 'number') result = k * m;
            else {
                result = Array(m.length);
                for (let i=0; i<m.length; i++) {
                    result[i] = scalarMul(k, m[i]);
                }
            } 

            //while (result instanceof Array && result.length === 1) result = result[0];
            return result
        }

        function matMul(a: NestedNumber[], b: NestedNumber[]): NestedNumber {
            // if a & b are matrices, a is MxN, b is NxP, and c will be MxP
            if (!(a[0] instanceof Array)) a = a.map(n => [n]);
            if (!(b[0] instanceof Array)) b = b.map(n => [n]);
            let M: number = a.length;
            let N: number = (a[0] as NestedNumber[]).length;
            let N2: number = b.length;
            let P: number = (b[0] as NestedNumber[]).length;
            if (N !== N2) {
                throw new Error(`MatMul: Invalid matrix dimensions: ${M}x${N} and ${N2}x${P}`);
            }
            let result: NestedNumber = Array.from({length: M}, _ => Array(P));

            for (let i=0; i<M; i++) {
                for (let j=0; j<P; j++) {
                    let sum = 0;
                    for (let k=0; k<N; k++) {
                        sum += a[i][k] * b[k][j];
                    }
                    result[i][j] = sum;
                }
                if (P === 1) result[i] = result[i][0]; // collapse single element rows
            }

            //while (result instanceof Array && result.length === 1) result = result[0];
            return result;
        }

        //console.error(`Calling compute on MulOperation`);
        //this.inputNodes.forEach(input => console.error(`--`, input.output));
        if (typeof this.a.output === 'number') return scalarMul(this.a.output, this.b.output);
        else if (typeof this.b.output === 'number') return scalarMul(this.b.output, this.a.output);
        else return matMul(this.a.output, this.b.output);
    }
}

function sigmoid(a: GraphNode): SigmoidOperation { return new SigmoidOperation(a); }
class SigmoidOperation extends Operation {
    constructor(public a: GraphNode) { super([a]); }

    compute(): NestedNumber {
        return 1 / (1 + Math.exp(-1 * this.a.output))
    }
}

function softmax(a: GraphNode): SoftmaxOperation { return new SoftmaxOperation(a); }
class SoftmaxOperation extends Operation {
    constructor(public a: GraphNode) { super([a]); }

    compute(): NestedNumber {
        let arr = this.a.output;

        let result: number[][] = [];
        for (let i=0; i<arr.length; i++) {
            let row: number[] = [];
            let sum = 0;
            for (let j=0; j<arr[i].length; j++) {
                let v = Math.exp(arr[i][j]);
                row.push(v);
                sum += v;
            }
            result.push(row.map(v => v/sum));
        }

        return result;
    }
}

function log(a: GraphNode): LogOperation { return new LogOperation(a); }
class LogOperation extends Operation {
    constructor(public a: GraphNode) { super([a]); }

    compute(): NestedNumber {
        function toLog(n: NestedNumber): NestedNumber {
            if (typeof n === 'number') return Math.log(n);
            else return n.map(a => toLog(a));
        }
        return toLog(this.a.output);
    }
}

function multiply(a: GraphNode, b: GraphNode): MultiplyOperation { return new MultiplyOperation(a, b); }
class MultiplyOperation extends Operation {
    constructor(public a: GraphNode, public b: GraphNode) { super([a, b]); }

    compute(): NestedNumber {
        function mult(x: NestedNumber, y: NestedNumber): NestedNumber {
            if (typeof x === 'number' && typeof y === 'number') return x * y;
            else if (x instanceof Array && y instanceof Array) return x.map((_x, ind) => mult(_x, y[ind]));
            else throw new Error(`MultiplyOperation: types do not match: ${typeof x}, ${typeof y}`);
        }
        console.error(`Calling MultiplyOperation on`);
        console.error({a: this.a.output, b: this.b.output});
        return mult(this.a.output, this.b.output);
    }
}

function reduce_sum(a: GraphNode, axis: number = 0): ReduceOperation { return new ReduceOperation(a, axis); }
class ReduceOperation extends Operation {
    constructor(public a: GraphNode, public axis: number) { super([a]); }

    compute(): NestedNumber {
        let arr = this.a.output;
        if (arr instanceof Array && typeof arr[0] === 'number') arr = arr.map(_a => [_a]);

        if (this.axis === 1) {
            // rows
            return arr.map(row => row.reduce((total, val) => total+val, 0));
        } else {
            // columns
            let result = Array(arr[0].length).fill(0);
            for (let i=0; i<arr.length; i++) {
                for (let j=0; j<arr[i].length; j++) {
                    result[j] += arr[i][j];
                }
            }
            return result;
        }
    }
}

function negative(a: GraphNode): NegativeOperation { return new NegativeOperation(a); }
class NegativeOperation extends Operation {
    constructor(public a: GraphNode) { super([a]); }

    compute(): NestedNumber {
        function neg(x: NestedNumber): NestedNumber {
            if (typeof x === 'number') return -1*x;
            else if (x instanceof Array) return x.map(_x => neg(_x));
        }
        return neg(this.a.output);
    }
}

class Session {
    run(op: Operation, dictionary={}): NestedNumber {
        let postOrder = this.traversePostOrder(op);
        for (let node of postOrder) {
            console.error(`Session.run working on ${node.constructor.name}`);
            if (node instanceof Placeholder) {
                node.output = dictionary[node.name];
            } else if (node instanceof Variable) {
                node.output = node.value;
            } else { // operation
                node.output = (node as Operation).compute();
                while (node.output instanceof Array && node.output.length === 1) node.output = node.output[0];
            }
            console.error(`Output:`, node.output);
        }

        return op.output;
    }

    traversePostOrder(op: Operation): GraphNode[] {
        let nodes: GraphNode[] = [];
        function recurse(node: GraphNode) {
            if (node instanceof Operation)
                node.inputNodes.forEach(inputNode => recurse(inputNode));
            nodes.push(node);
        }
        recurse(op);
        return nodes;
    }
}

const _defaultGraph = new DefaultGraph();

/*
// Part 1
let A = new Variable([[1, 0], [0, -1]]);
let b = new Variable([1, 1]);

let x = new Placeholder('x');

let y = new MulOperation(A, x);

let z = new AddOperation(y, b);

let session = new Session();
let result = session.run(z, {x: [1, 2]});
console.log({output: result});
*/

// Part 2: Perceptrons
let redPoints = Array.from({length: 50}, _ => [Math.random()-2, Math.random()-2]);
let bluePoints = Array.from({length: 50}, _ => [Math.random()+2, Math.random()+2]);

//console.error(redPoints);
//console.error(bluePoints);

/*
// simple example
let x = new Placeholder('x');
let w = new Variable([[1, 1]]);
let b = new Variable(0);
let p = new SigmoidOperation(new AddOperation(new MulOperation(w, x), b));

let session = new Session();
let result = session.run(p, {x: [3, 2]});
console.log({output: result});
*/

// Full example
/*
let X = placeholder('X');
// Create a weight matrix for 2 output classes:
// One with a weight vector (1,1) for blue and one with a weight vector (-1, -1) for red
let W = variable([
    [1, -1],
    [1, -1]
]);
let b = variable([0, 0]);
let p = softmax(add(matmul(X, W), b));

let session = new Session();
let result = session.run(p, {X: [...bluePoints, ...redPoints]});
//let result = session.run(p, {X: [[2, 2], [2.2,2], [-2, -2]]});
console.log({output: result});
*/

// Part 3: Training criterion
/*
bluePoints = [
    [2, 2],
    [2.1, 1.9],
    [2.2, 2.1],
    [1.9, 2.0]
]

redPoints = [
    [-2, -2],
    [-2.1, -1.9],
    [-2.2, -2.1],
    [-1.9, -2.0]
]
*/

/*
let X = placeholder('X');
let c = placeholder('c');

let W = variable([
    [1, -1],
    [1, -1]
]);
let b = variable([0, 0]);
let p = softmax(add(matmul(X, W), b));

let J = negative(reduce_sum(reduce_sum(multiply(c, log(p)), 1)));

let session = new Session();
let result = session.run(J, {
    X: [...bluePoints, ...redPoints],
    c: [...Array(bluePoints.length).fill([1, 0]), ...Array(redPoints.length).fill([0, 1])]
});
console.log({output: result});
*/

// Part 4: Gradient descent
// stopped here
// https://www.codingame.com/playgrounds/9487/deep-learning-from-scratch---theory-and-implementation/gradient-descent-and-backpropagation
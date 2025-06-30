NEXT_NUM: for (let N=1; N<10000; N++) {
    if (N === 1) continue;
    for (let P of [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]) {
        if (N === P) { process.stdout.write(`${N} `); continue NEXT_NUM; }
        if (P*P>N) break;
        if ((Math.floor(N/P)*P) === N) continue NEXT_NUM;
    }
    process.stdout.write(`${N} `);
}

const fs = require('node:fs');

function calcTokens(a, b, prize) {
    // 3*aCount + bCount = ans
    // a.x*aCount + b.x*bCount = prize.x
    // a.y*aCount + b.y*bCount = prize.y

    const aCount = (a.x * prize.y - a.y * prize.x) / (a.x * b.y - a.y * b.x);
    const bCount = (prize.x - aCount * b.x) / a.x;
    if (Math.trunc(aCount) === aCount && Math.trunc(bCount) === bCount) {
        return aCount + 3 * bCount;
    }
    return 0;
}

const args = process.argv;
if (args.length < 3) {
    console.error("Missing input file");
    return 1;
}

fs.readFile(args[2], 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');

    let lineNumber = 0;
    let sum = 0;
    while (lineNumber < input.length - 1) {
        let coordinates = input[lineNumber].match(/(?<=\+)\d{1,3}/g);
        let a = {
            x: Number(coordinates[0]),
            y: Number(coordinates[1])
        };
        lineNumber++;
        coordinates = input[lineNumber].match(/(?<=\+)\d{1,3}/g);
        let b = {
            x: Number(coordinates[0]),
            y: Number(coordinates[1])
        };
        lineNumber++;
        coordinates = input[lineNumber].match(/(?<=\=)\d{2,6}/g);
        let prize = {
            x: Number(coordinates[0]) + 10000000000000,
            y: Number(coordinates[1]) + 10000000000000
        };
        const result = calcTokens(a, b, prize);
        // console.log(result);
        sum += result;
        lineNumber += 2;
    }
    console.log(sum);
});

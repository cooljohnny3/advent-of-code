const fs = require('node:fs');

const args = process.argv;
if (args.length < 3) {
    console.error("Missing input file");
    return 1;
}
if (args.length < 4) {
    console.error("Missing blink count");
    return 1;
}

fs.readFile(args[2], 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');

    const stones = input[0].split(" ");
    const table = {};
    for (let i = 0; i < stones.length; i++) {
        if (table[stones[i]] === undefined) {
            table[stones[i]] = 1;
        } else {
            table[stones[i]] += 1;
        }
    }

    for (let i = 0; i < args[3]; i++) {
        for (let entry of Object.entries(table)) {
            if (entry[0] === '0') {
                if (table['1'] === undefined) {
                    table['1'] = entry[1];
                } else {
                    table['1'] += entry[1];
                }
            } else if (entry[0].length % 2 === 0) {
                const firstHalf = Number(entry[0].substring(0, entry[0].length / 2));
                const secondHalf = Number(entry[0].substring(entry[0].length / 2));
                if (table[firstHalf] === undefined) {
                    table[firstHalf] = entry[1];
                } else {
                    table[firstHalf] += entry[1];
                }
                if (table[secondHalf] === undefined) {
                    table[secondHalf] = entry[1];
                } else {
                    table[secondHalf] += entry[1];
                }
            } else {
                const newNumber = entry[0] * 2024;
                if (table[newNumber] === undefined) {
                    table[newNumber] = entry[1];
                } else {
                    table[newNumber] += entry[1];
                }
            }
            if (table[entry[0]] - entry[1] === 0) {
                delete table[entry[0]];
            } else {
                table[entry[0]] -= entry[1];
            }
        }
        // console.log(table);
        // console.log(Object.values(table).reduce((prev, current) => prev + current))
    }
    console.log(Object.values(table).reduce((prev, current) => prev + current))
});

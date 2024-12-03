const fs = require('node:fs');

fs.readFile('./input', 'utf-8', (err, data) => {
    let input;
    if (err) {
        console.error(err);
        return;
    }
    input = data.split('\n');

    const left = [];
    const right = [];
    for (let i = 0; i < input.length; i++) {
        const items = input[i].split('   ');
        if (items.length === 2) {
            left.push(items[0]);
            right.push(items[1]);
        }
    }
    left.sort();
    right.sort();

    let total = 0;
    for (let i = 0; i < left.length; i++) {
        const diff = Math.abs(left[i] - right[i]);
        total += diff;
    }
    console.log(total);
});

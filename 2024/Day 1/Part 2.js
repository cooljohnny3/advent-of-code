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

    let totalSimScores = 0;
    const freqTable = {};
    for (let i = 0; i < left.length; i++) {
        const leftItem = left[i];
        if (freqTable[leftItem]) {
            totalSimScores += freqTable[leftItem];
        } else {
            let count = 0;
            for (let j = 0; j < right.length; j++) {
                if (right[j] === leftItem) {
                    count++;
                }
            }
            const freqScore = leftItem * count;
            freqTable[leftItem] = freqScore;
            totalSimScores += freqScore;
        }
    }
    console.log(totalSimScores);
});

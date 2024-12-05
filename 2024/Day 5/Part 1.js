const fs = require('node:fs');

fs.readFile('./input', 'utf-8', (err, data) => {
    // fs.readFile('./example', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    let index = 0;
    let rules = {}
    // parse rules
    while (input[index] !== '') {
        const [item1, item2] = input[index].split('|');
        if (rules[item1] !== undefined) {
            rules[item1].push(item2);
        } else {
            rules[item1] = [item2];
        }
        index++;
    }
    index++;
    // console.log(rules);
    const correctUpdates = []
    // check updates
    while (input[index] !== '') {
        const update = input[index].split(',');
        const seen = [];
        let updateIsOk = true;
        // console.log(`Checking ${update}`);
        for (let i = 0; i < update.length; i++) {
            const pagesWhichMustComeBefore = rules[update[i]];
            if (pagesWhichMustComeBefore !== undefined) {
                for (let j = 0; j < pagesWhichMustComeBefore.length; j++) {
                    if (seen.includes(pagesWhichMustComeBefore[j])) {
                        // console.log(`Invalid: ${update[i]} must come before ${pagesWhichMustComeBefore[j]}`);
                        updateIsOk = false;
                        break;
                    }
                }
            }
            if (!updateIsOk) {
                break;
            }
            seen.push(update[i]);
        }
        if (updateIsOk) {
            correctUpdates.push(update);
        }
        index++;
    }
    // console.log(correctUpdates);
    // sum middle numbers
    let sum = 0;
    for (let i = 0; i < correctUpdates.length; i++) {
        const middleNumber = Number(correctUpdates[i][Math.trunc(correctUpdates[i].length / 2)]);
        // console.log(middleNumber);
        sum += middleNumber;
    }
    console.log(sum);
});

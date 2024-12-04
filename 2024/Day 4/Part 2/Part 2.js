const fs = require('node:fs');

// fs.readFile('./input', 'utf-8', (err, data) => {
fs.readFile('./example', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    function check(row, col) {
        if (row + 1 >= input.length - 1) {
            return 0;
        }
        if (col + 1 >= input[row].length) {
            return 0;
        }
        if (col - 1 < 0) {
            return 0;
        }
        if (row - 1 < 0) {
            return 0;
        }
        /*
         * M S
         *  A
         * M S
        */
        if (input[row - 1][col - 1] === 'M' && input[row + 1][col - 1] === 'M' && input[row - 1][col + 1] === 'S' && input[row + 1][col + 1] === 'S') {
            return 1;
        }
        /*
         * S M
         *  A
         * S M
        */
        if (input[row - 1][col - 1] === 'S' && input[row + 1][col - 1] === 'S' && input[row - 1][col + 1] === 'M' && input[row + 1][col + 1] === 'M') {
            return 1;
        }
        /*
         * M M
         *  A
         * S S
        */
        if (input[row - 1][col - 1] === 'M' && input[row + 1][col - 1] === 'S' && input[row - 1][col + 1] === 'M' && input[row + 1][col + 1] === 'S') {
            return 1;
        }
        /*
         * S S
         *  A
         * M M
        */
        if (input[row - 1][col - 1] === 'S' && input[row + 1][col - 1] === 'M' && input[row - 1][col + 1] === 'S' && input[row + 1][col + 1] === 'M') {
            return 1;
        }
        return 0;
    }
    let xmasCount = 0;
    for (let row = 0; row < input.length - 1; row++) {
        const currrentRow = input[row];
        for (let col = 0; col < currrentRow.length; col++) {
            const currentLetter = currrentRow[col];
            if (currentLetter === 'A') {
                xmasCount += check(row, col);
            }
        }
    }
    console.log(xmasCount);
});

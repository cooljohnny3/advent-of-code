const fs = require('node:fs');

fs.readFile('./input', 'utf-8', (err, data) => {
    // fs.readFile('./example', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    function check(row, col) {
        function checkDiagonals(row, col) {
            let count = 0;
            // left
            if (col - 3 >= 0) {
                // top left
                if (row - 3 >= 0) {
                    if (input[row - 1][col - 1] === 'M' && input[row - 2][col - 2] === 'A' && input[row - 3][col - 3] === 'S') {
                        count++;
                    }
                }
                // bottom left
                if (row + 3 < input.length - 1) {
                    if (input[row + 1][col - 1] === 'M' && input[row + 2][col - 2] === 'A' && input[row + 3][col - 3] === 'S') {
                        count++;
                    }
                }
            }
            // right
            if (col + 3 < input[row].length) {
                // top right
                if (row - 3 >= 0) {
                    if (input[row - 1][col + 1] === 'M' && input[row - 2][col + 2] === 'A' && input[row - 3][col + 3] === 'S') {
                        count++;
                    }
                }
                // bottom right
                if (row + 3 < input.length - 1) {
                    if (input[row + 1][col + 1] === 'M' && input[row + 2][col + 2] === 'A' && input[row + 3][col + 3] === 'S') {
                        count++;
                    }
                }
            }
            return count;
        }

        let count = 0;
        // right
        if (col + 3 < input[row].length && input[row][col + 1] === 'M' && input[row][col + 2] === 'A' && input[row][col + 3] === 'S') {
            count++;
        }
        // left
        if (col - 3 >= 0 && input[row][col - 1] === 'M' && input[row][col - 2] === 'A' && input[row][col - 3] === 'S') {
            count++;
        }
        // up
        if (row - 3 >= 0 && input[row - 1][col] === 'M' && input[row - 2][col] === 'A' && input[row - 3][col] === 'S') {
            count++;
        }
        // down
        if (row + 3 < input.length - 1 && input[row + 1][col] === 'M' && input[row + 2][col] === 'A' && input[row + 3][col] === 'S') {
            count++;
        }
        count += checkDiagonals(row, col);
        return count;
    }
    let xmasCount = 0;
    for (let row = 0; row < input.length - 1; row++) {
        const currrentRow = input[row];
        for (let col = 0; col < currrentRow.length; col++) {
            const currentLetter = currrentRow[col];
            if (currentLetter === 'X') {
                xmasCount += check(row, col);
            }
        }
    }
    console.log(xmasCount);
});

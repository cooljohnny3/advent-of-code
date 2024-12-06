const fs = require('node:fs');

fs.readFile('./input', 'utf-8', (err, data) => {
    // fs.readFile('./example', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');

    let row;
    let col;
    /**
     * @type {'up' | 'down' | 'left' | 'right'}
    */
    let direction;
    // find initial position and direction
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = 0; j < input[i].length; j++) {
            switch (input[i][j]) {
                case '^':
                    row = i;
                    col = j;
                    direction = 'up';
                    break;
                case 'v':
                    row = i;
                    col = j;
                    direction = 'down';
                    break;
                case '<':
                    row = i;
                    col = j;
                    direction = 'left';
                    break;
                case '>':
                    row = i;
                    col = j;
                    direction = 'right';
                    break;
            }
            if (direction !== undefined) {
                break;
            }
        }
        if (direction !== undefined) {
            break;
        }
    }

    const visited = [];
    while (input[row] !== undefined && input[row][col] !== undefined) {
        console.log(row, col, direction);
        if (!visited.find((pos) => pos[0] === row && pos[1] === col)) {
            visited.push([row, col]);
        }
        let rowToCheck;
        let colToCheck;
        switch (direction) {
            case 'up':
                rowToCheck = row - 1;
                colToCheck = col;
                break;
            case 'down':
                rowToCheck = row + 1;
                colToCheck = col;
                break;
            case 'left':
                rowToCheck = row;
                colToCheck = col - 1;
                break;
            case 'right':
                rowToCheck = row;
                colToCheck = col + 1;
                break;
        }

        console.log(`Checking ${rowToCheck} ${colToCheck}`);
        if (input[rowToCheck] !== undefined && input[rowToCheck][colToCheck] === '#') {
            console.log("Found obstruction");
            switch (direction) {
                case 'up':
                    direction = 'right';
                    break;
                case 'down':
                    direction = 'left';
                    break;
                case 'left':
                    direction = 'up';
                    break;
                case 'right':
                    direction = 'down';
                    break;
            }
        } else {
            row = rowToCheck;
            col = colToCheck;
        }
    }

    console.log(visited.length);
});

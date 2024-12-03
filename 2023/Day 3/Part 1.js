const fs = require('node:fs');

function isNumber(input) {
    return /[0-9]/.test(input);
}

function isSymbol(input) {
    return /[&*#+$]/.test(input);
}

// fs.readFile('./input', 'utf-8', (err, data) => {
fs.readFile('./example', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    let total = 0;
    for (let i = 0; i < input.length - 1; i++) {
        const previousLine = input[i - 1];
        const currentLine = input[i];
        const nextLine = input[i + 1];
        for (let j = 0; j < currentLine.length; j++) {
            const currentChar = currentLine[j];
            if (isSymbol(currentChar)) {
                if (previousLine) {
                    if (j !== 0) {
                        if (isNumber(previousLine[j - 1])) {
                            total += Number(previousLine[j - 1]);
                        }
                    }
                    if (isNumber(previousLine[j])) {
                        total += Number(previousLine[j]);
                    }
                    if (j !== currentLine.length - 1) {
                        if (isNumber(previousLine[j + 1])) {
                            total += Number(previousLine[j + 1]);
                        }
                    }
                }
                if (j !== 0) {
                    if (isNumber(currentLine[j - 1])) {
                        total += Number(currentLine[j - 1]);
                    }
                }
                if (j !== currentLine.length - 1) {
                    if (isNumber(currentLine[j + 1])) {
                        total += Number(currentLine[j + 1]);
                    }
                }
                if (nextLine) {
                    if (j !== 0) {
                        if (isNumber(nextLine[j - 1])) {
                            total += Number(nextLine[j - 1]);
                        }
                    }
                    if (isNumber(nextLine[j])) {
                        total += Number(nextLine[j]);
                    }
                    if (j !== currentLine.length - 1) {
                        if (isNumber(nextLine[j + 1])) {
                            total += Number(nextLine[j + 1]);
                        }
                    }
                }
            }
        }
    }
    console.log(total);
});

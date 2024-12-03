const fs = require('node:fs');

function isNumber(input) {
    return /[0-9]/.test(input);
}

fs.readFile('./input', 'utf-8', (err, data) => {
    // fs.readFile('./example', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let pc = 0;
    function step() {
        pc++;
    }

    function parseNumber() {
        let number = '';
        while (isNumber(data[pc])) {
            number += data[pc];
            step();
        }
        return number;
    }

    function parseMul() {
        let number1;
        let number2;
        step();
        if (data[pc] !== 'u') {
            return;
        }
        step();
        if (data[pc] !== 'l') {
            return;
        }
        step();
        if (data[pc] !== '(') {
            return;
        }
        step();
        if (!isNumber(data[pc])) {
            return;
        }
        number1 = parseNumber();
        if (data[pc] !== ',') {
            return;
        }
        step();
        number2 = parseNumber();
        if (data[pc] !== ')') {
            return;
        }
        console.log(number1, number2, number1 * number2);
        return number1 * number2;
    }

    let total = 0;
    while (pc < data.length) {
        if (data[pc] === 'm') {
            const result = parseMul();
            if (result) {
                total += result;
            }
        }
        step();
    }
    console.log(total);
});

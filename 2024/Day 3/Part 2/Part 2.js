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
    let enabled = true;
    function step() {
        pc++;
    }

    function parseDoDont() {
        step();
        if (data[pc] !== 'o') {
            return;
        }
        step();
        if (data[pc] === '(') {
            // do
            step();
            if (data[pc] !== ')') {
                return;
            }
            return true;
        } else if (data[pc] === 'n') {
            // don't
            step();
            if (data[pc] !== '\'') {
                return;
            }
            step();
            if (data[pc] !== 't') {
                return;
            }
            step();
            if (data[pc] !== '(') {
                return;
            }
            step();
            if (data[pc] !== ')') {
                return;
            }
            return false;
        }
        return;
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
        return number1 * number2;
    }

    let total = 0;
    while (pc < data.length) {
        if (data[pc] === 'm') {
            const result = parseMul();
            if (enabled && result !== undefined) {
                total += result;
            }
        } else if (data[pc] === 'd') {
            const result = parseDoDont();
            if (result !== undefined) {
                enabled = result;
            }
        }
        step();
    }
    console.log(total);
});

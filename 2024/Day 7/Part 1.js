const fs = require('node:fs');

function testEquation(target, numbers, sum, index) {
    if (index >= numbers.length) {
        return sum == target;
    }

    return testEquation(target, numbers, sum + Number(numbers[index]), index + 1) || testEquation(target, numbers, sum * numbers[index], index + 1);
}

fs.readFile('./input', 'utf-8', (err, data) => {
    // fs.readFile('./example', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');

    let total = 0;
    for (let i = 0; i < input.length - 1; i++) {
        const equation = input[i];
        const [testValue, numbersString] = equation.split(": ");
        const numbers = numbersString.split(" ");
        if (testEquation(testValue, numbers, 0, 0)) {
            total += Number(testValue);
        }

    }
    console.log(total);
});

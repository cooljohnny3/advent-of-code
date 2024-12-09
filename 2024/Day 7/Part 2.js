const fs = require('node:fs');

function testEquation(target, numbers, sum, index) {
    if (index >= numbers.length) {
        // console.log(sum);
        return sum == target;
    }

    if (sum == 0) {
        testEquation(target, numbers, numbers[index], index + 1);
    }

    return testEquation(target, numbers, Number(sum) + Number(numbers[index]), index + 1) ||
        testEquation(target, numbers, sum * numbers[index], index + 1) ||
        testEquation(target, numbers, sum + numbers[index], index + 1);
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
        // console.log(testValue, numbers);
        if (testEquation(testValue, numbers, 0, 0)) {
            total += Number(testValue);
        }

    }
    console.log(total);
});

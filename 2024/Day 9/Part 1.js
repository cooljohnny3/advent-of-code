const fs = require('node:fs');

function expandInput(input) {
    let expandedInput = [];
    let fileId = 0;
    let file = true;
    for (let i = 0; i < input.length; i++) {
        if (file) {
            for (let j = 0; j < input[i]; j++) {
                expandedInput.push(fileId);
            }
            fileId++;
        } else {
            for (let j = 0; j < input[i]; j++) {
                expandedInput.push('.');
            }
        }
        file = !file;
    }
    return expandedInput;
}

function findFromEnd(input, start = input.length - 1) {
    for (let i = start; i >= 0; i--) {
        if (input[i] !== '.') {
            return i;
        }
    }
    return -1;
}

function compactInput(input) {
    let compactedInput = input;
    let index = compactedInput.indexOf('.');
    let endIndex = findFromEnd(compactedInput);
    while (endIndex > index) {
        // console.log(index, endIndex, compactedInput[endIndex]);
        compactedInput[index] = compactedInput[endIndex];
        compactedInput[endIndex] = '.';
        index = compactedInput.indexOf('.', index + 1);
        endIndex = findFromEnd(compactedInput, endIndex - 1);
    }
    return compactedInput;
}

fs.readFile('./input', 'utf-8', (err, data) => {
    // fs.readFile('./example', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    const expandedInput = expandInput(input[0]);
    // console.log(expandedInput);
    const compactedInput = compactInput(expandedInput);
    // console.log(compactedInput.join(''));
    let sum = 0;
    for (let i = 0; i < compactedInput.length; i++) {
        if (compactedInput[i] === '.') {
            break;
        }
        const checksum = i * compactedInput[i];
        // console.log(checksum);
        sum += checksum;
    }
    console.log(sum);
});

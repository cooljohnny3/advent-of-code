const fs = require('node:fs');

// fs.readFile('./input', 'utf-8', (err, data) => {
fs.readFile('./example', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    let totalSafe = 0;
    for (let i = 0; i < input.length - 1; i++) {
        const currentReport = input[i].split(' ');
        let direction = 0;
        let dampened = false;
        let safe = true;
        for (let j = 0; j < currentReport.length - 1; j++) {
            const diff = currentReport[j] - currentReport[j + 1];
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
                if (dampened) {
                    safe = false;
                    break;
                } else {
                    dampened = true;
                }
            }
            if (direction === 0) {
                if (diff > 0) {
                    direction = 1;
                } else if (diff < 0) {
                    direction = -1;
                }
            } else {
                if (diff > 0 && direction == -1) {
                    if (dampened) {
                        safe = false;
                        break;
                    } else {
                        dampened = true;
                    }
                } else if (diff < 0 && direction == 1) {
                    if (dampened) {
                        safe = false;
                        break;
                    } else {
                        dampened = true;
                    }
                }
            }
        }
        console.log(currentReport, safe);
        if (safe) {
            totalSafe += 1;
        }
    }
    console.log(totalSafe);
});

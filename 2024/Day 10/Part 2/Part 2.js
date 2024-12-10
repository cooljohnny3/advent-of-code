const fs = require('node:fs');

function followTrail(map, posRow, posCol) {
    if (map[posRow] === undefined || map[posRow][posCol] === undefined) {
        // console.log("loop found");
        return 0;
    }
    if (map[posRow][posCol] === '9') {
        // console.log("Reached top");
        return 1;
    }
    let sum = 0;
    // left
    if (map[posRow] !== undefined && map[posRow][posCol - 1] == Number(map[posRow][posCol]) + 1) {
        sum += followTrail(map, posRow, posCol - 1);
    }
    // up
    if (map[posRow - 1] !== undefined && map[posRow - 1][posCol] == Number(map[posRow][posCol]) + 1) {
        sum += followTrail(map, posRow - 1, posCol);
    }
    // right
    if (map[posRow] !== undefined && map[posRow][posCol + 1] == Number(map[posRow][posCol]) + 1) {
        sum += followTrail(map, posRow, posCol + 1);
    }
    // down
    if (map[posRow + 1] !== undefined && map[posRow + 1][posCol] == Number(map[posRow][posCol]) + 1) {
        sum += followTrail(map, posRow + 1, posCol);
    }
    return sum;
}

function findStartingPoints(map) {
    const points = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '0') {
                points.push([i, j]);
            }
        }
    }
    return points;
}

const args = process.argv;
if (args.length < 3) {
    console.error("Missing input file");
    return 1;
}

fs.readFile(args[2], 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    const map = [];
    for (let i = 0; i < input.length - 1; i++) {
        map.push(input[i].split(''));
    }
    // console.log(map);
    const startingPoints = findStartingPoints(map);
    // console.log(startingPoints);
    let totalRatings = 0;
    for (let i = 0; i < startingPoints.length; i++) {
        totalRatings += followTrail(map, startingPoints[i][0], startingPoints[i][1]);
    }
    console.log(totalRatings);
});

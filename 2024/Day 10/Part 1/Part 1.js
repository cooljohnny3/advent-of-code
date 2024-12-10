const fs = require('node:fs');

function followTrail(map, posRow, posCol, trailHeads = []) {
    if (map[posRow] === undefined || map[posRow][posCol] === undefined) {
        // console.log("loop found");
        return;
    }
    if (map[posRow][posCol] === '9') {
        // console.log("Reached top");
        if (trailHeads.findIndex((trailHead) => trailHead[0] === posRow && trailHead[1] === posCol) === -1) {
            trailHeads.push([posRow, posCol]);
        }
    }
    // left
    if (map[posRow] !== undefined && map[posRow][posCol - 1] == Number(map[posRow][posCol]) + 1) {
        followTrail(map, posRow, posCol - 1, trailHeads);
    }
    // up
    if (map[posRow - 1] !== undefined && map[posRow - 1][posCol] == Number(map[posRow][posCol]) + 1) {
        followTrail(map, posRow - 1, posCol, trailHeads);
    }
    // right
    if (map[posRow] !== undefined && map[posRow][posCol + 1] == Number(map[posRow][posCol]) + 1) {
        followTrail(map, posRow, posCol + 1, trailHeads);
    }
    // down
    if (map[posRow + 1] !== undefined && map[posRow + 1][posCol] == Number(map[posRow][posCol]) + 1) {
        followTrail(map, posRow + 1, posCol, trailHeads);
    }
    return trailHeads;
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
    const trailHeads = [];
    for (let i = 0; i < startingPoints.length; i++) {
        const result = followTrail(map, startingPoints[i][0], startingPoints[i][1]);
        if (result.length > 0) {
            trailHeads.push(...result);
        }
    }
    console.log(trailHeads.length);
});

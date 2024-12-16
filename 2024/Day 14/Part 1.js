const fs = require('node:fs');

function calculatePosition(width, height, pos, vel, stop = 100, t = 0) {
    // console.log(`t=${t}`, pos);
    if (t === stop) {
        return pos;
    }
    const newPos = {
        x: pos.x + vel.x,
        y: pos.y + vel.y,
    }
    // console.log(`New pos: ${JSON.stringify(newPos)}`);
    if (newPos.x < 0) {
        // console.log("x < 0");
        newPos.x = width + newPos.x;
    }
    if (newPos.y < 0) {
        // console.log("y < 0");
        newPos.y = height + newPos.y;
    }
    if (newPos.x >= width) {
        // console.log("x >= width");
        newPos.x = newPos.x % width;
    }
    if (newPos.y >= height) {
        // console.log("y >= height");
        newPos.y = newPos.y % height;
    }
    return calculatePosition(width, height, newPos, vel, stop, t + 1);
}

const args = process.argv;
if (args.length < 3) {
    console.error("Missing input file");
    return 1;
}
if (args.length < 4) {
    console.error("Missing room width");
    return 1;
}
if (args.length < 5) {
    console.error("Missing room height");
    return 1;
}

fs.readFile(args[2], 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');

    const roomWidth = args[3];
    const roomHeight = args[4];

    let topLeft = 0;
    let topRight = 0;
    let bottomLeft = 0;
    let bottomRight = 0;
    for (let i = 0; i < input.length - 1; i++) {
        let [posX, posY, velX, velY] = input[i].match(/-?\d?\d?\d/g);
        // console.log(posX, posY, velX, velY);
        const newPos = calculatePosition(Number(roomWidth), Number(roomHeight), { x: Number(posX), y: Number(posY) }, { x: Number(velX), y: Number(velY) });
        // console.log(newPos);
        if (newPos.x === Math.trunc(roomWidth / 2) || newPos.y === Math.trunc(roomHeight / 2)) {
            // console.log("Center");
            continue;
        }
        if (newPos.y < roomHeight / 2) {
            if (newPos.x < roomWidth / 2) {
                // console.log("Topleft");
                topLeft++;
            } else {
                // console.log("Topright");
                topRight++;
            }
        } else {
            if (newPos.x < roomWidth / 2) {
                // console.log("Bottomleft");
                bottomLeft++;
            } else {
                // console.log("Bottomright");
                bottomRight++;
            }
        }
    }
    console.log(topLeft, topRight, bottomLeft, bottomRight, topLeft * topRight * bottomLeft * bottomRight);
});

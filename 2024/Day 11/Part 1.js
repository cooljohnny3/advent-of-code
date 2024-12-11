const fs = require('node:fs');

const args = process.argv;
if (args.length < 3) {
    console.error("Missing input file");
    return 1;
}
if (args.length < 4) {
    console.error("Missing blink count");
    return 1;
}

fs.readFile(args[2], 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');

    let stones = input[0].split(" ");
    for (let i = 0; i < args[3]; i++) {
        const newStones = [];
        for (let j = 0; j < stones.length; j++) {
            const currentStone = stones[j];
            if (currentStone === '0') {
                newStones.push('1');
            } else if (currentStone.length % 2 === 0) {
                const firstHalf = Number(currentStone.substring(0, currentStone.length / 2));
                const secondHalf = Number(currentStone.substring(currentStone.length / 2));
                newStones.push(String(firstHalf), String(secondHalf));
            } else {
                newStones.push(String(currentStone * 2024));
            }
        }
        // console.log(newStones);
        stones = newStones;
    }
    console.log(stones.length);
});

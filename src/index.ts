import { Board } from './game/Board';
import { black, bgGreen } from 'colors';

const heightRegex = /height=(\d+)/;
const widthRegex = /width=(\d+)/;

let height = 15;
let width = 30;

process.argv.forEach((arg) => {
    const matchHeight = arg.match(heightRegex);
    const matchWidth = arg.match(widthRegex);
    if (matchHeight) {
        height ??= parseInt(matchHeight[1]);
    }
    if (matchWidth) {
        width ??= parseInt(matchWidth[1]);
    }
});

const board = Board.initRandom(height, width);

setInterval(() => {
    console.clear();
    console.log(board.toString().replace(/ x /gm, black(bgGreen(' x '))));
    board.nextStep();
}, 250);

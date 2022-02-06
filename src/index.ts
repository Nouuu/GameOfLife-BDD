import { Board } from './game/Board';
import { black, bgGreen } from 'colors';

const board = Board.initRandom(15, 30);

setInterval(() => {
    console.clear();
    console.log(board.toString().replace(/ x /gm, black(bgGreen(' x '))));
    board.nextStep();
}, 250);

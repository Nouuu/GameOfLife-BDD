import { Board } from './game/Board';

const board = Board.initRandom(15, 30);

setInterval(()=>{
    console.clear();
    console.log(board.toString());
    board.nextStep();
},1000)

import { ArrayDimensions } from './ArrayDimension';
import { CellArray } from './CellArray';
import { Cell } from './Cell';

export function initRandomCellArray(
    arrayDimensions: ArrayDimensions,
    randomThreshold = 0.5,
    random: () => number = Math.random
): CellArray {
    const board: CellArray = [];
    for (let i = 0; i < arrayDimensions.height; i++) {
        board[i] = [];
        for (let j = 0; j < arrayDimensions.width; j++) {
            board[i].push(new Cell({ y: i, x: j }, random() >= randomThreshold));
        }
    }
    return board;
}


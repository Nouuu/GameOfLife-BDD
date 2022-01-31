import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ArrayDimensions } from '../../src/game/ArrayDimension';
import { Cell } from '../../src/game/Cell';
import { Board } from '../../src/game/Board';

function transformRawArrayToBoard(dimension: ArrayDimensions, string: string[][]): Board {
    const board = Board.of(dimension.height, dimension.width);
    string.forEach((line, i) => {
        line.forEach((cell, j) => {
            board.cells[i][j] = new Cell({ x: j, y: i }, Boolean(cell.indexOf('x') >= 0));
        });
    });

    return board;
}

function getDimensionsFromRawArray(string: string[][]): ArrayDimensions {
    return {
        height: string.length,
        width: string[0].length,
    };
}

let board: Board;
let arrayDimensions: ArrayDimensions;

Given(/the following setup$/, (setup: DataTable) => {
    arrayDimensions = getDimensionsFromRawArray(setup.raw());
    board = transformRawArrayToBoard(arrayDimensions, setup.raw());
    // console.log(board.toString());
});

When('I evolve the board', () => {
    // console.log(board.toString());
    board.nextStep();
    // console.log(board.toString());
});

Then(/the center cell should be (dead|alive)/, (status: string) => {
    const line: Cell[] = board.cells[Math.floor(board.cells.length / 2)];
    const cell: Cell = line[Math.floor(line.length / 2)];
    expect(cell.isAlive).eq(status === 'alive');
});

Then(/I should see the following board$/, (boardTable: DataTable) => {
    const expectedArrayDimensions = getDimensionsFromRawArray(boardTable.raw());
    const expectedCellArray = transformRawArrayToBoard(expectedArrayDimensions, boardTable.raw());

    expect(arrayDimensions.height).eq(expectedArrayDimensions.height);
    expect(arrayDimensions.width).eq(expectedArrayDimensions.width);

    board.cells.forEach((line, y) =>
        line.forEach((cell, x) => {
            expect(cell.isAlive).eq(expectedCellArray.cells[y][x].isAlive);
        })
    );
});

import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { ArrayDimensions, Board, Cell, CellArray } from '../../src/game_of_life';
import { expect } from 'chai';

function transformRawArrayToArrayCell(string: string[][]): CellArray {
    const cellArray: CellArray = [];
    string.forEach((line) => {
        const cellLine: Cell[] = [];
        line.forEach((cell) => {
            cellLine.push(cell.indexOf('x') >= 0 ? 1 : 0);
        });
        cellArray.push(cellLine);
    });

    return cellArray;
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
    board = transformRawArrayToArrayCell(setup.raw());
    arrayDimensions = getDimensionsFromRawArray(setup.raw());
});

When('I evolve the board', () => {
    console.log(board);
    board.nextStep();
    console.log(board);
});

Then(/the center cell should be (dead|alive)/, (status: string) => {
    const line: number[] = board[Math.floor(board.length / 2)];
    const cell: number = line[Math.floor(line.length / 2)];
    expect(cell).eq(status === 'alive' ? 1 : 0);
});

Then(/I should see the following board$/, (board: DataTable) => {
    const expectedCellArray = transformRawArrayToArrayCell(board.raw());
    const expectedArrayDimensions = getDimensionsFromRawArray(board.raw());

    expect(arrayDimensions.height).eq(expectedArrayDimensions.height);
    expect(arrayDimensions.width).eq(expectedArrayDimensions.width);

    board.forEach((line, y) =>
        line.forEach((cell, x) => {
            expect(cell).eq(expectedCellArray[y][x]);
        })
    );
});

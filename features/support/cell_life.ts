import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { ArrayDimensions, Board, Cell } from '../../src/game_of_life';
import { expect } from 'chai';

function transformRawArrayToBoard(dimension: ArrayDimensions, string: string[][]): Board {
    const board = new Board(dimension.height, dimension.width);
    string.forEach((line, i) => {
        line.forEach((cell, j) => {
            board.cells[i].push(new Cell({ x: i, y: j }, Boolean(cell.indexOf('x') >= 0)));
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
});

When('I evolve the board', () => {
    console.log(board);
    board.nextStep();
    console.log(board);
});

Then(/the center cell should be (dead|alive)/, (status: string) => {
    const line: number[] = board[Math.floor(board.cells.length / 2)];
    const cell: number = line[Math.floor(line.length / 2)];
    expect(cell).eq(status === 'alive' ? 1 : 0);
});

Then(/I should see the following board$/, (boardTable: DataTable) => {
    const expectedArrayDimensions = getDimensionsFromRawArray(boardTable.raw());
    const expectedCellArray = transformRawArrayToBoard(expectedArrayDimensions, boardTable.raw());

    expect(arrayDimensions.height).eq(expectedArrayDimensions.height);
    expect(arrayDimensions.width).eq(expectedArrayDimensions.width);

    board.cells.forEach((line, y) =>
        line.forEach((cell, x) => {
            expect(cell).eq(expectedCellArray[y][x]);
        })
    );
});

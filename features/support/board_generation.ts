import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { ArrayDimensions } from '../../src/game/ArrayDimension';
import { CellArray } from '../../src/game/CellArray';
import { Cell } from '../../src/game/Cell';
import { initRandomCellArray } from '../../src/game/boardGeneration';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { Board } from '../../src/game/Board';

chai.use(spies);
let spy: ChaiSpies.SpyFunc1Proxy<ArrayDimensions, CellArray>;

function transformRawArrayToCellArray(dimension: ArrayDimensions, string: string[][]): CellArray {
    const cellArray: CellArray = [];
    string.forEach((line, i) => {
        cellArray[i] = [];
        line.forEach((cell, j) => {
            cellArray[i].push(new Cell({ y: i, x: j }, cell.indexOf('x') >= 0));
        });
    });
    return cellArray;
}

function getDimensionsFromRawArray(string: string[][]): ArrayDimensions {
    return {
        height: string.length,
        width: string[0].length,
    };
}

let alternate = true;

function alternateRandom(): number {
    alternate = !alternate;
    return alternate ? 1 : 0;
}

let cellArray: CellArray;
let arrayDimensions: ArrayDimensions;

Given(/I want a (\d+)x(\d+) random generated board/, (height: number, width: number) => {
    arrayDimensions = { height, width };
});

When(
    /I generate the random cellArray with (classic|alternate) random( and .* threshold)?$/,
    (randomMethod: string, thresholdArg?: string) => {
        let threshold = 0.5;
        if (thresholdArg) {
            threshold = Number.parseFloat(thresholdArg.split(' ')[2]);
        }
        if (randomMethod === 'alternate') {
            alternate = true;
            cellArray = initRandomCellArray(arrayDimensions, 0.5, alternateRandom);
        } else {
            cellArray = initRandomCellArray(arrayDimensions, threshold);
        }
    }
);

When(/I generate the board/, () => {
    spy = chai.spy(initRandomCellArray);
    Board.initRandom(arrayDimensions.height, arrayDimensions.width, spy);
});

Then(/I should see the following cellArray$/, (rawCellArray: DataTable) => {
    const expectedArrayDimensions = getDimensionsFromRawArray(rawCellArray.raw());
    const expectedCellArray = transformRawArrayToCellArray(
        expectedArrayDimensions,
        rawCellArray.raw()
    );
    expect(arrayDimensions.height).eq(expectedArrayDimensions.height);
    expect(arrayDimensions.width).eq(expectedArrayDimensions.width);

    cellArray.forEach((line, y) =>
        line.forEach((cell, x) => {
            expect(cell.isAlive).eq(expectedCellArray[y][x].isAlive, `${x}x${y}`);
        })
    );
});

Then(/I should see an empty cellArray$/, () => {
    expect(arrayDimensions.height).eq(0);
    expect(arrayDimensions.width).eq(0);

    expect(cellArray).empty;
});

Then(/The given generator method should have been called/, () => {
    expect(spy).to.have.been.called();
});

interface ArrayDimensions {
    width: number;
    height: number;
}

interface Coordinate {
    x: number;
    y: number;
}

type CellArray = number[][];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
    const dimensions: ArrayDimensions = { height: 25, width: 50 };
    let array = initRandomCellArray(dimensions);
    showArray(array, dimensions);
    array = nextStep(array, dimensions);
    showArray(array, dimensions);
}

function showArray(array: CellArray, arrayDimensions: ArrayDimensions) {
    for (let i = 0; i < arrayDimensions.height; i++) {
        for (let j = 0; j < arrayDimensions.width; j++) {
            if (array[i][j] === 1) {
                // alive
            }
        }
    }
}

function initRandomCellArray(arrayDimensions: ArrayDimensions): CellArray {
    const array: CellArray = [];
    for (let i = 0; i < arrayDimensions.height; i++) {
        array[i] = [];
        for (let j = 0; j < arrayDimensions.width; j++) {
            array[i][j] = Math.floor(Math.random() * 11) % 11;
        }
    }
    return array;
}

function getNeighboursCoordinates(
    x: number,
    y: number,
    arrayDimensions: ArrayDimensions
): Coordinate[] {
    const coordinates: Coordinate[] = [];
    if (x > 0 && y > 0) {
        coordinates.push({
            x: x - 1,
            y: y - 1,
        });
    }
    if (y < arrayDimensions.height - 1 && x < arrayDimensions.width - 1) {
        coordinates.push({
            x: x + 1,
            y: y + 1,
        });
    }
    if (x > 0) {
        coordinates.push({
            x: x - 1,
            y: y,
        });
        if (y < arrayDimensions.height - 1) {
            coordinates.push({
                x: x - 1,
                y: y + 1,
            });
        }
    }
    if (y > 0) {
        coordinates.push({
            x: x,
            y: y - 1,
        });
        if (x < arrayDimensions.width - 1) {
            coordinates.push({
                x: x + 1,
                y: y - 1,
            });
        }
    }
    if (y < arrayDimensions.height - 1) {
        coordinates.push({
            x: x,
            y: y + 1,
        });
    }
    if (x < arrayDimensions.width - 1) {
        coordinates.push({
            x: x + 1,
            y: y,
        });
    }
    return coordinates;
}

function nextStep(array: CellArray, arrayDimensions: ArrayDimensions): CellArray {
    const nextArray: CellArray = [];

    for (let y = 0; y < arrayDimensions.height; y++) {
        for (let x = 0; x < arrayDimensions.width; x++) {
            let aliveNeighbours = 0;
            const neighbours = getNeighboursCoordinates(x, y, arrayDimensions);

            neighbours.forEach((neighbour) => {
                if (array[neighbour.y][neighbour.x] === 1) {
                    aliveNeighbours++;
                }
            });
            if ((array[y][x] === 1 && aliveNeighbours === 2) || aliveNeighbours === 3) {
                nextArray[y][x] = 1;
            } else {
                nextArray[y][x] = 0;
            }
        }
    }
    return nextArray;
}

init();

export interface ArrayDimensions {
    width: number;
    height: number;
}

export interface Coordinate {
    x: number;
    y: number;
}

export type CellArray = Cell[][];

export class Cell {
    private position: Coordinate;
    isAlive: boolean;

    constructor(position: Coordinate, isAlive: boolean) {
        this.position = position;
        this.isAlive = isAlive;
    }

    getNeighboursCoordinates(arrayDimensions: ArrayDimensions): Coordinate[] {
        const coordinates: Coordinate[] = [];
        if (this.position.x > 0 && this.position.y > 0) {
            coordinates.push({
                x: this.position.x - 1,
                y: this.position.y - 1,
            });
        }
        if (
            this.position.y < arrayDimensions.height - 1 &&
            this.position.x < arrayDimensions.width - 1
        ) {
            coordinates.push({
                x: this.position.x + 1,
                y: this.position.y + 1,
            });
        }
        if (this.position.x > 0) {
            coordinates.push({
                x: this.position.x - 1,
                y: this.position.y,
            });
            if (this.position.y < arrayDimensions.height - 1) {
                coordinates.push({
                    x: this.position.x - 1,
                    y: this.position.y + 1,
                });
            }
        }
        if (this.position.y > 0) {
            coordinates.push({
                x: this.position.x,
                y: this.position.y - 1,
            });
            if (this.position.x < arrayDimensions.width - 1) {
                coordinates.push({
                    x: this.position.x + 1,
                    y: this.position.y - 1,
                });
            }
        }
        if (this.position.y < arrayDimensions.height - 1) {
            coordinates.push({
                x: this.position.x,
                y: this.position.y + 1,
            });
        }
        if (this.position.x < arrayDimensions.width - 1) {
            coordinates.push({
                x: this.position.x + 1,
                y: this.position.y,
            });
        }
        return coordinates;
    }
}

export class Board {
    cells: CellArray;
    dimensions: ArrayDimensions;

    constructor(height: number, width: number) {
        this.dimensions = { height, width };
        this.cells = initRandomCellArray(this.dimensions);
        // this.display();
        // this.nextStep();
        // this.display();
    }

    display() {
        for (let i = 0; i < this.dimensions.height; i++) {
            for (let j = 0; j < this.dimensions.width; j++) {
                if (this.isAlive(i, j)) {
                    // alive
                }
            }
        }
    }

    isAlive(x: number, y: number): boolean {
        return this.cells[y][x].isAlive;
    }

    nextStep() {
        const nextBoard: CellArray = this.cells.map((line) => line.slice());

        for (let y = 0; y < this.dimensions.height; y++) {
            for (let x = 0; x < this.dimensions.width; x++) {
                let aliveNeighbours = 0;
                const neighbours = this.cells[y][x].getNeighboursCoordinates(this.dimensions);

                neighbours.forEach((neighbour) => {
                    if (this.isAlive(neighbour.x, neighbour.y)) {
                        aliveNeighbours++;
                    }
                });
                if ((this.isAlive(x, y) && aliveNeighbours === 2) || aliveNeighbours === 3) {
                    nextBoard[y][x] = new Cell({ y, x }, true);
                } else {
                    nextBoard[y][x] = new Cell({ y, x }, false);
                }
            }
        }
        this.cells = nextBoard;
    }

    toString(): string {
        let boardString = '';
        for (let y = 0; y < this.dimensions.height; y++) {
            let boardLineString = '|';
            for (let x = 0; x < this.dimensions.width; x++) {
                boardLineString += ` ${this.isAlive(x, y) ? 'x' : '.'} |`;
            }
            boardString += boardLineString + '\n';
        }
        return boardString;
    }
}

export function init() {
    const board = new Board(25, 25);
    board.cells = initRandomCellArray(board.dimensions);
    board.display();
    board.nextStep();
    board.display();
}

export function initRandomCellArray(arrayDimensions: ArrayDimensions): CellArray {
    const randomFactor = 11;
    const board: CellArray = [];
    for (let i = 0; i < arrayDimensions.height; i++) {
        board[i] = [];
        for (let j = 0; j < arrayDimensions.width; j++) {
            board[i][j] = new Cell(
                { x: i, y: j },
                Boolean(Math.floor(Math.random() * randomFactor) % randomFactor)
            );
        }
    }
    return board;
}

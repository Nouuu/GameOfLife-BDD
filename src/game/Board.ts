import { CellArray } from './CellArray';
import { ArrayDimensions } from './ArrayDimension';
import { Cell } from './Cell';
import { initRandomCellArray } from './boardGeneration';

export class Board {
    cells: CellArray;
    dimensions: ArrayDimensions;

    private constructor(height: number, width: number) {
        this.dimensions = { height, width };
        this.cells = [];
        for (let i = 0; i < height; i++) {
            const line: Cell[] = [];
            for (let j = 0; j < width; j++) {
                line.push(new Cell({ y: i, x: j }, false));
            }
            this.cells.push(line);
        }
    }

    public static init(height: number, width: number): Board {
        return new Board(height, width);
    }

    public static initRandom(
        height: number,
        width: number,
        randomGenerator = initRandomCellArray
    ): Board {
        const board = new Board(height, width);
        board.cells = randomGenerator(board.dimensions);
        return board;
    }

    isAlive(x: number, y: number): boolean {
        return this.cells[y][x].isAlive;
    }

    nextStep() {
        const nextBoard: CellArray = this.cells.map((line) => line.slice());

        for (let y = 0; y < this.dimensions.height; y++) {
            for (let x = 0; x < this.dimensions.width; x++) {
                let aliveNeighbors = 0;
                const neighbors = this.cells[y][x].getNeighborsCoordinates(this.dimensions);

                neighbors.forEach((neighbor) => {
                    if (this.isAlive(neighbor.x, neighbor.y)) {
                        aliveNeighbors++;
                    }
                });
                if ((this.isAlive(x, y) && aliveNeighbors === 2) || aliveNeighbors === 3) {
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

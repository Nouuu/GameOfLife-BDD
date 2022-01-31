import { Coordinate } from './Coordinate';
import { ArrayDimensions } from './ArrayDimension';

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

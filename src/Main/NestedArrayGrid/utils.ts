import { produce } from "immer";
import { nanoid } from "nanoid";

import { CellModel } from '../DnDCell/model';
import { NestedArrayGridModel } from "../DnDGridProvider/model";

const TIME_LOG_LABEL = (size: number) => `[NESTED] Generating a (${size} x ${size}) grid took`;

export const createGrid = (size: number): NestedArrayGridModel => {
    if (typeof size !== "number" || size < 1) {
        return [[]];
    }

    console.time(TIME_LOG_LABEL(size));

    const grid = Array.from<unknown, CellModel[]>({ length: size }, (_, rowIndex) => {
        return Array.from<unknown, CellModel>({ length: size }, (_, colIndex) => {
            const isEvenColumn = (colIndex + 1) % 2 === 0;
            const normalNumber = colIndex * size + rowIndex + 1;
            const reversedNumber = (colIndex + 1) * size - rowIndex;

            return {
                id: nanoid(),
                label: String(isEvenColumn ? reversedNumber : normalNumber),
            };
        });
    });

    console.timeEnd(TIME_LOG_LABEL(size));
    return grid;
};

export const getCellPosition = (
    grid: NestedArrayGridModel,
    id: string
): [number, number] => {
    let rowPos = -1;
    let colPos = -1;

    grid?.forEach((row, rowIndex) => {
        row?.forEach((cell, colIndex) => {
            if (cell.id === id) {
                rowPos = rowIndex;
                colPos = colIndex;
            }
        });
    });

    return [rowPos, colPos];
};

export const swapCellPosition = (
    grid: NestedArrayGridModel,
    source: string,
    target: string
): NestedArrayGridModel => {
    const sourcePos = getCellPosition(grid, source);
    const targetPos = getCellPosition(grid, target);

    if (sourcePos.includes(-1) || targetPos.includes(-1)) {
        return grid;
    }

    const sourceCell = grid[sourcePos[0]][sourcePos[1]];
    const targetCell = grid[targetPos[0]][targetPos[1]];

    return produce(grid, (draft) => {
        draft[targetPos[0]][targetPos[1]] = sourceCell;
        draft[sourcePos[0]][sourcePos[1]] = targetCell;
    });
};

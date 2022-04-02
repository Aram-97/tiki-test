import { produce } from "immer";
import { nanoid } from "nanoid";

import { CellModel } from "../DnDCell/model";
import { FlatArrayGridModel } from "../DnDGridProvider/model";

const TIME_LOG_LABEL = (size: number) => `[FLAT] Generating a (${size} x ${size}) grid took`;

export const createGrid = (size: number): FlatArrayGridModel => {
    if (typeof size !== "number" || size < 1) {
        return [];
    }

    console.time(TIME_LOG_LABEL(size));

    const grid = Array.from<unknown, CellModel>({ length: size * size }, (_, index) => ({
        label: String(index + 1),
        id: nanoid(),
    }));

    console.timeEnd(TIME_LOG_LABEL(size));
    return grid;
};

export const getCellPosition = (grid: FlatArrayGridModel, id: string): number => {
    return grid.findIndex((cell) => cell.id === id);
};

export const swapCellPosition = (
    grid: FlatArrayGridModel,
    source: string,
    target: string
): FlatArrayGridModel => {
    const sourcePos = getCellPosition(grid, source);
    const targetPos = getCellPosition(grid, target);

    if (sourcePos === -1 || targetPos === -1) {
        return grid;
    }

    const sourceCell = grid[sourcePos];
    const targetCell = grid[targetPos];

    return produce(grid, (draft) => {
        draft[targetPos] = sourceCell;
        draft[sourcePos] = targetCell;
    });
};

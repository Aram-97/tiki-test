import { CellModel } from "../DnDCell/model";
import { GridVersionType } from "../model";

export type FlatArrayGridModel = CellModel[];
export type NestedArrayGridModel = CellModel[][];

export enum ACTION_TYPE {
    CREATE_GRID = "CREATE_GRID",
    SWAP_CELL = "SWAP_CELL",
}

interface CreateGridAction {
    type: ACTION_TYPE.CREATE_GRID;
    payload: {
        size: number;
        version: GridVersionType;
    };
}

interface SwapCellAction {
    type: ACTION_TYPE.SWAP_CELL;
    payload: {
        source: string;
        target: string;
    };
}

export type DnDGridAction = CreateGridAction | SwapCellAction;

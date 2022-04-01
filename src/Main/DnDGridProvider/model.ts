export enum ACTION_TYPE {
    CREATE_GRID = "CREATE_GRID",
    SWAP_CELL = "SWAP_CELL",
}

interface SetSizeAction {
    type: ACTION_TYPE.CREATE_GRID;
    payload: {
        size: number;
    };
}

interface SwapCellAction {
    type: ACTION_TYPE.SWAP_CELL;
    payload: {
        source: string;
        target: string;
    };
}

export type DnDGridAction = SetSizeAction | SwapCellAction;

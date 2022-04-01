import { produce } from "immer";
import { nanoid } from "nanoid";

import { DnDGridAction, ACTION_TYPE } from "../DnDGridProvider/model";
import { NestedArrayGridState } from "./context";
import { CellModel } from "../DnDCell/model";

type ReducerType = React.Reducer<NestedArrayGridState, DnDGridAction>;

const createGrid = (size: number): CellModel[][] => {
    const rows = new Array(size).fill(null);

    const grid = rows.map((_, rowIndex) => {
        const cols = new Array(size).fill(null);

        return cols.map((_, colIndex) => {
            const isEvenColumn = (colIndex + 1) % 2 === 0;
            const normalNumber = colIndex * size + rowIndex + 1;
            const reverseNumber = (colIndex + 1) * size - rowIndex;

            return {
                id: nanoid(),
                label: String(isEvenColumn ? reverseNumber : normalNumber),
            };
        });
    });

    return grid;
};

const getCellPosition = (grid: CellModel[][], id: string): [number, number] => {
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

const reducer: ReducerType = (state, action) => {
    switch (action.type) {
        case ACTION_TYPE.CREATE_GRID: {
            return produce(state, (draft) => {
                const { size } = action.payload;
                draft.grid = createGrid(size);
            });
        }

        case ACTION_TYPE.SWAP_CELL: {
            const { source, target } = action.payload;
            const sourcePos = getCellPosition(state.grid, source);
            const targetPos = getCellPosition(state.grid, target);

            if (sourcePos.includes(-1) || targetPos.includes(-1)) {
                return state;
            }

            const sourceCell = state.grid[sourcePos[0]][sourcePos[1]];
            const targetCell = state.grid[targetPos[0]][targetPos[1]];

            return produce(state, (draft) => {
                draft.grid[targetPos[0]][targetPos[1]] = sourceCell;
                draft.grid[sourcePos[0]][sourcePos[1]] = targetCell;
            });
        }

        default: {
            return state;
        }
    }
};

export default reducer;

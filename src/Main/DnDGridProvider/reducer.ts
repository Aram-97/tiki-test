import { ACTION_TYPE, DnDGridAction, FlatArrayGridModel, NestedArrayGridModel } from "./model";
import { DnDGridState } from "./context";
import produce from "immer";

import { GRID_VERSION } from "../consts";

import {
    createGrid as createGridFlat,
    swapCellPosition as swapCellPositionFlat,
} from "../FlatArrayGrid/utils";

import {
    createGrid as createGridNested,
    swapCellPosition as swapCellPositionNested,
} from "../NestedArrayGrid/utils";

type ReducerType = React.Reducer<DnDGridState, DnDGridAction>;

const reducer: ReducerType = (state, action) => {
    switch (action.type) {
        case ACTION_TYPE.CREATE_GRID: {
            const { size, version } = action.payload;

            if (state.size === size && state.version === version) return state;

            return produce(state, (draft) => {
                draft.version = version;
                draft.size = size;

                switch (version) {
                    case GRID_VERSION.FLAT.value: {
                        draft.grid = createGridFlat(size);
                        break;
                    }
                    case GRID_VERSION.NESTED.value: {
                        draft.grid = createGridNested(size);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            });
        }

        case ACTION_TYPE.SWAP_CELL: {
            const { source, target } = action.payload;

            return produce(state, (draft) => {
                switch (state.version) {
                    case GRID_VERSION.FLAT.value: {
                        draft.grid = swapCellPositionFlat(
                            state.grid as FlatArrayGridModel,
                            source,
                            target
                        );

                        break;
                    }
                    case GRID_VERSION.NESTED.value: {
                        draft.grid = swapCellPositionNested(
                            state.grid as NestedArrayGridModel,
                            source,
                            target
                        );

                        break;
                    }
                    default: {
                        break;
                    }
                }
            });
        }

        default: {
            return state;
        }
    }
};

export default reducer;

import React, { useCallback, useContext, useEffect } from "react";

import { ACTION_TYPE } from "../DnDGridProvider/model";
import { DnDGridDispatch } from "../DnDGridProvider";
import { NestedArrayGridContext } from "./context";
import { CellModel } from "../DnDCell/model";
import DnDCell from "../DnDCell";

import VirtualizedGrid from "../VirtualizedGrid";
import { GRID_VERSION } from "../consts";
import { CELL } from "../DnDCell/consts";

interface Props {
    size: number;
}

const NestedArrayGrid: React.FC<Props> = ({ size }) => {
    const { grid } = useContext(NestedArrayGridContext);
    const dispatch = useContext(DnDGridDispatch);

    const handleCellDrop = useCallback(
        (cell: CellModel) => (droppedCell: CellModel) => {
            if (droppedCell.id !== cell.id) {
                dispatch({
                    type: ACTION_TYPE.SWAP_CELL,
                    payload: {
                        source: droppedCell.id,
                        target: cell.id,
                    },
                });
            }
        },
        [dispatch]
    );

    useEffect(() => {
        dispatch({ type: ACTION_TYPE.CREATE_GRID, payload: { size: size } });
    }, [dispatch, size]);

    return (
        <VirtualizedGrid
            size={size}
            color={GRID_VERSION.NESTED.color}
            render={({ virtualRows, virtualCols }) => {
                return virtualRows.map((row) => {
                    return (
                        <React.Fragment key={row.index}>
                            {virtualCols?.map((col) => {
                                const cell = grid?.[row.index]?.[col.index];

                                if (!cell) return null;
                                return (
                                    <div
                                        key={`${col.index}-${cell.id}`}
                                        style={{
                                            top: 0,
                                            left: 0,
                                            padding: CELL.MARGIN,
                                            position: "absolute",
                                            width: `${col.size}px`,
                                            height: `${row.size}px`,
                                            transform: `translateX(${col.start}px) translateY(${row.start}px)`,
                                        }}
                                    >
                                        <DnDCell
                                            {...cell}
                                            color={GRID_VERSION.NESTED.color}
                                            onCellDrop={handleCellDrop(cell)}
                                        />
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    );
                });
            }}
        />
    );
};

NestedArrayGrid.displayName = "NestedArrayGrid";
export default NestedArrayGrid;

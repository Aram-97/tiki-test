import React, { useContext, useEffect } from "react";

import { ACTION_TYPE } from "../DnDGridProvider/model";
import { DnDGridDispatch } from "../DnDGridProvider";
import { NestedArrayGridContext } from "./context";
import { CellModel } from "../DnDCell/model";
import DnDCell from "../DnDCell";

import StyledNestedArrayGrid from "./styles";

const SIZE = 5;

const NestedArrayGrid: React.FC = () => {
    const { grid } = useContext(NestedArrayGridContext);
    const dispatch = useContext(DnDGridDispatch);

    const handleCellDrop = (cell: CellModel) => (droppedCell: CellModel) => {
        if (droppedCell.id !== cell.id) {
            dispatch({
                type: ACTION_TYPE.SWAP_CELL,
                payload: {
                    source: droppedCell.id,
                    target: cell.id,
                },
            });
        }
    };

    useEffect(() => {
        dispatch({ type: ACTION_TYPE.CREATE_GRID, payload: { size: SIZE } });
    }, [dispatch]);

    return (
        <StyledNestedArrayGrid size={SIZE}>
            {grid?.map((row, index) =>
                row?.map((cell) => (
                    <DnDCell
                        key={cell.id}
                        onCellDrop={handleCellDrop(cell)}
                        {...cell}
                    />
                ))
            )}
        </StyledNestedArrayGrid>
    );
};

NestedArrayGrid.displayName = "NestedArrayGrid";
export default NestedArrayGrid;

import React, { useContext } from "react";

import { GRID_VERSION } from "../consts";
import VirtualizedGrid from "../VirtualizedGrid";
import VirtualizedCell from "../VirtualizedGrid/VirtualizedCell";
import { NestedArrayGridModel } from "../DnDGridProvider/model";
import { DnDGridContext } from "../DnDGridProvider/context";
import DnDCell from "../DnDCell";

const NestedArrayGrid: React.FC = () => {
    const { grid, size, version } = useContext(DnDGridContext);

    if (version !== GRID_VERSION.NESTED.value) return null;

    return (
        <VirtualizedGrid
            size={size}
            color={GRID_VERSION.NESTED.color}
            render={({ virtualRows, virtualCols }) => {
                return virtualRows.map((row) => {
                    return (
                        <React.Fragment key={row.index}>
                            {virtualCols?.map((col) => {
                                const nestedGrid = grid as NestedArrayGridModel;
                                const cell = nestedGrid[row.index][col.index];

                                return (
                                    <VirtualizedCell
                                        key={cell.id}
                                        virtualRow={row}
                                        virtualCol={col}
                                    >
                                        <DnDCell {...cell} color={GRID_VERSION.NESTED.color} />
                                    </VirtualizedCell>
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

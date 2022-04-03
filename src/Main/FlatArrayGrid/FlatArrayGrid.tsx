import React, { useContext } from "react";

import { GRID_VERSION } from "../consts";
import VirtualizedGrid from "../VirtualizedGrid";
import VirtualizedCell from "../VirtualizedGrid/VirtualizedCell";
import { FlatArrayGridModel } from "../DnDGridProvider/model";
import { DnDGridContext } from "../DnDGridProvider/context";
import DnDCell from "../DnDCell";

const FlatArrayGrid: React.FC = () => {
    const { grid, size, version } = useContext(DnDGridContext);

    if (version !== GRID_VERSION.FLAT.value) return null;

    return (
        <VirtualizedGrid
            size={size}
            color={GRID_VERSION.FLAT.color}
            render={({ virtualRows, virtualCols, hasGridMounted }) => {
                return virtualCols.map((col) => {
                    return (
                        <React.Fragment key={col.index}>
                            {virtualRows?.map((row) => {
                                const flatGrid = grid as FlatArrayGridModel;
                                const isEvenColumn = (col.index + 1) % 2 === 0;
                                const normalIndex = col.index * size + row.index;
                                const reversedIndex = (col.index + 1) * size - row.index - 1;
                                const cell = flatGrid[isEvenColumn ? reversedIndex : normalIndex];

                                return (
                                    <VirtualizedCell
                                        virtualRow={row}
                                        virtualCol={col}
                                        hasGridMounted={hasGridMounted}
                                        key={`${row.index}-${col.index}-${cell.id}`}
                                    >
                                        <DnDCell
                                            {...cell}
                                            color={GRID_VERSION.FLAT.color}
                                        />
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

FlatArrayGrid.displayName = "FlatArrayGrid";
export default FlatArrayGrid;

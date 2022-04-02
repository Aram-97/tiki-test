import React, { memo, useRef, useMemo } from "react";
import { VirtualItem } from "react-virtual";

import { CELL } from "../DnDCell/consts";
import StyledVirtualizedGrid, { StyledProps } from "./styles";
import { useVirtualGrid } from "./use-virtual-grid";

interface VirtualizedItems {
    virtualRows: VirtualItem[];
    virtualCols: VirtualItem[];
}

interface Props extends StyledProps {
    render: (items: VirtualizedItems) => React.ReactNode;
    size: number;
}

const VirtualizedGrid: React.FC<Props> = memo(({ render, size, color }) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const { rowVirtualizer, colVirtualizer } = useVirtualGrid<HTMLDivElement>({
        itemSize: CELL.SIZE + CELL.MARGIN * 2,
        paddingStart: 6,
        paddingEnd: 6,
        overscan: 5,
        parentRef,
        size,
    });

    const { virtualItems: virtualRows, totalSize: rowTotalSize } =
        rowVirtualizer;
    const { virtualItems: virtualCols, totalSize: colTotalSize } =
        colVirtualizer;

    const children = useMemo(() => {
        return render({ virtualRows, virtualCols });
    }, [render, virtualRows, virtualCols]);

    return (
        <StyledVirtualizedGrid ref={parentRef as any} color={color}>
            <div
                style={{
                    height: `${rowTotalSize}px`,
                    width: `${colTotalSize}px`,
                    position: "relative",
                }}
            >
                {children}
            </div>
        </StyledVirtualizedGrid>
    );
});

VirtualizedGrid.displayName = "VirtualizedGrid";
export default VirtualizedGrid;

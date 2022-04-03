import React, { memo, useRef, useMemo } from "react";
import { useSpring, animated, easings } from "react-spring";
import { VirtualItem } from "react-virtual";

import { CELL } from "../DnDCell/consts";
import { useVirtualGrid } from "./use-virtual-grid";
import StyledVirtualizedGrid, { StyledProps } from "./styles";

interface VirtualizedItems {
    virtualRows: VirtualItem[];
    virtualCols: VirtualItem[];
    hasGridMounted: boolean;
}

interface Props extends StyledProps {
    render: (items: VirtualizedItems) => React.ReactNode;
    size: number;
}

const VirtualizedGrid: React.FC<Props> = memo(({ render, size, color }) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const hasGridMounted = useRef(false);
    const previousSize = useRef(size);

    const { rowVirtualizer, colVirtualizer } = useVirtualGrid<HTMLDivElement>({
        itemSize: CELL.SIZE + CELL.MARGIN * 2,
        paddingStart: 6,
        paddingEnd: 6,
        overscan: 5,
        parentRef,
        size,
    });

    const { virtualItems: virtualRows, totalSize: rowTotalSize } = rowVirtualizer;
    const { virtualItems: virtualCols, totalSize: colTotalSize } = colVirtualizer;

    const styles = useSpring({
        width: colTotalSize,
        height: rowTotalSize,
        config: { duration: 250, easing: easings.easeOutCubic },
        onRest: () => {
            hasGridMounted.current = true;
        },
    });

    const children = useMemo(() => {
        if (size !== previousSize.current) {
            hasGridMounted.current = false;
            previousSize.current = size;
        }

        return render({ virtualRows, virtualCols, hasGridMounted: hasGridMounted.current });
    }, [size, render, virtualRows, virtualCols]);

    return (
        <StyledVirtualizedGrid ref={parentRef as any} color={color}>
            <animated.div style={{ position: "relative", ...styles }}>{children}</animated.div>
        </StyledVirtualizedGrid>
    );
});

VirtualizedGrid.displayName = "VirtualizedGrid";
export default VirtualizedGrid;

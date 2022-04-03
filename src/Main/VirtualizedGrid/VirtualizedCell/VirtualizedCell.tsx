import React, { memo } from "react";
import { useSpring, animated, config } from "react-spring";
import { VirtualItem } from "react-virtual";

import { CELL } from "../../DnDCell/consts";

interface Props {
    virtualRow: VirtualItem;
    virtualCol: VirtualItem;
    hasGridMounted?: boolean;
}

const VirtualizedCell: React.FC<Props> = memo(
    ({ virtualRow, virtualCol, hasGridMounted, children }) => {
        const styles = useSpring({
            delay: (virtualRow.index + virtualCol.index) * (hasGridMounted ? 0 : 50),
            config: config.wobbly,
            from: { scale: 0, zIndex: 1 },
            to: { scale: 1, zIndex: 0 },
            immediate: (key) => key === "zIndex",
        });

        return (
            <animated.div
                style={{
                    top: 0,
                    left: 0,
                    padding: CELL.MARGIN,
                    position: "absolute",
                    width: `${virtualCol.size}px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualCol.start}px) translateY(${virtualRow.start}px)`,
                    ...styles,
                }}
            >
                {children}
            </animated.div>
        );
    },
    (prevProps, nextProps) => {
        const isRowEqual =
            prevProps.virtualRow.size === nextProps.virtualRow.size &&
            prevProps.virtualRow.start === nextProps.virtualRow.start;

        const isColEqual =
            prevProps.virtualCol.size === nextProps.virtualCol.size &&
            prevProps.virtualCol.start === nextProps.virtualCol.start;

        return isRowEqual && isColEqual;
    }
);

VirtualizedCell.displayName = "VirtualizedCell";
export default VirtualizedCell;

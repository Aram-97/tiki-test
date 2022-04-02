import React, { memo } from "react";
import { VirtualItem } from "react-virtual";

import { CELL } from "../../DnDCell/consts";

interface Props {
    virtualRow: VirtualItem;
    virtualCol: VirtualItem;
}

const VirtualizedCell: React.FC<Props> = memo(
    ({ virtualRow, virtualCol, children }) => {
        return (
            <div
                style={{
                    top: 0,
                    left: 0,
                    padding: CELL.MARGIN,
                    position: "absolute",
                    width: `${virtualCol.size}px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualCol.start}px) translateY(${virtualRow.start}px)`,
                }}
            >
                {children}
            </div>
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

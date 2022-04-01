import React, { RefCallback, useCallback, memo } from "react";
import { useDrag, useDrop } from "react-dnd";

import { CellModel } from "./model";
import { ITEM_TYPE } from "./consts";
import StyledDnDCell from "./styles";

interface Props extends CellModel {
    onCellDrop: (droppedCell: CellModel) => void;
}

const DnDCell: React.FC<Props> = memo(({ id, label, onCellDrop }) => {
    const [{ isDragging }, connectDrag] = useDrag(() => ({
        type: ITEM_TYPE.CELL,
        item: { id },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    }));

    const [, connectDrop] = useDrop<CellModel>(() => ({
        accept: ITEM_TYPE.CELL,
        drop: onCellDrop,
    }));

    const combineRefs = useCallback<RefCallback<HTMLDivElement>>(
        (element) => {
            connectDrag(element);
            connectDrop(element);
        },
        [connectDrag, connectDrop]
    );

    return (
        <StyledDnDCell ref={combineRefs} isDragging={isDragging}>
            {label}
        </StyledDnDCell>
    );
});

DnDCell.displayName = 'DnDCell';
export default DnDCell;

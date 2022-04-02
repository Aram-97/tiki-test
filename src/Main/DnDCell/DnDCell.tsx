import React, { RefCallback, useCallback, memo, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MantineColor } from "@mantine/core";

import { ACTION_TYPE } from '../DnDGridProvider/model';
import { DnDGridDispatch } from '../DnDGridProvider';
import { CellModel } from "./model";
import { ITEM_TYPE } from "./consts";
import StyledDnDCell from "./styles";

interface Props extends CellModel {
    color?: MantineColor;
}

const DnDCell: React.FC<Props> = memo(({ id, label, color }) => {
    const dispatch = useContext(DnDGridDispatch);

    const [{ isDragging }, connectDrag] = useDrag(() => ({
        item: { id },
        type: ITEM_TYPE.CELL,
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    }));

    const [{ isOver }, connectDrop] = useDrop<CellModel, unknown, { isOver: boolean }>(() => ({
        accept: ITEM_TYPE.CELL,
        drop: (droppedCell) => {
            if (droppedCell.id !== id) {
                dispatch({
                    type: ACTION_TYPE.SWAP_CELL,
                    payload: {
                        source: droppedCell.id,
                        target: id,
                    },
                });
            }
        },
        collect: (monitor) => {
            return {
                isOver: monitor.isOver(),
            };
        },
    }));

    const combineRefs = useCallback<RefCallback<HTMLDivElement>>(
        (element) => {
            connectDrag(element);
            connectDrop(element);
        },
        [connectDrag, connectDrop]
    );

    return (
        <StyledDnDCell
            color={color}
            isOver={isOver}
            isDragging={isDragging}
            textLength={label.length}
            ref={combineRefs}
        >
            {label}
        </StyledDnDCell>
    );
});

DnDCell.displayName = "DnDCell";
export default DnDCell;

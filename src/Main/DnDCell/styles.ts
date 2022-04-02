import styled from "styled-components/macro";
import { DEFAULT_THEME, MantineColor } from "@mantine/core";

import { CELL } from "./consts";

interface Props {
    isDragging?: boolean;
    color?: MantineColor;
    textLength: number;
    isOver?: boolean;
}

const DnDCell = styled.div<Props>`
    cursor: grab;
    display: grid;
    font-weight: 500;
    border-radius: 4px;
    place-items: center;
    width: ${CELL.SIZE}px;
    height: ${CELL.SIZE}px;
    background-color: white;
    transition-duration: 100ms;
    transition-property: color, background-color;
    opacity: ${({ isDragging }) => (isDragging ? "0" : "1")};
    color: ${({ color }) => DEFAULT_THEME.colors[color || "blue"][6]};
    font-size: ${({ textLength }) => (textLength < 3 ? 1 : 3 / textLength)}rem;
    border-width: ${({ isOver, isDragging }) => (isOver && !isDragging) ? 2 : 1}px;
    border-color: ${({ color }) => DEFAULT_THEME.colors[color || "blue"][6]};
    border-style: solid;


    &:hover {
        background-color: ${({ color }) => DEFAULT_THEME.colors[color || "blue"][6]};
        box-shadow: ${DEFAULT_THEME.shadows.xl};
        color: white;
    }
`;

export default DnDCell;

import styled from "styled-components/macro";
import { DEFAULT_THEME } from "@mantine/core";

interface Props {
    isDragging?: boolean;
}

const DnDCell = styled.div<Props>`
    width: 40px;
    height: 40px;
    margin: 4px;
    padding: 4px;
    color: white;
    cursor: grab;
    display: grid;
    font-weight: 500;
    border-radius: 4px;
    place-items: center;
    background-color: white;
    color: ${DEFAULT_THEME.colors.blue[6]};
    border: 1px solid ${DEFAULT_THEME.colors.blue[6]};
    opacity: ${({ isDragging }) => (isDragging ? "0" : "1")};

    &:hover {
        border-width: 2px;
        box-shadow: ${DEFAULT_THEME.shadows.xl};
    }
`;

export default DnDCell;

import { DEFAULT_THEME } from "@mantine/core";
import styled from "styled-components/macro";

interface Props {
    size: number;
}

const NestedArrayGrid = styled.div<Props>`
    display: grid;
    place-items: center;
    grid-template-rows: repeat(${({ size }) => size}, auto);
    grid-template-columns: repeat(${({ size }) => size}, auto);
    background-color: ${DEFAULT_THEME.colors.blue[0]};
    border-radius: 6px;
    padding: 4px;
`;

export default NestedArrayGrid;

import { DEFAULT_THEME, MantineColor } from "@mantine/core";
import styled from "styled-components/macro";

export type StyledProps = {
    color?: MantineColor;
};

const VirtualizedGrid = styled.div<StyledProps>`
    overflow: auto;
    border-radius: 12px;
    aspect-ratio: 1 / 1;
    border: 1px solid ${({ color }) => DEFAULT_THEME.colors[color || "blue"][2]};
    background-color: ${({ color }) => DEFAULT_THEME.colors[color || "blue"][0]};
`;

export default VirtualizedGrid;

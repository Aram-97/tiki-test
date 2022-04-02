import { MantineColor } from "@mantine/core";

export enum FIELD {
    SIZE = "size",
    VERSION = "version",
}

export type GridVersionType = "FLAT" | "NESTED";

export interface GridVersionData {
    value: GridVersionType;
    color: MantineColor;
    label: string;
}

export interface FormDataModel {
    [FIELD.VERSION]: GridVersionType;
    [FIELD.SIZE]: number;
}

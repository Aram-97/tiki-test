import { FIELD, FormDataModel, GridVersionData, GridVersionType } from "./model";

export const LABEL = {
    ENTER_GRID_SIZE: "Enter a grid size",
    SELECT_VERSION: "Select a grid version",
    GENERATE: "Generate",
};

export const PLACEHOLDER = {
    SIZE: "Size",
};

export const GRID_VERSION: Record<GridVersionType, GridVersionData> = {
    FLAT: { value: "FLAT", label: "Grid with flat array as data", color: "blue" },
    NESTED: { value: "NESTED", label: "Grid with nested array as data", color: "teal" },
};

export const DEFAULT_VALUES: FormDataModel = {
    [FIELD.VERSION]: GRID_VERSION.FLAT.value,
    [FIELD.SIZE]: 5,
};

import { FIELD, FormDataModel } from './model';

export const LABEL = {
    ENTER_GRID_SIZE: "Enter a grid size",
    SELECT_VERSION: "Select a version",
    GENERATE: "Generate",
};

export const PLACEHOLDER = {
    SIZE: "Size",
};

export const GRID_VERSION = {
    FLAT: { value: 'FLAT', label: 'Grid with flat array' },
    NESTED: { value: 'NESTED', label: 'Grid with nested array' },
    BEAUTIFUL: { value: 'BEAUTIFUL', label: 'Grid using react-beautiful-dnd'},
}

export const DEFAULT_VALUES: FormDataModel = {
    [FIELD.SIZE]: 5,
    [FIELD.VERSION]: GRID_VERSION.FLAT.value,
};

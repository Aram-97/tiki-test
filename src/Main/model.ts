export enum FIELD {
    SIZE = "size",
    VERSION = "version",
}

export interface FormDataModel {
    [FIELD.SIZE]: number;
    [FIELD.VERSION]: string;
}

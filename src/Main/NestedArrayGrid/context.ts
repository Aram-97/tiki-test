import React from "react";

import { CellModel } from "../DnDCell/model";

export interface NestedArrayGridState {
    grid: CellModel[][];
}

export const INITIAL_STATE: NestedArrayGridState = {
    grid: [[]],
};

export const NestedArrayGridContext =
    React.createContext<NestedArrayGridState>(INITIAL_STATE);

NestedArrayGridContext.displayName = "NestedArrayGridContext";

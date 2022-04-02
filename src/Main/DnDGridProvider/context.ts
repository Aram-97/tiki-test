import React from "react";

import { FlatArrayGridModel, NestedArrayGridModel } from './model';
import { GridVersionType } from '../model';
import { GRID_VERSION } from '../consts';

export interface DnDGridState {
    grid: FlatArrayGridModel | NestedArrayGridModel;
    isGridWorkerRunning: boolean;
    version: GridVersionType;
    size: number;
}

export const INITIAL_STATE: DnDGridState = {
    version: GRID_VERSION.FLAT.value,
    isGridWorkerRunning: false,
    grid: [],
    size: 0,
};

export const DnDGridContext =
    React.createContext<DnDGridState>(INITIAL_STATE);

DnDGridContext.displayName = "DnDGridContext";

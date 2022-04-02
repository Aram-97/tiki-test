import React, { Dispatch, memo, useReducer } from "react";

import { DnDGridContext, INITIAL_STATE } from './context';
import { DnDGridAction } from "./model";
import reducer from './reducer';

export const DnDGridDispatch = React.createContext<Dispatch<DnDGridAction>>(
    () => {}
);

const DnDGridProvider: React.FC = memo(({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <DnDGridDispatch.Provider value={dispatch}>
            <DnDGridContext.Provider value={state}>{children}</DnDGridContext.Provider>
        </DnDGridDispatch.Provider>
    );
});

DnDGridDispatch.displayName = "DnDGridDispatch";
DnDGridProvider.displayName = "DnDGridProvider";
export default DnDGridProvider;

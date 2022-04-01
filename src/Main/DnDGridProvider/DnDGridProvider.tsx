import React, { Dispatch, memo, useReducer } from "react";

import { NestedArrayGridState } from "../NestedArrayGrid/context";
import { DnDGridAction } from "./model";

interface Props {
    initial: NestedArrayGridState;
    context: React.Context<NestedArrayGridState>;
    reducer: React.Reducer<NestedArrayGridState, DnDGridAction>;
}

export const DnDGridDispatch = React.createContext<Dispatch<DnDGridAction>>(
    () => {}
);

const DnDGridProvider: React.FC<Props> = memo(
    ({ initial, context: Context, reducer, children }) => {
        const [state, dispatch] = useReducer(reducer, initial);

        return (
            <DnDGridDispatch.Provider value={dispatch}>
                <Context.Provider value={state}>{children}</Context.Provider>
            </DnDGridDispatch.Provider>
        );
    }
);

DnDGridDispatch.displayName = "DnDGridDispatch";
DnDGridProvider.displayName = "DnDGridProvider";
export default DnDGridProvider;

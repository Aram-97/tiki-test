import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
    NestedArrayGridContext,
    INITIAL_STATE as NESTED_ARRAY_GRID_INITIAL,
} from "./NestedArrayGrid/context";
import nestedArrayGridReducer from "./NestedArrayGrid/reducer";
import NestedArrayGrid from "./NestedArrayGrid";
import DnDGridProvider from "./DnDGridProvider";
import StyledMain from "./styles";

const Main: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <StyledMain>
                <DnDGridProvider
                    context={NestedArrayGridContext}
                    reducer={nestedArrayGridReducer}
                    initial={NESTED_ARRAY_GRID_INITIAL}
                >
                    <NestedArrayGrid />
                </DnDGridProvider>
            </StyledMain>
        </DndProvider>
    );
};

Main.displayName = "Main";
export default Main;

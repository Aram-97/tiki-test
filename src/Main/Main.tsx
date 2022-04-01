import React, { useCallback, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { DEFAULT_VALUES } from "./consts";

import {
    NestedArrayGridContext,
    INITIAL_STATE as NESTED_ARRAY_GRID_INITIAL,
} from "./NestedArrayGrid/context";
import nestedArrayGridReducer from "./NestedArrayGrid/reducer";
import NestedArrayGrid from "./NestedArrayGrid";
import DnDGridProvider from "./DnDGridProvider";
import SetupForm from "./SetupForm";

import StyledMain from "./styles";
import { FIELD, FormDataModel } from "./model";

const Main: React.FC = () => {
    const [size, setSize] = useState(DEFAULT_VALUES[FIELD.SIZE]);

    const handleSubmit = useCallback((values: FormDataModel) => {
        setSize(values[FIELD.SIZE]);
    }, []);

    return (
        <StyledMain>
            <SetupForm handleSubmit={handleSubmit} />

            <DndProvider backend={HTML5Backend}>
                <DnDGridProvider
                    context={NestedArrayGridContext}
                    reducer={nestedArrayGridReducer}
                    initial={NESTED_ARRAY_GRID_INITIAL}
                >
                    <NestedArrayGrid size={size} />
                </DnDGridProvider>
            </DndProvider>
        </StyledMain>
    );
};

Main.displayName = "Main";
export default Main;

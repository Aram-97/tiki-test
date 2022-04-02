import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import FlatArrayGrid from "./FlatArrayGrid";
import NestedArrayGrid from "./NestedArrayGrid";
import DnDGridProvider from "./DnDGridProvider";
import SetupForm from "./SetupForm";

import StyledMain from "./styles";

const Main: React.FC = () => {
    return (
        <StyledMain>
            <DndProvider backend={HTML5Backend}>
                <DnDGridProvider>
                    <SetupForm />

                    <FlatArrayGrid />
                    <NestedArrayGrid />
                </DnDGridProvider>
            </DndProvider>
        </StyledMain>
    );
};

Main.displayName = "Main";
export default Main;

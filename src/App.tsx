import React from 'react';
import { MantineProvider } from '@mantine/core';

import Main from './Main';
import './App.css';

function App() {
    return (
        <MantineProvider theme={{ fontFamily: "Rubik", lineHeight: 1.5 }}>
            <div className="App">
                <Main />
            </div>
        </MantineProvider>
    );
}

export default App;

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/joy/styles';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { YContextProvider } from './context';


if (process.env.NODE_ENV === 'development') {
    const {worker} = require('./mocks/browser')
    worker.start()
}

ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <YContextProvider>
                        <App/>
                </YContextProvider>
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>
);
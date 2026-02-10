import ReactDOM from "react-dom/client";
import {StrictMode} from "react";
import React from "react";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
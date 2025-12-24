import ReactDOM from "react-dom/client";
import {StrictMode} from "react";
import React from "react";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
    <StrictMode>
        <p>Привет</p>
    </StrictMode>
);
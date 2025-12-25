import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client"
import { createGlobalStyle } from 'styled-components'

const GlobalStyle= createGlobalStyle`
    *{
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    body{
      background: #323334;
      color: white;
    }
`;


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <GlobalStyle/>
    <App />
  </React.StrictMode>
);

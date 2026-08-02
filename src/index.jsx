import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "context/Data-context";


import { AuthProvider } from "context/Auth-context";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <Router>
          <App />
        </Router>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

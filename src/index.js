/**
 * Entry point for rendering the React app.
 *
 * This script renders the <App /> component into the root element of the DOM.
 * @module index
 */

import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as ReactDomClient from "react-dom/client";

import { MenuContextProvider } from "./context/MenuContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * The root element where the app will be rendered.
 * @type {HTMLElement}
 */
const root = ReactDomClient.createRoot(document.getElementById("root"));

// Call the renderApp function to render the <App /> component into the root element.
root.render(
  <MenuContextProvider>
    <App />
  </MenuContextProvider>
);
reportWebVitals();

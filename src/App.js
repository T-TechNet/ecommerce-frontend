/**
 * Wrapping container file for rendering all components.
 *
 * It wraps the following component:
 *
 * (1) Left Side Categories Transition to show user product categories
 *
 * (2) Right Side Login Transition to login for more features
 *
 * (3) Main Home Component to route Landing page and all other pages
 *
 * For transition, we used "react-transition-group" from material-ui library
 *
 * @module App
 */

import React, { useState } from "react";
import "./App.css";

import { Transition } from "react-transition-group";
import Sidenav from "./components/Navigation/Sidenav";
import Home from "./pages/Home";
import { useMenuContext } from "./context/MenuContext";
import SideLogin from "./components/UserSection/SideLogin";
import { BrowserRouter as Router } from "react-router-dom";

//for testing meta tag
import { HelmetProvider } from "react-helmet-async";
import SideUserPanel from "./components/UserSection/SideUserPanel";
// import HelmetAsync from "./HelmetAsync";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const { entryStore } = useMenuContext();

  // // //for testing meta tag
  //   const [pageTitle, setPageTitle] = React.useState('Welcome to Rangoon Discount');
  //   const [pageDescription, setPageDescription] = React.useState('Shop, Save and Satisfy');
  //   const [pageImage, setPageImage] = React.useState('https://64.media.tumblr.com/2dd87cefb5b9d598919585e2daa6c81b/5e8e6874d8682e50-d2/s640x960/348c7d37de5121294274bf0a367b16c56432b6e3.pnj')

  //   console.log(pageTitle);
  //   console.log(pageDescription);
  //   console.log(pageImage);

  //  // for testing meta tag Function to update page title and description dynamically
  //  const updatePageMeta = (title, description) => {
  //   setPageTitle(title);
  //   setPageDescription(description);
  // };

  // // for testing meta tag Simulating page changes and updating meta dynamically
  // React.useEffect(() => {
  //   // Fetch page data based on current route or other logic
  //   const currentPageData = fetchPageData();

  //   // Update meta tags based on fetched page data
  //   updatePageMeta(currentPageData.title, currentPageData.description);
  // }, []);

  //////////////////////

  const openNav = () => {
    setNavOpen(true);
  };
  const closeNav = () => {
    setNavOpen(false);
  };

  const openPanel = () => {
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  const openUserPanel = () => {
    setUserPanelOpen(true);
  };

  const closeUserPanel = () => {
    setUserPanelOpen(false);
  };

  return (
    <div>
      <HelmetProvider>
        {/* <HelmetAsync title={pageTitle} description={pageDescription} image={pageImage}/> */}
        <Router>
          {/* <Routes>
            <Route path="/" exact Component={LoginButton} />
            <Route path="/sign-up" exact Component={LogoutButton} />
          </Routes> */}
          {/* For Side Nav */}
          <Transition
            in={navOpen && entryStore}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            {(state) => {
              return (
                <>
                  <Sidenav state={state} closeNav={closeNav} />
                  <div
                    className="home-overlay"
                    style={
                      state === "entering"
                        ? { animation: "show .3s forwards" }
                        : state === "entered"
                        ? { opacity: "1" }
                        : { animation: "show .3s reverse forwards" }
                    }
                    onClick={closeNav}
                  ></div>
                </>
              );
            }}
          </Transition>

          {/* For Side Login Panel */}
          <Transition in={panelOpen} timeout={300} mountOnEnter unmountOnExit>
            {(state) => {
              return (
                <>
                  <SideLogin state={state} closePanel={closePanel} />
                  <div
                    className="home-overlay"
                    style={
                      state === "entering"
                        ? { animation: "show .3s forwards" }
                        : state === "entered"
                        ? { opacity: "1" }
                        : { animation: "show .3s reverse forwards" }
                    }
                    onClick={closePanel}
                  ></div>
                </>
              );
            }}
          </Transition>

          {/* For Loggedin User Panel */}
          <Transition
            in={userPanelOpen}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            {(state) => {
              return (
                <>
                  <SideUserPanel state={state} closePanel={closeUserPanel} />
                  <div
                    className="home-overlay"
                    style={
                      state === "entering"
                        ? { animation: "show .3s forwards" }
                        : state === "entered"
                        ? { opacity: "1" }
                        : { animation: "show .3s reverse forwards" }
                    }
                    onClick={closeUserPanel}
                  ></div>
                </>
              );
            }}
          </Transition>

          {/* Home Page */}
          <Home nav={openNav} login={openPanel} profile={openUserPanel} />
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;

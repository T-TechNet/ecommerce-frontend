// For side Nav - entry store called and used in App.js
import React, { useContext, useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";

//For state management globally and useContext hook to solve prop drill (regardless whether props need or not and pass it)
const MenuContext = React.createContext();

//For component needed to get props for more easier
export function useMenuContext() {
  return useContext(MenuContext);
}

export function MenuContextProvider(props) {
  // console.log(props.children);
  // Responsible for opening & closing the sub container
  const [subContainer, setSubContainer] = useState(false);

  // Responsible for storing sub container entries
  const [subContainerEntries, setSubContainerEntries] = useState(null);

  // Responsible for storing sub title
  const [subTitle, setSubTitle] = useState();

  // Responsible for holding all data that goes into the side navbar
  const [entryStore, setEntryStore] = useState(null);

  const getSideNav = async () => {
    await publicRequest
      .get("/sidenav")
      .then((res) => {
        // console.log(res.data);
        setEntryStore(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSideNav();
  }, []);

  const value = {
    subContainer,
    setSubContainer,
    subContainerEntries,
    setSubContainerEntries,
    subTitle,
    setSubTitle,
    entryStore,
    setEntryStore,
  };

  return (
    <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>
  );
}

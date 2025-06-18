import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import "./bottomsheet.css";
import "../../css/category.css";
import { InstantSearch } from "react-instantsearch-dom";

import searchClient from "../../algolia";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 350px;
  background-color: #f8f9f9;
  transition: transform 0.3s ease-out;
  transform: translateY(100%);
  z-index: 10;
  border-radius: 30px 30px 0 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Label = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
`;

const SearchFilterMobile = ({
  open,
  setOpen,
  list,
  setRefinementItems,
  filteredArray,
  setFilteredArray,
}) => {
  // const searchClient = algoliasearch(
  //   // "HUC1VFAK3J",
  //   // "2a03019f80f0f0ea7897642472133c4d",
  //   "H5KHBLWCMG",
  //   "4f1ef47163226164f0772135ff704f68"
  // );

  const handleClick = (event) => {
    event.preventDefault();
  };

  const handleCheckboxClick = async (item, index) => {
    let newData = [];

    setRefinementItems((prevData) => {
      newData = [...prevData];
      newData[index].isRefined = !newData[index].isRefined;
      return newData;
    });

    if (filteredArray.includes(item.value[0])) {
      setFilteredArray(filteredArray.filter((name) => name !== item.value[0]));
    } else {
      setFilteredArray([...filteredArray, item.value[0]]);
    }
  };

  const CustomRefinementList = ({ items }) => (
    <ul>
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <li style={{ listStyle: "none", color: "#00688b" }} key={item.label}>
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={() => handleCheckboxClick(item, index)}
            />{" "}
            {item.label} ({item.count})
          </li>
        ))}
    </ul>
  );

  return (
    list && (
      <Container
        className={`sheet ${open ? "open" : ""}`}
        onClick={(e) => handleClick(e)}
      >
        <Wrapper>
          <Header>
            <Label>Filter</Label>
            <CloseIcon onClick={() => setOpen(false)} />
          </Header>
          <InstantSearch searchClient={searchClient} indexName="products">
            <div className="refinement-mobile">
              <CustomRefinementList
                items={list}
                setRefinementItems={setRefinementItems}
                filteredArray={filteredArray}
                setFilteredArray={setFilteredArray}
              />
            </div>
          </InstantSearch>
        </Wrapper>
      </Container>
    )
  );
};

export default SearchFilterMobile;

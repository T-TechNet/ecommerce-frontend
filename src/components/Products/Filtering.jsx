import React, { useState } from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: context-menu;

  @media only screen and (max-width: 769px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 16px;
  gap: 8px;

  background: #ffffff;
  /* Neutral/N40 */

  border: 1px solid #dee3e5;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;
const Label = styled.p`
  padding: 0 5px;
  font-weight: 700;
  font-size: 16px;
  color: #002734;

  @media only screen and (max-width: 759px) {
    display: none;
  }
`;
const Value = styled.div`
  color: #667d85;
`;
const ArrowDiv = styled.div`
  //  ADJUSTING ARROW POSTION
  margin-top: ${(props) => (props.className ? "-1px" : "0px")};
  margin-bottom: ${(props) => (props.className ? "0px" : "-1px")};
  transform: ${(props) =>
    props.className ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 280ms linear;
`;
const OptionContainer = styled.div`
  width: 230px;
  position: absolute;
  top: 50px;
  left: 0;

  background: #ffffff;
  border: 1px solid #dee3e5;
  box-shadow: 0px 3px 9px 1px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 8px 8px;
  z-index: 2;

  /* padding: 10px; */
  display: flex;
  flex-direction: column;

  transition: all 0.3s ease;
`;

const Option = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  padding: 15px;

  &:hover {
    background: #e6f0f3;
    border: 1px solid #00688b;
  }
`;

const Filtering = () => {
  const [openSort, setOpenSort] = useState(false);
  const [value, setValue] = useState();

  const selectSort = (sorter, sortVal) => {
    setValue(sorter);

    setOpenSort(false);
  };
  return (
    <Container>
      <Wrapper onClick={() => setOpenSort(!openSort)}>
        <Label>Filter By :</Label>
        <Value>{value ? value : "All Stars"}</Value>
        <ArrowDiv className={openSort}>
          <ArrowDropDownIcon />
        </ArrowDiv>
      </Wrapper>
      {openSort && (
        <OptionContainer>
          <Option onClick={() => selectSort(" All Stars")}>All Stars</Option>
          <Option onClick={() => selectSort(" 5 Stars Only")}>
            5 Stars Only
          </Option>
          <Option onClick={() => selectSort("  4 Stars Only")}>
            4 Stars Only
          </Option>
          <Option onClick={() => selectSort("  3 Stars Only")}>
            3 Stars Only
          </Option>
          <Option onClick={() => selectSort("  2 Stars Only")}>
            2 Stars Only
          </Option>
          <Option onClick={() => selectSort("  1 Star Only")}>
            1 Star Only
          </Option>
        </OptionContainer>
      )}
    </Container>
  );
};

export default Filtering;

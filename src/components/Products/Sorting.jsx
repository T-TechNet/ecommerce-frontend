import React, { useState } from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: context-menu;

  @media only screen and (max-width: 759px) {
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

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: #000000;
  padding: 15px;
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

const Sorting = () => {
  const [openSort, setOpenSort] = useState(false);
  const [value, setValue] = useState();

  const selectSort = (sorter, sortVal) => {
    setValue(sorter);
    
    setOpenSort(false);
  };
  return (
    <Container>
      <Wrapper onClick={() => setOpenSort(!openSort)}>
        <Label>Sort By :</Label>
        <Value>{value ? value : "Most Relevant"}</Value>
        <ArrowDiv className={openSort}>
          <ArrowDropDownIcon />
        </ArrowDiv>
      </Wrapper>
      {openSort && (
        <OptionContainer>
          <Title>Sort By</Title>
          <Option onClick={() => selectSort("Date: New to Old", )}>
          Most Relevant
          </Option>
          <Option onClick={() => selectSort("Date: Old to New", )}>
       Most Helpful
          </Option>
          <Option onClick={() => selectSort("Price: High to Low", )}>
           New to Old
          </Option>
          <Option onClick={() => selectSort("Price: Low to High", )}>
           Old to New
          </Option>
        </OptionContainer>
      )}
    </Container>
  );
};

export default Sorting;

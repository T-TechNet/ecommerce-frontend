import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 20px;
`;

const Wrapper = styled.div`
  height: 220px;
`;

const InputContainer = styled.div`
  position: relative;
`;
const Label = styled.div``;

const Input = styled.input`
  width: 95%;
  margin: 10px 0 15px 0;
  padding: 8px 16px;
  background: #ffffff;
  border: 1px solid #b0bcc0;
  border-radius: 4px;

  font-size: 17px;

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 480px) {
    width: 92%;
  }
`;

const Span = styled.span`
  position: absolute;
  top: 41px;
  right: 5px;
  color: #577079;
  border-left: 1px solid #b0bcc0;
  padding-left: 8px;
`;

const Footer = styled.div`
  width: 100%;
  padding: 20px 0px;
  border-top: 1px solid #dee3e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ClearButton = styled.input`
  width: 75px;
  border: 1px solid #b0bcc0;
  border-radius: 4px;
  padding: 8px 16px;

  font-weight: 700;
  font-size: 14px;

  color: ${(props) => (props.className === "active" ? "#00688B" : "#b0bcc0")};
`;
const ViewButton = styled.input`
  width: 30px;
  padding: 9px 16px;
  background: ${(props) =>
    props.className === "active" ? "#00688B" : "#b0bcc0"};
  border: none;
  border-radius: 4px;

  font-weight: 700;
  font-size: 14px;
  line-height: 120%;
  color: #ffffff;
`;

const PriceFilterMobile = ({
  setOpen,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  filteredBrands,
  setFilteredBrands,
}) => {
  let property;

  const [tempMinPrice, setTempMinPrice] = useState(); // for temporarily storing values when user types
  const [tempMaxPrice, setTempMaxPrice] = useState();

  if (filteredBrands.length === 0) {
    property = false;
  } else {
    property = true;
  }

  const handleChange = (e, type) => {
    let value = e.target.value;

    if (value.length <= 7) {
      if (type === "min") {
        setTempMinPrice(value);
      } else {
        setTempMaxPrice(value);
      }
    }
  };

  const viewResult = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setOpen(false);
  };

  const clearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setFilteredBrands([]);
  };

  return (
    <Container>
      <Wrapper>
        <InputContainer>
          <Label>Min Price</Label>
          <Input
            type="number"
            placeholder="0"
            value={tempMinPrice}
            onChange={(e) => handleChange(e, "min")}
            maxLength={7}
          />
          <Span>Ks.</Span>
        </InputContainer>
        <InputContainer>
          <Label>Max Price</Label>
          <Input
            type="number"
            placeholder="0"
            value={tempMaxPrice}
            onChange={(e) => handleChange(e, "max")}
            maxLength={7}
          />
          <Span>Ks.</Span>
        </InputContainer>
      </Wrapper>
      <Footer>
        <ClearButton
          className={tempMinPrice || tempMaxPrice || property ? "active" : ""}
          disabled={!tempMinPrice && !tempMaxPrice}
          value="Clear Filter"
          onClick={clearFilter}
        />

        <ViewButton
          className={tempMinPrice || tempMaxPrice || property ? "active" : ""}
          disabled={!tempMinPrice && !tempMaxPrice}
          value="View"
          onClick={viewResult}
        />
      </Footer>
    </Container>
  );
};

export default PriceFilterMobile;

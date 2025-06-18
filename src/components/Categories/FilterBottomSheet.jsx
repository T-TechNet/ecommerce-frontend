import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import "./bottomsheet.css";
import PriceFilterMobile from "./PriceFilterMobile";
import BrandFilterMobile from "./BrandFilterMobile";

const Container = styled.div`
  position: fixed;
  overflow: hidden;
  bottom: 0;
  left: 0;
  right: 0;
  height: 415px;
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

const FilterButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 20px 20px 20px;
`;

const Button = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 4px 16px 4px 8px;
  gap: 8px;
  background: ${(props) => (props.className ? "#00688b" : "#E6F0F3")};
  border-radius: 8px;
  color: ${(props) => (props.className ? "#fff" : "#000")};
`;

const Span = styled.span`
  color: ${(props) => props.className && "#fff"};
`;

const Tag = styled.div`
  display: ${(props) => (props.className === "show" ? "block" : "none")};
  position: absolute;
  top: -12px;
  right: -10px;
  padding: 3px 8px;
  background: #d52b2b;
  border: 2px solid #ffffff;
  border-radius: 50%;
  color: #ffffff;

  font-weight: 700;
  font-size: 13px;
`;

const ShowContent = styled.div`
  height: 300px;
`;

const FilterBottomSheet = ({
  category,
  type,
  open,
  setOpen,
  brandRefinementItems,
  typeRefinementItems,
  filteredBrands,
  setFilteredBrands,
  filteredTypes,
  setFilteredTypes,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  const [openPrice, setOpenPrice] = useState(true);
  const [openBrand, setOpenBrand] = useState(false);
  const [openType, setOpenType] = useState(false);

  const handleFilter = (type) => {
    if (type === "price") {
      setOpenPrice(true);
      setOpenBrand(false);
      setOpenType(false);
    } else if (type === "brand") {
      setOpenPrice(false);
      setOpenBrand(true);
      setOpenType(false);
    } else if (type === "type") {
      setOpenPrice(false);
      setOpenBrand(false);
      setOpenType(true);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      className={`bottomSheet ${open ? "open" : ""}`}
      onClick={(e) => handleClick(e)}
    >
      <Wrapper>
        <Header>
          <Label>Filter</Label>
          <CloseIcon onClick={() => setOpen(false)} />
        </Header>
        <FilterButtons>
          {/* Price filter */}
          <Button className={openPrice} onClick={() => handleFilter("price")}>
            <AttachMoneyIcon />
            <Span className={openPrice}>Price</Span>
            <Tag className={minPrice && maxPrice && "show"}>1</Tag>
          </Button>
          {/* Brand filter */}
          <Button className={openBrand} onClick={() => handleFilter("brand")}>
            <BrandingWatermarkOutlinedIcon />
            <Span className={openBrand}>Brand</Span>
            <Tag className={filteredBrands?.length > 0 && "show"}>
              {filteredBrands.length}
            </Tag>
          </Button>
          {/* Type filter - show according to category */}
          {category === "power solution" ||
          category === "gadget" ||
          category === "coupon" ? (
            <Button className={openType} onClick={() => handleFilter("type")}>
              <CategoryOutlinedIcon />
              <Span className={openType}>Type</Span>
              <Tag className={filteredTypes?.length > 0 && "show"}>
                {filteredTypes.length}
              </Tag>
            </Button>
          ) : (
            <></>
          )}
        </FilterButtons>
        <ShowContent>
          {openPrice ? (
            <PriceFilterMobile
              setOpen={setOpen}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              filteredBrands={filteredBrands}
              setFilteredBrands={setFilteredBrands}
            />
          ) : openBrand || openType ? (
            <BrandFilterMobile
              setOpen={setOpen}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              category={category}
              type={type}
              brandRefinementItems={brandRefinementItems}
              typeRefinementItems={typeRefinementItems}
              filteredBrands={filteredBrands}
              setFilteredBrands={setFilteredBrands}
              filteredTypes={filteredTypes}
              setFilteredTypes={setFilteredTypes}
              openBrand={openBrand}
              openType={openType}
            />
          ) : (
            <></>
          )}
        </ShowContent>
      </Wrapper>
    </Container>
  );
};

export default FilterBottomSheet;

import React from "react";
import { useState, useRef, useEffect } from "react";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { DeleteOutlined } from "@mui/icons-material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styled, { keyframes } from "styled-components";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Fbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 759px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 1160px;
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #fff;
  border: 1px solid #dee3e5;
  box-sizing: border-box;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  @media only screen and (max-width: 1203px) {
    width: 100%;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const PBTNContainer = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  background-color: ${(props) =>
    props.className === true ? "#00688B" : "#ffffff"};
  border-radius: 8px;
  border: none;
  outline: none;
  height: 38px;

  @media screen and (max-width: 1203px) {
    left: 2%;
  }
`;

const MoneyIcon = styled(AttachMoneyIcon)({
  color: "#577079",
  position: "absolute",
  paddingLeft: "4px",
});

const Price = styled.h5`
  font-style: normal;
  display: flex;
  font-weight: 400;
  font-size: 16px;
  padding-left: 30%;
  background-color: transparent;
  transition: 0.5s;
`;

/////////////////////////  Dropdown css area   ////////////////////////

const PDropdownfilter = styled.div`
  position: absolute;
  top: 50px;
  box-shadow: 0px 3px 9px 1px rgba(0, 0, 0, 0.25);
  width: 390px;
  height: 220px;
  padding-left: 1em;
  display: flex;
  background-color: #fff;
  border-radius: 0px 0px 8px 8px;
  z-index: 2;
`;

/// This is Dropdown_Header /////

const PDropdownHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 0 1px;
`;

const Title = styled.h5`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #000000;
`;

const ClearPriceButton = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  color: #d52b2b;
  background-color: #fff;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

/// This is Price input header ///

const PriceHeader = styled.div`
  display: flex;
  align-items: center;
`;

/// This is price input ///

const PriceInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const PriceInputform = styled.input`
  box-sizing: border-box;
  position: absolute;
  background: transparent;
  color: #00688b;
  border: 1px solid #b0bcc0;
  border-radius: 4px;
  width: 170px;
  height: 34px;
  padding-left: 10px;
  font-weight: 400;
  font-size: 16px;
  overflow: hidden;
  z-index: 0; /* to Ensure the input is positioned below the label */
  appearance: none; /* Hide the default arrow button */
  -webkit-appearance: none; /* Hide the default arrow button in WebKit browsers */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none; /* Hide the inner and outer spin buttons in WebKit browsers */
    margin: 0;
  }
  &:focus {
    outline: none;
    box-shadow: grey;
  }

  &::placeholder {
    color: grey; /* Change the color of the placeholder text to grey */
    opacity: 1; /* Ensure the placeholder text is fully visible */
  }
`;
const MinPriceHeader = styled.span`
  position: relative;
  margin-left: 1px;
  margin-top: 25px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  display: flex;
`;

const MaxPriceHeader = styled.span`
  position: absolute;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  color: #000000;
  margin-left: 200px;
  margin-top: 25px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const KSLabel = styled.span`
  position: absolute;
  margin-left: 130px;
  background-color: white;
  color: #555;
  font-size: 14px;
  color: #00688b;
  z-index: 1;
  width: 39px;
  margin-top: 1px;
  height: 25px;
  pointer-events: none;
`;

const FilterButton = styled.div`
  display: flex;
  position: relative;
`;

const Container = styled.button`
  display: flex;
  align-items: center;
  width: 120px;
  /* position: absolute;
  left: 17%;
  top: 11px; */
  padding: 0 5px;
  cursor: pointer;
  transition: 0.5s;
  background-color: ${(props) =>
    props.className === true ? "#00688B" : "#ffffff"};
  border-radius: 8px;
  border: none;
  outline: none;
  height: 38px;
  transition: all 0.5s ease;
  @media screen and (max-width: 1203px) {
    left: 20%;
  }
`;

const BrandIcon = styled(BrandingWatermarkOutlinedIcon)({
  color: "#577079",
  position: "absolute",
  paddingLeft: "3px",
});

const TypeIcon = styled(CategoryOutlinedIcon)({
  color: "#577079",
  position: "absolute",
  paddingLeft: "3px",
});

const Brand = styled.h5`
  position: relative;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  background-color: transparent;
  padding-left: 35%;
  transition: all 0.5s;
  color: ${(props) => (props.className === true ? "#ffffff" : "#00688B")};
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-180deg);
  }
`;

const rotateBackAnimation = keyframes`
  from {
    transform: rotate(-180deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const Arrow = styled(ArrowDropDownIcon)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  &.rotate {
    animation: ${rotateAnimation} 0.3s linear forwards;
  }
  &.rotate-back {
    animation: ${rotateBackAnimation} 0.3s linear backwards;
  }
`;

const Dropdownfilter = styled.div`
  background-color: #fff;
  position: absolute;
  top: 50px;
  box-shadow: 0px 3px 9px 1px rgba(0, 0, 0, 0.25);
  padding-left: 0.8em;
  width: 390px;
  max-width: 390px;
  border-radius: 0px 0px 8px 8px;
  z-index: 3;
`;

const DropdownHead = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownHeadertxt = styled.h5`
  position: absolute;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #000000;
  margin-left: 10px;
`;

const ClearAllFilter = styled(DeleteOutlined)`
  display: flex;
  align-items: center;
  margin-left: 290px;
  border: none;
  padding-top: 20px;
  padding-bottom: 20px;
  color: red;
`;

const Clearall = styled.h5`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: red;
  cursor: pointer;
`;

const ChipsContainer = styled.div`
  height: fit-content;
  max-height: 210px;
  overflow-y: scroll;
`;

const ApplyAndCancelContainer = styled.div`
  display: flex;
  align-items: absolute;
  margin-left: 20px;
  padding-top: 20px;
  margin-left: 175px;
  border-radius: 4px;
  gap: 15px;
  padding-bottom: 20px;
`;

const Apply = styled.button`
  color: #ffffff;
  background-color: #00688b;
  transition: 0.5s;
  :hover {
    background-color: #ffffff;
    color: #00688b;
  }
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #00688b;
  width: 90px;
`;

const Cancel = styled.button`
  background-color: #ffffff;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: #00688b;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #00688b;
  width: 90px;
`;

const ClearAllContainer = styled.button`
  width: 130px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: ${(props) => (props.className === "active" ? "pointer" : "")};
  background-color: white;
  color: ${(props) =>
    props.className === "active" ? "#cc0000" : "rgba(176, 188, 192, 1)"};
  border: none;
  outline: none;
`;

const ClearAllText = styled.p`
  /* color: red; */
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  text-align: justify;
`;

export default function Filterbar({
  category,
  type,
  brandRefinementItems,
  typeRefinementItems,
  filteredBrands,
  setFilteredBrands,
  filteredTypes,
  setFilteredTypes,
  filters,
  setFilters,
  setMinPrice,
  setMaxPrice,
  minPrice,
  maxPrice,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [minnumber, setMinnumber] = useState("");
  const [maxnumber, setMaxnumber] = useState("");
  const [hasValue, setHasValue] = useState(false);
  const [hasBrand, setHasBrand] = useState(false);
  const [priceButtonWidth, setPriceButtonWidth] = useState("117px"); // to set default width for the price button
  const [clickedButtons, setClickedButtons] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showBrandFilters, setShowBrandFilters] = useState(false);

  const [activeBrandCount, setActiveBrandCount] = useState(0);
  const [rotate, setRotate] = useState(false);
  const [brandButtonWidth, setBrandButtonWidth] = useState(null);
  const [shouldReturnToNormal, setShouldReturnToNormal] = useState(false);
  const [originalBrandButtonWidth, setOriginalBrandButtonWidth] =
    useState(null);

  const priceButtonRef = useRef(null);

  const [hasType, setHasType] = useState(false);
  const [activeTypeCount, setActiveTypeCount] = useState(0);
  const [showTypeFilters, setShowTypeFilters] = useState(false);
  const [clickedTypes, setClickedTypes] = useState([]);

  // Function to toggle the dropdown
  const toggling = () => setIsOpen(!isOpen);

  // Event handler for changing the min and max values
  const handleChange = (event, type) => {
    let value = event.target.value;
    // Remove non-numeric characters using regular expression
    value = value.replace(/[^0-9]/g, "");

    if (type === "min") {
      setMinnumber(value);
      let newValue = event.target.value;
      if (newValue.length <= 7) {
        setMinnumber(newValue);
      }
    } else {
      setMaxnumber(value);
      let newValue = event.target.value;
      if (newValue.length <= 7) {
        setMaxnumber(newValue);
      }
    }
  };

  // Apply the price filter
  const handlePFApply = () => {
    if (minnumber !== 0 && maxnumber !== 0) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
    setIsOpen(false);
    setMinPrice(minnumber);
    setMaxPrice(maxnumber);
  };

  // Cancel the price filter
  const handlePFCancel = () => {
    setIsOpen(false);
  };

  // Clear the price filter
  const handlePClear = () => {
    setMaxnumber(0);
    setMinnumber(0);
    setHasValue(false);
    setMinPrice();
    setMaxPrice();
  };

  const brandButtonRef = useRef();

  // Toggle the clicked state of a button
  const toggleButton = (button) => {
    if (clickedButtons.includes(button)) {
      setClickedButtons(
        clickedButtons.filter((clickedButton) => clickedButton !== button)
      );
    } else {
      setClickedButtons([...clickedButtons, button]);
    }
  };

  // Toggle the clicked state of a gadget button
  const toggleGadgetButton = (button) => {
    if (clickedTypes.includes(button)) {
      setClickedTypes(clickedTypes.filter((clicked) => clicked !== button));
    } else {
      setClickedTypes([...clickedTypes, button]);
    }
  };

  // Set the hovered button
  const handleHover = (button) => {
    setHoveredButton(button);
  };

  // Reset the hovered button
  const handleLeave = () => {
    setHoveredButton(null);
  };

  // Clear all selected buttons and reset related state variables
  const handleClearInDropdown = (val) => {
    if (val === "brand") {
      setClickedButtons([]);
      setActiveBrandCount(0);
      setHasBrand(false);
      setFilteredBrands([]);
      setShowBrandFilters(false);
    } else if (val === "type") {
      setClickedTypes([]);
      setActiveTypeCount(0);
      setHasType(false);
      setFilteredTypes([]);
      setShowTypeFilters(false);
    }
  };

  // Apply the brand filter
  const handleBrandApply = () => {
    setActiveBrandCount(clickedButtons.length);
    setShowBrandFilters(false);
    // setShouldReturnToNormal(true);
    setFilteredBrands(clickedButtons);
    setHasBrand(clickedButtons.length > 0 ? true : false);
  };

  // Apply the gadget filter
  const handleTypeApply = () => {
    setActiveTypeCount(clickedTypes.length);
    setShowTypeFilters(false);
    // setShouldReturnToNormal(true);
    setFilteredTypes(clickedTypes);
    setHasType(clickedTypes.length > 0 ? true : false);
  };

  // Cancel the brand filter
  const handleCancel = (val) => {
    if (val === "brand") {
      setShowBrandFilters(false);
    } else if (val === "type") {
      setShowTypeFilters(false);
    } else {
    }
  };

  // Handle brand button click
  const handleBrandClick = () => {
    setShowBrandFilters(!showBrandFilters);
    setRotate(!rotate);
  };

  // Handle type button click
  const handleTypeClick = () => {
    setShowTypeFilters(!showTypeFilters);
    setRotate(!rotate);
  };

  let brandButtons = [];
  let typeButtons = [];

  if (brandRefinementItems.length > 0) {
    brandButtons = brandRefinementItems.map((item, i) => ({
      label: item.label,
      color: "white",
    }));
  }

  if (typeRefinementItems.length > 0) {
    typeButtons = typeRefinementItems.map((item, i) => ({
      label: item.label,
      color: "white",
    }));
  }

  useEffect(() => {
    if (activeBrandCount === 0) {
      // If no buttons are active, return brand button width to original size
      setBrandButtonWidth(originalBrandButtonWidth);
      setShouldReturnToNormal(false);
    } else if (shouldReturnToNormal) {
      // If there was a request to return to normal size, return brand button width to original size
      setBrandButtonWidth(originalBrandButtonWidth);
      setShouldReturnToNormal(false);
    } else {
      // Calculate the new width of the brand button based on the number of active buttons
      const newWidth =
        originalBrandButtonWidth +
        (activeBrandCount > 0 ? `${activeBrandCount}`.length * 10 + 20 : 0);
      setBrandButtonWidth(newWidth);
    }
  }, [activeBrandCount, originalBrandButtonWidth, shouldReturnToNormal]);

  // Update the price button counter width based on the input values
  useEffect(() => {
    if (priceButtonRef.current) {
      setPriceButtonWidth(hasValue ? "140px" : "117px"); // changes the length of price button
    }
  }, [hasValue]);

  // Get the original width of the brand button and set it as the original brand button width
  useEffect(() => {
    const originalWidth = brandButtonRef.current.offsetWidth;
    setOriginalBrandButtonWidth(originalWidth);
    setBrandButtonWidth(originalWidth);
  }, []);

  const handleClearAll = () => {
    setClickedButtons([]);
    setActiveBrandCount(0);
    setMaxnumber(0);
    setMinnumber(0);
    setHasValue(false);
    setHasBrand(false);
    setFilteredBrands([]);
    setFilteredTypes([]);
    setMinPrice();
    setMaxPrice();
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    event.target.value = inputValue;
  };

  const handleInputFocus = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "0") {
      event.target.value = "";
    }
  };

  const handleInputBlur = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      event.target.value = "0";
    }
  };

  return (
    <Fbar>
      <Wrapper>
        <FilterContainer>
          {/* Price Filter */}
          <FilterButton>
            <PBTNContainer
              className={isOpen}
              onClick={toggling}
              style={{ width: priceButtonWidth }}
              ref={priceButtonRef}
            >
              <MoneyIcon
                style={{
                  color: isOpen ? "#ffffff" : hasValue ? "#03A89E" : "#577079",
                }}
              >
                <AttachMoneyIcon className={isOpen} />
              </MoneyIcon>
              <Price
                style={{
                  color: isOpen ? "#ffffff" : hasValue ? "#03A89E" : "#000000",
                }}
              >
                Price{hasValue && "(1)"}
              </Price>
              <Arrow
                className={isOpen ? "rotate" : "rotate-back"}
                style={{
                  color: isOpen ? "#ffffff" : hasValue ? "#03A89E" : "#000000",
                }}
              >
                <ArrowDropDownIcon />
              </Arrow>
            </PBTNContainer>

            {isOpen && (
              <PDropdownfilter>
                <div>
                  <PDropdownHead>
                    <Title>Price Range</Title>

                    <ClearPriceButton onClick={handlePClear}>
                      <DeleteOutlinedIcon style={{ color: "#D52B2B" }} />
                      Clear filter
                    </ClearPriceButton>
                  </PDropdownHead>

                  {/* Price input fields */}
                  <div>
                    <PriceHeader>
                      <MinPriceHeader> Min Price </MinPriceHeader>
                      <MaxPriceHeader> Max Price </MaxPriceHeader>
                    </PriceHeader>

                    <PriceInput>
                      <PriceHeader>
                        <MinPriceHeader>
                          <InputWrapper>
                            <KSLabel>| Ks.</KSLabel>
                            <PriceInputform
                              type="number"
                              onChange={(event) => handleChange(event, "min")}
                              onInput={handleInputChange}
                              onFocus={handleInputFocus}
                              onBlur={handleInputBlur}
                              value={minnumber}
                              placeholder={minnumber !== "" ? "" : "0"}
                              id="minnumber"
                              name="number"
                              maxLength={7}
                            />
                          </InputWrapper>
                        </MinPriceHeader>

                        <MaxPriceHeader>
                          <InputWrapper>
                            <KSLabel>| Ks.</KSLabel>
                            <PriceInputform
                              type="number"
                              onChange={(event) => handleChange(event, "max")}
                              onInput={handleInputChange}
                              onFocus={handleInputFocus}
                              onBlur={handleInputBlur}
                              value={maxnumber}
                              placeholder={minnumber !== "" ? "" : "0"}
                              name="number"
                              maxLength={7}
                              id="maxnumber"
                              controls={false}
                            />
                          </InputWrapper>
                        </MaxPriceHeader>
                      </PriceHeader>
                    </PriceInput>
                  </div>

                  <ApplyAndCancelContainer>
                    <Cancel onClick={handlePFCancel}>Cancel</Cancel>
                    <Apply onClick={handlePFApply}>Apply</Apply>
                  </ApplyAndCancelContainer>
                </div>
              </PDropdownfilter>
            )}
          </FilterButton>

          {/* Brand Filter */}
          <FilterButton>
            <Container
              className={showBrandFilters}
              onClick={handleBrandClick}
              style={{ width: brandButtonWidth }}
              ref={brandButtonRef}
            >
              <BrandIcon
                style={{
                  color: showBrandFilters
                    ? "#ffffff"
                    : hasBrand
                    ? "#03A89E"
                    : "#577079",
                }}
              >
                <BrandingWatermarkOutlinedIcon />
              </BrandIcon>
              <Brand
                style={{
                  color: showBrandFilters
                    ? "#ffffff"
                    : hasBrand
                    ? "#03A89E"
                    : "#000000",
                }}
                className={showBrandFilters}
              >
                Brand{activeBrandCount > 0 ? `(${activeBrandCount})` : ""}
              </Brand>

              <Arrow
                style={{
                  color: showBrandFilters
                    ? "#ffffff"
                    : hasBrand
                    ? "#03A89E"
                    : "#000000",
                }}
                className={showBrandFilters ? "rotate" : "rotate-back"}
              >
                <ArrowDropDownIcon />
              </Arrow>
            </Container>

            {showBrandFilters && (
              <Dropdownfilter>
                <DropdownHead>
                  <DropdownHeadertxt className="Brand">Brand</DropdownHeadertxt>

                  <ClearAllFilter>
                    <DeleteOutlined />
                  </ClearAllFilter>
                  <Clearall onClick={() => handleClearInDropdown("brand")}>
                    Clear All
                  </Clearall>
                </DropdownHead>

                <ChipsContainer>
                  {brandButtons.map((button) => (
                    <button
                      key={button.label}
                      style={{
                        background: clickedButtons.includes(button.label)
                          ? "#98DBD7"
                          : hoveredButton === button.label
                          ? "#add8e6"
                          : "white",
                        color: "#00688b",
                        fontWeight: 800,
                        fontStyle: "normal",
                        border: "1px solid #98DBD7",
                        borderRadius: "30px",
                        width: "auto",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        height: "35px",
                        marginLeft: "10px",
                        marginRight: "8px",
                        marginTop: "10px",
                        transition: ".2s",
                        fontSize: "15px",
                      }}
                      onClick={() => toggleButton(button.label)}
                      onMouseEnter={() => handleHover(button.label)}
                      onMouseLeave={handleLeave}
                    >
                      {button.label}
                    </button>
                  ))}
                </ChipsContainer>

                <ApplyAndCancelContainer>
                  <Cancel onClick={() => handleCancel("brand")}>Cancel</Cancel>
                  <Apply onClick={handleBrandApply}>Apply</Apply>
                </ApplyAndCancelContainer>
              </Dropdownfilter>
            )}
          </FilterButton>

          {/* Type Filter */}
          {category === "gadget" ||
          category === "power solution" ||
          category === "coupon" ? (
            <FilterButton>
              <Container className={showTypeFilters} onClick={handleTypeClick}>
                <TypeIcon
                  style={{
                    color: showTypeFilters
                      ? "#ffffff"
                      : hasType
                      ? "#03A89E"
                      : "#577079",
                  }}
                >
                  <CategoryOutlinedIcon />
                </TypeIcon>
                <Brand
                  style={{
                    color: showTypeFilters
                      ? "#ffffff"
                      : hasType
                      ? "#03A89E"
                      : "#000000",
                  }}
                  className={showTypeFilters}
                >
                  Type{activeTypeCount > 0 ? `(${activeTypeCount})` : ""}
                </Brand>

                <Arrow
                  style={{
                    color: showTypeFilters
                      ? "#ffffff"
                      : hasType
                      ? "#03A89E"
                      : "#000000",
                  }}
                  className={showTypeFilters ? "rotate" : "rotate-back"}
                >
                  <ArrowDropDownIcon />
                </Arrow>
              </Container>

              {showTypeFilters && (
                <Dropdownfilter>
                  <DropdownHead>
                    <DropdownHeadertxt className="Brand">
                      Type
                    </DropdownHeadertxt>

                    <ClearAllFilter>
                      <DeleteOutlined />
                    </ClearAllFilter>
                    <Clearall onClick={() => handleClearInDropdown("type")}>
                      Clear All
                    </Clearall>
                  </DropdownHead>

                  <ChipsContainer>
                    {typeButtons.map((button) => (
                      <button
                        key={button.label}
                        style={{
                          background: clickedTypes.includes(button.label)
                            ? "#98DBD7"
                            : hoveredButton === button.label
                            ? "#add8e6"
                            : "white",
                          color: "#00688b",
                          fontWeight: 800,
                          fontStyle: "normal",
                          border: "1px solid #98DBD7",
                          borderRadius: "30px",
                          width: "auto",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          height: "35px",
                          marginLeft: "10px",
                          marginRight: "8px",
                          marginTop: "10px",
                          transition: ".2s",
                          fontSize: "15px",
                        }}
                        onClick={() => toggleGadgetButton(button.label)}
                        onMouseEnter={() => handleHover(button.label)}
                        onMouseLeave={handleLeave}
                      >
                        {button.label}
                      </button>
                    ))}
                  </ChipsContainer>

                  <ApplyAndCancelContainer>
                    <Cancel onClick={() => handleCancel("type")}>Cancel</Cancel>
                    <Apply onClick={handleTypeApply}>Apply</Apply>
                  </ApplyAndCancelContainer>
                </Dropdownfilter>
              )}
            </FilterButton>
          ) : (
            <></>
          )}
        </FilterContainer>

        <ClearAllContainer
          onClick={handleClearAll}
          className={
            minPrice && maxPrice && filteredBrands.length > 0 ? "active" : ""
          }
          disabled={
            minPrice && maxPrice && filteredBrands.length > 0 ? false : true
          }
        >
          <div>
            <DeleteOutlinedIcon />
          </div>
          <ClearAllText>Clear all filter</ClearAllText>
        </ClearAllContainer>
      </Wrapper>
    </Fbar>
  );
}

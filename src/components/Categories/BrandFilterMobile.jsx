import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 20px;
`;

const Wrapper = styled.div`
  height: 220px;
`;

const Buttons = styled.div`
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px 15px;
  max-height: 200px;
  overflow-y: scroll;
`;

const BrandButton = styled.div`
  width: fit-content;
  padding: 5px 16px;
  gap: 10px;
  border: 1px solid #6ba7bc;
  border-radius: 13px;

  font-weight: 700;
  font-size: 14px;
  color: #00688b;

  background-color: ${(props) =>
    props.className === "active" ? "#98dbd7" : "#fff"};
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

const BrandFilterMobile = ({
  setOpen,
  setMinPrice,
  setMaxPrice,
  category,
  type,
  brandRefinementItems,
  typeRefinementItems,
  filteredBrands,
  setFilteredBrands,
  filteredTypes,
  setFilteredTypes,
  openBrand,
  openType,
}) => {
  let brandButtons = [];
  let typeButtons = [];
  const [activeBrands, setActiveBrands] = useState(filteredBrands);
  const [activeTypes, setActiveTypes] = useState(filteredTypes);

  let property;

  if (activeBrands.length !== 0 || activeTypes.length !== 0) {
    property = true;
  } else {
    property = false;
  }

  if (brandRefinementItems.length > 0) {
    brandButtons = brandRefinementItems.map((item, i) => ({
      label: item.label,
      id: i + 1,
    }));
  }

  if (typeRefinementItems.length > 0) {
    typeButtons = typeRefinementItems.map((item, i) => ({
      label: item.label,
      color: "white",
    }));
  }

  // if (category === "laptop") {
  //   if (type === "all") {
  //     brandButtons = [
  //       { label: "Dell", id: 1 },
  //       { label: "Lenovo", id: 2 },
  //       { label: "ASUS", id: 3 },
  //       { label: "TOSHIBA", id: 4 },
  //       { label: "MSI", id: 5 },
  //     ];
  //   } else if (type === "aio-desktop") {
  //     brandButtons = [
  //       { label: "Dell", id: 1 },
  //       { label: "Lenovo", id: 2 },
  //     ];
  //   } else if (type === "accessory") {
  //     brandButtons = [
  //       { label: "Dell", id: 1 },
  //       { label: "Lenovo", id: 2 },
  //       { label: "Fujifilm", id: 3 },
  //       { label: "Redmi", id: 4 },
  //       { label: "LVEIO", id: 5 },
  //       { label: "JUYUPU", id: 6 },
  //       { label: "Power Tree", id: 7 },
  //       { label: "BenQ", id: 8 },
  //       { label: "LG", id: 9 },
  //       { label: "Manhattan", id: 10 },
  //       { label: "PATRIOT", id: 11 },
  //       { label: "Zebra", id: 12 },
  //       { label: "TEAMGROUP", id: 13 },
  //       { label: "Targus", id: 14 },
  //     ];
  //   } else if (type === "gadget") {
  //     brandButtons = [{ label: "REMAX", id: 1 }];
  //   } else {
  //   }
  // } else if (category === "network") {
  //   if (type === "router") {
  //     brandButtons = [
  //       { label: "BDCom", id: 1 },
  //       { label: "LINKSYS", id: 2 },
  //       { label: "Mikrotik", id: 3 },
  //       { label: "Ruijie/Reyee", id: 4 },
  //       { label: "UBIQUITI", id: 5 },
  //     ];
  //   } else if (type === "switch") {
  //     brandButtons = [
  //       { label: "BDCom", id: 1 },
  //       { label: "DIGITUS", id: 2 },
  //       { label: "EdgeCore", id: 3 },
  //       { label: "LINKSYS", id: 4 },
  //       { label: "Level One", id: 5 },
  //       { label: "Mikrotik", id: 6 },
  //       { label: "Ruijie/Reyee", id: 7 },
  //       { label: "UBIQUITI", id: 8 },
  //     ];
  //   } else if (type === "wifi") {
  //     brandButtons = [
  //       { label: "BDCom", id: 1 },
  //       { label: "EdgeCore", id: 2 },
  //       { label: "IgniteNet", id: 3 },
  //       { label: "LINKSYS", id: 4 },
  //       { label: "Level One", id: 5 },
  //       { label: "Mikrotik", id: 6 },
  //       { label: "Ruijie/Reyee", id: 7 },
  //       { label: "TENTONIKA", id: 8 },
  //       { label: "UBIQUITI", id: 9 },
  //     ];
  //   } else if (type === "accessory") {
  //     brandButtons = [
  //       { label: "Mikrotik", id: 1 },
  //       { label: "Level One", id: 2 },
  //       // { label: "TOTEN", color: "white" },
  //       { label: "Nikomax", id: 3 },
  //       { label: "UBIQUITI", id: 4 },
  //       // { label: "LINKSYS", color: "white" },
  //       { label: "IgniteNet", id: 5 },
  //       { label: "Equip", id: 6 },
  //       { label: "Ruijie/Reyee", id: 7 },
  //       { label: "BDCom", id: 8 },
  //       { label: "EdgeCore", id: 9 },
  //       { label: "DIGITUS", id: 10 },
  //       { label: "TENTONIKA", id: 11 },
  //     ];
  //   } else {
  //   }
  // } else if (category === "coupon") {
  //   brandButtons = [
  //     { label: "REMAX", id: 1 },
  //     { label: "Redmi", id: 2 },
  //     { label: "VIAVI", id: 3 },
  //   ];

  //   typeButtons = [
  //     { label: "Flashdrive", id: 1 },
  //     { label: "Memorystick", id: 2 },
  //     // { label: "Cooling fan", id: 3 },
  //     { label: "Tablet", id: 3 },
  //     { label: "Power Meter", id: 4 },
  //   ];
  // } else if (category === "gadget") {
  //   typeButtons = [
  //     { label: "Car Charger", id: 1 },
  //     { label: "Car Accessories", id: 2 },
  //     { label: "Computer Accessories", id: 3 },
  //     { label: "Power Socket", id: 4 },
  //     { label: "Micro SD Card", id: 5 },
  //     { label: "Flash Drive", id: 6 },
  //     { label: "Power Bank", id: 7 },
  //     { label: "Tripod", id: 8 },
  //     { label: "Watch", id: 9 },
  //     { label: "Data Cable", id: 10 },
  //     { label: "Audio Cable", id: 11 },
  //     { label: "Fan", id: 12 },
  //     { label: "Luggage", id: 13 },
  //     { label: "Tempered glass", id: 14 },
  //     { label: "Phone Case", id: 15 },
  //     { label: "Humidifier", id: 16 },
  //     { label: "Holder", id: 17 },
  //     { label: "Lamp", id: 18 },
  //     { label: "Mini Tracker", id: 19 },
  //     { label: "Creative Life", id: 20 },
  //     { label: "Earbuds", id: 21 },
  //     { label: "Wired Earphone", id: 22 },
  //     { label: "OTG", id: 23 },
  //     { label: "Charger Adapter", id: 24 },
  //     { label: "Charger", id: 25 },
  //     { label: "Bluetooth earphone/bluetooth headset", id: 26 },
  //     { label: "Bluetooth soundbar & bluetooth speaker", id: 27 },
  //     { label: "Bluetooth headphone", id: 28 },
  //   ];

  //   brandButtons = [
  //     { label: "Gadget Max", id: 1 },
  //     { label: "SOUNDPEATS", id: 2 },
  //     { label: "T PRO", id: 3 },
  //     { label: "REMAX", id: 4 },
  //     { label: "PRODA", id: 5 },
  //     { label: "AZENDA", id: 6 },
  //     { label: "WEKOME", id: 7 },
  //     { label: "ZMI", id: 8 },
  //     { label: "SOUNARC", id: 9 },
  //     { label: "Baseus", id: 10 },
  //     { label: "Tronsmart", id: 11 },
  //     { label: "Yunteng", id: 12 },
  //   ];
  // } else if (category === "power solution") {
  //   brandButtons = [
  //     { label: "Maruson", id: 1 },
  //     { label: "Unicraft", id: 2 },
  //     { label: "Power Tree", id: 3 },
  //     { label: "Prolink", id: 4 },
  //   ];

  //   typeButtons = [
  //     { label: "AVR", color: "white" },
  //     { label: "Power Generator", color: "white" },
  //     { label: "UPS", color: "white" },
  //   ];
  // } else if (refinementItems?.length > 0) {
  //   brandButtons = refinementItems.map((item, i) => ({
  //     label: item.label,
  //     id: i + 1,
  //   }));
  // } else {
  //   brandButtons = [];
  // }

  const selectBrand = (selectedLabel) => {
    if (activeBrands.includes(selectedLabel)) {
      setActiveBrands(activeBrands.filter((label) => label !== selectedLabel));
      // setFilteredBrands(
      //   filteredBrands.filter((label) => label !== selectedLabel)
      // );
    } else {
      setActiveBrands([...activeBrands, selectedLabel]);
      // setFilteredBrands([...filteredBrands, selectedLabel]);
    }
  };

  const selectType = (selectedLabel) => {
    if (activeTypes.includes(selectedLabel)) {
      setActiveTypes(activeTypes.filter((label) => label !== selectedLabel));
    } else {
      setActiveTypes([...activeTypes, selectedLabel]);
    }
  };

  const viewResult = () => {
    setFilteredBrands(activeBrands);
    setFilteredTypes(activeTypes);
    setOpen(false);
  };

  const clearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setActiveBrands([]);
    setActiveTypes([]);
    setFilteredBrands([]);
    setFilteredTypes([]);
  };

  return (
    <Container>
      <Wrapper>
        <Buttons>
          {openBrand ? (
            <>
              {brandButtons.map((button, index) => (
                <BrandButton
                  key={index}
                  className={
                    activeBrands.includes(button.label) ? "active" : ""
                  }
                  onClick={() => selectBrand(button.label)}
                >
                  {button.label}
                </BrandButton>
              ))}
            </>
          ) : openType ? (
            <>
              {typeButtons.map((button, index) => (
                <BrandButton
                  key={index}
                  className={activeTypes.includes(button.label) ? "active" : ""}
                  onClick={() => selectType(button.label)}
                >
                  {button.label}
                </BrandButton>
              ))}
            </>
          ) : (
            <></>
          )}
        </Buttons>
      </Wrapper>
      <Footer>
        <ClearButton
          className={property ? "active" : ""}
          disabled={!property}
          defaultValue="Clear Filter"
          onClick={clearFilter}
        />

        <ViewButton
          className={property ? "active" : ""}
          disabled={!property}
          defaultValue="View"
          onClick={viewResult}
        />
      </Footer>
    </Container>
  );
};

export default BrandFilterMobile;

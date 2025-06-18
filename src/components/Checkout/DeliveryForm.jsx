import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./style.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { publicRequest } from "../../requestMethods.js";
import { useNavigate } from "react-router-dom";
import data from "../../data.js";

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  //  margin-left:  30px;
  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 5px 10px 5px;
  gap: 10px;
`;
const AddressContainer = styled.div`
  position: relative;
`;

const Span = styled.span`
  font-weight: 700;
`;
const SelectDiv = styled.div`
  border: ${(props) =>
    props.className ? "2px solid #6dcdc7" : "1px solid #758a91"};
  border-radius: 5px;
  background: #f5f6f7;
  /* box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12); */
  padding: 10px;
  cursor: context-menu;
`;

const AddressDropdownList = styled.div`
  position: absolute;
  width: 100%;
  margin: 10px 0;
  transition: all 0.3s ease;

  overflow-y: scroll;

  background: #e6f0f3;
  border-radius: 8px;

  z-index: 2;
  cursor: context-menu;

  animation: fade-in 100ms;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;
const Address = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #002734;
  padding: 10px;

  &:hover {
    background: #00688b;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
  }
`;

const Form = styled.form``;

const FormControl = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 769px) {
    align-items: flex-start;
  }
`;

const PlaceHolder = styled.div`
  position: absolute;
  top: 25px;
  left: 20px;
  pointer-events: none;
  transition: 0.3s;

  font-weight: 400;
  font-size: 16px;
  color: #4a666f;
  background-color: #fff;
`;

const IconDiv = styled.div`
  position: absolute;
  top: ${(props) => (props.className ? "20px" : "25px")};
  // left: 220px;
  left: 90%;
  transform: ${(props) =>
    props.className ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 280ms linear;

  @media only screen and (max-width: 769px) {
    left: 100%;
  }
  @media only screen and (min-width: 769px) and (max-width: 1204px) {
    position: absolute;
    top: ${(props) => (props.className ? "20px" : "25px")};
    // left: 180px;
    left: 90%;
  }
`;

const Input = styled.input`
  width: ${(props) =>
    props.status === "full" ? "95%" : props.status === "half" && "88%"};
  border-radius: 5px;
  border: 1px solid #758a91;
  font-size: 15px;
  padding: 15px;
  margin: 10px 5px;
  background: #fff;

  cursor: context-menu;
  display: flex;

  /* for hiding blinking cursor */
  color: ${(props) => props.className === "select" && "transparent"};
  text-shadow: ${(props) => props.className === "select" && "0 0 0 #002734"};

  &:focus {
    outline: none;
    border: 2px solid #00688b;
  }

  &:focus + ${PlaceHolder} {
    top: 2px;
    left: 10px;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: #00688b;
    padding: 0 3px;
    margin: 0 5px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1204px) {
    width: ${(props) => props.id === "half" && "90%"};
    width: ${(props) => props.id === "full" && "95%"};
    padding: 15px 10px;
  }

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 35px;

  @media only screen and (max-width: 769px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
  }
`;

const RegionContainer = styled.div`
  margin-left: 5px;
  padding-top: 10px;
  height: 300px;
  width: 250px;
  position: absolute;
  top: -310px;
  transition: all 0.3s ease;

  overflow-y: scroll;

  background: #e6f0f3;
  border-radius: 8px;

  z-index: 2;
  cursor: context-menu;

  animation: fade-in 150ms;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  @media only screen and (min-width: 1203px) {
    width: 350px;
  }
`;

const CityContainer = styled.div`
  margin-left: 5px;
  padding-top: 10px;
  height: 300px;
  width: 250px;
  position: absolute;
  top: -310px;
  transition: all 0.3s ease;

  overflow-y: scroll;

  background: #e6f0f3;
  border-radius: 8px;

  z-index: 2;
  cursor: context-menu;

  animation: fade-in 100ms;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @media only screen and (min-width: 1203px) {
    width: 350px;
  }

  @media only screen and (max-width: 769px) {
    left: 0px;
  }
`;

const Option = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #002734;
  padding: 10px 30px;

  &:hover {
    background: #00688b;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
  }
`;

const Div = styled.div`
  color: ${(props) => props.id && "rgba(28, 27, 31, 0.12)"};
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  @media only screen and (max-width: 769px) {
    width: 88%;
  }
  @media only screen and (min-width: 769px) {
    width: ${(props) => props.id === "half" && "50%"};
  }
`;

const Error = styled.span`
  font-family: inherit;
  text-align: left;
  color: #e13f31;
  font-size: 13px;
  padding: 0 0 5px 10px;
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border-radius: 4px;

  @media only screen and (max-width: 769px) {
    justify-content: center;
    width: 88%;
    padding: 0px 15px;
    margin: 10px 5px;
    background-color: #00688b;
    border-radius: 4px;
  }
`;

const Button = styled.input`
  font-size: 16px;
  font-weight: 700;
  border: none;
  color: white;
  padding: 16px 32px;
  gap: 8px;

  background-color: #00688b;

  cursor: ${(props) => (props.disabled === false ? "pointer" : "context-menu")};

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;
const Terms = styled.span`
  text-decoration: underline;
  text-decoration-thickness: 0.1px;
  margin-left: 5px;
  text-underline-offset: 2px;
  color: #00688b;
`;

const Hr = styled.hr`
  margin: 25px 0px 20px 0px;

  @media only screen and (max-width: 769px) {
    width: 90%;
    margin: 25px 0px 20px 5px;
    padding-right: 15px;
  }
`;

const DeliveryForm = ({
  user,
  method,
  deli,
  setDeli,
  cartItems,
  total,
  info,
}) => {
  const navigate = useNavigate();

  const [region, setRegion] = useState(data); // all regions from database
  const [city, setCity] = useState(); // all city of selected region
  const [selectedRegion, setSelectedRegion] = useState(); // for storing region value
  const [selectedCity, setSelectedCity] = useState(); // for storing city value
  const [regionDropDown, setRegionDropDown] = useState(false);
  const [cityDropDown, setCityDropDown] = useState(false);
  const [addresses, setAddresses] = useState(); // storing addresses from user profile
  const elements = []; // address elements array
  const [openAddressDropdown, setOpenAddressDropdown] = useState(false);
  const [chosenAddress, setChosenAddress] = useState();
  const [newAddress, setNewAddress] = useState();

  const [formErrors, setFormErrors] = useState({});
  const [formName, setFormName] = useState();
  const [formPhnum, setFormPhnum] = useState();
  const [formAddress, setFormAddress] = useState();
  const [formEmail, setFormEmail] = useState();

  const handleSelect = (value) => {
    setSelectedRegion(value);
    // GETTING CITY ACCORDING TO REGION
    let arr = [];
    const data = region && region?.find((item) => item.region === value);
    let list = data && data.list;
    list?.map((val) => {
      arr.push(val.city);
    });
    arr = arr.sort(); // SORTING CITIES A TO Z
    setCity(arr); // setting array of city into state
    setRegionDropDown(false);
  };

  const handleCity = (cityName) => {
    setSelectedCity(cityName);
    setCityDropDown(false);

    let data = region && region?.find((val) => val.region === selectedRegion);
    let list = data && data?.list;

    let value = list && list?.find((val) => val.city === cityName);
    setDeli(value && value?.fees);
  };

  const handleDefaultCity = (cityName, regionName) => {
    setSelectedCity(cityName);
    // setCityDropDown(false);

    let cityData = region && region?.find((val) => val.region === regionName);
    let list = cityData && cityData?.list;

    let value = list && list?.find((val) => val.city === cityName);
    setDeli(value && value?.fees);
  };

  const showChosenAddress = () => {
    const defaultAddress = addresses?.find((a) => a.default === true);
    if (chosenAddress) {
      return chosenAddress.address;
    } else if (newAddress) {
      return "New Address";
    } else {
      return defaultAddress.address;
    }
  };

  const handleChosenAddress = (value) => {
    setChosenAddress(value);
    setFormAddress(value.address);
    setFormPhnum(value.phnum);
    setFormName(value.name);
    setSelectedRegion(value?.region);
    handleDefaultCity(value?.city, value?.region);
    setOpenAddressDropdown(false);
    setNewAddress();
  };

  const chooseNewAddress = () => {
    setFormAddress();
    setFormName();
    setFormPhnum();
    setChosenAddress();
    setSelectedCity();
    setSelectedRegion();
    setOpenAddressDropdown(false);
    setNewAddress("new");
  };

  // show addresses in address dropdown when user opens
  const showAddresses = () => {
    for (const a of addresses) {
      elements.push(
        <Address key={a.name} onClick={() => handleChosenAddress(a)}>
          {a.address}
        </Address>
      );
    }
    elements.push(
      <Address onClick={() => chooseNewAddress()}>New Address</Address>
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let products = [];
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const order = JSON.parse(localStorage.getItem("order"));
    const productTotal = parseInt(localStorage.getItem("total"));

    // order products
    cartItems.forEach((item) => {
      products.push({
        productId: item._id,
        productTitle: item.title,
        imageURL: item.image[0],
        price: item.price,
        market_price: item.market_price,
        discount: item.discount,
        category: item.category[0],
        quantity: item.quantity,
      });
    });

    if (validateForm()) {
      // DATA TO BE SENT TO BACKEND
      let data;

      if (user) {
        data = {
          userId: user._id,
          email: formEmail,
          address: formAddress,
          city: selectedCity && selectedCity,
          region: selectedRegion && selectedRegion,
          delivery: method,
          delivery_fees: deli ? deli : info.delivery_fees,
          name: formName,
          phnum: formPhnum,
          amount: deli
            ? productTotal + deli
            : productTotal + info.delivery_fees,
          products: products,
        };
      } else {
        data = {
          delivery: method,
          delivery_fees: deli ? deli : info.delivery_fees,
          name: formName,
          phnum: formPhnum,
          address: formAddress,
          region: selectedRegion,
          city: selectedCity,
          email: formEmail,
          amount: deli
            ? productTotal + deli
            : productTotal + info.delivery_fees,
          products: products,
        };
      }

      if (user) {
        // IF LOGGED IN USER, SEND DATA INCLUDING USER ID
        await publicRequest
          .post("/orders", data, {
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${token}`,
            },
          })
          .then((res) => {
            localStorage.setItem("order", JSON.stringify(res.data));
            navigate("/checkout/payment", {
              state: {
                fees: deli,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (order) {
        // IF GUEST USER BUT THE USER ALREADY HAS A PENDING ORDER, FIND ORDER WITH ORDER ID AND CONTINUE
        await publicRequest
          .post(`/orders/guest?orderId=${order._id}`, data)
          .then((res) => {
            localStorage.setItem("order", JSON.stringify(res.data));
            navigate("/checkout/payment", {
              state: {
                fees: deli,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // IF GUEST USER AND THE USER DOES NOT HAVE A PENDING ORDER, CREATE A NEW ORDER AND CONTINUE
        await publicRequest
          .post(`/orders/guest`, data)
          .then((res) => {
            localStorage.setItem("order", JSON.stringify(res.data));
            navigate("/checkout/payment", {
              state: {
                fees: deli,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};

    if (!formName) {
      errors.name = "Name is required";
    }

    if (!formPhnum) {
      errors.phone = "Phone Number is required";
    }

    if (!formEmail) {
      errors.email = "Email is required";
    } else if (!isEmailValid(formEmail)) {
      errors.email = "Please enter a valid email address";
    }

    if (!selectedCity) {
      errors.city = "City is required";
    }

    if (!selectedRegion) {
      errors.region = "Region is required";
    }

    if (!formAddress) {
      errors.address = "Address is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Email validation
  const isEmailValid = (email) => {
    // You can use regular expression for more thorough email validation
    return email.includes("@") && email.includes(".");
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      await publicRequest
        .get(`/users/find/${user._id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAddresses(res.data.addresses);
          setFormEmail(res.data.email);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    // for logged in user
    getUserProfile();
  }, []);

  useEffect(() => {
    const defaultAddress = addresses?.find((a) => a.default === true);
    setFormName(defaultAddress?.name);
    setFormAddress(defaultAddress?.address);
    setFormPhnum(defaultAddress?.phnum);

    if (info) {
      setFormName(info.name);
      setFormAddress(info.address);
      setFormPhnum(info.phnum);
      setSelectedRegion(info.region);
      handleSelect(info?.region);
      setSelectedCity(info?.city);
      handleCity(info?.city);
    } else if (user) {
      setFormName(user.name);
      setFormEmail(user.email);
    } else {
      setSelectedRegion(defaultAddress?.region);
      handleDefaultCity(defaultAddress?.city, defaultAddress?.region);
      const order = JSON.parse(localStorage.getItem("order"));
      if (order) {
        setFormEmail(order.email);
      }
    }
  }, [info, addresses]);

  return (
    <Container>
      {addresses?.length > 0 && (
        <Section>
          <Span>Choose Delivery Address:</Span>
          <AddressContainer>
            <SelectDiv
              onClick={() => setOpenAddressDropdown(!openAddressDropdown)}
              className={openAddressDropdown}
            >
              {showChosenAddress()}
            </SelectDiv>

            {openAddressDropdown && (
              <AddressDropdownList>
                {showAddresses()}
                {elements}
              </AddressDropdownList>
            )}
          </AddressContainer>
        </Section>
      )}

      <Form>
        <FormControl>
          <Row>
            <Div className="input-container" id="half">
              <Input
                status="half"
                type="text"
                onChange={(e) => setFormName(e.target.value)}
                value={
                  formName ? formName : chosenAddress ? chosenAddress.name : ""
                }
              />
              <PlaceHolder
                className={chosenAddress || formName ? "filled" : ""}
              >
                Full Name
              </PlaceHolder>
              {formErrors.name && <Error>{formErrors.name}</Error>}
            </Div>

            <Div className="input-container" id="half">
              <Input
                status="half"
                type="number"
                onChange={(e) => setFormPhnum(e.target.value)}
                value={
                  formPhnum
                    ? formPhnum
                    : chosenAddress
                    ? chosenAddress.phnum
                    : ""
                }
              />
              <PlaceHolder
                className={chosenAddress || formPhnum ? "filled" : ""}
              >
                Phone Number
              </PlaceHolder>
              {formErrors.phone && <Error>{formErrors.phone}</Error>}
            </Div>
          </Row>

          <Div className="input-container">
            <Input
              status="full"
              type="email"
              onChange={(e) => setFormEmail(e.target.value)}
              value={formEmail ? formEmail : ""}
            />
            <PlaceHolder className={formEmail || user?.email ? "filled" : ""}>
              Email Address
            </PlaceHolder>
            {formErrors.email && <Error>{formErrors.email}</Error>}
          </Div>

          <Row>
            <Div className="input-container">
              {/* REGION SELECTOR */}
              <div style={{ position: "relative" }}>
                <Input
                  className="select"
                  status="half"
                  type="text"
                  onChange={() => console.log()}
                  value={
                    selectedRegion
                      ? selectedRegion.toUpperCase()
                      : chosenAddress
                      ? chosenAddress.region.toUpperCase()
                      : ""
                  }
                  onClick={() =>
                    regionDropDown
                      ? setRegionDropDown(false)
                      : setRegionDropDown(true)
                  }
                />
                <IconDiv className={regionDropDown}>
                  <ExpandMoreIcon />
                </IconDiv>

                <PlaceHolder className="filled">State/Region</PlaceHolder>
                {/* {errors.name && <Error>{errors.name.message}</Error>} */}
                {regionDropDown && (
                  <RegionContainer>
                    {region?.map((val) => (
                      <Option
                        key={val._id}
                        value={val.region}
                        onClick={() => handleSelect(val.region)}
                      >
                        {val.region.toUpperCase()}
                      </Option>
                    ))}
                  </RegionContainer>
                )}
              </div>
            </Div>

            {/* CITY SELECTOR */}
            <Div className="input-container" id={selectedRegion}>
              <div style={{ position: "relative" }}>
                <Input
                  className="select"
                  status="half"
                  type="text"
                  onChange={() => console.log()}
                  value={
                    selectedCity
                      ? selectedCity
                      : chosenAddress
                      ? chosenAddress.city
                      : ""
                  }
                  disabled={!selectedRegion}
                  onClick={() =>
                    cityDropDown
                      ? setCityDropDown(false)
                      : setCityDropDown(true)
                  }
                />
                <IconDiv className={cityDropDown}>
                  <ExpandMoreIcon
                    style={{ color: selectedRegion ? "#000" : "#E3E3E4" }}
                  />
                </IconDiv>
                <PlaceHolder className="filled">Township</PlaceHolder>
                {/* {errors.name && <Error>{errors.name.message}</Error>} */}

                {cityDropDown && (
                  <CityContainer>
                    {city?.map((val, index) => (
                      <Option
                        key={index}
                        value={val}
                        onClick={() => handleCity(val)}
                      >
                        {val}
                      </Option>
                    ))}
                  </CityContainer>
                )}
              </div>
            </Div>
          </Row>

          <Div className="input-container">
            <Input
              status="full"
              type="text"
              onChange={(e) => setFormAddress(e.target.value)}
              value={formAddress ? formAddress : ""}
            />
            <PlaceHolder
              className={chosenAddress || formAddress ? "filled" : ""}
            >
              Full Address
            </PlaceHolder>
            {formErrors.address && <Error>{formErrors.address}</Error>}
          </Div>

          <ButtonContainer>
            <Button
              type={"submit"}
              value="Continue"
              onClick={(e) => onSubmit(e)}
            />
          </ButtonContainer>
        </FormControl>

        <Hr></Hr>

        <Link to="/terms-and-conditions">
          <Terms>Terms and Conditions</Terms>
        </Link>
      </Form>
    </Container>
  );
};

export default DeliveryForm;

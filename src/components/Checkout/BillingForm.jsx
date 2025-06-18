import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./style.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";
import { publicRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "./PaymentMethod";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 769px) {
    align-items: flex-start;
  }
`;

const Form = styled.form`
  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const FormControl = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
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
  right: 10px;
  transform: ${(props) =>
    props.className ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 280ms linear;

  @media only screen and (max-width: 769px) {
    right: 50px;
  }
  @media only screen and (min-width: 1203px) {
    right: 20px;
  }
`;

const Input = styled.input`
  width: ${(props) =>
    props.id === "half"
      ? "91%"
      : props.className === "select"
      ? "91%"
      : "100%"};
  border-radius: 5px;
  border: 1px solid #758a91;
  font-size: 15px;
  padding: 15px 0px;
  padding-left: 15px;
  margin: 10px 3px;
  cursor: context-menu;
  background: #fff;
  display: flex;

  /* for hiding blinking cursor */
  color: transparent;
  text-shadow: 0 0 0 #002734;

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

  @media only screen and (max-width: 769px) {
    /* width: ${(props) => (props.className === "select" ? "90%" : "90%")}; */

    width: 90%;
  }
  @media only screen and (min-width: 1203px) {
    width: ${(props) =>
      props.id === "half"
        ? "93%"
        : props.className === "select"
        ? "93%"
        : "100%"};
  }
`;

const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 35px;

  @media only screen and (max-width: 769px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
  }
`;

const RegionContainer = styled.div`
  margin-left: 5px;
  padding-top: 10px;
  height: 300px;
  width: 240px;
  position: absolute;
  top: -310px;
  right: 2px;
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
  @media only screen and (min-width: 881px) and (max-width: 1203px) {
    width: 250px;
  }
  @media only screen and (min-width: 1203px) {
    width: 300px;
  }

  @media only screen and (max-width: 769px) {
    left: 0px;
  }
`;

const CityContainer = styled.div`
  margin-left: 5px;
  padding-top: 10px;
  height: 300px;
  width: 240px;
  position: absolute;
  top: -310px;
  right: 2px;
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

  @media only screen and (min-width: 881px) and (max-width: 1203px) {
    width: 250px;
  }
  @media only screen and (min-width: 1203px) {
    width: 300px;
  }

  @media only screen and (max-width: 769px) {
    left: 0;
    margin-left: 0px;
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
  width: 50%;

  color: ${(props) => props.id && "rgba(28, 27, 31, 0.12)"};
  position: relative;
  display: flex;
  flex-direction: column;
  // background: lightblue;
  @media only screen and (max-width: 769px) {
    width: 100%;
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
  gap: 20px;
  padding: 20px 0;
  display: flex;
  justify-content: flex-end;

  @media only screen and (max-width: 769px) {
    flex-direction: column-reverse;
  }
`;

const Button = styled.input`
  width: 200px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  color: white;
  padding: 16px 32px;
  gap: 8px;
  border-radius: 4px;

  cursor: ${(props) => (props.disabled === false ? "pointer" : "context-menu")};
  background-color: ${(props) =>
    props.disabled === false ? "#00688B" : "#B0BCC0"};

  &:hover {
    background: ${(props) =>
      props.disabled === false ? "#2B829F" : "#B0BCC0"};
    box-shadow: ${(props) =>
      props.disabled === false ? "0px 1px 2px rgba(0, 0, 0, 0.3)" : ""};
    transform: ${(props) =>
      props.disabled === false ? "translate(-0.5px, 0.5px)" : ""};
    transition: all 0.3s ease;
  }

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  font-size: 16px;
  color: #00688b;
  font-weight: 700;
  background-color: white;

  padding: 16px 32px;
  gap: 8px;

  border: 1px solid #94a4aa;
  border-radius: 4px;

  cursor: context-menu;

  &:hover {
    background: #e6f0f3;
    border: 1px solid #dee3e5;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 769px) {
    width: 100%;
    padding: 16px 0px;
  }
`;

const BillingForm = ({ user, info, billingAddress, fees }) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [region, setRegion] = useState(); // all regions from database
  const [city, setCity] = useState(); // all city of selected region
  const [selectedRegion, setSelectedRegion] = useState(); // for storing region value temporary
  const [selectedCity, setSelectedCity] = useState(); // for storing city value temporary
  const [regionDropDown, setRegionDropDown] = useState(false);
  const [cityDropDown, setCityDropDown] = useState(false);
  const [payment, setPayment] = useState(); // for payment method

  // FOR FORM VALIDATION
  const name = watch("name");
  const phnum = watch("phnum");
  const email = watch("email");
  const address = watch("address");

  const form =
    name &&
    phnum &&
    email &&
    selectedRegion &&
    selectedCity &&
    address &&
    payment;

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
    setCity(arr);
    setRegionDropDown(false);
  };

  const handleCity = (value) => {
    setSelectedCity(value);
    setCityDropDown(false);
  };

  const onSubmit = async (formData) => {
    const token = localStorage.getItem("token");
    const order = JSON.parse(localStorage.getItem("order"));

    let data = {
      billing_address: {
        status: billingAddress,
        name: formData.name,
        phnum: formData.phnum,
        email: formData.email,
        address: formData.address,
        city: selectedCity,
        region: selectedRegion,
      },
      payment: payment,
    };

    await publicRequest
      .put(`/orders/${order._id}`, data, {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("order", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/checkout/order-confirmation", {
      state: {
        fees: fees,
      },
    });
  };

  const getRegion = async () => {
    //  GET REGION FOR SELECT OPTION
    await publicRequest
      .get("/map")
      .then((res) => {
        let arr = res.data;
        arr = arr.sort((a, b) => (a.region > b.region ? 1 : -1));
        setRegion(arr);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRegion();
  }, []);

  useEffect(() => {
    // console.log(info);
    reset(info?.billing_address);
    setSelectedRegion(info?.billing_address?.region);
    handleSelect(info?.billing_address?.region);
    setSelectedCity(info?.billing_address?.city);
    handleCity(info?.billing_address?.city);
    setPayment(info?.payment);
  }, [info]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Row>
            <Div className="input-container">
              <Input
                id="half"
                type="text"
                // defaultValue={user && user.name}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Enter your name",
                  },
                })}
              />
              <PlaceHolder className={name && "filled"}>Full Name</PlaceHolder>
              {errors.name && <Error>{errors.name.message}</Error>}
            </Div>

            <Div className="input-container">
              <Input
                id="half"
                type="text"
                // defaultValue={user && user.phnum}
                {...register("phnum", {
                  required: {
                    value: true,
                    message: "Enter your phone number",
                  },
                })}
              />
              <PlaceHolder className={phnum && "filled"}>
                Phone Number
              </PlaceHolder>
              {errors.phnum && <Error>{errors.phnum.message}</Error>}
            </Div>
          </Row>

          <Row className="input-container">
            <Input
              type="email"
              // defaultValue={user && user.email}
              {...register("email", {
                required: {
                  value: true,
                  message: "*Email* is mandatory",
                },
                pattern: {
                  value:
                    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            <PlaceHolder className={email && "filled"}>
              Email Address
            </PlaceHolder>
            {errors.email && errors.email.type === "required" && (
              <Error>{errors.email.message}</Error>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <Error>{errors.email.message}</Error>
            )}
          </Row>

          <Row>
            <Div className="input-container">
              {/* REGION SELECTOR */}
              <Input
                className="select"
                type="text"
                value={selectedRegion && selectedRegion.toUpperCase()}
                // {...register("region", {
                //   required: {
                //     value: true,
                //     message: "Choose region",
                //   },
                // })}
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
              {errors.name && <Error>{errors.name.message}</Error>}
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
            </Div>

            {/* CITY SELECTOR */}
            <Div className="input-container" id={selectedRegion}>
              <Input
                className="select"
                type="text"
                value={selectedCity && selectedCity}
                disabled={!selectedRegion}
                // {...register("city", {
                //   required: {
                //     value: true,
                //     message: "Choose city",
                //   },
                // })}
                onClick={() =>
                  cityDropDown ? setCityDropDown(false) : setCityDropDown(true)
                }
              />
              <IconDiv className={cityDropDown}>
                <ExpandMoreIcon
                  style={{ color: selectedRegion ? "#000" : "#E3E3E4" }}
                />
              </IconDiv>
              <PlaceHolder className="filled">Township</PlaceHolder>
              {errors.name && <Error>{errors.name.message}</Error>}

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
            </Div>
          </Row>

          <Row className="input-container">
            <Input
              type="text"
              {...register("address", {
                required: {
                  value: true,
                  message: "Enter your address",
                },
              })}
              // defaultValue={info && info.address}
            />
            <PlaceHolder className={address && "filled"}>
              Full Address
            </PlaceHolder>
            {errors.address && <Error>{errors.address.message}</Error>}
          </Row>
          <PaymentMethod
            info={info}
            payment={payment}
            setPayment={setPayment}
          />
        </FormControl>
        <ButtonContainer>
          <BackButton onClick={() => navigate(-1)}>Back</BackButton>
          <Button type={"submit"} value="Continue" disabled={!form} />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default BillingForm;

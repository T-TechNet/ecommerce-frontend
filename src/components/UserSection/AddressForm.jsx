import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./placeholder.css";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 16px 32px;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 5px;
  animation: pop-swirl linear 250ms forwards;

  @keyframes pop-swirl {
    0% {
      transform: scale(0) rotate(0deg);
      z-index: 10;
    }

    50% {
      transform: scale(0.5) rotate(0deg);
      z-index: 10;
    }

    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @media only screen and (max-width: 759px) {
    width: 70%;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.p`
  color: ${(props) => (props.className === "remove" ? "#cc0000" : "#000")};
  font-size: 18px;
  font-weight: 700;
`;

const Form = styled.form``;

const FormControl = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 700px) {
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
  left: 208px;

  transform: ${(props) =>
    props.className ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 280ms linear;

  @media only screen and (max-width: 759px) {
    left: 100%;
  }
`;

const Input = styled.input`
  width: ${(props) => props.id === "half" && "208px"};
  border-radius: 5px;
  border: 1px solid #758a91;
  font-size: 17px;
  padding: 15px;
  margin: 10px 0px;
  background: #ffffff;
  cursor: context-menu;
  display: flex;

  /* for hiding blinking cursor */
  color: ${(props) => props.className === "select" && "transparent"};
  text-shadow: ${(props) => props.className === "select" && "0 0 0 #002734"};

  &:focus {
    outline: none;
    border: 2px solid #00688b;
  }

  /* &:focus-within + ${PlaceHolder} {
    transform: translate(0, 12px) scale(0.8);
  } */

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

  @media only screen and (max-width: 759px) {
    /* width: ${(props) => (props.className === "select" ? "110%" : "100%")}; */
    width: 100%;
  }
`;

const Label = styled.div``;

const Checkbox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 15px 0 5px 0;
`;
const CheckboxInput = styled.input``;

const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  /* gap: ${(props) => (props.className === "select" ? "10px" : "50px")}; */

  @media only screen and (max-width: 759px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
  }
`;

const RegionContainer = styled.div`
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
`;

const CityContainer = styled.div`
  margin-left: 5px;
  padding-top: 10px;
  height: 300px;
  width: 250px;
  position: absolute;
  top: -310px;
  left: 250px;
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

  @media only screen and (max-width: 759px) {
    top: -240px;
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

  @media only screen and (max-width: 759px) {
    width: 88%;
  }
`;

const Error = styled.span`
  font-family: inherit;
  text-align: left;
  color: #e13f31;
  font-size: 13px;
  padding: 0 0 5px 10px;
  white-space: nowrap;
  /* margin: 5px 0; */
`;

const Message = styled.div`
  padding: 30px 0;
  font-size: 16px;
  font-weight: 400;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 759px) {
    justify-content: center;
    flex-direction: column-reverse;
    gap: 10px;
  }
`;

const CancelButton = styled.div`
  border-radius: 4px;
  padding: 16px 32px;
  border: 1px solid #94a4aa;

  color: #00688b;
  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  @media only screen and (max-width: 759px) {
    display: none;
  }
`;

const SubmitButton = styled.input`
  border-radius: 4px;
  border: none;
  background: ${(props) =>
    props.disabled === false
      ? "#00688b"
      : props.className === "remove"
      ? "#cc0000"
      : "#b0bcc0"};
  padding: 16px 32px;
  color: #fff;
  margin-left: 20px;
  cursor: pointer;

  font-size: 16px;
  font-weight: 700;

  @media only screen and (max-width: 759px) {
    margin-left: 0px;
    width: 100%;
  }
`;

const AddressForm = ({
  type,
  open,
  setOpen,
  userInfo,
  getUser,
  openEditForm,
  setOpenEditForm,
  selectedAddress,
  setSelectedAddress,
  index,
  setIndex,
}) => {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [region, setRegion] = useState(); // all regions from database
  const [city, setCity] = useState(); // all city of selected region
  const [selectedRegion, setSelectedRegion] = useState(); // for storing region value
  const [selectedCity, setSelectedCity] = useState(); // for storing city value
  const [regionDropDown, setRegionDropDown] = useState(false);
  const [cityDropDown, setCityDropDown] = useState(false);

  const [asDefault, setAsDefault] = useState(false);

  const name = watch("name");
  const phnum = watch("phnum");
  const address = watch("address");
  let formStatus;
  if (selectedRegion && selectedCity) {
    formStatus = name && phnum && selectedRegion && selectedCity && address;
  } else {
    formStatus = true;
  }

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

  const handleCity = (cityName) => {
    setSelectedCity(cityName);
    setCityDropDown(false);
  };

  const onSubmit = async (e) => {
    const data = {
      name: e.name,
      phnum: e.phnum,
      address: e.address,
      region: selectedRegion ? selectedRegion : selectedAddress?.region,
      city: selectedCity ? selectedCity : selectedAddress?.city,
      default: selectedAddress?.default ? selectedAddress.default : asDefault,
      addressIndex: index,
      toUpdate: "Address",
    };

    let token = localStorage.getItem("token");

    await publicRequest
      .put(`/users/${userInfo._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOpen(false);
        setOpenEditForm(false);
        setSelectedAddress();
        setIndex();
        navigate(0);
        // getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeAddress = async (e) => {
    const data = {
      addressIndex: index,
      toUpdate: "Remove Address",
    };

    // console.log(data);

    let token = localStorage.getItem("token");

    await publicRequest
      .put(`/users/${userInfo._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOpen(false);
        setOpenEditForm(false);
        setSelectedAddress();
        setIndex();
        getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    // CLOSING DIALOG BOX WHEN USER CLICKS CANCEL BUTTON
    setOpen(false);
    setOpenEditForm(false);
    setSelectedAddress();
  };

  const getRegion = async () => {
    //  GET REGION FOR SELECT OPTION
    await publicRequest
      .get("/map")
      .then((res) => {
        let arr = res.data;
        arr = arr.sort((a, b) => (a.region > b.region ? -1 : 1));
        setRegion(arr);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRegion();
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      setAsDefault(selectedAddress?.default); // TO INITIALIZE CHECKBOX
    } else {
      setAsDefault(false);
    }
    reset({ ...selectedAddress });
  }, [selectedAddress]);

  const handleNothing = () => {};

  return open || openEditForm ? (
    <Container>
      <Wrapper>
        <HeaderDiv>
          <Header className={type === "Remove Delivery Address" && "remove"}>
            {type}
          </Header>
          <CloseIcon onClick={() => handleCancel()} />
        </HeaderDiv>

        {/* ADDRESS FORM */}
        {type === "Remove Delivery Address" ? (
          <>
            <Message>
              Are you sure you want to remove this delivery address from your
              account ?
            </Message>
            <ButtonContainer>
              <CancelButton onClick={() => handleCancel()}>Cancel</CancelButton>
              <SubmitButton
                className={type === "Remove Delivery Address" && "remove"}
                type="submit"
                value="Remove"
                onClick={() => removeAddress()}
              />
            </ButtonContainer>
          </>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Row>
                <Div className="input-container">
                  <Input
                    id="half"
                    type="text"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Enter your name",
                      },
                    })}
                  />
                  <PlaceHolder className={name && "filled"}>
                    Full Name
                  </PlaceHolder>
                  {errors.name && <Error>{errors.name.message}</Error>}
                </Div>

                <Div className="input-container">
                  <Input
                    id="half"
                    type="number"
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

              <Row>
                <Div className="input-container">
                  {/* REGION SELECTOR */}
                  <Input
                    className="select"
                    id="half"
                    type="text"
                    value={
                      selectedRegion
                        ? selectedRegion.toUpperCase()
                        : selectedAddress?.region.toUpperCase()
                      // : userInfo.addresses?.region
                    }
                    onChange={() => handleNothing()}
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
                </Div>

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

                {/* CITY SELECTOR */}
                <Div className="input-container" id={selectedRegion}>
                  <Input
                    className="select"
                    id="half"
                    type="text"
                    value={selectedCity ? selectedCity : selectedAddress?.city}
                    disabled={!selectedRegion}
                    onChange={() => handleNothing()}
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
                  {errors.name && <Error>{errors.name.message}</Error>}
                </Div>

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
              </Row>

              <Div className="input-container">
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
              </Div>

              <Checkbox>
                <CheckboxInput
                  type="checkbox"
                  value={asDefault}
                  checked={asDefault}
                  onChange={() => setAsDefault(!asDefault)}
                />
                <Label>Set as default</Label>
                {errors.address && <Error>{errors.address.message}</Error>}
              </Checkbox>
            </FormControl>

            <ButtonContainer>
              <CancelButton onClick={() => handleCancel()}>Cancel</CancelButton>

              {type === "Add New Delivery Address" ? (
                <SubmitButton
                  type="submit"
                  value="Add Address"
                  disabled={!formStatus}
                />
              ) : (
                <SubmitButton
                  type="submit"
                  value="Save Changes"
                  disabled={!formStatus}
                />
              )}
            </ButtonContainer>
          </Form>
        )}
      </Wrapper>
    </Container>
  ) : (
    <></>
  );
};

export default AddressForm;

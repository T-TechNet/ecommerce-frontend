import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "react-phone-number-input/style.css";
import { publicRequest } from "../../requestMethods";
import VerifyPage from "./VerifyPage";
import signup from "../../assets/Register.svg";
import GoogleIcon from "@mui/icons-material/Google";
import "./placeholder.css";
import { signIn } from "../oAuth/Script";

const Container = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1150px;
  display: flex;
  justify-content: space-between;
  gap: 200px;
  @media screen and (max-width: 759px) {
    width: 400px;
  }
  @media screen and (max-width: 1203px) {
    width: 750px;
    height: 735px;
  }
`;

const Img = styled.img`
  width: 400px;

  @media only screen and (max-width: 759px) {
    display: none;
  }
  @media screen and (max-width: 1203px) {
    width: 300px;
    margin-left: -40px;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: flex-start;

  @media only screen and (max-width: 759px) {
    padding: 0 20px;
  }
`;

const Title = styled.p`
  width: 100%;
  margin-bottom: 20px;
  /* text-align: center; */
  font-weight: 700;
  font-size: 26px;
  color: #000000;

  @media only screen and (max-width: 759px) {
    font-size: 20px;
  }
`;

const Tag = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: #758a91;
  @media only screen and (max-width: 759px) {
    font-size: 20px;
    font-weight: 400;
    color: #758a91;
  }
`;

const Form = styled.form``;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
`;

const Div = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PlaceHolder = styled.div`
  position: absolute;
  top: 25px;
  left: 18px;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  font-weight: 400;
  font-size: 16px;
  color: #4a666f;
  background-color: #fff;
`;

const Input = styled.input`
  border: 1px solid #b0bcc0;
  border-radius: 4px;
  margin: 10px 0;
  padding: 15px;

  font-weight: 400;
  font-size: 16px;
  color: #002734;

  &:focus {
    outline: none;
    border: 2px solid #00688b;
  }

  &:focus + ${PlaceHolder} {
    top: 2px;
    left: 8px;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: #00688b;
    padding: 0 3px;
    margin: 0 5px;
  }
`;

const Additional = styled.div`
  width: 100%;
  margin-top: 20px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 759px) {
    margin-top: 5px;
  }
`;

const Login = styled.p`
  text-decoration: none;
  margin: 0 10px;

  font-weight: 400;
  font-size: 14px;

  color: #00688b;
  cursor: pointer;

  &:hover {
    color: #03a89e;
  }
`;
const Agreement = styled.p`
  display: flex;
  gap: 10px;
  padding: 20px 0;

  @media only screen and (max-width: 759px) {
    align-items: flex-start;
    padding: 10px 0;
  }
`;

const IconDiv = styled.div`
  color: #758a91;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #00688b;
    cursor: pointer;
  }
`;

const Message = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #000000;
`;

const Span = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: #00688b;
  cursor: context-menu;

  transition: all 0.2s ease-in-out;

  &:hover {
    color: #03a89e;
  }
`;

const Hr = styled.hr`
  margin: 10px 0;
  border: 1px solid #bfc9cc;

  @media only screen and (max-width: 759px) {
    display: none;
  }
`;

const Error = styled.span`
  color: #cc0000;
  font-size: 13px;
  margin: 0 0 10px 5px;
`;

const ButtonContainer = styled.div`
  margin: 20px 0;
  display: flex;
`;

const Button = styled.input`
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  width: 100%;

  padding: 16px 32px;
  gap: 8px;

  border: none;
  border-radius: 4px;

  transition: all 0.3s ease-in-out;

  cursor: ${(props) => (props.disabled === false ? "pointer" : "")};
  background-color: ${(props) =>
    props.disabled === false ? "#00688b" : "#B0BCC0"};

  &:hover {
    background: ${(props) =>
      props.disabled === false ? "#2B829F" : "#B0BCC0"};
    box-shadow: ${(props) =>
      props.disabled === false ? "0px 1px 2px rgba(0, 0, 0, 0.3)" : ""};
    transform: ${(props) =>
      props.disabled === false ? "translate(-0.5px, 0.5px)" : ""};
  }
`;

const OAuthDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const GoogleButton = styled.div`
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  width: fit-content;

  padding: 8px 20px;
  display: flex;
  align-items: center;
  gap: 8px;

  border: none;
  border-radius: 4px;

  background-color: #cc0000;
  cursor: pointer;
`;

const phone = {
  width: "300px",
  fontSize: "15px",
  padding: "5px",
};

const eye = {
  color: "#94A4AA",
  position: "absolute",
  top: "25px",
  right: "15px",
  cursor: "pointer",
};

const Register = ({ click }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const name = watch("name");
  const username = watch("username");
  const email = watch("email");
  const pw1 = watch("password");
  const pw2 = watch("cfpassword");
  const [checkbox, setCheckbox] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const form = name && username && email && pw1 && pw2 && checkbox;

  const [passwordType, setPasswordType] = useState("password");
  const [cfPasswordType, setCfPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const toggleCfPassword = () => {
    if (cfPasswordType === "password") {
      setCfPasswordType("text");
      return;
    }
    setCfPasswordType("password");
  };

  const onSubmit = async (formData) => {
    await publicRequest
      .post("/auth/register", formData)
      .then((res) => {
        // console.log(res.data);
        setServerError("");
        setSuccess(true);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setServerError(err.response.data);
        } else {
          console.log(err);
        }
      });
  };

  const google = () => {
    // window.open("http://localhost:5000/api/auth/google", "_self");
  };

  return (
    <Container>
      {success ? (
        <Wrapper>
          <VerifyPage email={email} username={username} />
        </Wrapper>
      ) : (
        <Wrapper>
          <Img src={signup}></Img>
          <FormSection>
            <Title>
              Create <Tag>Your Account</Tag>
            </Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormBody>
                <Div className="register-container">
                  <Input
                    type="text"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name cannot be empty!",
                      },
                    })}
                  />
                  <PlaceHolder className={name && "filled"}>Name</PlaceHolder>
                  {errors.name && errors.name.type === "required" && (
                    <Error>{errors.name.message}</Error>
                  )}
                </Div>

                <Div className="register-container">
                  <Input
                    type="text"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Username cannot be empty!",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message:
                          "Username cannot contain space & only letters and numbers are accepted.",
                      },
                      maxLength: {
                        value: 12,
                        message: "Maximum length is 12!",
                      },
                    })}
                  />
                  <PlaceHolder className={username && "filled"}>
                    Username
                  </PlaceHolder>
                  {errors.username && errors.username.type === "required" && (
                    <Error>{errors.username.message}</Error>
                  )}
                  {errors.username && errors.username.type === "pattern" && (
                    <Error>{errors.username.message}</Error>
                  )}
                  {errors.username && errors.username.type === "maxLength" && (
                    <Error>{errors.username.message}</Error>
                  )}
                  {serverError.usernameError ? (
                    <Error>{serverError.usernameError}</Error>
                  ) : (
                    <></>
                  )}
                </Div>

                <Div className="register-container">
                  <Input
                    type="email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "*Email* is mandatory.",
                      },
                      pattern: {
                        value:
                          /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email address.",
                      },
                    })}
                  />
                  <PlaceHolder className={email && "filled"}>Email</PlaceHolder>
                  {errors.email && errors.email.type === "required" && (
                    <Error>{errors.email.message}</Error>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <Error>{errors.email.message}</Error>
                  )}
                  {serverError.emailError ? (
                    <Error>{serverError.emailError}</Error>
                  ) : (
                    <></>
                  )}
                </Div>

                <Div className="register-container">
                  <Input
                    type={passwordType}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required!",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                        message:
                          "Password must contain at least 8 characters with a mix of letters, numbers & symbols.",
                      },
                    })}
                  />
                  <PlaceHolder className={pw1 && "filled"}>
                    Password
                  </PlaceHolder>
                  <div onClick={togglePassword}>
                    {passwordType === "password" ? (
                      <VisibilityIcon style={eye} />
                    ) : (
                      <VisibilityOffIcon style={eye} />
                    )}
                  </div>
                  {errors.password && errors.password.type === "required" && (
                    <Error>{errors.password.message}</Error>
                  )}
                  {errors.password && errors.password.type === "pattern" && (
                    <Error>{errors.password.message}</Error>
                  )}
                </Div>

                <Div className="register-container">
                  <Input
                    type={cfPasswordType}
                    {...register("cfpassword", {
                      validate: (val) => {
                        if (watch("cfpassword") === "") {
                          return null;
                        } else if (watch("password") !== val) {
                          return "Your passwords do not match.";
                        }
                      },
                    })}
                  />
                  <PlaceHolder className={pw2 && "filled"}>
                    Confirm Password
                  </PlaceHolder>
                  <div onClick={toggleCfPassword}>
                    {cfPasswordType === "password" ? (
                      <VisibilityIcon style={eye} />
                    ) : (
                      <VisibilityOffIcon style={eye} />
                    )}
                  </div>
                  {errors.cfpassword &&
                    errors.cfpassword.type === "validate" && (
                      <Error>{errors.cfpassword.message}</Error>
                    )}
                </Div>

                {/* <Info>Phone Number:</Info>
            <Controller
            name="phone-input"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
              style={phone}
              value={value}
              onChange={onChange}
              defaultCountry="MM"
              {...register("phnum", { required: "Enter contact number" })}
              />
              )}
            /> */}
                {/* <Info>Phone Number:</Info>
                <PhoneInput
                  style={phone}
                  flags={flags}
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="MM"
                  {...register("phnum", {
                    required: {
                      value: true,
                      message: "Enter contact number",
                    },
                  })}
                />
                {errors.phnum && <Error>{errors.phnum.message}</Error>} */}
                {/* <Info>Date of Birth:</Info>
            <Input
            type="date"
            min="1940-01-01"
            max="2005-12-31"
            {...register("birthday", { valueAsDate: true })}
          /> */}

                <Agreement>
                  <IconDiv onClick={() => setCheckbox(!checkbox)}>
                    {checkbox ? (
                      <CheckBoxOutlinedIcon style={{ color: "#00688B" }} />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </IconDiv>

                  <Message>
                    I have read and agreed to the website{" "}
                    <Link
                      to="/terms-and-conditions"
                      style={{ textDecoration: "none" }}
                    >
                      <Span>terms and conditions</Span>
                    </Link>
                  </Message>
                </Agreement>
                {errors.agreement && <Error>{errors.agreement.message}</Error>}

                <ButtonContainer>
                  <Button
                    type={"submit"}
                    value="Create an Account"
                    disabled={!form}
                  />
                </ButtonContainer>

                {/* <OAuthDiv>
                  <span>or sign up with</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GoogleButton onClick={signIn}>
                      <GoogleIcon />
                      Google
                    </GoogleButton>
                  </div>
                </OAuthDiv> */}
              </FormBody>
            </Form>
            <Hr></Hr>
            {/* <Additional>
              <GoogleButton value="Log in with Google" onClick={google} />
            </Additional> */}
            <Additional>
              <Login onClick={click}>Already have an account? Log in</Login>
            </Additional>
          </FormSection>
        </Wrapper>
      )}
    </Container>
  );
};

export default Register;

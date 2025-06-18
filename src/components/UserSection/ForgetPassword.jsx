import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";
import forgetpw from "../../assets/ForgetPassword.svg";
import forgetemailsend from "../../assets/ForgetEmailSend.svg";
import { CircularProgress } from "@mui/material";
import "./placeholder.css";
import "./verify.css";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;
const Wrapper = styled.div`
  position: relative;
  width: 1150px;
  padding: 60px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;

  @media only screen and (max-width: 759px) {
    width: 100%;
    flex-direction: column;
    padding: 30px;
  }
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1150px;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 10;
`;

const Img = styled.img`
  @media only screen and (max-width: 759px) {
    display: ${(props) => (props.className === "success" ? "block" : "none")};
    width: 150px;
    height: 150px;
  }
`;

const InfoSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 20px;

  @media only screen and (max-width: 759px) {
    width: 90%;
    align-items: ${(props) => props.className !== "success" && "flex-start"};
    /* padding: 0 20px; */
  }
`;

const FormDiv = styled.div`
  position: relative;

  @media only screen and (max-width: 759px) {
    width: 100%;
  }
`;

const Form = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media only screen and (max-width: 759px) {
    width: 330px;
  }

  @media only screen and (max-width: 366px) {
    width: 300px;
  }
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 32px;

  background: linear-gradient(180deg, #00688b 0%, #03a89e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media only screen and (max-width: 759px) {
    font-size: 20px;
    background: #000000;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

const Description = styled.p`
  text-align: center;
  width: 450px;
  font-weight: 400;
  font-size: 18px;
  padding: 10px 0;
  color: #002734;

  @media only screen and (max-width: 759px) {
    font-size: 16px;
    padding: 20px 0;
    text-align: left;
    width: fit-content;
  }
`;

const Msg = styled.p`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #006788;

  @media only screen and (max-width: 759px) {
    font-size: 16px;
    width: 100%;
  }
`;

const PlaceHolder = styled.div`
  position: absolute;
  top: 15px;
  left: 18px;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  font-weight: 400;
  font-size: 16px;
  color: #4a666f;
  background-color: #fff;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid #758a91;
  border-radius: 4px;

  gap: 10px;

  font-weight: 400;
  font-size: 16px;

  color: #4a666f;

  &:focus {
    outline: none;
    border: 2px solid #00688b;
  }

  &:focus + ${PlaceHolder} {
    top: -7px;
    left: 8px;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: #00688b;
    padding: 0 3px;
    margin: 0 5px;
  }
`;

const Error = styled.span`
  position: absolute;
  top: 60px;
  padding: 0 0 16px 16px;
  color: #cc0000;
  font-weight: 400;
  font-size: 12px;

  @media only screen and (max-width: 759px) {
  }
`;

const Button = styled.input`
  /* width: 300px; */

  padding: 16px 32px;
  margin-top: 10px;
  gap: 8px;

  background: #00688b;
  border-radius: 4px;
  border: none;

  font-weight: 700;
  font-size: 16px;
  color: #ffffff;

  cursor: pointer;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const ResendButton = styled.input`
  position: relative;
  padding: 16px 32px;
  gap: 8px;
  width: 171px;
  height: 56px;
  border: 1px solid #94a4aa;
  border-radius: 4px;
  background: #ffffff;

  font-weight: 700;
  font-size: 16px;
  color: ${(props) => (props.className === "loading" ? "#bfc9cc" : "#00688b")};

  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #e6f0f3;
    border: 1px solid #dee3e5;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }

  @media only screen and (max-width: 759px) {
    font-size: 14px;
    padding: 8px 16px;
    width: 130px;
    height: 40px;
  }
`;

const Header = styled.p`
  text-align: center;
  font-weight: 700;
  font-size: 32px;

  padding: 20px 0;

  background: linear-gradient(180deg, #00688b 0%, #03a89e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media only screen and (max-width: 759px) {
    font-size: 23px;
  }
`;

const Text = styled.p`
  text-align: center;
  width: 400px;
  padding: 10px 0;

  @media only screen and (max-width: 759px) {
    font-size: 16px;
    width: 310px;
  }
`;

const Span = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: #00688b;
`;

const Hr = styled.hr`
  margin: 10px 0;
  width: 100%;
  border: 1px solid #bfc9cc;
`;

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const handleInputField = (e) => {
    setMsg("");
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    setSending(true);
    await publicRequest
      .post("/users/forget", e)
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        setMsg(err.response.data);
      });
    setSending(false);
  };

  const resendEmail = async () => {
    // FOR LOADING ANIMATION ON BUTTON
    if (!loading) {
      // setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        // setSuccess(true);
        setLoading(false);
      }, 2000);
    }

    const data = {
      email: email,
    };

    await publicRequest
      .post("/users/forget", data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      {success ? (
        <Wrapper>
          <Img className="success" src={forgetemailsend} />

          <InfoSection className="success">
            <Header className="success">Check Your Email</Header>
            <Text>We have sent an email with password reset link to </Text>
            <Span>{email}</Span>
            <Text>
              Please check your email and click on the link to reset your
              account password.
            </Text>
            <Hr></Hr>
            <Msg>Didn’t receive the password reset link?</Msg>
            <ResendButton
              type="submit"
              value="Resend email"
              className={loading && "loading"}
              onClick={() => resendEmail("/")}
            />
            {loading && (
              <CircularProgress
                size={24}
                className="resend-pw-reset-loading-circle" // for css file
              />
            )}
          </InfoSection>
        </Wrapper>
      ) : (
        <Wrapper>
          {sending && (
            <Loading>
              <CircularProgress style={{ color: "#03A89E" }} />
              <Msg>Loading...</Msg>
            </Loading>
          )}
          <Img src={forgetpw} />
          <InfoSection>
            <Title>Forgot your password?</Title>
            <Description>
              Enter your account's email address and we'll send a link to reset
              your password.
            </Description>

            <FormDiv className="forget-password-container">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Please enter your email address.",
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                  onChange={(e) => handleInputField(e)}
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
                {msg && <Error>{msg}</Error>}

                <Button type={"submit"} value="Send Email" />
                {sending && (
                  <CircularProgress
                    size={24}
                    style={{
                      color: "#00688b",
                      position: "absolute",
                      top: "110px",
                      left: "190px",
                    }}
                  />
                )}
              </Form>
            </FormDiv>
          </InfoSection>
        </Wrapper>
      )}
    </Container>
  );
};

export default ForgetPassword;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import verify from "../../assets/Email.svg";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { CircularProgress } from "@mui/material";
import "./verify.css";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;
const Wrapper = styled.div`
  width: 1150px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 759px) {
    width: 100%;
    flex-direction: column;
    gap: 30px;
  }
`;

const Img = styled.img`
  @media only screen and (max-width: 759px) {
    width: 153px;
    height: 133px;
  }
`;

const InfoSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 0 20px;
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
    width: 310px;
  }
`;

const Span = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: #00688b;

  @media only screen and (max-width: 759px) {
    font-size: 16px;
  }
`;

const Hr = styled.hr`
  margin: 10px 0;
  width: 100%;
  border: 1px solid #bfc9cc;
`;

const Msg = styled.div`
  font-weight: 400;
  font-size: 16px;
  padding: 10px 0;
  color: #85979e;
`;

const Button = styled.input`
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
    gap: 8px;
    width: 130px;
    height: 40px;
  }
`;

const VerifyPage = ({ email, username }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const resendEmail = async () => {
    // FOR LOADING ANIMATION
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }

    const data = {
      username: username,
      email: email,
    };

    await publicRequest
      .post("/auth/resend-email", data)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        // if (err.response.status === 400) {
        //   setServerError(err.response.data);
        // } else {
        console.log(err);
        // }
      });
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Container>
      <Wrapper>
        <Img src={verify} />
        <InfoSection>
          <Header className="success">Check Your Email</Header>
          <Text>We have sent an email with a verification link to </Text>
          <Span>{email}</Span>
          <Text>
            Please check your email and click on the link to confirm your
            account.
          </Text>
          <Hr></Hr>
          <Msg>Didn’t receive the verification link?</Msg>
          <Button
            type="submit"
            value="Resend email"
            className={loading && "loading"}
            onClick={() => resendEmail("/")}
          />
          {loading && (
            <CircularProgress
              size={24}
              className="loading-circle" // for css file
            />
          )}
        </InfoSection>
      </Wrapper>
    </Container>
  );
};

export default VerifyPage;

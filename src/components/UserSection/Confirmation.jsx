import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";
import verifySuccessful from "../../assets/VerifiedSuccessful.svg";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;

  @media only screen and (max-width: 759px) {
    padding: 30px 0;
  }
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

const Img = styled.img`
  @media only screen and (max-width: 759px) {
    width: 220px;
    height: 190px;
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

const Text = styled.p`
  text-align: center;
  width: 300px;
  padding: 10px 0;

  @media only screen and (max-width: 759px) {
    font-size: 16px;
    padding: 0;
  }
`;

const Button = styled.input`
  position: relative;
  padding: 16px 32px;
  margin: 10px 0;
  gap: 8px;
  width: 300px;
  height: 56px;
  background: #00688b;
  border-radius: 4px;
  border: none;

  font-weight: 700;
  font-size: 16px;
  color: #fff;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  }

  @media only screen and (max-width: 759px) {
    margin: 0;
    margin-top: 20px;
  }
`;

const Confirmation = () => {
  const [loginData, setLoginData] = useState(false);
  let { username } = useParams();
  let { token } = useParams();

  const navigate = useNavigate();

  function verifyEmailToken(username, emailToken) {
    // console.log("verify function working");
    const data = {
      username: username,
      emailToken: emailToken,
    };

    publicRequest.post("/auth/verifyEmailToken", data).then((res) => {
      console.log(res.data);

      const userEmail = res.data.email;
      const userPassword = res.data.password;

      let temp = {
        email: userEmail,
        password: userPassword,
      };

      setLoginData(temp);

      // setCartItems([...cartItems, { ...product, quantity: count }]);
    });
  }

  const login = async () => {
    console.log("loginData", loginData);
    await publicRequest
      .post("/auth/login", loginData)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.accessToken);
        sessionStorage.removeItem("guest");
        navigate("/");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    verifyEmailToken(username, token);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Img src={verifySuccessful} />
        <InfoSection>
          <Header className="success">Verified Successfully!</Header>
          <Text>
            Thanks for verifying your account. You are all set to get started.{" "}
          </Text>
          <Button type="submit" value="Start Shopping" onClick={login} />
        </InfoSection>
      </Wrapper>
    </Container>
  );
};

export default Confirmation;

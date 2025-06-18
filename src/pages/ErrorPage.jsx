import React from "react";
import errorPic from "../assets/404_Error.svg";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
// #TODO: specify error and return

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1160px;
  padding: 50px 0 100px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 759px) {
    width: 100%;
    flex-direction: column;
    padding: 0px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  @media only screen and (max-width: 759px) {
    width: 220px;
    height: 310px;
  }
`;

const Section = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 50px 100px 0 100px;

  @media only screen and (max-width: 759px) {
    padding: 10px 30px;
  }
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 32px;
  text-align: center;

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

const Description = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: #002734;
  text-align: center;

  @media only screen and (max-width: 759px) {
    font-size: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 50px 0;

  @media only screen and (max-width: 759px) {
    width: 100%;
    padding: 30px 0;
    flex-direction: column;
  }
`;

const GoToHomeButton = styled.button`
  padding: 16px 32px;
  gap: 8px;
  background: #00688b;
  border: none;
  border-radius: 4px;

  font-weight: 700;
  font-size: 16px;
  color: #ffffff;

  cursor: pointer;

  transition: all 0.3s ease-in-out;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  }

  @media only screen and (max-width: 759px) {
    width: 100%;
  }
`;

const Previous = styled.button`
  padding: 16px 32px;
  gap: 8px;
  border: 1px solid #94a4aa;
  border-radius: 4px;

  font-weight: 700;
  font-size: 16px;

  color: #00688b;
  cursor: pointer;

  transition: all 0.3s ease-in-out;

  &:hover {
    background: #e6f0f3;
    border: 1px solid #dee3e5;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }

  @media only screen and (max-width: 759px) {
    width: 100%;
  }
`;

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <ImageContainer>
          <Image src={errorPic} />
        </ImageContainer>
        <Section>
          <Title>Page not found</Title>
          <Description>
            We couldn't find the page you're looking for. Please check the URL
            or go back to the homepage.
          </Description>

          <ButtonContainer>
            <GoToHomeButton onClick={() => navigate("/")}>
              Go to Home
            </GoToHomeButton>
            <Previous onClick={() => navigate(-1)}>Previous Page</Previous>
          </ButtonContainer>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default ErrorPage;

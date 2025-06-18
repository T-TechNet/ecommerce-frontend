import React from "react";
import styled from "styled-components";
import LoginForm from "../components/UserSection/LoginForm";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1160px;
  padding: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  /* align-items: flex-start; */
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 23px;
  color: #000000;
  padding: 0 30px;
  text-align: left;
`;

const Section = styled.div`
  padding: 20px 30px;
`;

const Desc = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  padding: 20px 0;
`;

const Button = styled.div`
  padding: 16px 32px;
  margin: 15px 0;
  border: 1px solid #94a4aa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 16px;

  color: #00688b;

  cursor: pointer;

  &:hover {
    background: #e6f0f3;
    border: 1px solid #dee3e5;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
`;

const BeforeCheckout = () => {
  return (
    <Container>
      <Wrapper>
        <Column>
          <Title>Log In</Title>
          <LoginForm />
        </Column>
        <Column>
          <Title>No account yet?</Title>
          <Section>
            <Desc>
              You can checkout as a guest and can create the account later.
            </Desc>
            <Link to="/checkout/contact" style={{ textDecoration: "none" }}>
              <Button>Checkout as Guest</Button>
            </Link>
          </Section>
        </Column>
      </Wrapper>
    </Container>
  );
};

export default BeforeCheckout;

import React from "react";
import styled from "styled-components";

const Section = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;

  @media only screen and (max-width: 759px) {
    padding: 30px;
    justify-content: flex-start;
  }
`;
const Header = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: white;
  background-image: linear-gradient(to bottom, #00688b, #03a89e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media only screen and (max-width: 759px) {
    font-size: 20px;
    text-align: center;
  }
`;

const EmptyOrderScreen = ({ type }) => {
  return (
    <Section>
      <Header>You do not have any {type} orders.</Header>
    </Section>
  );
};

export default EmptyOrderScreen;

import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

import { Transition } from "react-transition-group";
import LoginForm from "./LoginForm";

const Container = styled.div`
  max-width: 408px;
  overflow: hidden;
  width: 85%;
  height: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  background-color: #ffffff;
  transform-origin: left center;
  transform: translateX(-420px);

  /* Animations */
  /* Expand the entire sidenav outwards */
  @keyframes moveLoginPanel {
    0% {
      transform: translateX(420px);
      z-index: 100;
    }
    100% {
      transform: translateX(-0px);
    }
  }

  /* Move sub container */

  @keyframes showthis {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

const Header = styled.div`
  background-color: #00688b;
  color: #ffffff;
  /* width: 100%; */
  padding: 25px 0 25px 25px;
`;

const Column = styled.div``;
const Row = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 23px;
`;
const Desc = styled.div`
  padding-top: 15px;
  font-size: 18px;
  font-weight: 400;
`;

const Info = styled.p`
  /* text-decoration: underline; */
  color: #00688b;
  font-size: 14px;
  margin: 10px 30px;
  cursor: pointer;
`;

const closeBtn = {
  fontSize: "23px",
  color: "#FFFFFF",
  cursor: "pointer",
  marginRight: "30px",
};

const SideLogin = (props) => {
  return (
    <Container
      style={
        props.state === "entering"
          ? { animation: "moveLoginPanel .3s forwards" }
          : props.state === "entered"
          ? { transform: "translateX(0px)" }
          : { animation: "moveLoginPanel .3s reverse forwards" }
      }
    >
      <Header>
        <Column>
          <Row>
            <Title>Log in</Title>
            <div
              style={
                props.state === "entering"
                  ? { animation: "show .3s forwards" }
                  : props.state === "entered"
                  ? { opacity: "1" }
                  : { animation: "show .3s reverse forwards" }
              }
              onClick={props.closePanel}
            >
              <CloseIcon style={closeBtn} />
            </div>
          </Row>
          <Row>
            <Desc>Your Account</Desc>
          </Row>
        </Column>
      </Header>
      <LoginForm state={props.state} closePanel={props.closePanel} />
    </Container>
  );
};

export default SideLogin;

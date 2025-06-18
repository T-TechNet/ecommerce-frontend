import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import SidenavContent from "./SidenavContent";
import { Transition } from "react-transition-group";
import SubContainer from "./SubContainer";
import { useMenuContext } from "../../context/MenuContext";

const Container = styled.div`
  max-width: 408px;
  overflow: hidden;
  width: 85%;
  height: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: #ffffff;
  transform-origin: left center;
  transform: translateX(-420px);

  /* Animations */
  /* Expand the entire sidenav outwards */
  @keyframes moveSideBar {
    0% {
      transform: translateX(-420px);
      z-index: 100;
    }
    100% {
      transform: translateX(-0px);
    }
  }

  /* Move sub container */

  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Move sub container */

  @keyframes moveSubContainer {
    0% {
      transform: translateX(420px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  /* Move main container in relation to sub container */

  @keyframes moveMainContainer {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-420px);
    }
  }
`;

const Header = styled.div`
  background: linear-gradient(90deg, #00688b 0%, #03a89e 100%);
  padding: 25px;
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

const closeBtn = {
  fontSize: "23px",
  //   fontWeight: "700",
  color: "#FFFFFF",
  cursor: "pointer",
};

const Sidenav = (props) => {
  const { subContainer } = useMenuContext();
  return (
    <Container
      style={
        props.state === "entering"
          ? { animation: "moveSideBar .3s forwards" }
          : props.state === "entered"
          ? { transform: "translateX(-0px)" }
          : { animation: "moveSideBar .25s reverse forwards" }
      }
    >
      <Header>
        <Column>
          <Row>
            <Title>Rangoon Discount</Title>
            <div
              style={
                props.state === "entering"
                  ? { animation: "show .3s forwards" }
                  : props.state === "entered"
                  ? { opacity: "1" }
                  : { animation: "show .3s reverse forwards" }
              }
              onClick={props.closeNav}
            >
              <CloseIcon style={closeBtn} />
            </div>
          </Row>
          <Row>
            <Desc>Categories</Desc>
          </Row>
        </Column>
      </Header>
      <Transition in={!subContainer} timeout={300} unmountOnExit mountOnEnter>
        {(state) => <SidenavContent state={state} closeNav={props.closeNav} />}
      </Transition>
      <Transition in={subContainer} timeout={300} unmountOnExit mountOnEnter>
        {(state) => <SubContainer state={state} closeNav={props.closeNav} />}
      </Transition>
    </Container>
  );
};

export default Sidenav;

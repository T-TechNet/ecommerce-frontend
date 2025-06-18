import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { Transition } from "react-transition-group";

const Container = styled.div`
  max-width: 370px;
  overflow: hidden;
  width: 75%;
  height: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  background-color: #ffffff;
 
  
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

const List = styled.ul`
  list-style: none;
  padding: 8px 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 25px;
  color: #002734;
  background: #fff;
  cursor: pointer;

  transition: 0.1s all ease-in-out;

  &:hover {
    color: #00688b;
    background-color: #e6f0f3;
  }
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #bfc9cc;
  margin: auto;
`;

const icon = {
  color: "#000",
  paddingRight: "10px",
};

const closeBtn = {
  fontSize: "23px",
  color: "#FFFFFF",
  cursor: "pointer",
  marginRight: "30px",
};

const SideUserPanel = (props) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const name = userInfo.name;

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(`/${userInfo.username}/${path}`);
    props.closePanel();
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("order");
      localStorage.removeItem("total");
      sessionStorage.setItem("guest", "true");
      window.location.href = "/";
    }
  };

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
            <Title>Hello</Title>
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
            <Desc>{name}</Desc>
          </Row>
        </Column>
      </Header>

      <List>
        <Item onClick={() => handleClick("profile")}>
          <PersonOutlineIcon style={icon} />
          Profile
        </Item>
        <Item onClick={() => handleClick("addresses")}>
          <LocationOnOutlinedIcon style={icon} />
          Addresses
        </Item>
        <Item onClick={() => handleClick("orders")}>
          <FavoriteBorderOutlinedIcon style={icon} />
          My Orders
        </Item>
      </List>

      <Hr></Hr>

      <List>
        <Item onClick={() => handleLogout()}>
          <LogoutOutlinedIcon style={icon} />
          Log Out
        </Item>
      </List>
    </Container>
  );
};

export default SideUserPanel;

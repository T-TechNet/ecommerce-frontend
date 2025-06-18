import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: none;

  @media only screen and (max-width: 860px) {
    display: flex;
    justify-content: center;
    width: 120%;
    margin-bottom: 20px;
    background: #e6f0f3;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 80%;
  padding: 15px 0 8px 0;
  color: #002734;
  font-size: 16px;
  font-weight: 700;
`;

const NavDiv = styled.div`
  display: flex;
  width: 95%;
`;
const Column = styled.div`
  padding: 10px 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.className ? "#00688b" : "#002734")};
  border-bottom: ${(props) =>
    props.className ? "3px solid #00688b" : "3px solid #E6F0F3"};
`;
const Label = styled.div``;

const SideMenuListMobile = ({ userInfo }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const navigate = useNavigate();

  return (
    userInfo && (
      <Container>
        <Wrapper>
          <Header>Hello, {userInfo.name}</Header>

          <NavDiv>
            <Column
              className={path === "profile"}
              onClick={() => navigate(`/${userInfo.username}/profile`)}
            >
              <AccountCircleOutlinedIcon />
              <Label>Profile</Label>
            </Column>

            <Column
              className={path === "addresses"}
              onClick={() => navigate(`/${userInfo.username}/addresses`)}
            >
              <LocationOnOutlinedIcon />
              <Label>Addresses</Label>
            </Column>

            <Column
              className={path === "orders"}
              onClick={() => navigate(`/${userInfo.username}/orders`)}
            >
              <ReceiptOutlinedIcon />
              <Label>My Orders</Label>
            </Column>
          </NavDiv>
        </Wrapper>
      </Container>
    )
  );
};

export default SideMenuListMobile;

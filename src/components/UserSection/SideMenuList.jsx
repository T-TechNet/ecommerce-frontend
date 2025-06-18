import React from "react";
import styled from "styled-components";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useLocation, useNavigate } from "react-router-dom";

const SideMenuContainer = styled.div`
  flex: 1;
  background-color: #e6f0f3;
  margin-right: 40px;
  border-radius: 8px;
  padding-bottom: 10px;
  max-width: 293px;
  height: 415px;
  flex-shrink: 0;
  @media only screen and (max-width: 860px) {
    display: none;
  }
`;

const Header = styled.div`
  color: #002734;
  font-size: 18px;
  font-weight: 600;
  padding: 20px 10px 10px 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 8px 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  /* margin: 5px 0; */
  cursor: pointer;
  border-left: ${(props) =>
    props.className ? "8px solid #00688b" : "8px solid #e6f0f3"};
  color: ${(props) => (props.className ? "#00688b" : "#002734")};
  background: ${(props) => props.className && "#fff"};

  transition: 0.1s all ease-in-out;

  &:hover {
    color: #00688b;
    border-left: 8px solid #00688b;
    background-color: #fff;
  }
`;

const Hr = styled.hr`
  width: 80%;
  border: 1px solid #bfc9cc;
  margin: auto;
`;

const icon = {
  color: "rgba(102, 125, 133, 1)",
  paddingRight: "10px",
};

const SideMenuList = ({ userInfo }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const navigate = useNavigate();

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
    <SideMenuContainer>
      <Header>Account Settings</Header>
      <List>
        <Item
          className={path === "profile"}
          onClick={() => navigate(`/${userInfo.username}/profile`)}
        >
          <PersonOutlineIcon style={icon} />
          Profile
        </Item>
        <Item
          className={path === "addresses"}
          onClick={() => navigate(`/${userInfo.username}/addresses`)}
        >
          <LocationOnOutlinedIcon style={icon} />
          Addresses
        </Item>
      </List>

      <Hr></Hr>

      <Header>Items</Header>
      <List>
        <Item
          className={path === "orders"}
          onClick={() => navigate(`/${userInfo.username}/orders`)}
        >
          <FavoriteBorderOutlinedIcon style={icon} />
          My Orders
        </Item>
        <Item onClick={() => navigate(`/wishlist`)}>
          <ReceiptOutlinedIcon style={icon} />
          Wishlist
        </Item>
      </List>

      <Hr></Hr>

      <List>
        <Item onClick={() => handleLogout()}>
          <LogoutOutlinedIcon style={icon} />
          Log Out
        </Item>
      </List>
    </SideMenuContainer>
  );
};

export default SideMenuList;

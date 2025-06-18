import React from "react";
import "./Popup.css";
import CloseIcon from "@mui/icons-material/Close";
import Login from "../UserSection/Login";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const Wrapper = styled.div`
  padding: 16px;
  width: 100%;
  max-width: 640px;
  background-color: #fff;
  border-radius: 5px;
`;
const Nav = styled.div`
  background-color: #1e89b4;
  border-radius: 5px;
  margin: 0 10px;
`;

const H1 = styled.h1`
  padding: 9px;
  font-size: 19px;
  text-align: center;
  color: white;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const Text = styled.p`
//   margin-bottom: 15px;
//   cursor: pointer;
//   letter-spacing: 1px;
//   /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
//   font-size: 15px;
//   color: #354f60;
//   /* background-color: #354f60; */

//   &:hover {
//     font-weight: bold;
//     text-shadow: 0 0 5px lightgray;
//   }
// `;

const icon = {
  padding: "7px",
  fontSize: "26px",
  marginRight: "10px",
  color: "white",
  cursor: "pointer",
};

const Popup = ({ setUser, loginPopup, setLoginPopup }) => {
  // const action = (setLoginPopup, product, count) => {
  //   setLoginPopup(false);
  //   // Cookies.set("guest", "true", { expires: 1 });
  //   sessionStorage.setItem("guest", "true");
  //   if (product.category[0] === "laptop") {
  //     count ? handleAddProduct(product, count) : handleAddProduct(product, 1);
  //   }
  // };

  return loginPopup ? (
    <Container className="popup">
      <Wrapper className="popup-inner">
        <Nav className="nav">
          <H1>Please sign in before continuing</H1>
          <CloseIcon
            className="close-btn"
            style={icon}
            onClick={() => setLoginPopup(false)}
          ></CloseIcon>
        </Nav>
        <Div>
          <Login
            setUser={setUser}
            popup={loginPopup}
            setLoginPopup={setLoginPopup}
          />
          {/* <Text onClick={() => action(setLoginPopup, product, count)}>
            Or Continue as Guest?
          </Text> */}
        </Div>
      </Wrapper>
    </Container>
  ) : (
    ""
  );
};

export default Popup;

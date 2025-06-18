import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";

const Container = styled.div`
  height: 50px;
  width: 100%;
  background-color: #dee3e5;
  display: flex;
  align-items: center;
  justify-content: center;
  /* z-index: 0px; */
  position: relative;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 1150px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
`;

const Button = styled.div`
  color: ${({ isMobileView }) => (isMobileView ? "black" : "#00688b")};
  font-size: 16px;
  font-weight: lighter;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuItem = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  color: #00688b;
  font-weight: 600;
  height: 100%;
  cursor: pointer;

  background: ${(props) =>
    props.className &&
    "linear-gradient(#dee3e5, #dee3e5) padding-box,linear-gradient(to right, #00688b, #03a89e) border-box"};
  border-radius: 3px;
  border: 1.5px solid transparent;

  &:hover {
    background: linear-gradient(#dee3e5, #dee3e5) padding-box,
      linear-gradient(to right, #00688b, #03a89e) border-box;
    border-radius: 3px;
    border: 1.5px solid transparent;
  }
`;

const burger = {
  marginRight: "10px",
};

const Navbar = ({ click }) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const targetRef = useRef(null);

  const showProfile = () => {
    setClicked(true);
    navigate("/about-us");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        setClicked(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const location = useLocation();

  const path2 = location.pathname;
  // console.log(path2)

  return (
    <>
      {path2 === "/myorders/mobile/ordNum" ? (
        ""
      ) : (
        <>
          <Container>
            <Wrapper>
              <MenuItem
                onClick={() => {
                  setClicked(false);
                  click();
                }}
              >
                <MenuIcon style={{ burger }} />
                <Button>Categories</Button>
              </MenuItem>
              <MenuItem
                ref={targetRef}
                className={clicked}
                onClick={(e) => showProfile(e)}
              >
                <Button>About Us</Button>
              </MenuItem>
            </Wrapper>
          </Container>
        </>
      )}
    </>
  );
};

export default Navbar;

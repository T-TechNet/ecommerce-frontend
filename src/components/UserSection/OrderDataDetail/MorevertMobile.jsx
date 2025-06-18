import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import MorevertSheet from "./MorevertSheet";

const MainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justifycontent: center;
  alignitems: center;
  z-index: 10;
`;
const Container = styled.div`
  position: fixed;
  overflow: visible;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
  background-color: #f8f9f9;
  transition: transform 0.3s ease-out;
  transform: translateY(100%);
  z-index: 10;
  border-radius: 30px 30px 0 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Label = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #000000;
`;

const MorevertMobile = ({
  open,
  setOpen,
  orderIndex,
  info,
  productDetails,
}) => {
  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    open && (
      <MainContainer>
        <Container
          className={`bottomSheet ${open ? "open" : ""}`}
          onClick={(e) => handleClick(e)}
        >
          <Wrapper>
            <Header>
              <Label>Order</Label>
              <CloseIcon onClick={() => setOpen(false)} />
            </Header>

            <MorevertSheet
              info={info}
              orderIndex={orderIndex}
              productDetails={productDetails}
            />
          </Wrapper>
        </Container>
      </MainContainer>
    )
  );
};

export default MorevertMobile;

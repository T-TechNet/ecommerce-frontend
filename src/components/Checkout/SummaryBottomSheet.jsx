import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import "../Categories/bottomsheet.css";
import Finalist from "./Finalist";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* height: 400px; */
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
  font-size: 20px;
  color: #000000;
`;

const OverflowContainer = styled.div`
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const SummaryBottomSheet = ({
  open,
  setOpen,
  setCartItems,
  cartItems,
  total,
  deli,
  orderProducts,
  orderTotal,
  deliFee,
}) => {
  return (
    <Container className={`bottomSheet ${open ? "open" : ""}`}>
      <Wrapper>
        <Header>
          <Label>Order Summary</Label>
          <CloseIcon onClick={() => setOpen(false)} />
        </Header>
        <OverflowContainer>
          <Finalist
            setCartItems={setCartItems}
            cartItems={cartItems}
            total={total}
            deli={deli}
            orderProducts={orderProducts}
            orderTotal={orderTotal}
            deliFee={deliFee}
          />
        </OverflowContainer>
      </Wrapper>
    </Container>
  );
};

export default SummaryBottomSheet;

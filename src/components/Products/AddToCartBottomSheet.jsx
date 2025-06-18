import React from "react";
import styled from "styled-components";
import "../Categories/bottomsheet.css";
import AddToCartContent from "./AddToCartContent";

const Container = styled.div`
  position: fixed;
  overflow: hidden;
  bottom: 0;
  left: 0;
  right: 0;
  /* height: 500px; */
  background-color: #f8f9f9;
  transition: transform 0.3s ease-out;
  transform: translateY(100%);
  z-index: 10;
  border-radius: 30px 30px 0 0;
`;

const AddToCartBottomSheet = ({ click, open, setOpen, product, count }) => {
  return open && product ? (
    <Container className={`bottomSheet ${open ? "open" : ""}`}>
      <AddToCartContent
        click={click} // open login side panel when user is not logged in
        open={open}
        setOpen={setOpen}
        product={product}
        count={count}
      />
    </Container>
  ) : (
    ""
  );
};

export default AddToCartBottomSheet;

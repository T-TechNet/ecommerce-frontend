import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import Reorder from "./Reorder";
///Reorder Detail Sheet For ReorderBtn in Cancel Detail (data passed from cart)
import ReorderDetail from "./ReorderDetail";

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
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
  background-color: #f8f9f9;
  transition: transform 0.3s ease-out;
  transform: translateY(100%);
  z-index: 100;
  border-radius: 30px 30px 0 0;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Label = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #000000;
`;
const ShowContent = styled.div`
  height: auto;
`;
const Hr = styled.hr`
  width: 100%;
  border: 1px solid #bfc9cc;
  margin: 10px 0;
`;
const ReorderBtn = styled.button`
  margin: 5px 0;
  display: flex;
  align-self: center;
  width: 80%;
  height: 40px;
  color: #fff;
  background: #00688b;
  border-radius: 5px;
  border-color: #00688b;
  border-width: 1px;
  font-weight: bold;
  font-size: 15px;
  align-items: center;
  justify-content: center;
`;
const ButtonContainer = styled.div`
display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  border-radius: 4px;
  padding: 8px 16px;
  border: 1px solid #94a4aa;
  margin: 10px;
  color: #00688b;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  background: #fff;

  &:hover {
    background-color: #E6F6F5;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }

    @media only screen and (max-width: 300px){
        margin: 3px;
    }
`;

const SubmitButton = styled.button`
  border-radius: 4px;
  border: none;
  background: #00688B;
  padding: 8px 16px;
  color: #fff;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;

  &:hover {
    background-color: #2B829F;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }

  @media only screen and (max-width: 300px){
    margin: 3px;
}
  
`;
const ProductHeader = styled.h4`
  width: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const PriceHeader = styled.h4`
  width: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const QtyHeader = styled.h4`
  width: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const TotalHeader = styled.h4`
  width: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const ReorderDetailSheet = ({ open, setOpen, item }) => {
  const [deviceType, setDeviceType] = useState("");
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(isMobile ? "mobile" : "desktop");
    };

    handleResize(); // Call the function initially

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
  };
 
  const handleCancel = () => {
    // CLOSING DIALOG BOX WHEN USER CLICKS CANCEL BUTTON
    setOpen(false);
    console.log("hello world");
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
              <Label>Reorder the following items ? </Label>
              <CloseIcon onClick={() => setOpen(false)} />
            </Header>
            <div style={{ display: "flex" }}>
            <ProductHeader>Product</ProductHeader>
            <PriceHeader>Price</PriceHeader>
            <QtyHeader>Quantity</QtyHeader>
            <TotalHeader>Total</TotalHeader>
          </div>
           <Hr></Hr>
            {isMobile ? (<>
              <ShowContent>
                <Reorder item={item} />
              </ShowContent>
               <Hr></Hr>
               <ReorderBtn>Reorder</ReorderBtn>
               </>
            ) : (
              <>
              <ShowContent>
                <ReorderDetail item={item} />
              </ShowContent>
              <Hr></Hr>
              <ButtonContainer>
          <CancelButton onClick={() => handleCancel()}>Cancel</CancelButton>
          <SubmitButton>Reorder</SubmitButton>
        </ButtonContainer>
              </>
            )}

           
          </Wrapper>
        </Container>
      </MainContainer>
    )
  );
};

export default ReorderDetailSheet;

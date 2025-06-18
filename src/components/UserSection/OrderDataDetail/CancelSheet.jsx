import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const Wrapper = styled.div`
  padding: 8px 30px;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 10px;
  animation: pop-swirl linear 250ms forwards;

  @keyframes pop-swirl {
    0% {
      transform: scale(0) rotate(0deg);
      z-index: 10;
    }

    50% {
      transform: scale(0.5) rotate(0deg);
      z-index: 10;
    }

    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @media only screen and (max-width: 759px) {
    width: 70%;
  }
`;
const HeaderDiv = styled.div`
padding: 5px 0px; 
  display: flex;
  justify-content: space-between;
`;
const Header = styled.p`
  color: #D52B2B;
  font-size: 18px;
  font-weight: 700;
`;
const Message = styled.div`
  padding: 5px 0;
  font-size: 16px;
  font-weight: 400;
`;
const Hr = styled.hr`
  width: 100%;
  border: 1px solid #bfc9cc;
  margin: 10px 0px;
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
  background: #D52B2B;
  padding: 8px 16px;
  color: #fff;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;

  &:hover {
    background-color: #00688B;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }

  @media only screen and (max-width: 300px){
    margin: 3px;
}
  
`;
const CancelSheet = ({ open, setOpen }) => {
  const handleClick = (event) => {
    event.preventDefault();
  };
  const handleCancel = () => {
    // CLOSING DIALOG BOX WHEN USER CLICKS CANCEL BUTTON
    setOpen(false);
  };

  return open ? (
    <Container
      className={`bottomSheet ${open ? "open" : ""}`}
      onClick={(e) => handleClick(e)}
    >
      <Wrapper>
        <HeaderDiv>
          <Header>Cancel Order</Header>
         
        </HeaderDiv>
        <Message>
          We are working on your order! Are you sure you want to cancel this ?
        </Message>
        <Hr></Hr>
        <ButtonContainer>
          <CancelButton onClick={() => handleCancel()}>Cancel</CancelButton>
          <SubmitButton>Confirm</SubmitButton>
        </ButtonContainer>
      </Wrapper>
    </Container>
  ) : (
    ""
  );
};

export default CancelSheet;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Checkout from "./Checkout/Checkout";

const Container = styled.div`
  height: fit-content;
  display: flex;
`;
const Wrapper = styled.div`
  width: 100%;
  margin: 0 10px;
  padding: 20px;

  border: 1px solid #dee3e5;
  box-shadow: 0px 1px 15px 1px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  border-top: 6px solid #03a89e;
  position: relative;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1203px) {
    padding: 10px;
  }
  @media screen and (max-width: 759px) {
  }
`;

const TitleContainer = styled.div`
  top: 0;
  left: 0;
  width: 80%;
  align-items: center;
`;

const Title = styled.div`
  padding-bottom: 20px;
  font-weight: 700;
  font-size: 18px;
  line-height: 120%;
  color: #002734;
`;
const Information = styled.div`
  padding: 12px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;

  @media only screen and (max-width: 1203px) {
    flex-direction: column;
  }
`;
const Info = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => (props.className === "saving" ? "#2B9456" : "#758a91")};
  @media screen and (max-width: 1203px) {
    width: ${(props) => props.className === "subtotal" && "70px"};
  }
`;

const Data = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 120%;
  color: #002734;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const SmallPrice = styled.div`
  font-weight: 400;
  font-size: 14px;
  padding-top: 5px;
  text-align: right;
  text-decoration: line-through;
  text-decoration-color: #2b9456;
  color: #758a91;
`;

const Saving = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: #2b9456;
  border-radius: 4px;
  padding: 3px 8px;
`;

const Button = styled.button`
  width: 100%;
  margin: 10px 0;
  padding: 16px 32px;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  background: #00688b;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  }

  @media only screen and (max-width: 1203px) {
    font-size: 13px;
    padding: 8px 2px;
  }
`;

const Hr = styled.hr`
  border: 1px solid #dee3e5;
  margin: 10px 0;
`;

const Summary = ({
  click,
  cartItems,
  productTotal,
  totalFinalAmount,
  totalItemCount,
  totalOrgAmount,
  totalSavingAmount,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  localStorage.setItem("total", totalFinalAmount);

  const getTotal = ({ total }) => {
    <Checkout cartItems={cartItems} total={totalFinalAmount} />;
  };

  return (
    <Container>
      <Wrapper>
        <TitleContainer>
          <Title>Cart Subtotal</Title>
        </TitleContainer>
        <Hr />
        <Information className="subtotal">
          {/* <Info className="subtotal">Subtotal ({totalItemCount} Items)</Info> */}
          <Info>Subtotal ({totalItemCount} Items)</Info>
          <Div>
            <Data>{totalFinalAmount.toLocaleString()} Ks.</Data>
            {/* <Data>{productTotal.toLocaleString()} Ks.</Data> */}
            {totalOrgAmount === 0 ? (
              <></>
            ) : (
              totalOrgAmount !== totalFinalAmount && ( // totalOrgAmount !== productTotal
                <SmallPrice>{totalOrgAmount.toLocaleString()} Ks.</SmallPrice>
              )
            )}
          </Div>
        </Information>
        <Information>
          <Info className="saving">Savings</Info>
          {totalSavingAmount > 0 ? (
            <Saving>- {totalSavingAmount.toLocaleString()} Ks.</Saving>
          ) : (
            <Saving>0 Ks.</Saving>
          )}
        </Information>
        <Hr
          style={{
            margin: "30px 0",
          }}
        />
        {/* {user ? (
          <Link to="/checkout">
            <Button onClick={() => getTotal({ productTotal })}>
              Continue to checkout ({totalItemCount})
            </Button>
          </Link>
        ) : (
          <Button onClick={click}>
            Continue to checkout ({totalItemCount})
          </Button>
        )} */}
        <Link to="/checkout/contact">
          <Button onClick={() => getTotal({ productTotal })}>
            Continue to checkout ({totalItemCount})
          </Button>
        </Link>
        {/* <Message>
          By clicking the checkout button above, you agree to our Terms and
          Conditions and Privacy Policy.
        </Message> */}
      </Wrapper>
    </Container>
  );
};

export default Summary;

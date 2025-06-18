import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Checkout from "./Checkout/Checkout";

const Container = styled.div`
  @media only screen and (max-width: 769px) {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`;
const Wrapper = styled.div`
  @media screen and (max-width: 769px) {
    width: 100%;
    padding-top: 20px;
    background: transparent;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;

// const TitleContainer = styled.div`
//   top: 0;
//   left: 0;
//   width: 80%;
//   align-items: center;
// `;

// const Title = styled.div`
//   padding-bottom: 20px;
//   font-weight: 700;
//   font-size: 18px;
//   line-height: 120%;
//   color: #002734;
// `;

const Information = styled.div`
  @media screen and (max-width: 769px) {
    padding: 5px 0;
    display: flex;
    align-items: center;
    gap: 30px;
  }
`;
const Info = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => (props.className === "saving" ? "#2B9456" : "#758a91")};
  @media only screen and (max-width: 400px) {
    font-size: 14px;
  }
`;

const Data = styled.div`
  @media screen and (max-width: 769px) {
    font-size: 16px;
    font-weight: 700;
    color: #002734;
    @media only screen and (max-width: 400px) {
      font-size: 14px;
    }
  }
`;

const Div = styled.div`
  @media screen and (max-width: 769px) {
    /* flex-direction: row; */
    display: flex;
    width: 87.5%;
    align-items: center;
    gap: 3px;
    // justify-content: space-between;
  }
`;

const SmallPrice = styled.div`
  font-weight: 400;
  font-size: 16px;
  padding-top: 5px;
  text-decoration: line-through;
  text-decoration-color: #2b9456;
  color: #758a91;
  padding-bottom: 5px;
  @media only screen and (max-width: 400px) {
    font-size: 14px;
  }
`;

const Saving = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: #2b9456;
  border-radius: 4px;
  padding: 3px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 70px;
`;

const Button = styled.button`
  @media screen and (max-width: 769px) {
    width: 87.5%;
    margin: 10px 0;
    padding: 16px 32px;
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    background: #00688b;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }

  @media screen and (max-width: 400px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

// const Message = styled.p`
//   text-align: center;
//   font-size: 13px;
// `;

const Hr = styled.hr`
  @media screen and (max-width: 769px) {
    border: 1px solid #dee3e5;
    margin-top: 10px;
    margin-left: -20px;
  }
`;

const SummaryMobile = ({
  // Summary_Mobile is the same as the Summary but there are some css changes
  click,
  cartItems,
  productTotal,
  totalItemCount,
  totalFinalAmount,
  totalOrgAmount,
  totalSavingAmount,
}) => {
  localStorage.setItem("total", totalFinalAmount);

  const getTotal = ({ total }) => {
    <Checkout cartItems={cartItems} total={totalFinalAmount} />;
  };

  return (
    <Container>
      <Wrapper>
        <Information className="subtotal">
          <Div>
            <Info>Subtotal: </Info>

            <Data>{totalFinalAmount.toLocaleString()} Ks.</Data>
            {totalOrgAmount === 0 ? (
              <></>
            ) : (
              totalOrgAmount !== totalFinalAmount && ( // totalOrgAmount !== productTotal
                <SmallPrice>{totalOrgAmount.toLocaleString()} Ks.</SmallPrice>
              )
            )}
          </Div>
        </Information>
        {/* {totalSavingAmount > 0 && (
          <Information>
            <Info className="saving">Savings</Info>
            <Saving>- {totalSavingAmount.toLocaleString()} Ks.</Saving>
          </Information>
        )} */}

        <Information>
          {
            totalSavingAmount > 0 && (
              <Saving>Save {totalSavingAmount.toLocaleString()} Ks.</Saving>
            )
            //  : (
            //   <Saving>0 Ks.</Saving>
            // )
          }
        </Information>
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
      <Hr />
    </Container>
  );
};

export default SummaryMobile;

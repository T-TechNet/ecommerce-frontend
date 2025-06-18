import React from "react";
import styled from "styled-components";
import cart from "../assets/Empty_Cart.svg";
import wishlist from "../assets/Empty_Wishlist.svg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Wishlist = styled.div`
  @media screen and (max-width: 1203px) {
    height: 794px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Cart = styled.div`
  @media screen and (max-width: 1203px) {
    height: 754px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const TitleWrapper = styled.div`
  padding: 10px 0 20px 0;
  display: flex;
  align-items: center;
  padding-top: ${(props) => props.className === "wishlist" && "40px"};
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 26px;
  color: #002734;
  text-align: left;

  @media only screen and (max-width: 759px) {
    font-size: 20px;
  }
`;
const ItemsCount = styled.div`
  font-weight: 400;
  font-size: 23px;
  color: #758a91;

  @media only screen and (max-width: 759px) {
    font-size: 20px;
  }
`;

const Display = styled.div`
  padding: 80px 40px 120px 40px;
  display: flex;
  align-items: flex-end;
  @media screen and (max-width: 1203px) {
    padding-top: ${(props) =>
      props.className === "wishlist" ? "140px:" : "140px"};
  }

  @media only screen and (max-width: 759px) {
    flex-direction: column;
    padding: 30px 30px 50px 30px;
    gap: 50px;
    align-items: center;
  }
`;
const Image = styled.img`
  width: 300px;

  @media only screen and (max-width: 759px) {
    width: 250px;
  }
`;
const InfoContainer = styled.div`
  width: 100%;
  padding-left: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 40px;

  @media only screen and (max-width: 759px) {
    gap: 30px;
    padding: 0px;
  }
`;
const Text = styled.h2`
  font-weight: 700;
  font-size: 32px;
  background: linear-gradient(180deg, #00688b 0%, #03a89e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media only screen and (max-width: 759px) {
    font-size: 23px;
  }
`;
const Description = styled.p`
  width: 400px;
  text-align: center;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  max-width: 350px;
`;
const Button = styled.div`
  width: 200px;
  padding: 16px 32px;
  gap: 8px;
  background: #00688b;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 16px;
  color: #ffffff;

  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const cartstyle = {
  display: "flex",
  paddingLeft: "20px",
  gap: "10px",
};

const EmptyPage = ({ page }) => {
  const navigate = useNavigate();
  return (
    <Container>
      {page === "cart" ? (
        <Cart>
          <TitleWrapper style={cartstyle}>
            <Title>My Cart</Title>
            <ItemsCount>&nbsp;(0 item)</ItemsCount>
          </TitleWrapper>
          <Display>
            <Image src={cart} />
            <InfoContainer>
              <Text>Your cart is empty </Text>
              <Description>
                Start shopping now and add amazing products to your cart !
              </Description>
              <Button onClick={() => navigate("/")}>Shop Now</Button>
            </InfoContainer>
          </Display>
        </Cart>
      ) : (
        <Wishlist>
          <TitleWrapper className="wishlist">
            <Title>Wishlist</Title>
            <ItemsCount>&nbsp;(0 item)</ItemsCount>
          </TitleWrapper>
          <Display className="wishlist">
            <Image src={wishlist} />
            <InfoContainer>
              <Text>Your wishlist is empty </Text>
              <Description>
                Ready to save your favorite items in your wishlist?
              </Description>
              <Button onClick={() => navigate("/")}>Shop Now</Button>
            </InfoContainer>
          </Display>
        </Wishlist>
      )}
    </Container>
  );
};

export default EmptyPage;

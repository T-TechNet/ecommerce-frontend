import React from "react";
import "./Popup.css";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useNavigate } from "react-router-dom";
import Checkout from "../Checkout/Checkout";

const Wrapper = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 5px;

  @media only screen and (max-width: 759px) {
    width: 92%;
  }
`;
const Nav = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 759px) {
    gap: 20px;
    flex-direction: ${(props) => props.className === "button" && "column"};
    align-items: ${(props) => props.className === "button" && "flex-start"};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 759px) {
    gap: ${(props) => props.className === "button" && "15px"};
    align-items: flex-start;
    width: ${(props) => props.className === "button" && "100%"};
    flex-direction: ${(props) =>
      props.className === "button" && "column-reverse"};
  }
`;
const Header = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #002734;
`;

const ItemSection = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  border-bottom: 1px solid #dee3e5;

  margin: 20px 0;
`;

const Text = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: #00688b;
  cursor: pointer;
`;

const ItemList = styled.div`
  font-weight: ${(props) => props.className === "row" && "600"};
  font-size: ${(props) => (props.className === "row" ? "18px" : "16px")};
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media only screen and (max-width: 759px) {
    display: ${(props) => props.id === "mobile" && "none"};
    gap: 10px;
  }
`;

const Column = styled.div`
  font-weight: 600;
  display: flex;
  flex: ${(props) => (props.id === "product" ? "2" : "1")};
  align-items: flex-start;
  justify-content: center;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 160px;
  object-fit: cover;
  padding-right: 20px;
  margin-top: -30px;

  @media only screen and (max-width: 759px) {
    width: 112px;
    margin: 0;
  }
`;

const Description = styled.div`
  font-weight: 400;
  color: ${(props) => (props.className === "qty" ? "#758A91" : "#002734")};
  color: ${(props) => props.className === "remove" && "#CC0000"};
  padding: 0 20px 0 0;
  padding-bottom: ${(props) => props.className === "desc" && "10px"};
  padding: ${(props) => props.className === "remove" && "0 20px"};
  margin: ${(props) => props.className === "remove" && "0 20px"};
  border-left: ${(props) =>
    props.className === "remove" && "1px solid #A3B1B6;"};
  display: flex;
  align-items: center;
  cursor: ${(props) => props.className === "remove" && "pointer"};

  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${(props) => props.className === "remove" && "#03A89E"};
  }
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #002734;
  padding-bottom: 5px;
  display: flex;
  flex: 1;
  justify-content: flex-start;
`;

const SmallPrice = styled.p`
  font-weight: 400;
  font-size: 14px;
  text-align: left;
  padding: 5px 0;
  text-decoration: line-through;
  text-decoration-color: #2b9456;
  color: #758a91;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  background: #2b9456;
  border-radius: 4px;

  gap: 5px;
  width: fit-content;
  padding: 3px 8px;
`;

const Tag = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
`;

const SavedPrice = styled.p`
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  color: #ffffff;
`;

const Button1 = styled.button`
  padding: 15px 32px;
  margin-right: 30px;
  gap: 8px;
  background: #ffffff;
  border: 2px solid #94a4aa;
  border-radius: 4px;
  font-weight: 700;
  font-size: 16px;
  color: #00688b;
  cursor: pointer;

  @media only screen and (max-width: 759px) {
    width: 100%;
    margin: 0;
  }
`;

const Button2 = styled.button`
  padding: 16px 32px;
  gap: 8px;
  background: #00688b;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    transform: translate(-0.5px, 0.5px);
  }

  @media only screen and (max-width: 759px) {
    width: 100%;
  }
`;

const Hr = styled.hr`
  width: 100%;
  margin-bottom: 10px;
  border: 0.5px solid #dee3e5;

  @media only screen and (max-width: 759px) {
    display: none;
  }
`;

const icon = {
  color: "#007E33",
  paddingRight: "10px",
};

const close = {
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "25px",
};

const AddToCartContent = ({ setOpen, product, count }) => {
  const navigate = useNavigate();
  let orgPrice;
  let finalPrice;

  const calculateFinalPrice = (qty, price) => {
    let total = qty * price;
    finalPrice = total;
    return total.toLocaleString();
  };

  const calculateOrgPrice = (qty, market_price) => {
    let total = qty * market_price;
    orgPrice = total;
    return total.toLocaleString();
  };

  const calculateSavedAmount = () => {
    let amount = orgPrice - finalPrice;
    return amount.toLocaleString();
  };

  const goToCheckout = () => {
    localStorage.setItem("total", finalPrice);
    <Checkout total={finalPrice} />;
    navigate("/checkout/contact");
  };

  return (
    product && (
      <Wrapper>
        <Nav>
          <ButtonBox>
            <TaskAltIcon style={icon} />
            <Header>Added to Cart !</Header>
          </ButtonBox>
          <ButtonBox style={close} onClick={() => setOpen(false)}>
            <CloseIcon />
          </ButtonBox>
        </Nav>

        <ItemSection>
          <ItemList id="mobile" className="row">
            <Column className="row" id="product">
              Product
            </Column>
            <Column className="row">Price</Column>
            <Column className="row">Quantity</Column>
            <Column className="row">Total</Column>
          </ItemList>
          <Hr></Hr>

          <ItemList key={product._id}>
            <Image src={product.image[0]}></Image>
            <InfoSection id="product">
              <Description className="desc">{product.title}</Description>
              <Description className="desc">
                <span style={{ color: "#758A91" }}>Quantity:&nbsp;</span>
                {count}
              </Description>
              {product.category[0] === "coupon" ? (
                <Price>
                  {calculateFinalPrice(count, product.market_price)} Ks.
                </Price>
              ) : (
                <Price>{calculateFinalPrice(count, product.price)} Ks.</Price>
              )}

              {product.discount_item && (
                <SmallPrice>
                  {calculateOrgPrice(count, product.market_price)} Ks.
                </SmallPrice>
              )}
              {product.discount_item && (
                <Box>
                  <Tag>Save</Tag>
                  <SavedPrice>{calculateSavedAmount()} Ks.</SavedPrice>
                </Box>
              )}
            </InfoSection>
          </ItemList>
        </ItemSection>

        <Nav className="button">
          <ButtonBox className="button" onClick={() => setOpen(false)}>
            <Text>Continue Shopping</Text>
          </ButtonBox>
          <ButtonBox className="button">
            <Button1 onClick={() => navigate("/cart")}>View Cart</Button1>

            {/* <Button2 onClick={() => navigate("/checkout")}>Checkout</Button2> */}

            {/* <Button2 onClick={() => goToCheckout()}>Checkout</Button2> */}
            {/* {user ? (
              <Button2 onClick={() => goToCheckout()}>Checkout</Button2>
            ) : (
              <Button2
                onClick={() => {
                  setOpen(false);
                  click();
                }}
              >
                Checkout
              </Button2>
            )} */}

            <Button2 onClick={() => goToCheckout()}>Checkout</Button2>
          </ButtonBox>
        </Nav>
      </Wrapper>
    )
  );
};

export default AddToCartContent;

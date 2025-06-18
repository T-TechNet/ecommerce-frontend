import React from "react";
import "./Popup.css";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Link, useNavigate } from "react-router-dom";
import Checkout from "../Checkout/Checkout";

const Container = styled.div`
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const Wrapper = styled.div`
  padding: 16px;
  width: 1000px;
  background-color: #fff;
  border-radius: 5px;
  @media screen and (max-width: 1203px) {
    width: 1050px;
  }
`;

const Nav = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #002734;
`;

const ItemSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  @media only screen and (max-width: 1203px) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  font-weight: 600;
  display: flex;
  flex: ${(props) => (props.id === "product" ? "2" : "1")};
  align-items: flex-start;
  justify-content: center;
`;

const Image = styled.img`
  width: 160px;
  object-fit: cover;
  padding-right: 20px;
  margin-top: -30px;
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

const PriceSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 20px;
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #002734;
  padding-bottom: 5px;
  display: flex;
  flex: 1;
  justify-content: center;
`;

const SmallPrice = styled.p`
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  padding: 5px 0;
  text-decoration: line-through;
  text-decoration-color: #2b9456;
  color: #758a91;

  @media only screen and (max-width: 1203px) {
    width: 50%;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Tag = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: #2b9456;
  border-radius: 4px;
  padding: 3px 10px;
  margin-right: 10px;
`;

const SavedPrice = styled.p`
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  color: #2b9456;
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
`;

const Hr = styled.hr`
  width: 100%;
  margin-bottom: 10px;
  border: 0.5px solid #dee3e5;
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

const CartDialog = ({ click, cartPopup, setCartPopup, product, count }) => {
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

  return cartPopup && product ? (
    <Container className="popup">
      <Wrapper className="popup-inner">
        <Nav>
          <ButtonBox>
            <TaskAltIcon style={icon} />
            <Header>Added to Cart !</Header>
          </ButtonBox>
          <ButtonBox style={close} onClick={() => setCartPopup(false)}>
            <CloseIcon />
          </ButtonBox>
        </Nav>
        <ItemSection>
          <ItemList className="row">
            <Column className="row" id="product">
              Product
            </Column>
            <Column className="row">Price</Column>
            <Column className="row">Quantity</Column>
            <Column className="row">Total</Column>
          </ItemList>
          <Hr></Hr>

          <ItemList key={product._id}>
            <Column id="product">
              <Image src={product.image[0]}></Image>
              <Description className="desc">{product.title}</Description>
            </Column>

            <PriceSection>
              {/* {product.category[0] === "coupon" ? (
                <Price>{product.market_price.toLocaleString()} Ks.</Price>
              ) : (
                <Price>{product.price.toLocaleString()} Ks.</Price>
              )} */}

              <Price>{product.price.toLocaleString()} Ks.</Price>

              {product.discount_item || product.coupon_percent ? (
                <SmallPrice>
                  {product.market_price.toLocaleString()} Ks.
                </SmallPrice>
              ) : (
                <></>
              )}
            </PriceSection>

            <Column>{count}</Column>
            <PriceSection>
              {/* {product.category[0] === "coupon" ? (
                <Price>
                  {calculateFinalPrice(count, product.market_price)} Ks.
                </Price>
              ) : (
                <Price>{calculateFinalPrice(count, product.price)} Ks.</Price>
              )} */}

              <Price>{calculateFinalPrice(count, product.price)} Ks.</Price>

              {product.discount_item || product.coupon_percent ? (
                <SmallPrice>
                  {calculateOrgPrice(count, product.market_price)} Ks.
                </SmallPrice>
              ) : (
                <></>
              )}
              {product.discount_item || product.coupon_percent ? (
                <Box>
                  <Tag>You Save</Tag>
                  <SavedPrice>{calculateSavedAmount()} Ks.</SavedPrice>
                </Box>
              ) : (
                <></>
              )}
            </PriceSection>
          </ItemList>
        </ItemSection>
        <Nav>
          <ButtonBox onClick={() => setCartPopup(false)}>
            <Text>Continue Shopping</Text>
          </ButtonBox>
          <ButtonBox>
            <Link to="/cart">
              <Button1>View Cart</Button1>
            </Link>
            {/* <Link to="/checkout">
              <Button2>Checkout</Button2>
            </Link> */}

            {/* {user ? (
              <Button2 onClick={() => goToCheckout()}>Checkout</Button2>
            ) : (
              <Button2
                onClick={() => {
                  setCartPopup(false);
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
      {/* <AddToCartBottomSheet
        open={cartPopup}
        setOpen={setCartPopup}
        product={product}
        count={count}
      /> */}
    </Container>
  ) : (
    ""
  );
};

export default CartDialog;

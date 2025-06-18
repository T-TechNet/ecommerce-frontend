import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import "../UserSection/OrderDataDetail/Scroll.css";
import "../Products/Popup.css";

const Container = styled.div`
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
  width: 150px;
  object-fit: contain;
`;

const Description = styled.div`
  font-weight: 400;
  color: #002734;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
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

const Hr = styled.hr`
  width: 100%;
  margin-bottom: 10px;
  border: 0.5px solid #dee3e5;
`;

const close = {
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "25px",
};

const ViewItems = ({
  cartPopup,
  setCartPopup,
  cartItems,
  totalItemCount,
  orderProducts,
}) => {
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
  return cartPopup ? (
    <>
      <Container className="popup">
        <Wrapper className="popup-inner">
          <Nav>
            <Header>Items ({totalItemCount})</Header>

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

            <div
              className="scrollable-content"
              style={{
                height: "400px",
                width: "90%",
                overflowY: "scroll",
                overflowX: "hidden",
                /* Hide the scrollbar for WebKit-based browsers */
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* IE and Edge */,
                "&::-webkit-scrollbar": {
                  width: "0.5em",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {cartItems &&
                cartItems.map((item, index) => (
                  <ItemList key={item._id}>
                    <Column id="product">
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            width: "160px",
                            display: "flex",
                            alignItems: "top",
                            justifyContent: "center",
                            height: "150px",
                            marginRight: "10px",
                          }}
                        >
                          <Image src={item.image[0]}></Image>
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <Description>{item.title}</Description>
                        </div>
                      </div>
                    </Column>
                    <PriceSection>
                      <Price>{item.price.toLocaleString()} Ks.</Price>

                      {item.discount_item || item.coupon_percent ? (
                        <SmallPrice>
                          {item.market_price.toLocaleString()} Ks.
                        </SmallPrice>
                      ) : (
                        <></>
                      )}
                    </PriceSection>
                    <Column>{cartItems[index].quantity}</Column>
                    <PriceSection>
                      <Price>
                        {calculateFinalPrice(
                          cartItems[index].quantity,
                          item.price
                        )}{" "}
                        Ks.
                      </Price>

                      {item.discount_item || item.coupon_percent ? (
                        <SmallPrice>
                          {" "}
                          {calculateOrgPrice(
                            cartItems[index].quantity,
                            item.market_price
                          )}{" "}
                          Ks.
                        </SmallPrice>
                      ) : (
                        <></>
                      )}
                      {item.discount_item || item.coupon_percent ? (
                        <Box>
                          <Tag>You Save</Tag>
                          <SavedPrice>{calculateSavedAmount()} Ks.</SavedPrice>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </PriceSection>
                  </ItemList>
                ))}

              {orderProducts &&
                orderProducts.map((item, index) => (
                  <ItemList key={item._id}>
                    <Column id="product">
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            width: "160px",
                            display: "flex",
                            alignItems: "top",
                            justifyContent: "center",
                            height: "150px",
                            marginRight: "10px",
                          }}
                        >
                          <Image src={item.imageURL}></Image>
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <Description>{item.productTitle}</Description>
                        </div>
                      </div>
                    </Column>
                    <PriceSection>
                      <Price>{item.price.toLocaleString()} Ks.</Price>

                      {item.discount > 0 || item.coupon_percent ? (
                        <SmallPrice>
                          {item.market_price.toLocaleString()} Ks.
                        </SmallPrice>
                      ) : (
                        <></>
                      )}
                    </PriceSection>
                    <Column>{orderProducts[index].quantity}</Column>
                    <PriceSection>
                      <Price>
                        {calculateFinalPrice(
                          orderProducts[index].quantity,
                          item.price
                        )}{" "}
                        Ks.
                      </Price>

                      {item.discount > 0 || item.coupon_percent ? (
                        <SmallPrice>
                          {" "}
                          {calculateOrgPrice(
                            orderProducts[index].quantity,
                            item.market_price
                          )}{" "}
                          Ks.
                        </SmallPrice>
                      ) : (
                        <></>
                      )}
                      {item.discount > 0 || item.coupon_percent ? (
                        <Box>
                          <Tag>You Save</Tag>
                          <SavedPrice>{calculateSavedAmount()} Ks.</SavedPrice>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </PriceSection>
                  </ItemList>
                ))}
            </div>
          </ItemSection>
        </Wrapper>
      </Container>
    </>
  ) : (
    ""
  );
};

export default ViewItems;

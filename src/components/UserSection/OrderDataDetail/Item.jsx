import React from "react";
import styled from "styled-components";

const ShowContent = styled.div`
  height: auto;
  max-height: 380px;
  overflow: auto;
`;

const PriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
  justify-content: flex-start;
`;

const Price = styled.h4`
  color: #000;
  font-size: 15px;
`;

const TotalPriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: flex-end;
  justify-content: flex-start;
`;

const SaveDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

const Save = styled.button`
  padding: 4px 8px 4px 8px;
  margin-right: 10px;

  border-radius: 4px;
  border: none;
  background: #2b9456;

  color: #fff;

  cursor: pointer;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const Qty = styled.h4`
  width: 20%;
  display: flex;
  font-size: 14px;
  align-items: flex-start;
  justify-content: center;
`;

const ItemCol1 = styled.div`
  width: 10%;
`;

const ItemCol2 = styled.div`
  display: flex;
  width: 90%;
  font-size: 12px;
`;

const ItemWrapper = styled.div``;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const ItemImg = styled.img`
  width: 90%;
  height: 90%;
  position: relative;
`;

const Brand = styled.p`
  font-size: 14px;
  @media only screen and (min-width: 900px) {
    font-size: 15px;
  }
`;

const Product = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Market = styled.p`
  text-decoration: line-through;
  color: #2b9456;
  font-size: 14px;
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #bfc9cc;
  margin: 10px 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Row = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Item = ({ item, order }) => {
  let priceTotal = 0;
  let marketPriceTotal = 0;

  const calculateTotalOfEachItem = (qty, price) => {
    let total = qty * price;
    priceTotal += total;
    return <Price>{total.toLocaleString()} Ks.</Price>;
  };

  const calculateTotalMarketPriceOfEachItem = (qty, mk_price) => {
    let total = qty * mk_price;
    marketPriceTotal += total;
    return <Market>{total.toLocaleString()} Ks.</Market>;
  };

  return (
    <>
      <ShowContent className="scrollable-content">
        {item &&
          item.map((item, index) => (
            <>
              <ItemWrapper key={item._id}>
                <Div>
                  <ItemCol1>
                    <ItemImg src={item.imageURL} />
                  </ItemCol1>

                  <ItemCol2>
                    <Product>
                      <Brand>{item.productTitle}</Brand>
                    </Product>

                    <PriceDiv>
                      <Price>{item.price.toLocaleString()} Ks.</Price>
                      {/* {item.market_price > 0 && (
                        <Market>
                          {item.market_price.toLocaleString()} Ks.
                        </Market>
                      )} */}
                    </PriceDiv>
                    <Qty>
                      <strong>{item.quantity}</strong>
                    </Qty>
                    <TotalPriceDiv>
                      {calculateTotalOfEachItem(item.quantity, item.price)}
                      {/* <Price>{item.price.toLocaleString()} Ks.</Price> */}
                      {
                        item.market_price > 0 &&
                          item.market_price > item.price &&
                          calculateTotalMarketPriceOfEachItem(
                            item.quantity,
                            item.market_price
                          )
                        // <Market>
                        //   {item.market_price.toLocaleString()} Ks.
                        // </Market>
                      }
                    </TotalPriceDiv>
                  </ItemCol2>
                </Div>
                {item.market_price > 0
                  ? item.market_price > item.price && (
                      <>
                        <SaveDiv>
                          <Save>You Save </Save>
                          <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                            {item.market_price * item.quantity -
                              item.price * item.quantity}{" "}
                            Ks.
                          </p>
                        </SaveDiv>
                      </>
                    )
                  : ""}
                <Hr></Hr>
              </ItemWrapper>
            </>
          ))}
      </ShowContent>
      {item && (
        <Footer>
          <Col>
            <Row>
              {item.length === 1 ? (
                <span style={{ color: "#758A91" }}>
                  Subtotal ({item.length} item)
                </span>
              ) : (
                <span style={{ color: "#758A91" }}>
                  Subtotal ({item.length} items)
                </span>
              )}

              <div>
                <strong>{priceTotal.toLocaleString()} Ks.</strong>{" "}
                {marketPriceTotal > priceTotal && (
                  <Market>{marketPriceTotal.toLocaleString()} Ks.</Market>
                )}
              </div>
            </Row>
            {marketPriceTotal > priceTotal && (
              <Row>
                <span style={{ color: "#2b9456" }}>Savings</span>
                <Save>
                  {(marketPriceTotal - priceTotal).toLocaleString()} Ks.
                </Save>
              </Row>
            )}
            <Row>
              <span style={{ color: "#758A91" }}>Delivery fees</span>
              <strong>
                {order && order.delivery_fees.toLocaleString()} Ks.
              </strong>
            </Row>
            <Hr></Hr>
            <Row>
              <span style={{ color: "#758A91" }}>Total</span>
              <strong>{order && order.amount.toLocaleString()} Ks.</strong>
            </Row>
          </Col>
        </Footer>
      )}
    </>
  );
};

export default Item;

import React from "react";
import styled from "styled-components";
import "./Scroll.css";

const Container = styled.div`
  padding: 20px 15px;
`;

const Wrapper = styled.div`
  height: auto;
  max-height: 380px;
  overflow: auto;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 17px;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  padding: 7px;
  position: relative;
`;

const Col1 = styled.div`
  width: 40%;
`;

const Col2 = styled.div`
  width: 60%;
  font-size: 12px;
`;

const Brand = styled.h5`
  font-size: 14px;
  font-weight: 400;
  color: #002734;
  padding: 5px 0;

  // adding text overflow at the end of 3rd line

  /* height: 72px;
  line-height: 24px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: pre-wrap; */
`;

const Price = styled.p`
  display: inline-block;
  color: #00688b;
  font-weight: bold;
  margin-right: 7px;
  padding: 5px 0;
`;

const Save = styled.button`
  display: inline-flex;
  padding: 2px 4px;
  margin: 5px 0;
  align-items: flex-start;
  gap: 10px;

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

const ItemMobile = ({ item, order, setFinalSubTotal, setOriginalSubTotal }) => {
  const handleClick = (event) => {
    event.preventDefault();
  };

  let priceTotal = 0;
  let marketPriceTotal = 0;

  const calculateTotalOfEachItem = (qty, price) => {
    let total = qty * price;
    priceTotal += total;
    setFinalSubTotal(priceTotal);
    return <Price>{total.toLocaleString()} Ks.</Price>;
  };

  const calculateTotalMarketPriceOfEachItem = (qty, mk_price) => {
    let total = qty * mk_price;
    marketPriceTotal += total;
    setOriginalSubTotal(marketPriceTotal);
    return (
      <p style={{ textDecoration: "line-through" }}>
        {total.toLocaleString()} Ks.
      </p>
    );
  };

  return (
    <>
      {item && (
        <Container onClick={(e) => handleClick(e)}>
          <Wrapper className="scrollable-content">
            {item.map((item, index) => (
              <Div key={item._id}>
                <Col1>
                  <Img src={item.imageURL} />
                </Col1>

                <Col2>
                  <div style={{ overflow: "hidden" }}>
                    <Brand>{item.productTitle}</Brand>
                  </div>

                  {calculateTotalOfEachItem(item.quantity, item.price)}

                  <strong
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      padding: "0 5px",
                    }}
                  >
                    X {item.quantity}
                  </strong>

                  {
                    item.market_price > 0 &&
                      item.market_price > item.price &&
                      calculateTotalMarketPriceOfEachItem(
                        item.quantity,
                        item.market_price
                      )
                    // <p style={{ textDecoration: "line-through" }}>
                    //   {item.market_price} Ks.
                    // </p>
                  }

                  {item.market_price > 0 && item.market_price > item.price && (
                    <Save>
                      Save{" "}
                      {(
                        item.market_price * item.quantity -
                        item.price * item.quantity
                      ).toLocaleString()}{" "}
                      Ks.
                    </Save>
                  )}
                </Col2>
              </Div>
            ))}
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default ItemMobile;

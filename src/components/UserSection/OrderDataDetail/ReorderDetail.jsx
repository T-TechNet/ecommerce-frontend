import React from "react";
import styled from "styled-components";
import "./Scroll.css";
const Container = styled.div`
  padding: 0 20px;
`;
// const Wrapper = styled.div`
//   height: auto;
//   max-height: 380px;
//   overflow: auto;
// `;
// const Div = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   width: 100%;
// `;
// const Img = styled.img`
//   width: 70px;
//   height: 70px;
//   position: relative;
// `;

// const Col1 = styled.div`
//   width: 10%;
// `;
// const Col2 = styled.div`
//   display: flex;
//   width: 90%;
//   font-size: 12px;
  
// `;
// const Product = styled.div`
//   width: 35%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: flex-start;

// `;
// const Brand = styled.p`
//   font-size: 16px;
// `;
// const PriceDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 25%;
//   align-items: flex-end;
//   justify-content: flex-start;
  
// `;
// const Price = styled.h4`
//   color: #000;
//   font-size: 16px;
// `;
// const Qty = styled.h4`
//   width: 20%;
//   display: flex;
//   font-size: 14px;
//   align-items: flex-start;
//   justify-content: center;

// `;
// const SaveDiv = styled.div`
//   display: flex;
//   align-items: flex-start;
//   justify-content: flex-end;
// `;
// const Save = styled.button`
//   padding: 4px 8px 4px 8px;
//   margin-right: 10px;

//   border-radius: 4px;
//   border: none;
//   background: #2b9456;

//   color: #fff;

//   cursor: pointer;

//   font-size: 14px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 150%;
// `;

///////
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
  font-size: 16px;
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
  align-items: center;
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
  width: 80%;
  height: 80%;
  position: relative;
`;
const Brand = styled.p`
  font-size: 16px;
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

const ReorderDetail = ({ item }) => {

  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Container onClick={(e) => handleClick(e)}>
       
      <ShowContent className="scrollable-content">
      {item.map((item, index) => (
          <>
            <ItemWrapper>
              <Div>
                <ItemCol1>
                  <ItemImg src={item.image[index]} />
                </ItemCol1>
                <ItemCol2>
                  <Product>
                    <Brand>{item.title}</Brand>
                  </Product>

                  <PriceDiv>
                    <Price>{item.price}.Ks</Price>
                    <Market>{item.market_price} .Ks</Market>
                  </PriceDiv>
                  <Qty>
                    <strong> {item.quantity}</strong>
                  </Qty>
                  <TotalPriceDiv>
                    <Price>{item.price}.Ks</Price>
                    <Market>{item.market_price} .Ks</Market>
                  </TotalPriceDiv>
                </ItemCol2>
              </Div>
              {item.market_price ? (
                <>
                  <SaveDiv>
                    <Save>You Save </Save>
                    <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                      {item.market_price - item.price}
                      Ks
                    </p>
                  </SaveDiv>
                </>
              ) : (
                ""
              )}
              
            </ItemWrapper>
          </>
        ))}
        </ShowContent>
      
      </Container>
    </>
  );
};

export default ReorderDetail;

import React from "react";
import styled from "styled-components";
import "./Scroll.css";
const Container = styled.div`
  padding: 0 20px;
`;
const Wrapper = styled.div`
  height: auto;
  max-height: 380px;
  overflow: auto;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;
const Img = styled.img`
  width: 70px;
  height: 70px;
  position: relative;
`;

const Col1 = styled.div`
  width: 10%;
`;
const Col2 = styled.div`
  display: flex;
  width: 90%;
  font-size: 12px;
  
`;
const Product = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

`;
const Brand = styled.p`
  font-size: 16px;
`;
const PriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  align-items: flex-end;
  justify-content: flex-start;
  
`;
const Price = styled.h4`
  color: #000;
  font-size: 16px;
`;
const Qty = styled.h4`
  width: 20%;
  display: flex;
  font-size: 14px;
  align-items: flex-start;
  justify-content: center;

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
const ProductHeader = styled.h4`
  width: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const PriceHeader = styled.h4`
  width: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const QtyHeader = styled.h4`
  width: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const TotalHeader = styled.h4`
  width: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const Hr = styled.hr`
  width: 100%;
  border: 1px solid #bfc9cc;
  margin: 10px 0;
`;
const ReorderDesktop = ({ product }) => {

  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <>
     <div style={{ display: "flex" }}>
            <ProductHeader>Product</ProductHeader>
            <PriceHeader>Price</PriceHeader>
            <QtyHeader>Quantity</QtyHeader>
            <TotalHeader>Total</TotalHeader>
          </div>
          <Hr></Hr>
      <Container onClick={(e) => handleClick(e)}>
        <Wrapper className="scrollable-content">
          <div style={{marginBottom: '25px'}}>
          <Div>
            <Col1>
              <Img src={product.img1} />
            </Col1>
            <Col2>
              <Product>
                <Brand>{product.img1brand}</Brand>
                <Brand>{product.img1desc}</Brand>
              </Product>

              <PriceDiv>
                <Price>{product.img1Price} Ks.</Price>
                <p
                  style={{
                    textDecoration: "line-through",
                    color: "#2b9456",
                    fontSize: "14px",
                  }}
                >
                  {product.img1OrgPrice} Ks
                </p>
              </PriceDiv>
              <Qty>
                <strong> {product.img1Qty}</strong>
              </Qty>
              <PriceDiv>
                <Price>{product.img1Price} Ks.</Price>
                <p
                  style={{
                    textDecoration: "line-through",
                    color: "#2b9456",
                    fontSize: "14px",
                  }}
                >
                  {product.img1OrgPrice} Ks
                </p>
              </PriceDiv>
            </Col2>
          </Div>
          <SaveDiv>
            <Save>You Save </Save>
            <p style={{ color: "#2b9456", fontWeight: "bold" }}>
              {product.img1Save}Ks
            </p>
          </SaveDiv>
          </div>
          
          {product.img2 && (
           
             <div style={{marginBottom: '25px'}}>
              <Div>
                <Col1>
                  <Img src={product.img2} />
                </Col1>
                <Col2>
                  <Product>
                    <Brand>{product.img2brand}</Brand>
                    <Brand>{product.img2desc}</Brand>
                  </Product>

                  <PriceDiv>
                    <Price>{product.img2Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img2OrgPrice} Ks
                    </p>
                  </PriceDiv>
                  <Qty>
                    <strong> {product.img2Qty}</strong>
                  </Qty>
                  <PriceDiv>
                    <Price>{product.img2Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img2OrgPrice} Ks
                    </p>
                  </PriceDiv>
                </Col2>
              </Div>
              <SaveDiv>
                <Save>You Save </Save>
                <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                  {product.img2Save}Ks
                </p>
              </SaveDiv>
              </div>
           
          )}

          {product.img3 && (
         <div style={{marginBottom: '25px'}}>
               <Div>
                <Col1>
                  <Img src={product.img3} />
                </Col1>
                <Col2>
                  <Product>
                    <Brand>{product.img3brand}</Brand>
                    <Brand>{product.img3desc}</Brand>
                  </Product>

                  <PriceDiv>
                    <Price>{product.img3Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img3OrgPrice} Ks
                    </p>
                  </PriceDiv>
                  <Qty>
                    <strong> {product.img3Qty}</strong>
                  </Qty>
                  <PriceDiv>
                    <Price>{product.img3Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img3OrgPrice} Ks
                    </p>
                  </PriceDiv>
                </Col2>
              </Div>
              <SaveDiv>
                <Save>You Save </Save>
                <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                  {product.img3Save}Ks
                </p>
              </SaveDiv>
            </div>
          ) }

          {product.img4 && (
         <div style={{marginBottom: '25px'}}>
              <Div>
                <Col1>
                  <Img src={product.img4} />
                </Col1>
                <Col2>
                  <Product>
                    <Brand>{product.img4brand}</Brand>
                    <Brand>{product.img4desc}</Brand>
                  </Product>

                  <PriceDiv>
                    <Price>{product.img4Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img4OrgPrice} Ks
                    </p>
                  </PriceDiv>
                  <Qty>
                    <strong> {product.img4Qty}</strong>
                  </Qty>
                  <PriceDiv>
                    <Price>{product.img4Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img4OrgPrice} Ks
                    </p>
                  </PriceDiv>
                </Col2>
              </Div>
              <SaveDiv>
                <Save>You Save </Save>
                <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                  {product.img4Save}Ks
                </p>
              </SaveDiv>
            </div>
          ) }

          {product.img5 && (
             <div style={{marginBottom: '25px'}}>
               <Div>
                <Col1>
                  <Img src={product.img5} />
                </Col1>
                <Col2>
                  <Product>
                    <Brand>{product.img5brand}</Brand>
                    <Brand>{product.img5desc}</Brand>
                  </Product>

                  <PriceDiv>
                    <Price>{product.img5Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img5OrgPrice} Ks
                    </p>
                  </PriceDiv>
                  <Qty>
                    <strong> {product.img5Qty}</strong>
                  </Qty>
                  <PriceDiv>
                    <Price>{product.img5Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img5OrgPrice} Ks
                    </p>
                  </PriceDiv>
                </Col2>
              </Div>
              <SaveDiv>
                <Save>You Save </Save>
                <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                  {product.img5Save}Ks
                </p>
              </SaveDiv>
            </div>
          ) }
          {product.img6 &&(
            <div style={{marginBottom: '25px'}}>
               <Div>
                <Col1>
                  <Img src={product.img6} />
                </Col1>
                <Col2>
                  <Product>
                    <Brand>{product.img6brand}</Brand>
                    <Brand>{product.img6desc}</Brand>
                  </Product>

                  <PriceDiv>
                    <Price>{product.img6Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img6OrgPrice} Ks
                    </p>
                  </PriceDiv>
                  <Qty>
                    <strong> {product.img6Qty}</strong>
                  </Qty>
                  <PriceDiv>
                    <Price>{product.img6Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img6OrgPrice} Ks
                    </p>
                  </PriceDiv>
                </Col2>
              </Div>
              <SaveDiv>
                <Save>You Save </Save>
                <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                  {product.img6Save}Ks
                </p>
              </SaveDiv>
            </div>
          ) }
          {product.img7 &&(
             <div style={{marginBottom: '25px'}}>
              <Div>
                <Col1>
                  <Img src={product.img7} />
                </Col1>
                <Col2>
                  <Product>
                    <Brand>{product.img7brand}</Brand>
                    <Brand>{product.img7desc}</Brand>
                  </Product>

                  <PriceDiv>
                    <Price>{product.img7Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img7OrgPrice} Ks
                    </p>
                  </PriceDiv>
                  <Qty>
                    <strong> {product.img7Qty}</strong>
                  </Qty>
                  <PriceDiv>
                    <Price>{product.img7Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img7OrgPrice} Ks
                    </p>
                  </PriceDiv>
                </Col2>
              </Div>
              <SaveDiv>
                <Save>You Save </Save>
                <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                  {product.img7Save}Ks
                </p>
              </SaveDiv>
            </div>
          )}
          {product.img8 && (
             <div style={{marginBottom: '25px'}}>
              <Div>
                <Col1>
                  <Img src={product.img8} />
                </Col1>
                <Col2>
                  <Product>
                    <Brand>{product.img8brand}</Brand>
                    <Brand>{product.img8desc}</Brand>
                  </Product>

                  <PriceDiv>
                    <Price>{product.img8Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img8OrgPrice} Ks
                    </p>
                  </PriceDiv>
                  <Qty>
                    <strong> {product.img8Qty}</strong>
                  </Qty>
                  <PriceDiv>
                    <Price>{product.img8Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img8OrgPrice} Ks
                    </p>
                  </PriceDiv>
                </Col2>
              </Div>
              <SaveDiv>
                <Save>You Save </Save>
                <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                  {product.img8Save}Ks
                </p>
              </SaveDiv>
            </div>
          ) }

          {product.img9 && (
             <div style={{marginBottom: '25px'}}>
             <Div>
                <Col1>
                  <Img src={product.img9} />
                </Col1>
                <Col2>
                  <Product>
                    <Brand>{product.img9brand}</Brand>
                    <Brand>{product.img9desc}</Brand>
                  </Product>

                  <PriceDiv>
                    <Price>{product.img9Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img9OrgPrice} Ks
                    </p>
                  </PriceDiv>
                  <Qty>
                    <strong> {product.img9Qty}</strong>
                  </Qty>
                  <PriceDiv>
                    <Price>{product.img9Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img9OrgPrice} Ks
                    </p>
                  </PriceDiv>
                </Col2>
              </Div>
              <SaveDiv>
                <Save>You Save </Save>
                <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                  {product.img9Save}Ks
                </p>
              </SaveDiv>
            </div>
          ) }

          {product.img10 && (
             <div style={{marginBottom: '25px'}}>
              <Div>
                <Col1>
                  <Img src={product.img10} />
                </Col1>
                <Col2>
                  <Product>
                    <Brand>{product.img10brand}</Brand>
                    <Brand>{product.img10desc}</Brand>
                  </Product>

                  <PriceDiv>
                    <Price>{product.img2Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img10OrgPrice} Ks
                    </p>
                  </PriceDiv>
                  <Qty>
                    <strong> {product.img10Qty}</strong>
                  </Qty>
                  <PriceDiv>
                    <Price>{product.img10Price} Ks.</Price>
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#2b9456",
                        fontSize: "14px",
                      }}
                    >
                      {product.img10OrgPrice} Ks
                    </p>
                  </PriceDiv>
                </Col2>
              </Div>
              <SaveDiv>
                <Save>You Save </Save>
                <p style={{ color: "#2b9456", fontWeight: "bold" }}>
                  {product.img10Save}Ks
                </p>
              </SaveDiv>
            </div>
          ) }
        </Wrapper>
      </Container>
    </>
  );
};

export default ReorderDesktop;

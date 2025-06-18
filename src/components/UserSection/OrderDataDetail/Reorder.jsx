import React from "react";
import styled from "styled-components";
import "./Scroll.css"
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
margin-bottom: 17px;
`
const Img = styled.img`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  padding: 7px;
  position: relative;
`;

const Col1 = styled.div`
width: 40%;
`
const Col2 = styled.div`
width: 60%;
font-size: 12px;
`
const Brand = styled.h5`
font-size: 12px;
`
const Price = styled.p`
display:inline-block;
color: #00688B;
font-weight: bold;
margin-right: 7px;
`
const Save = styled.button`

display: inline-flex;
padding: 2px 4px 2px 4px;
align-items: flex-start;
gap: 10px;

  border-radius: 4px;
  border: none;
  background: #2B9456;
 
  color: #fff;
 
  cursor: pointer;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`

const Reorder = ({ product }) => {
  
const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <>
<Container onClick={(e) => handleClick(e)}>
        <Wrapper className="scrollable-content">
        
        <Div>
            <Col1>
            <Img src={product.img1} />
            </Col1>
            <Col2>
            <Brand>{product.img1brand}</Brand>
            <Brand>{product.img1desc}</Brand>
            <Price>{product.img1Price} Ks.</Price><strong>X {product.img1Qty}</strong>
            <p style={{textDecoration: 'line-through'}}>{product.img1OrgPrice} Ks</p>
            <Save>Save {product.img1Save}Ks</Save>
            
            </Col2>
          </Div>
          {product.img2 ? (<><Div>
            <Col1>
            <Img src={product.img2} />
            </Col1>
            <Col2>
            <Brand>{product.img2brand}</Brand>
            <Brand>{product.img2desc}</Brand>
            <Price>{product.img2Price} Ks.</Price><strong>X {product.img2Qty}</strong>
            <p style={{textDecoration: 'line-through'}}>{product.img2OrgPrice} Ks</p>
            <Save>Save {product.img2Save}Ks</Save>
            </Col2>
          </Div></>) : '' }
          
          {product.img3 ? (<><Div>
            <Col1>
            <Img src={product.img3} />
            </Col1>
            <Col2>
            <Brand>{product.img3brand}</Brand>
            <Brand>{product.img3desc}</Brand>
            <Price>{product.img3Price} Ks.</Price><strong>X {product.img3Qty}</strong>
            <p style={{textDecoration: 'line-through'}}>{product.img3OrgPrice} Ks</p>
            <Save>Save {product.img3Save}Ks</Save>
            </Col2>
          </Div></>): '' }
          
          {product.img4 ? (<><Div>
            <Col1>
            <Img src={product.img4} />
            </Col1>
            <Col2>
            <Brand>{product.img4brand}</Brand>
            <Brand>{product.img4desc}</Brand>
            <Price>{product.img4Price} Ks.</Price><strong>X {product.img4Qty}</strong>
            <p style={{textDecoration: 'line-through'}}>{product.img4OrgPrice} Ks</p>
            <Save>Save {product.img4Save}Ks</Save>
            </Col2>
          </Div></>) : ''}
          
          {product.img5 ? (<><Div>
            <Col1>
            <Img src={product.img5} />
            </Col1>
            <Col2>
            <Brand>{product.img5brand}</Brand>
            <Brand>{product.img5desc}</Brand>
            <Price>{product.img5Price} Ks.</Price><strong>X {product.img5Qty}</strong>
            <p style={{textDecoration: 'line-through'}}>{product.img5OrgPrice} Ks</p>
            <Save>Save {product.img5Save}Ks</Save>
            </Col2>
          </Div></>) : ''}
          {product.img6 ? (<><Div>
            <Col1>
            <Img src={product.img6} />
            </Col1>
            <Col2>
            <Brand>{product.img6brand}</Brand>
            <Brand>{product.img6desc}</Brand>
            <Price>{product.img6Price} Ks.</Price><strong>X {product.img6Qty}</strong>
            <p style={{textDecoration: 'line-through'}}>{product.img6OrgPrice} Ks</p>
            <Save>Save {product.img6Save}Ks</Save>
            </Col2>
          </Div></>) :''}
          {product.img7 ? (<><Div>
            <Col1>
            <Img src={product.img7} />
            </Col1>
            <Col2>
            <Brand>{product.img7brand}</Brand>
            <Brand>{product.img7desc}</Brand>
            <Price>{product.img7Price} Ks.</Price><strong>X {product.img7Qty}</strong>
            <p style={{textDecoration: 'line-through'}}>{product.img7OrgPrice} Ks</p>
            <Save>Save {product.img7Save}Ks</Save>
            </Col2>
          </Div></>) : ''}
          {product.img8 ? (<><Div>
            <Col1>
            <Img src={product.img8} />
            </Col1>
            <Col2>
            <Brand>{product.img8brand}</Brand>
            <Brand>{product.img8desc}</Brand>
            <Price>{product.img8Price} Ks.</Price><strong>X {product.img8Qty}</strong>
            <p style={{textDecoration: 'line-through'}}>{product.img8OrgPrice} Ks</p>
            <Save>Save {product.img8Save}Ks</Save>
            </Col2>
          </Div></>) :""}
          
          {product.img9 ? (<><Div>
            <Col1>
            <Img src={product.img9} />
            </Col1>
            <Col2>
            <Brand>{product.img9brand}</Brand>
            <Brand>{product.img9desc}</Brand>
            <Price>{product.img9Price} Ks.</Price><strong>X {product.img9Qty}</strong>
            <p style={{textDecoration: 'line-through'}}>{product.img9OrgPrice} Ks</p>
            <Save>Save {product.img9Save}Ks</Save>
            </Col2>
          </Div></>) : ''}
          
          {product.img10 ? (<><Div>
            <Col1>
            <Img src={product.img10} />
            </Col1>
            <Col2>
            <Brand>{product.img10brand}</Brand>
            <Brand>{product.img10desc}</Brand>
            <Price>{product.img10Price} Ks.</Price><strong>X {product.img10Qty}</strong>
            <p style={{textDecoration: 'line-through'}}>{product.img10OrgPrice} Ks</p>
            <Save>Save {product.img10Save}Ks</Save>
            </Col2>
          </Div></>) :''}
          
         
        </Wrapper>
      </Container>
    </>
  );
};

export default Reorder;

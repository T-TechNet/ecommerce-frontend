import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RowContainer = styled.div`
  width: 1140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px; /* Add optional gap between image cards */

  @media screen and (max-width: 769px) {
    width: 100%;
    gap: 10px;
  }
`;

const CartDiv = styled.div`
  width: 48%;
  height: 350px;
  border: 1px solid #8c8c8c;
  border-radius: 8px;
  background: #fff;

  &:hover {
    box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.16);
    transform: translate(-1px, 1px);
    transition: all 0.5s ease;
  }

  @media only screen and (max-width: 654px) {
    width: 48%;
  }

  @media only screen and (max-width: 390px) {
    width: 97%;
  }

  @media screen and (min-width: 390px) and (max-width: 640px) {
    height: 300px;
  }
`;

const ImgDiv = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 390px) and (max-width: 640px) {
    height: 160px;
  }
`;

const Img = styled.img`
  width: 80%;
  height: 90%;
  object-fit: contain;
  object-position: center;

  @media only screen and (max-width: 390px) {
    width: 70%;
    height: 95%;
  }
  @media only screen and (min-width: 390px) and (max-width: 470px) {
    width: 90%;
    height: 95%;
  }
`;

const Desc = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  color: #002734;
  padding: 5px 0;

  // adding text overflow at the end of 3rd line

  line-height: 24px;
  height: 72px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: pre-wrap;
`;

const Price = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${(props) =>
    props.className === "org-price" ? "#758A91" : "#002734"};
  font-weight: ${(props) => (props.className === "org-price" ? "400" : "700")};
  text-decoration: ${(props) =>
    props.className === "org-price" && "line-through"};
  text-decoration-color: #d52b2b;
  padding: 5px 0;
  margin-right: 10px;
`;

const Discount = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  @media screen and (max-width: 769px) {
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    background-color: #cc0000;
    padding: 3px 7px;
    border: 0.1px solid #cc0000;
    border-radius: 4px;
    right: -10px;
  }
`;

const ProductItemMobile = ({ item }) => {
  let array = [0, 1, 2, 3];

  return (
    <RowContainer>
      {item.length === 0 ? (
        <>
          {/* SKELETON */}
          {array.map((i) => (
            <CartDiv key={i}>
              <div style={{ width: "100%" }}>
                <ImgDiv>
                  <Img />
                </ImgDiv>
                <div style={{ margin: "0 10px 0 20px" }}>
                  <Desc></Desc>
                </div>
              </div>
            </CartDiv>
          ))}
        </>
      ) : (
        item.slice(0, 4).map((product) => (
          <CartDiv key={product._id}>
            <Link to={`/${product.category}/product/${product._id}`}>
              <div style={{ width: "100%" }}>
                <ImgDiv>
                  <Img src={product.image[0]} alt={product.title} />
                </ImgDiv>
                <div style={{ margin: "0 10px" }}>
                  <Desc>{product.title}</Desc>
                  <h4>{product.price.toLocaleString()} Ks.</h4>

                  {product.discount_item ? (
                    <Discount>
                      <Price className="org-price">
                        {product.market_price.toLocaleString()} Ks.
                      </Price>
                      <Tag>{product.discount}%</Tag>
                    </Discount>
                  ) : product.coupon_percent ? (
                    <Discount>
                      <Price className="org-price">
                        {product.market_price.toLocaleString()} Ks.
                      </Price>
                      <Tag>{product.coupon_percent}%</Tag>
                    </Discount>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </Link>
          </CartDiv>
        ))
      )}
    </RowContainer>
  );
};

export default ProductItemMobile;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToDbWishlist } from "../../utility/wishlist";

const Container = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tooltip = styled.div`
  display: none;
  font-size: 14px;
  font-weight: lighter;
  width: 100px;
  position: absolute;
  top: 5px;
  right: 50px;
  padding: 5px 15px;
  color: #fff;
  background-color: #577079;
  border: 0.3px solid white;
  border-radius: 3px;

  &:after {
    content: " ";
    position: absolute;
    right: -5px;
    top: 8px;
    border-top: 5px solid transparent;
    border-right: none;
    border-left: 5px solid #577079;
    border-bottom: 5px solid transparent;
  }
`;

const Fav = styled.div`
  display: none;
  position: absolute;
  top: 15px;
  right: 18px;
  padding: 8px 8px 4px 8px;
  color: #fff;
  opacity: 0.7;

  background-color: #000;
  border-radius: 50%;

  &:hover {
    background-color: #577079;
    cursor: pointer;
    opacity: 1;
    transform: translate(-1px, 1px);
    transition: all 0.5s ease;
  }

  &:hover ${Tooltip} {
    display: block;
  }
`;

const Fav2 = styled.div`
  display: none;
  position: absolute;
  top: 15px;
  right: 18px;
  padding: 8px 8px 4px 8px;
  color: #fff;

  background-color: #cc0000;
  border-radius: 50%;
`;

const ProductWrapper = styled.div`
  box-sizing: border-box;
  width: 216px;
  height: 320px;
  transition: all 0.8s ease;
  position: relative;

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  /* margin: 5px 0; */
  gap: 8px;

  background-color: #ffffff;

  border: 1px solid #8c8c8c;
  border-radius: 8px;

  &:hover {
    box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.16);
    transform: translate(-1px, 1px);
    transition: all 0.5s ease;
  }

  &:hover ${Fav} {
    display: block;

    @media only screen and (max-width: 759px) {
      display: none;
    }
  }

  &:hover ${Fav2} {
    display: block;

    @media only screen and (max-width: 759px) {
      display: none;
    }
  }

  @media only screen and (max-width: 759px) {
    gap: 0;
    margin: 0px;
  }

  @media only screen and (max-width: 490px) {
    gap: 0;
    width: 180px;
    height: 265px;
    margin: 4px 0px;
  }

  @media only screen and (max-width: 420px) {
    gap: 0;
    width: 165px;
    height: 265px;
    margin: 4px 0px;
  }

  @media only screen and (max-width: 380px) {
    gap: 0;
    width: 160px;
    height: 265px;
    margin: 4px 0px;
  }

  @media only screen and (max-width: 320px) {
    gap: 0;
    width: 160px;
    height: 230px;
    margin: 4px 0px;
    /* justify-content: space-between; */
  }
`;

const ImgContainer = styled.div`
  /* flex: 1; */
  /* width: 186px; */
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 490px) {
    height: 140px;
    max-height: 150px;
  }

  @media only screen and (max-width: 320px) {
    width: 140px;
    height: 130px;
    justify-content: center;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  cursor: pointer;

  @media only screen and (max-width: 490px) {
    width: 88%;
    height: 88%;
  }
`;

const Info = styled.div`
  position: relative;
  /* padding-top: 10px; */
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;

  @media only screen and (max-width: 759px) {
    padding: 10px 0px;
  }

  @media only screen and (max-width: 490px) {
    width: 100%;
    padding: 0;
  }
`;

const Div = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Desc = styled.div`
  font-size: 16px;
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

  @media only screen and (max-width: 490px) {
    height: 46px;
    -webkit-line-clamp: 2;
  }
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
  padding: 8px 0;
  margin-right: 10px;

  @media only screen and (max-width: 759px) {
    font-size: ${(props) =>
      props.className === "org-price" ? "12px" : "14px"};
    margin-right: 5px;
  }
`;

const Discount = styled.div`
  width: 200px;
  position: absolute;
  top: 105px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 759px) {
    width: 100%;
    flex-direction: ${(props) => props.className === "coupon" && "column"};
    top: ${(props) => (props.className === "coupon" ? "60px" : "120px")};
  }

  @media only screen and (max-width: 490px) {
    align-items: center;
    top: ${(props) => (props.className === "coupon" ? "60px" : "80px")};
  }
`;

const Tag = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  background-color: #cc0000;
  padding: 3px 7px;
  border: 0.1px solid #cc0000;
  border-radius: 4px;

  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 490px) {
    font-size: 11px;
    padding: 2px 5px;
  }
`;

const ProductList = ({ item, wishList, handleWishList }) => {
  let count = 1;

  // FOR CHANGING WISHLIST ICON

  let wishListExist;

  const checkWishList = (id) => {
    wishListExist = undefined;
    let temp = wishList.find((w) => w._id === id);

    if (temp !== undefined) {
      wishListExist = temp;
    }
  };

  const addtoWishList = (product, count) => {
    const user = JSON.parse(localStorage.getItem("user"));

    handleWishList(product, count);
    if (user) {
      addToDbWishlist(product, count);
    }
  };

  return (
    <Container>
      <Link
        to={`/${item.category}/product/${item._id}`}
        style={{ textDecoration: "none" }}
      >
        <ProductWrapper>
          {checkWishList(item._id)}
          <ImgContainer>
            <Image src={item.image[0]} />
          </ImgContainer>
          <Info>
            <Div>
              <Desc>{item.title}</Desc>
            </Div>

            {/* {item.category[0] === "coupon" ? (
            <Discount className="coupon">
              <Price>{item.market_price.toLocaleString()} Ks.</Price>
              <Tag>{item.coupon_percent}%</Tag>
            </Discount>
          ) : (
            <Price>{item.price.toLocaleString()} Ks.</Price>
          )} */}

            <Price>{item.price.toLocaleString()} Ks.</Price>

            {item.discount > 0 ? (
              <Discount>
                <Price className="org-price">
                  {item.market_price.toLocaleString()} Ks.
                </Price>
                <Tag>{item.discount}%</Tag>
              </Discount>
            ) : item.coupon_percent ? (
              <Discount>
                <Price className="org-price">
                  {item.market_price.toLocaleString()} Ks.
                </Price>
                <Tag>{item.coupon_percent}%</Tag>
              </Discount>
            ) : (
              <> </>
            )}
          </Info>

          {wishListExist ? (
            <Fav2>
              <FavoriteIcon />
            </Fav2>
          ) : (
            <Fav onClick={() => addtoWishList(item, count)}>
              <FavoriteBorderIcon />
              <Tooltip>Add to wishlist</Tooltip>
            </Fav>
          )}
        </ProductWrapper>
      </Link>
    </Container>
  );
};

export default ProductList;

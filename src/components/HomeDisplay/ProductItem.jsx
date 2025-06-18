import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToDbWishlist } from "../../utility/wishlist";

const Tooltip = styled.div`
  display: none;
  font-size: 14px;
  font-weight: lighter;
  width: 100px;
  position: absolute;
  top: 2px;
  right: 45px;
  padding: 5px 2px;
  color: #fff;
  background-color: #5c5cd6;
  border: 0.3px solid white;
  border-radius: 3px;

  @media screen and (min-width: 860px) {
    padding: 5px 10px;
  }
  &:after {
    content: " ";
    position: absolute;
    right: -5px;
    top: 8px;
    border-top: 5px solid transparent;
    border-right: none;
    border-left: 5px solid #5c5cd6;
    border-bottom: 5px solid transparent;
  }
`;

const Fav = styled.div`
  display: none;
  position: absolute;
  top: 10px;
  right: 5px;
  padding: 5px 5px 0.25px 5px;
  color: #fff;
  opacity: 0.7;
  background-color: #000;
  border-radius: 50%;

  &:hover {
    background-color: #5c5cd6;
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
  top: 10px;
  right: 10px;
  padding: 5px 5px 0.25px 5px;
  color: #fff;
  background-color: #cc0000;
`;

const Desc = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  color: #002734;
  padding: 8px 0;
  margin-bottom: 5px;

  // adding text overflow at the end of 3rd line

  line-height: 25px;
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
  padding: 8px 0;
  margin-right: 10px;
`;

const Discount = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  background-color: #cc0000;
  padding: 3px 7px;
  border: 0.1px solid #cc0000;
  border-radius: 4px;
`;

const ImgDiv = styled.div`
  width: 100%;
  /* height: 180px; */
  height: 150px;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 5px;

  @media screen and (max-width: 900px) {
    height: 130px;
  }
`;

const ProductImage = styled.img`
  width: 85%;
  height: 95%;
  object-fit: contain;
  object-position: center;
  cursor: pointer;

  @media screen and (max-width: 900px) {
    width: 90%;
    height: 90%;
  }
`;

const ItemCart = styled.div`
  width: 20%;
  height: 320px;
  border: 1px solid #8c8c8c;
  border-radius: 8px;
  background: #fff;

  &:hover {
    box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.16);
    transform: translate(-1px, 1px);
    transition: all 0.5s ease;
  }
  &:hover ${Fav} {
    display: block;
  }

  &:hover ${Fav2} {
    display: block;
  }
`;
const ItemCart4 = styled.div`
  width: 24%;
  height: 320px;
  border: 1px solid #8c8c8c;
  border-radius: 8px;
  background: #fff;

  &:hover {
    box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.16);
    transform: translate(-1px, 1px);
    transition: all 0.5s ease;
  }
  &:hover ${Fav} {
    display: block;
  }

  &:hover ${Fav2} {
    display: block;
  }
  @media screen and (max-width: 900px) {
    height: 300px;
  }
`;
const ProductItem = ({ item, wishList, handleWishList }) => {
  let count = 1;

  const [isTablet, setIsTablet] = useState(false);

  const checkIsTablet = () => {
    const isTabletSize = window.innerWidth >= 1204;
    setIsTablet(isTabletSize);
  };

  useEffect(() => {
    checkIsTablet(); // Call the function on initial render

    // Event listener callback function to handle resize
    const handleResize = () => {
      checkIsTablet(); // Call the function when the window is resized
    };

    // Set the initial state
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let array = [0, 1, 2, 3, 4, 5, 6];

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
    <>
      {isTablet ? (
        <>
          {item.length === 0 ? (
            <>
              {/* SKELETON */}
              {array.slice(0, 5).map((i) => (
                <ItemCart key={i}>
                  <div style={{ width: "100%" }}>
                    <ImgDiv></ImgDiv>
                    <div style={{ marginLeft: "10px" }}>
                      <Desc></Desc>
                    </div>
                  </div>
                </ItemCart>
              ))}
            </>
          ) : (
            <>
              {item.slice(0, 5).map((product) => (
                <ItemCart key={product._id}>
                  <Link
                    to={`/${product.category}/product/${product._id}`}
                    key={product._id}
                  >
                    <div style={{ width: "100%" }}>
                      {checkWishList(product._id)}
                      <ImgDiv>
                        <ProductImage
                          src={product.image[0]}
                          alt={product.title}
                        />
                      </ImgDiv>
                      <div style={{ marginLeft: "10px" }}>
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
                        {wishListExist ? (
                          <Fav2>
                            <FavoriteIcon />
                          </Fav2>
                        ) : (
                          <Fav onClick={() => addtoWishList(product, count)}>
                            <FavoriteBorderIcon />
                            <Tooltip>Add to wishlist</Tooltip>
                          </Fav>
                        )}
                      </div>
                    </div>
                  </Link>
                </ItemCart>
              ))}
            </>
          )}
        </>
      ) : (
        <>
          {item.length === 0 ? (
            <>
              {array.slice(0, 4).map((i) => (
                <ItemCart key={i}>
                  <div style={{ width: "100%" }}>
                    <ImgDiv></ImgDiv>
                    <div style={{ marginLeft: "10px" }}>
                      <Desc></Desc>
                    </div>
                  </div>
                </ItemCart>
              ))}
            </>
          ) : (
            <>
              {item.slice(0, 4).map((product) => (
                <ItemCart4 key={product._id}>
                  <Link
                    to={`/${product.category}/product/${product._id}`}
                    key={product._id}
                  >
                    <div style={{ width: "100%" }}>
                      {checkWishList(product._id)}
                      <ImgDiv>
                        <ProductImage
                          src={product.image[0]}
                          alt={product.title}
                        />
                      </ImgDiv>
                      <div style={{ marginLeft: "10px" }}>
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
                        {wishListExist ? (
                          <Fav2>
                            <FavoriteIcon />
                          </Fav2>
                        ) : (
                          <Fav onClick={() => addtoWishList(product, count)}>
                            <FavoriteBorderIcon />
                            <Tooltip>Add to wishlist</Tooltip>
                          </Fav>
                        )}
                      </div>
                    </div>
                  </Link>
                </ItemCart4>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductItem;

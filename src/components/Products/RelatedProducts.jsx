import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { publicRequest } from "../../requestMethods";
import { addToDbWishlist } from "../../utility/wishlist";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1204px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  width: 1140px;

  @media screen and (max-width: 1204px) {
    width: 100%;
  }
`;

const InfoContainer = styled.div`
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Hr = styled.hr`
  border: none;
  height: 3px;
  background-image: linear-gradient(to right, #03a89e, #00688b);
  width: 120px;

  @media screen and (max-width: 769px) {
    display: none;
  }
`;

const Span = styled.span`
  height: 12px;
  width: 12px;
  background-color: #00688b;
  border-radius: 50%;
  display: inline-block;

  @media screen and (max-width: 769px) {
    display: none;
  }
`;

const Title = styled.div`
  width: fit-content;
  font-weight: 700;
  font-size: 26px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 769px) {
    font-size: 20px;
  }
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

  @media screen and (max-width: 769px) {
    display: none;
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

  @media screen and (max-width: 769px) {
    display: none;
  }
`;

const ProductSection = styled.div`
  display: flex;

  @media screen and (max-width: 1204px) {
    gap: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    overflow-x: scroll;
    padding-bottom: 10px;

    /* Firefox */
    scrollbar-color: #fff #fff; /* first is scrollbar, second is thumb */

    /* Chrome, Edge, and Safari */
    &::-webkit-scrollbar {
      width: 1px;
    }

    &::-webkit-scrollbar-track {
      background: #fff;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #fff;
    }
  }

  @media screen and (max-width: 769px) {
    gap: 20px;
  }
`;

const ProductWrapper = styled.div`
  width: 190px;
  height: 320px;
  transition: all 0.8s ease;
  position: relative;

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  margin: 8px;
  gap: 8px;

  background-color: #ffffff;

  border: 1px solid #dee3e5;
  border-radius: 8px;

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

  @media screen and (max-width: 1204px) {
    width: 185px;
    height: 310px;
    gap: 10px;
  }

  @media only screen and (max-width: 769px) {
    width: 150px;
    height: 250px;

    margin: 5px 0;

    &:hover ${Fav} {
      display: none;
    }

    &:hover ${Fav2} {
      display: none;
    }
  }
`;

const ImgContainer = styled.div`
  flex: 1;
  width: 186px;
  height: 157px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1204px) {
    width: 140px;
    height: 100px;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
  }

  // @media only screen and (max-width: 759px) {
  //   flex: 1;
  //   height: 157px;
  //   max-height: 157px;
  //   overflow: hidden;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 130px;
  // }
  @media only screen and (max-width: 769px) {
    flex: 1;
    height: 157px;
    max-height: 157px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  cursor: pointer;
`;

const Info = styled.div`
  position: relative;
  padding-top: 10px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (max-width: 759px) {
  }
`;

const Div = styled.div`
  overflow: hidden;
`;

const Desc = styled.div`
  font-size: 16px;
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

  @media screen and (max-width: 769px) {
    font-size: 14px;
    line-height: 24px;
    height: 49px;
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
`;

const Discount = styled.div`
  position: absolute;
  top: 120px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 769px) {
    position: absolute;
    top: 90px;
    display: flex;
    align-items: center;
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

  @media screen and (max-width: 769px) {
    right: -10px;
  }
`;

const RelatedProducts = ({
  id,
  category,
  brand,
  type,
  wishList,
  handleWishList,
}) => {
  const [count, setCount] = useState(1);

  let array = [0, 1, 2, 3, 4];

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

  const [products, setProducts] = useState();

  const getRelatedProducts = async () => {
    if (category?.length > 0 || type?.length > 0) {
      try {
        const res = await publicRequest.get(
          `/products?category=${category}&type=${type}&request=related&status=array`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (category === "laptop") {
      try {
        const res = await publicRequest.get(
          `/laptops?type=laptop&request=related`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    } else if (category === "network") {
      try {
        const res = await publicRequest.get(
          `/network?type=${type}&request=related`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    } else if (category === "coupon") {
      try {
        const res = await publicRequest.get(`/coupon-item?request=related`);
        setProducts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getRelatedProducts();
  }, [id, category, type]);

  return (
    <Container>
      <Wrapper>
        <InfoContainer>
          <TitleWrapper>
            <Title>Related Products</Title>
            <Hr></Hr>
            <Span></Span>
          </TitleWrapper>
        </InfoContainer>

        <ProductSection>
          {products
            ? products.slice(0, 5).map((product) => (
                <Link
                  to={`/${product.category}/product/${product._id}`}
                  style={{ textDecoration: "none" }}
                  key={product._id}
                >
                  <ProductWrapper>
                    {checkWishList(product._id)}
                    <ImgContainer>
                      <Image src={product.image[0]} />
                    </ImgContainer>
                    <Info>
                      <Div>
                        <Desc>{product.title}</Desc>
                      </Div>

                      <Price>{product.price.toLocaleString()} Ks.</Price>

                      {product.discount_item ? (
                        <Discount>
                          <Price className="org-price">
                            {product.market_price.toLocaleString()} Ks.
                          </Price>
                          <Tag>{product.discount}%</Tag>
                        </Discount>
                      ) : (
                        <></>
                      )}
                    </Info>

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
                  </ProductWrapper>
                </Link>
              ))
            : array.map((product) => (
                <ProductWrapper className="skeleton" key={product}>
                  <ImgContainer>{/* <Image /> */}</ImgContainer>
                  <Info>
                    <Div>
                      <Desc></Desc>
                    </Div>

                    <Price></Price>
                  </Info>
                </ProductWrapper>
              ))}
        </ProductSection>
      </Wrapper>
    </Container>
  );
};

export default RelatedProducts;

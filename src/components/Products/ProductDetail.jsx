import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";
// import Popup from "./Popup";
import PCDesktop from "./PCDesktop";
import ProductImageSlider from "./ProductImageSlider";
import RelatedProducts from "./RelatedProducts";
import CartDialog from "./CartDialog";
import Popup from "./Popup";
import { addToDbWishlist } from "../../utility/wishlist";
import "../../css/productDetail.css";
// import { Helmet } from "react-helmet";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ErrorPage from "../../pages/ErrorPage";
import Loading from "../Loading";

//for testing meta tag
import { Helmet } from "react-helmet-async";
// import HelmetAsync from "../../HelmetAsync";
/////////////

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media screen and (max-width: 1204px) {
    width: 100%;
  }
`;

const ContainerWrapper = styled.div`
  width: 1150px;
  padding-bottom: 50px;
  // @media screen and (max-width: 1203px) {
  //   width: 950px;
  // }
  @media screen and (max-width: 1204px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 30px 0 10px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: 1203px) {
    display: flex;
    flex-direction: column;
  }
`;

const Wrapper2 = styled.div`
  padding: 0 0 0 60px;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  padding-bottom: 30px;
  color: #002734;
  font-size: 26px;
  font-weight: 700;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StatusContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
`;

const Desc = styled.div`
  padding-bottom: 20px;
  font-size: 18px;
  font-weight: 400;
  color: #002734;
`;

const ArrowBox = styled.div`
  position: relative;
  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.1);
  width: 245px;
  margin: 0 25px;
  padding: 10px 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  &::after,
  &:before {
    bottom: 100%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
  }

  &:after {
    border-color: rgba(0, 0, 0, 0);
    border-right-color: #fff;
    border-width: 12px;
    top: 35%;
    left: -4%;
    margin-left: -10px;
  }

  &:before {
    border-color: rgba(161, 103, 45, 0);
    border-right-color: rgba(0, 0, 0, 0.03);
    border-width: 13px;
    top: 34%;
    left: -4.5%;
    margin-left: -13px;
  }

  @media only screen and (max-width: 759px) {
    display: none;
  }
`;

const Info = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #002734;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: ${(props) =>
    props.className === "market-price" ? "#758A91" : "#002734"};
  font-weight: ${(props) =>
    props.className === "market-price" ? "400" : "700"};
  text-decoration: ${(props) =>
    props.className === "market-price" && "line-through"};
  text-decoration-color: #d52b2b;
  padding: 10px 0;
`;

const Discount = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  background-color: #cc0000;
  padding: 3px 7px;
  margin-left: 25px;
  border: 0.1px solid #cc0000;
  border-radius: 4px;
`;

const SelectContainer = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Amount = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-right: 10px;
`;

const Number = styled.p`
  height: fit-content;
  padding: 5px 15px;
  font-size: 14px;
  font-weight: 700;
`;

const Button = styled.input`
  width: max-content;
  padding: 16px 32px;
  margin: 0 20px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background: ${(props) =>
    props.className !== "inactive" ? "#00688b" : "#B0BCC0"};
  cursor: ${(props) => (props.disabled === false ? "pointer" : "context-menu")};
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.disabled === false ? "#2b829f" : "#B0BCC0"};
    box-shadow: ${(props) =>
      props.disabled === false ? "0px 1px 2px rgba(0, 0, 0, 0.3)" : ""};
    transform: ${(props) =>
      props.disabled === false ? "translate(-0.5px, 0.5px)" : ""};
  }
`;

const Additional = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const icon = {
  padding: "10px",
  fontSize: "30px",
  border: "1px solid #94A4AA",
  borderRadius: "8px",
};

const lenovo = {
  padding: "10px",
  fontSize: "30px",
  border: "1px solid #94A4AA",
  borderRadius: "8px",
  color: "gray",
};

const fav = {
  flex: "1",
  color: "#cc0000",
  padding: "15px",
  cursor: "pointer",
  fontSize: "30px",
};

const info = {
  fontWeight: "400",
  fontSize: "18px",
};

const ProductDetail = ({
  click,
  user,
  setUser,
  handleAddProduct,
  handleWishList,
  wishList,
  deleteWishList,
  // setPageTitle,
  // setPageDescription,
  // setPageImage
}) => {
  const location = useLocation();
  const { category, id } = useParams();

  const [product, setProduct] = useState();
  const [serverError, setServerError] = useState(false); // for handling error
  // const [metaTagChanged, setMetaTagChanged] = useState(false);
  const [count, setCount] = useState(1);
  const [cartPopup, setCartPopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [copyLink, setCopyLink] = useState(false);

  const [imageUrl, setImageUrl] = useState();

  const [itemCode, setItemCode] = useState([]);

  let link; //  TO COPY / SHARE LINK

  let savingAmount;

  const saveDiscount = (marketPrice, price) => {
    savingAmount = marketPrice - price;
  };

  const shareLink = () => {
    link = "https://rangoondiscount.com" + location.pathname;
    setCopyLink(true);
    navigator.clipboard.writeText(link);
  };

  // useEffect(() => {
  //   const getMetaTags = async () => {
  //     setMetaTagChanged(false);
  //     await publicRequest
  //       .get(`/products/find/getInfo?id=${id}`)
  //       .then((res) => {
  //         updateMetaTags(res.data.title, res.data.desc, res.data.image[0]);
  //         // setPageTitle( res.data[0].title);
  //         // setPageDescription( res.data[0].desc);
  //         // setPageImage( res.data[0].image[0]);
  //         setMetaTagChanged(true);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   getMetaTags();
  // }, [id]);

  useEffect(() => {
    const getProduct = async () => {
      await publicRequest
        .get(`/products/find/getInfo?id=${id}`)
        .then((res) => {
          setProduct(res.data);
          setImageUrl(res.data.image[0]);
          let itemCodeArray = res.data.itemCode;
          let result = itemCodeArray.join(", ");
          setItemCode(result);
          // updateMetaTags(res.data.title, res.data.desc, res.data.image[0]);
          // // setPageTitle( res.data[0].title);
          // // setPageDescription( res.data[0].desc);
          // // setPageImage( res.data[0].image[0]);
          // setMetaTagChanged(true);
        })
        .catch((err) => {
          // console.log(err);
          if (err.response.status === 500) {
            setServerError(true);
            // console.log(err.response.data);
          }
        });
    };
    getProduct();
  }, [id]);

  //update meta tags for social media share
  // const updateMetaTags = async (title, desc, image) => {
  //   const metatitle = title;
  //   const description = desc;
  //   const metaimage = image;

  //   const metaTags = [
  //     { property: "og:title", content: metatitle },
  //     { property: "og:description", content: description },
  //     { property: "og:image", content: metaimage },
  //   ];

  //   metaTags.forEach(({ property, content }) => {
  //     const tag = document.querySelector(`meta[property="${property}"]`);

  //     if (tag) {
  //       tag.setAttribute("property", property);
  //       tag.setAttribute("content", content);
  //     } else {
  //       const newTag = document.createElement("meta");
  //       newTag.setAttribute("property", property);
  //       newTag.setAttribute("content", content);
  //       document.head.appendChild(newTag);
  //     }
  //   });
  // };

  function handleCount(type) {
    if (type === "decrease") {
      count > 1 && setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  }

  const showProductInfo = ({ product }) => {
    return <PCDesktop item={product} />;
  };

  const addtoCart = (e, product, count) => {
    e.preventDefault();

    // const guest = sessionStorage.getItem("guest");
    // if (user || guest === "true") {
    //   setPopup(false);
    //   // if (category === "laptop") {
    //   //   handleAddProduct(product, count);
    //   //   handleCart(count);
    //   // } else {
    //   //   alert("This product is not instock!");
    //   // }
    //   handleAddProduct(product, count);
    //   handleCart(product, count);
    // } else {
    //   setPopup(true);
    //   // handleAddProduct(product, count);
    // }
    setCartPopup(true);
    handleAddProduct(product, count);

    if (user) {
      handleCart(product, count);
    }
  };

  const handleCart = async (product, count) => {
    const token = localStorage.getItem("token");

    if (user) {
      const data = {
        userId: user._id,
        products: [
          {
            productId: id,
            category: product.category[0],
            quantity: count,
          },
        ],
      };

      await publicRequest
        .post("/carts", data, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // for wishlist icon change
  const wishListExist = wishList.find((item) => item._id === product?._id);

  const addtoWishList = (product, count) => {
    handleWishList(product, count);
    if (user) {
      // dbWishList(product, count);
      addToDbWishlist(product, count);
    }
  };

  return (
    <>
      {product && imageUrl && itemCode && (
        <Helmet>
          <meta name="description" content={product.desc} />
          <meta property="og:title" content={product.title} />
          <meta property="og:description" content={product.desc} />
          <meta property="og:image" content={imageUrl} />
        </Helmet>
      )}
      <Container>
        {serverError ? (
          <ErrorPage />
        ) : product ? (
          <ContainerWrapper>
            <CartDialog
              click={click}
              cartPopup={cartPopup}
              setCartPopup={setCartPopup}
              product={product}
              count={count}
            />

            <Popup
              loginPopup={loginPopup}
              setLoginPopup={setLoginPopup}
              product={product}
              count={count}
            />
            {/* {popup && <CartDialog />} */}

            <Wrapper>
              {Object.keys(product).length > 0 && (
                <ProductImageSlider
                  product={product}
                  id={id}
                  category={category}
                />
              )}

              <Wrapper2>
                <Title>{product.title}</Title>
                <Box>
                  {itemCode.length > 0 && (
                    <Desc>
                      <span style={{ color: "#758a91" }}>Item Code : </span>{" "}
                      {itemCode}
                    </Desc>
                  )}
                  <Desc>
                    <span style={{ color: "#758a91" }}>Brand : </span>{" "}
                    {product.brand}
                  </Desc>
                  {product.warranty ? (
                    <Desc>
                      <span style={{ color: "#758a91" }}>Warranty : </span>
                      {product.warranty}
                    </Desc>
                  ) : (
                    <></>
                  )}
                  {product.instock?.toLowerCase() !== "in-stock" && (
                    <StatusContainer>
                      <Desc>
                        <span style={{ color: "#758a91" }}>
                          Stock Status :{" "}
                        </span>
                        <span style={{ color: "#CC0000", fontWeight: "700" }}>
                          {product.instock}
                        </span>
                      </Desc>
                      <ArrowBox>
                        <Info>
                          <LocalPhoneOutlinedIcon style={info} /> +959 942095359
                        </Info>
                        <Info>
                          <EmailOutlinedIcon style={info} />
                          sales@rangoondiscount.com
                        </Info>
                      </ArrowBox>
                    </StatusContainer>
                  )}
                </Box>

                {/* {product.coupon_percent ? (
              <Discount>
                <Price>{product.market_price?.toLocaleString()} Ks.</Price>
                <Tag>{product.coupon_percent}%</Tag>
              </Discount>
            ) : (
              <Price>{product.price?.toLocaleString()} Ks.</Price>
            )} */}

                <Price>{product.price?.toLocaleString()} Ks.</Price>

                {product.discount_item || product.coupon_percent ? (
                  <Discount>
                    {saveDiscount(product.market_price, product.price)}
                    <Price className="market-price">
                      {product.market_price.toLocaleString()} Ks.
                    </Price>
                    <Tag>Save {savingAmount.toLocaleString()} Ks.</Tag>
                  </Discount>
                ) : (
                  <></>
                )}

                {/* {product.coupon_percent ? (
              <Discount>
                {saveDiscount(product.market_price, product.price)}
                <Price className="market-price">
                  {product.market_price.toLocaleString()} Ks.
                </Price>
                <Tag>Save {savingAmount.toLocaleString()} Ks.</Tag>
              </Discount>
            ) : (
              <></>
            )} */}

                <SelectContainer>
                  <Amount>
                    <RemoveIcon
                      style={icon}
                      onClick={() => handleCount("decrease")}
                    ></RemoveIcon>
                    <Number>{count}</Number>
                    {product && product._id === "649bfd4fd8950ba197d356d8" ? (
                      <AddIcon style={lenovo}></AddIcon>
                    ) : (
                      <AddIcon
                        style={icon}
                        onClick={() => handleCount("inc")}
                      ></AddIcon>
                    )}

                    <Button
                      value="Add to Cart"
                      type="submit"
                      onClick={(e) => addtoCart(e, product, count)}
                      disabled={
                        product.instock?.toLowerCase() !== "in-stock" && true
                      }
                      className={
                        product.instock?.toLowerCase() !== "in-stock" &&
                        "inactive"
                      }
                    />
                  </Amount>

                  <Additional>
                    {wishListExist ? (
                      <FavoriteIcon style={fav}></FavoriteIcon>
                    ) : (
                      <FavoriteBorderIcon
                        style={fav}
                        // onClick={() => handleWishList(product, count)}
                        onClick={() => addtoWishList(product, count)}
                      ></FavoriteBorderIcon>
                    )}

                    {copyLink ? (
                      <Tooltip
                        title="Copied!"
                        placement="right"
                        arrow
                        style={{ backgroundColor: "green" }}
                      >
                        <ShareOutlinedIcon
                          style={{
                            flex: "1",
                            cursor: "pointer",
                            fontSize: "30px",
                          }}
                          onClick={() => shareLink()}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Copy Link" placement="right" arrow>
                        <ShareOutlinedIcon
                          style={{
                            flex: "1",
                            cursor: "pointer",
                            fontSize: "30px",
                          }}
                          onClick={() => shareLink()}
                        />
                      </Tooltip>
                    )}
                  </Additional>
                </SelectContainer>
              </Wrapper2>
            </Wrapper>
            {showProductInfo({ product })}
            {Object.keys(product).length > 0 && (
              <RelatedProducts
                id={product._id}
                category={category}
                brand={product.brand}
                type={product.type}
                wishList={wishList}
                handleWishList={handleWishList}
              />
            )}
          </ContainerWrapper>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};

export default ProductDetail;

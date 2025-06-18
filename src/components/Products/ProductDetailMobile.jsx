import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { publicRequest } from "../../requestMethods";
import PC from "./PC";
// import AccordionMobile from "./AccordionMobile";
import ProductImageSlider from "./ProductImageSlider";
import ProductImageSliderMobile from "./ProductImageSliderMobile";
import RelatedProducts from "./RelatedProducts";
import AddToCartBottomSheet from "./AddToCartBottomSheet";
import Overlay from "../Categories/Overlay";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
//import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async";
import ErrorPage from "../../pages/ErrorPage";
import Loading from "../Loading";
// #TODO : add info icon

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;

  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;

const ContainerWrapper = styled.div`
  width: 1150px;
  padding-bottom: 50px;

  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  @media only screen and (max-width: 769px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0;
    flex-direction: column;
  }
`;

const Wrapper1 = styled.div`
  @media screen and (max-width: 769px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Wrapper2 = styled.div`
  @media screen and (max-width: 769px) {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Title = styled.div`
  @media screen and (max-width: 769px) {
    color: #002734;
    font-weight: 700;
    width: 350px;
    font-size: 16px;
    line-height: 24px;
    margin-left: 10px;
    padding-bottom: 20px;
  }
`;

const Box = styled.div`
  @media screen and (max-width: 769px) {
    padding: 15px;
  }
`;

const Desc = styled.div`
  @media screen and (max-width: 769px) {
    padding-bottom: 20px;
    font-size: 16px;
    font-weight: 400;
    color: #002734;
  }
`;

const StatusContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ArrowBox = styled.div`
  position: relative;
  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.1);
  width: 245px;
  margin-left: 60px;
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
    border-bottom-color: #fff;
    border-width: 12px;
    top: -34%;
    left: 20%;
    margin-left: -10px;
  }

  &:before {
    border-color: rgba(161, 103, 45, 0);
    border-bottom-color: rgba(0, 0, 0, 0.03);
    border-width: 13px;
    top: -38%;
    left: 20.8%;
    margin-left: -13px;
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
  @media screen {
    font-weight: 700;
    font-size: 18px;
    color: ${(props) =>
      props.className === "market-price" ? "#758A91" : "#00688B"};
    font-weight: ${(props) =>
      props.className === "market-price" ? "400" : "700"};
    text-decoration: ${(props) =>
      props.className === "market-price" && "line-through"};
    text-decoration-color: #d52b2b;

    padding-bottom: ${(props) =>
      props.className === "coupon"
        ? "0px"
        : props.className === "market-price"
        ? "0px"
        : "15px"};
  }
`;

const PriceInfo = styled.div`
  padding-left: 10px;
`;

const Discount = styled.div`
  @media screen {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
  }
`;

const Tag = styled.div`
  @media screen {
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    background-color: #cc0000;
    padding: 3px 7px;
    margin-left: 25px;
    border: 0.1px solid #cc0000;
    border-radius: 4px;
  }
`;

const ProductInfo = styled.div`
  @media screen and (max-width: 769px) {
    flex-direction: column;
  }
`;

const SelectContainer1 = styled.div`
  @media screen and (max-width: 769px) {
    display: flex;
    width: 100%;
    height: 112px;
  }
`;

const SelectContainer2 = styled.div`
  @media screen and (max-width: 769px) {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0 20px 0;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    z-index: 1;
    &.sticky {
      position: fixed;
      top: 0;
      z-index: 1;
      transition: top 0.3s ease-out;
    }
  }
`;

const Amount = styled.div`
  @media screen and (max-width: 769px) {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
`;

const Number = styled.p`
  @media screen and (max-width: 769px) {
    height: fit-content;
    padding: 5px 15px;
    font-size: 14px;
    font-weight: 700;
    line-height: 120%;
  }
`;

const Button = styled.input`
  @media screen and (max-width: 769px) {
    flex: 1;
    padding: 16px 32px;
    margin: 0 20px 0 10px;
    border-radius: 4px;
    border: none;
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    background: ${(props) =>
      props.className !== "inactive" ? "#00688b" : "#B0BCC0"};
  }
`;

const icon = {
  padding: "5px",
  fontSize: "20px",
  border: "1px solid #94A4AA",
  borderRadius: "8px",
};

const info = {
  fontWeight: "400",
  fontSize: "18px",
};

const ProductDetailMobile = ({
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
  const { category, id } = useParams();

  const [serverError, setServerError] = useState(false);

  const [product, setProduct] = useState();
  const [count, setCount] = useState(1);
  const [deviceType, setDeviceType] = useState("");

  let isSticky = false;

  const selectContainerRef = useRef(null);

  const [open, setOpen] = useState(false); // state for bottomsheet open/closed

  const [imageUrl, setImageUrl] = useState();

  const [itemCode, setItemCode] = useState([]);

  let savingAmount;

  const saveDiscount = (marketPrice, price) => {
    savingAmount = marketPrice - price;
  };

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

          updateMetaTags(res.data.title, res.data.desc, res.data.image[0]);
        })
        .catch((err) => {
          // console.log(err);
          if (err.response.status === 500) {
            setServerError(true);
          }
        });
    };

    getProduct();
  }, [id]);

  useEffect(() => {
    const selectContainer = selectContainerRef.current;

    if (selectContainer) {
      const selectContainerRect = selectContainer.getBoundingClientRect();
      const selectContainerTop = selectContainerRect.top;
      const transitionDuration = 300; // Duration of the animation in milliseconds

      const handleScroll = () => {
        const selectContainerVisible = window.scrollY >= selectContainerTop;

        if (
          selectContainerVisible &&
          !selectContainer.classList.contains("sticky")
        ) {
          selectContainer.style.transition = `top ${transitionDuration}ms ease-in-out`;
          selectContainer.classList.add("sticky");
          selectContainer.style.top = "0";
        } else if (
          !selectContainerVisible &&
          selectContainer.classList.contains("sticky")
        ) {
          selectContainer.style.transition = `top ${transitionDuration}ms ease-in-out`;
          selectContainer.style.top = "";
          selectContainer.classList.remove("sticky");
          // Delay the removal of the transition to allow the container to return to its original position before removing the transition effect
          setTimeout(() => {
            selectContainer.style.transition = "";
          }, transitionDuration);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [product]);

  function handleCount(type) {
    if (type === "decrease") {
      count > 1 && setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  }

  const showProductInfo = ({ product }) => {
    return <PC item={product} />;
  };

  // Accordian UI including product review

  // const showProductInfo = ({ product }) => {
  //   switch (category) {
  //     case "laptop":
  //       return <AccordionMobile item={product} />;
  //     case "network":
  //       return <AccordionMobile item={product} />;
  //     case "coupon":
  //       return <AccordionMobile item={product} />;
  //     case "gadget":
  //       return <AccordionMobile item={product} />;
  //     default:
  //       return <AccordionMobile item={product} />;
  //   }
  // };

  const addtoCart = (e, product, count) => {
    e.preventDefault();

    setOpen(!open);

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

  const addtoWishList = (product, count) => {
    handleWishList(product, count);

    if (user) {
      dbWishList(product, count);
    }
  };

  const dbWishList = async (product, count) => {
    const token = localStorage.getItem("token");

    const data = {
      userId: user._id,
      products: [
        {
          productId: id,
          quantity: count,
        },
      ],
    };

    await publicRequest
      .post("/wishlists", data, {
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
  };

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(isMobile ? "mobile" : "desktop");
    };

    handleResize(); // Call the function initially

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //update meta tags for social media share

  const updateMetaTags = (title, desc, image) => {
    const metatitle = title;
    const description = desc;
    const metaimage = image;

    const metaTags = [
      { property: "og:title", content: metatitle },
      { property: "og:description", content: description },
      { property: "og:image", content: metaimage },
    ];

    metaTags.forEach(({ property, content }) => {
      const tag = document.querySelector(`meta[property="${property}"]`);

      if (tag) {
        tag.setAttribute("property", property);
        tag.setAttribute("content", content);
      } else {
        const newTag = document.createElement("meta");
        newTag.setAttribute("property", property);
        newTag.setAttribute("content", content);
        document.head.appendChild(newTag);
      }
    });
  };

  return (
    <Container>
      {product && imageUrl && (
        <Helmet>
          {/* <title>{product.title}</title> */}
          {/* <meta name="description" content={product?.desc} /> */}
          <meta property="og:title" content={product?.title} />
          <meta property="og:description" content={product?.desc} />
          <meta property="og:image" content={imageUrl} />
        </Helmet>
      )}
      {serverError ? (
        <ErrorPage />
      ) : product ? (
        <ContainerWrapper>
          <AddToCartBottomSheet
            click={click}
            open={open}
            setOpen={setOpen}
            product={product}
            count={count}
          />
          {/* {popup && <CartDialog />} */}

          <Wrapper>
            <Wrapper1>
              <SelectContainer1>
                {" "}
                {/* This div is responsible for preventing others div from jamming under the SelectContainer2 */}
                <SelectContainer2
                  ref={selectContainerRef}
                  className={isSticky ? "sticky" : ""}
                >
                  <Amount>
                    <RemoveIcon
                      style={icon}
                      onClick={() => handleCount("decrease")}
                    ></RemoveIcon>
                    <Number>{count}</Number>

                    <AddIcon
                      style={icon}
                      onClick={() => handleCount("inc")}
                    ></AddIcon>

                    <Overlay open={open} setOpen={setOpen} />
                  </Amount>
                  <Button
                    value={`Add to Cart (${count})`}
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
                </SelectContainer2>
              </SelectContainer1>

              <ProductInfo>
                <Title>{product.title}</Title>
                <PriceInfo>
                  {/* {product.coupon_percent ? (
                  <Discount>
                    <Price className="coupon">
                      {product.market_price?.toLocaleString()} Ks.
                    </Price>
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
                </PriceInfo>
              </ProductInfo>

              {Object.keys(product).length > 0 && (
                <div>
                  {isMobile ? (
                    <ProductImageSliderMobile
                      product={product}
                      id={id}
                      category={category}
                      wishList={wishList}
                      handleWishList={handleWishList}
                    />
                  ) : (
                    <ProductImageSlider
                      product={product}
                      id={id}
                      category={category}
                    />
                  )}
                </div>
              )}
            </Wrapper1>

            <Wrapper2>
              <Box>
                {itemCode.length > 0 && (
                  <Desc>
                    <span style={{ color: "#758a91" }}>ItemCode : </span>{" "}
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
                      <span style={{ color: "#758a91" }}>Stock Status : </span>
                      <span style={{ color: "#cc0000" }}>
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
  );
};

export default ProductDetailMobile;

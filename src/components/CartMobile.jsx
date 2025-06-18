import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import styled from "styled-components";
import EmptyPage from "../pages/EmptyPage";
import RelatedProducts from "./Products/RelatedProducts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SummaryMobile from "./SummaryMobile";

const Container = styled.div`
  @media screen and (max-width: 769px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  @media screen and (max-width: 769px) {
    width: 100%;
    /* max-width: 1140px; */
    margin: 0 20px;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const CartSection = styled.div`
  @media screen and (max-width: 769px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column-reverse;
    padding-bottom: 30px;
  }
`;

const MyCart = styled.div`
  @media screen and (max-width: 769px) {
    width: 100%;
    max-width: 750px;
    flex-direction: row;
    background: oragne;
  }
`;

const TitleWrapper = styled.div`
  @media screen and (max-width: 769px) {
    width: 100%;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.div`
  @media screen and (max-width: 769px) {
    width: fit-content;
    font-weight: 700;
    font-size: 20px;
    color: #002734;
    padding-right: 20px;
    justify-content: flex-start;
  }
`;

const ItemList = styled.div`
  @media screen and (max-width: 769px) {
    font-weight: ${(props) => props.className === "row" && "600"};
    font-size: ${(props) => (props.className === "row" ? "18px" : "16px")};
    width: 100%;
    padding: 10px 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-bottom: 1px solid #dee3e5;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

const Product = styled.div`
  @media screen and (max-width: 769px) {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: ${(props) =>
      props.className === "row" ? "center" : "flex-start"};
    // flex-wrap: wrap;
    padding-left: 20px;
  }
`;

const Image = styled.img`
  @media screen and (max-width: 769px) {
    object-fit: contain;
    text-align: center;
    width: 110px;
    max-width: 110px;
    height: 110px;
  }
`;

const Div = styled.div`
  @media only screen and (max-width: 769px) {
    padding-left: 50px;
    padding-bottom: 10px;
    display: flex;
    // flex: 2;
    width: 87.5%;
    // flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  }
`;

const SelectContainer = styled.div`
  @media screen and (max-width: 769px) {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
    position: absolute;
    left: 0;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 150px;
  margin-left: 40px;

  @media only screen and (min-width: 400px) {
    display: flex;
    flex-direction: column;
    max-width: 450px;
    margin-left: 40px;
  }
`;

const Description = styled.div`
  @media screen and (max-width: 769px) {
    font-weight: 400;
    font-size: 14px;
    // width: 190px;
    width: 100%;
    color: ${(props) => (props.className === "qty" ? "#758A91" : "#002734")};
    color: ${(props) => props.className === "remove" && "#CC0000"};
    padding-bottom: ${(props) => props.className === "desc" && "10px"};
    padding: ${(props) => props.className === "remove" && "0 20px"};
    margin: ${(props) => props.className === "remove" && "0 20px"};
    width: ${(props) => props.className === "qty" && "75px"};
    border-left: ${(props) =>
      props.className === "remove" && "1px solid #A3B1B6;"};
    cursor: ${(props) => props.className === "remove" && "pointer"};
    -webkit-line-clamp: 2;
    align-items: center;
    -webkit-box-orient: vertical;
    height: 42px;
    line-height: 25px;
    overflow: hidden;
    display: -webkit-box;
  }
`;

const PriceSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #00688b;
  padding-bottom: 5px;
  display: flex;
  justify-content: flex-start;
`;

const SmallPrice = styled.p`
  @media only screen and (max-width: 769px) {
    font-weight: 400;
    font-size: 13px;
    padding-top: 5px;
    text-decoration: line-through;
    text-decoration-color: #2b9456;
    color: #758a91;
    padding-bottom: 10px;
  }
`;

const Text = styled.p`
  padding: 0 0 10px 0;
  font-weight: 400;
  font-size: 13px;
  color: #758a91;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SavedPrice = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: #2b9456;
  border-radius: 4px;
  padding: 3px 5px;
  margin-right: 10px;
`;

const Amount = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RemoveDesc = styled.div`
  font-weight: 400;
  font-size: 14px;
  width: 190px;
  color: #cc0000;
  padding: 0 20px;
  margin: 0 20px;
  border-left: 1px solid #a3b1b6;
  cursor: pointer;
`;

const Number = styled.div`
  height: fit-content;
  padding: 5px 15px;
  font-weight: 700;
  font-size: 14px;
`;

const icon = {
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  padding: "5px",
  border: "1px solid #94A4AA",
  borderRadius: "4px",
};

const lenovo = {
  fontSize: "14px",
  fontWeight: "600",
  padding: "5px",
  border: "1px solid #94A4AA",
  borderRadius: "4px",
  color: "gray",
};

const CartMobile = ({
  //only some css changes
  click,
  cartItems,
  setCartItems,
  handleAddProduct,
  handleRemoveProduct,
  deleteCartItem,
  productTotal,
  wishList,
  handleWishList,
}) => {
  let productIds = [];
  let cartData = [];
  let productData = [];

  const [relatedCat, setRelatedCat] = useState();
  const [relatedType, setRelatedType] = useState();

  const user = JSON.parse(localStorage.getItem("user"));
  const guest = JSON.parse(sessionStorage.getItem("guest"));

  let relatedCatsTemp = [];
  let relatedTypesTemp = [];

  const [loading, setLoading] = useState(false);

  let orgPrice;
  let finalPrice;
  let savedPrice;
  let totalOrgAmount = 0;
  let totalFinalAmount = 0;
  let totalSavingAmount = 0;
  let totalItemCount = 0;

  const removeItem = async (item) => {
    setLoading(true);

    if (guest) {
      deleteCartItem(item);
    } else {
      const userId = user._id;
      const token = localStorage.getItem("token");

      await publicRequest
        .delete(`/carts/delete?user=${userId}&itemId=${item._id}`, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          getCart();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setLoading(false);
  };

  const getCart = async () => {
    setLoading(true);
    let userId = user?._id;
    let token = localStorage.getItem("token");

    if (user) {
      //  GET PRODUCT IDs FROM USER CART
      await publicRequest
        .get(`/carts/find/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          cartData = res.data;

          cartData.forEach((ele) => {
            productIds.push(ele.productId);
          });
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
          }
        });

      // GET PRODUCT DETAILS FROM ALL COLLECTIONS
      if (productIds.length > 0) {
        await publicRequest
          .get(`products/find?id=${productIds}&type=array`, {
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${token}`,
            },
          })
          .then((res) => {
            productData = res.data;

            // ADDING QUANTITY TO PRODUCT DATA

            productData.forEach((item) => {
              cartData.forEach((p, i) => {
                if (item._id === p.productId) {
                  item.quantity = cartData[i].quantity;
                }
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      localStorage.setItem("cart", JSON.stringify(productData));
      setCartItems(JSON.parse(localStorage.getItem("cart")));
    }

    setLoading(false);
  };

  const getRelatedInfo = () => {
    const localCart = JSON.parse(localStorage.getItem("cart"));

    // COLLECTING DATA FOR RELATED PRODUCTS
    localCart.map((item) => {
      relatedCatsTemp.push(item.category[0]);
      if (item.type !== undefined) {
        relatedTypesTemp.push(item.type);
      }

      setRelatedCat(relatedCatsTemp);
      setRelatedType(relatedTypesTemp);
    });
  };

  // const handleQuantity = async (item, type) => {
  //   count = item.quantity;

  //   if (type === "decrease") {
  //     if (count > 1) {
  //       handleRemoveProduct(item);
  //       productId = item._id;
  //       count = item.quantity - 1;
  //     } else {
  //       // alert("Click the trash button if you want to remove the item!");
  //     }
  //     // count > 1 && setCount(count - 1);
  //   } else {
  //     // setCount(count + 1);
  //     handleAddProduct(item);
  //     productId = item._id;
  //     count = item.quantity + 1;
  //   }

  //   const ProductExist = newData.find((ele) => ele.productId === productId);

  //   if (ProductExist) {
  //     setNewData(
  //       newData.map((ele) =>
  //         ele.productId === productId
  //           ? {
  //               ...ProductExist,
  //               quantity: count,
  //             }
  //           : ele
  //       )
  //     );
  //   } else {
  //     setNewData([...newData, { productId, quantity: count }]);
  //   }
  // };

  const handleQuantity = async (item, type) => {
    setLoading(true);

    let userId = user?._id;
    let token = localStorage.getItem("token");

    let data;

    if (guest) {
      if (type === "decrease") {
        if (item.quantity > 1) {
          handleRemoveProduct(item);
        } else {
          // no code if quantity is 1
        }
      } else {
        handleAddProduct(item);
      }
      setLoading(false);
    } else {
      if (type === "decrease") {
        if (item.quantity > 1) {
          data = {
            productId: item._id,
            quantity: item.quantity - 1,
          };
        } else {
          // no code if quantity is 1
        }
      } else {
        data = {
          productId: item._id,
          quantity: item.quantity + 1,
        };
      }

      if (data && userId) {
        await publicRequest
          .put(`/carts/update-qty?user=${userId}`, data, {
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${token}`,
            },
          })
          .then((res) => {
            getCart();
            // alert("Cart is succefully updated!");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setLoading(false);
    }
  };
  // const updateCart = async () => {
  //   let user = JSON.parse(localStorage.getItem("user"));
  //   let userId = user._id;
  //   let token = localStorage.getItem("token");

  //   await publicRequest
  //     .put(`/carts/update?user=${userId}`, newData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         token: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       // console.log(res.data);
  //       alert("Cart is succefully updated!");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const calculateFinalPrice = (qty, price) => {
    finalPrice = qty * price;
    return finalPrice.toLocaleString();
  };

  const calculateOrgPrice = (cat, discount_item, qty, price, market_price) => {
    if (discount_item === true || cat === "coupon") {
      orgPrice = qty * market_price;
      totalOrgAmount = totalOrgAmount + orgPrice;
      // return orgPrice.toLocaleString();
    } else if (discount_item === false) {
      orgPrice = qty * price;
      totalOrgAmount = totalOrgAmount + orgPrice;
      // return orgPrice.toLocaleString();
    } else {
    }
  };

  const calculateTotalFinalPrice = (
    cat,
    discount_item,
    qty,
    price,
    market_price
  ) => {
    // if (cat === "coupon") {
    //   let temp = qty * market_price;
    //   totalFinalAmount += temp;
    // } else {
    //   let temp = qty * price;
    //   totalFinalAmount += temp;
    // }

    let temp = qty * price;
    totalFinalAmount += temp;
  };

  const calculateSavedAmount = () => {
    savedPrice = orgPrice - finalPrice;
    totalSavingAmount = totalSavingAmount + savedPrice;
    return savedPrice.toLocaleString();
  };

  const calculateTotalItem = (qty) => {
    totalItemCount = totalItemCount + qty;
  };

  useEffect(() => {
    getRelatedInfo();
    getCart();
  }, []);

  return (
    <Container>
      {cartItems.length === 0 ? (
        <Wrapper>
          <EmptyPage page="cart" />
        </Wrapper>
      ) : (
        <Wrapper>
          <CartSection>
            <MyCart>
              {cartItems.map((item) => (
                <ItemList key={item._id}>
                  {calculateTotalItem(item.quantity)}
                  <Product>
                    <Link
                      style={{ display: "flex", justifyContent: "center" }}
                      to={`/${item.category}/product/${item._id}`}
                    >
                      <Image src={item.image[0]}></Image>
                    </Link>
                    <InfoContainer>
                      <Description className="desc">{item.title}</Description>
                      <PriceSection>
                        {/* <Price>{item.price.toLocaleString()} Ks.</Price> */}

                        {/* {item.category[0] === "coupon" ? (
                          <Price>
                            {calculateFinalPrice(
                              item.quantity,
                              item.market_price
                            )}{" "}
                            Ks.
                          </Price>
                        ) : (
                          <Price>
                            {calculateFinalPrice(item.quantity, item.price)} Ks.
                          </Price>
                        )} */}

                        <Price>
                          {calculateFinalPrice(item.quantity, item.price)} Ks.
                        </Price>

                        {calculateOrgPrice(
                          item.category[0],
                          item.discount_item,
                          item.quantity,
                          item.price,
                          item.market_price
                        )}

                        {calculateTotalFinalPrice(
                          item.category[0],
                          item.discount_item,
                          item.quantity,
                          item.price,
                          item.market_price
                        )}

                        {item.discount_item || item.coupon_percent ? (
                          <SmallPrice>
                            {orgPrice.toLocaleString()} Ks.
                          </SmallPrice>
                        ) : (
                          <></>
                        )}

                        {item.quantity > 1 && (
                          // (item.category[0] === "coupon" ? (
                          //   <Text className="qty">
                          //     ({item.market_price.toLocaleString()} Ks. per
                          //     item)
                          //   </Text>
                          // ) : (
                          <Text className="qty">
                            ({item.price.toLocaleString()} Ks. per item)
                          </Text>
                        )}

                        {item.discount_item || item.coupon_percent ? (
                          <Box>
                            <SavedPrice>
                              Save&nbsp;
                              {calculateSavedAmount()} Ks.
                            </SavedPrice>
                          </Box>
                        ) : (
                          <></>
                        )}
                      </PriceSection>
                    </InfoContainer>
                  </Product>
                  <Div>
                    <SelectContainer>
                      <Amount>
                        <RemoveIcon
                          style={icon}
                          onClick={() => handleQuantity(item, "decrease")}
                          // onClick={() => handleRemoveProduct(item)}
                        ></RemoveIcon>
                        <Number>{item.quantity}</Number>
                        {item._id === "649bfd4fd8950ba197d356d8" ? (
                          <AddIcon style={lenovo}></AddIcon>
                        ) : (
                          <AddIcon
                            style={icon}
                            onClick={() => handleQuantity(item, "increase")}
                          ></AddIcon>
                        )}
                      </Amount>
                      <RemoveDesc
                        className="remove"
                        onClick={() => removeItem(item)}
                      >
                        Remove
                      </RemoveDesc>
                    </SelectContainer>
                  </Div>
                </ItemList>
              ))}
            </MyCart>
            <TitleWrapper>
              <Title>
                My Cart{" "}
                {cartItems.length === 1 ? (
                  <span
                    style={{
                      color: "#758A91",
                      fontSize: "20px",
                      fontWeight: "400",
                    }}
                  >
                    ({cartItems.length} Item)
                  </span>
                ) : (
                  <span
                    style={{
                      color: "#758A91",
                      fontSize: "20px",
                      fontWeight: "400",
                    }}
                  >
                    ({cartItems.length} Items)
                  </span>
                )}
              </Title>
              <SummaryMobile
                click={click}
                cartItems={cartItems}
                productTotal={productTotal}
                totalItemCount={totalItemCount}
                totalFinalAmount={totalFinalAmount}
                totalOrgAmount={totalOrgAmount}
                totalSavingAmount={totalSavingAmount}
              />
            </TitleWrapper>
          </CartSection>

          <RelatedProducts
            category={relatedCat}
            type={relatedType}
            wishList={wishList}
            handleWishList={handleWishList}
          />
        </Wrapper>
      )}
    </Container>
  );
};

export default CartMobile;

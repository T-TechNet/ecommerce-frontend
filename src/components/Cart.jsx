import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import styled from "styled-components";
import Summary from "./Summary";
import EmptyPage from "../pages/EmptyPage";
import RelatedProducts from "./Products/RelatedProducts";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1203px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 1140px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1203px) {
    max-width: 950px;
    min-width: 750px;
  }
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1140px;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  @media screen and (max-width: 1203px) {
    max-width: 950px;
    min-width: 750px;
  }
`;

// const Indicator = styled.div`
//   background: conic-gradient(
//     from 180deg at 50% 50%,
//     #00688b 0deg,
//     rgba(0, 104, 139, 0) 360deg
//   );
// `;

const Msg = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #000000;
  padding: 10px 0;
`;

const CartSection = styled.div`
  padding-bottom: 80px;
  width: 100%;
  display: flex;
  align-items: top;
  justify-content: center;
`;
const MyCart = styled.div`
  width: 70%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding: 10px 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Hr = styled.hr`
  border: none;
  height: 3px;
  background-image: linear-gradient(to right, #03a89e, #00688b);
  width: 120px;
`;

const Title = styled.div`
  width: fit-content;
  font-weight: 700;
  font-size: 26px;
  color: #002734;
  padding-right: 20px;
`;

const Span = styled.span`
  height: 12px;
  width: 12px;
  background-color: #00688b;
  border-radius: 50%;
  display: inline-block;
`;

const ItemList = styled.div`
  font-weight: ${(props) => props.className === "row" && "600"};
  font-size: ${(props) => (props.className === "row" ? "18px" : "16px")};
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 1px solid #dee3e5;

  @media only screen and (max-width: 1203px) {
    flex-direction: row;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: flex-start;

  justify-content: ${(props) =>
    props.className === "row" ? "center" : "flex-start"};

  @media screen and (max-width: 1203px) {
    width: 100px;
  }
`;
const Product = styled.div`
  font-weight: 700;
  font-size: 16px;
  padding-bottom: 5px;
  display: flex;
  justify-content: ${(props) =>
    props.className === "row" ? "center" : "flex-end"};
  flex: 1;
`;

const Image = styled.img`
  width: 160px;
  object-fit: contain;
  text-align: center;

  @media screen and (max-width: 1203px) {
    width: 100px;
  }
`;

const Div = styled.div`
  padding: 0 30px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Description = styled.div`
  font-weight: 400;
  color: ${(props) => (props.className === "qty" ? "#758A91" : "#002734")};
  color: ${(props) => props.className === "remove" && "#CC0000"};
  padding: 0 10px 0 0;
  padding-bottom: ${(props) => props.className === "desc" && "20px"};
  padding: ${(props) => props.className === "remove" && "0 10px"};
  margin: ${(props) => props.className === "remove" && "0 10px"};
  width: ${(props) => props.className === "qty" && "75px"};
  border-left: ${(props) =>
    props.className === "remove" && "1px solid #A3B1B6;"};
  display: flex;
  align-items: center;
  cursor: ${(props) => props.className === "remove" && "pointer"};

  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${(props) => props.className === "remove" && "#03A89E"};
  }

  @media screen and (max-width: 1203px) {
    margin-left: ${(props) => (props.className === "remove" ? "0px" : "-20px")};
  }
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media screen and (max-width: 1203px) {
    width: 300px;
  }
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 16px;
  padding-bottom: 5px;
  display: flex;
  justify-content: ${(props) =>
    props.className === "row" ? "center" : "flex-end"};
`;

const SmallPrice = styled.p`
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  padding: 10px 0 5px 0;
  text-decoration: line-through;
  text-decoration-color: #2b9456;
  color: #758a91;
`;

const Text = styled.p`
  text-align: right;
  padding: 10px 0 15px 0;
  font-weight: 400;
  font-size: 14px;
  color: #758a91;
`;

const Box = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  align-self: flex-end;

  @media screen and (max-width: 1203px) {
    width: 100%;
  }
`;
const Tag = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: #2b9456;
  border-radius: 4px;
  padding: 3px 6px;
  width: 70px;
  display: flex;
  justify-content: center;
  margin-right: 5px;
`;

const SavedPrice = styled.p`
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  color: #2b9456;
`;

const Amount = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const Number = styled.div`
  height: fit-content;
  padding: 5px 10px;
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

const Cart = ({
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
      if (cartData.length > 0) {
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
      setLoading(false);
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
    getCart();
    getRelatedInfo();
  }, []);

  return (
    <Container>
      {cartItems.length === 0 ? (
        <Wrapper>
          <EmptyPage page="cart" />
        </Wrapper>
      ) : (
        <Wrapper>
          {loading && (
            <Loading>
              <CircularProgress style={{ color: "#03A89E" }} />
              <Msg>Loading...</Msg>
            </Loading>
          )}
          <TitleWrapper>
            <Title>My Cart</Title>
            <Hr></Hr>
            <Span></Span>
          </TitleWrapper>

          <CartSection>
            <MyCart>
              <ItemList className="row">
                <Product className="row">Product</Product>
                <Price className="row">Price</Price>
              </ItemList>
              {cartItems.map((item) => (
                <ItemList key={item._id}>
                  {calculateTotalItem(item.quantity)}
                  <Item>
                    <Link
                      style={{ display: "flex", justifyContent: "center" }}
                      to={`/${item.category}/product/${item._id}`}
                    >
                      <Image src={item.image[0]}></Image>
                    </Link>
                  </Item>
                  <Div>
                    <Description className="desc">{item.title}</Description>
                    <SelectContainer>
                      <Amount>
                        <Description className="qty">Quantity : </Description>
                        <RemoveIcon
                          style={icon}
                          onClick={() => handleQuantity(item, "decrease")}
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
                      <Description
                        className="remove"
                        onClick={() => removeItem(item)}
                      >
                        Remove
                      </Description>
                    </SelectContainer>
                  </Div>
                  <PriceSection>
                    {/* {item.category[0] === "coupon" ? (
                      <Price>
                        {calculateFinalPrice(item.quantity, item.market_price)}{" "}
                        Ks.
                      </Price>
                    ) : (
                      <Price>
                        {calculateFinalPrice(item.quantity, item.price)} Ks.
                      </Price>
                    )} */}
                    {/* <Price>{item.price.toLocaleString()} Ks.</Price> */}

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
                      <SmallPrice>{orgPrice.toLocaleString()} Ks.</SmallPrice>
                    ) : (
                      <></>
                    )}
                    {item.quantity > 1 && (
                      // (item.category[0] === "coupon" ? (
                      //   <Text className="qty">
                      //     ({item.market_price.toLocaleString()} Ks. per item)
                      //   </Text>
                      // ) : (
                      <Text className="qty">
                        ({item.price.toLocaleString()} Ks. per item)
                      </Text>
                    )}

                    {item.discount_item || item.coupon_percent ? (
                      <Box>
                        <Tag>You Save</Tag>
                        <SavedPrice>{calculateSavedAmount()} Ks.</SavedPrice>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </PriceSection>
                </ItemList>
              ))}
            </MyCart>
            <div style={{ width: "30%" }}>
              <Summary
                click={click}
                cartItems={cartItems}
                productTotal={productTotal}
                totalFinalAmount={totalFinalAmount}
                totalItemCount={totalItemCount}
                totalOrgAmount={totalOrgAmount}
                totalSavingAmount={totalSavingAmount}
              />
            </div>
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

export default Cart;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EmptyPage from "../pages/EmptyPage";
import CartDialog from "./Products/CartDialog";
import "../css/wishlist.css";
import "tippy.js/dist/tippy.css";

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
  width: 1140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;

  @media screen and (max-width: 1203px) {
    // width: 950px;
    // min-height: 795px;
    // max-height: 100%;
    width: 100%;
  }
  @media screen and (max-width: 769px) {
    width: 90%;
    padding-bottom: 30px;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 769px) {
    padding: 10px 0 0 0;
  }
`;
const PageTitle = styled.p`
  font-weight: 700;
  font-size: 26px;
  color: #002734;
  text-align: left;

  @media screen and (max-width: 769px) {
    font-size: 20px;
  }
`;
const ItemsCount = styled.div`
  font-weight: 400;
  font-size: 23px;
  color: #758a91;

  @media screen and (max-width: 769px) {
    font-size: 20px;
  }
`;

const ItemList = styled.div`
  // background: pink;
  font-weight: ${(props) => props.className === "row" && "600"};
  font-size: ${(props) => (props.className === "row" ? "18px" : "16px")};
  width: 100%;
  padding: 40px 0 20px 0;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #dee3e5;

  @media only screen and (max-width: 769px) {
    flex-direction: column;
    padding: 30px 0;
    gap: 20px;
    /* margin-bottom: 20px; */
  }
`;

const Product = styled.div`
  display: flex;

  width: 20%;
  align-items: flex-start;
  justify-content: ${(props) =>
    props.className === "row" ? "center" : "flex-start"};

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 180px;
  height: 120px;
  object-fit: contain;
  text-align: center;

  @media only screen and (max-width: 769px) {
    width: 120px;
    height: 120px;
    padding-right: 20px;
  }
`;

const Div = styled.div`
  padding: 0 20px;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const StatusBox = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

const MobileStatusBox = styled.div`
  display: none;

  @media screen and (max-width: 1203px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
    font-weight: 400;
    font-size: 13px;
    color: #ffffff;

    padding: 2px 4px;
    margin: 5px 0;
    background: ${(props) =>
      props.className === "instock" ? "#007e33" : "#CC0000"};

    border-radius: 2px;
  }

  @media only screen and (max-width: 769px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
    font-weight: 400;
    font-size: 13px;
    color: #ffffff;

    padding: 3px 6px;
    margin: 5px 0;
    background: ${(props) =>
      props.className === "instock" ? "#007e33" : "#CC0000"};

    border-radius: 2px;
  }
`;

const Status = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: ${(props) => (props.className === "instock" ? "#007e33" : "#CC0000")};

  @media only screen and (max-width: 769px) {
    color: #ffffff;
    font-weight: 400;
    font-size: 13px;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Description = styled.div`
  width: ${(props) => props.id === "desc" && "100%"};
  height: ${(props) => props.id === "desc" && "50px"};
  font-weight: 400;
  color: ${(props) => (props.className === "qty" ? "#758A91" : "#002734")};
  color: ${(props) => props.className === "remove" && "#CC0000"};
  padding: 0 20px 0 0;
  padding-bottom: ${(props) => props.className === "desc" && "10px"};
  padding: ${(props) => props.className === "remove" && "0 20px"};
  margin: ${(props) => props.className === "remove" && "0 20px"};
  width: ${(props) => props.className === "qty" && "75px"};
  border-left: ${(props) =>
    props.className === "remove" && "1px solid #A3B1B6;"};
  display: flex;
  align-items: flex-start;
  cursor: ${(props) => props.className === "remove" && "pointer"};

  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${(props) => props.className === "remove" && "#03A89E"};
  }

  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media only screen and (max-width: 769px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const MobileDescription = styled.div`
  display: none;

  @media only screen and (max-width: 769px) {
    font-weight: 400;
    font-size: 14px;
    color: #002734;
    color: ${(props) => props.className === "remove" && "#CC0000"};
    padding: 10px 0;
    padding: ${(props) => props.className === "remove" && "0 15px"};
    margin: ${(props) => props.className === "remove" && "0 10px 0 20px"};
    border-left: ${(props) =>
      props.className === "remove" && "1px solid #A3B1B6;"};
    display: flex;
    align-items: flex-start;
    cursor: ${(props) => props.className === "remove" && "pointer"};

    &:hover {
      transition: all 0.3s ease-in-out;
      color: ${(props) => props.className === "remove" && "#03A89E"};
    }
  }
`;

const RemoveDesc = styled.div`
  display: none;

  @media only screen and (max-width: 769px) {
    display: block;
    font-weight: 400;
    font-size: 14px;
    color: #cc0000;

    padding: 0 15px;
    margin: 0 10px 0 20px;
    border-left: 1px solid #a3b1b6;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
  }
`;

const PriceSection = styled.div`
  margin-right: 10px;
  width: 30%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 16px;
  display: flex;
  justify-content: ${(props) =>
    props.className === "row" ? "center" : "flex-end"};
`;

const MobilePrice = styled.p`
  font-weight: 700;
  font-size: 13px;
  padding: 5px 0;
  color: #00688b;
`;

const SmallPrice = styled.p`
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  text-decoration: line-through;
  text-decoration-color: #d52b2b;
  color: #758a91;
`;

const MobileSmallPrice = styled.p`
  font-weight: 400;
  font-size: 13px;
  color: #758a91;
  text-decoration: line-through;
  text-decoration-color: #d52b2b;
  padding: 5px 0;
`;

const Amount = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Number = styled.div`
  height: fit-content;
  padding: 5px 15px;
  font-weight: 700;
  font-size: 14px;
`;

const Button = styled.input`
  width: fit-content;
  padding: 16px 32px;
  margin: 10px 0;
  gap: 8px;
  border-radius: 4px;
  border: none;

  font-weight: 700;
  font-size: 16px;
  color: #ffffff;

  background: ${(props) =>
    props.className !== "inactive" ? "#00688b" : "#B0BCC0"};
  cursor: ${(props) => (props.disabled === false ? "pointer" : "context-menu")};

  transition: all 0.3s ease-in-out;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  }
  @media only screen and (max-width: 1204px) {
    padding: 8px 16px;
  }
`;

const MobileButton = styled.input`
  display: none;

  @media only screen and (max-width: 769px) {
    display: block;
    background: ${(props) =>
      props.className !== "inactive1" ? "block" : "none"};
    padding: 8px 16px;
    border-radius: 4px;
    border: none;

    font-weight: 700;
    font-size: 14px;
    color: #ffffff;

    background: ${(props) =>
      props.className !== "inactive1" ? "#00688b" : "#B0BCC0"};
    cursor: ${(props) =>
      props.disabled === false ? "pointer" : "context-menu"};
    transition: all 0.3s ease;

    &:hover {
      background: #2b829f;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }
  }
`;

const icon = {
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

const WishList = ({
  user,
  setUser,
  cartItems,
  wishList,
  setWishList,
  handleAddProduct,
  deleteWishList,
}) => {
  const [cartPopup, setCartPopup] = useState(false);
  const [dialogProduct, setDialogProduct] = useState();

  let productIds = [];
  let wishlistData = [];
  let productData = [];

  let orgPrice;
  let totalOrgAmount = 0;

  const addToCart = (item, count) => {
    setDialogProduct(item);
    handleAddProduct(item, count);
    handleCart(item, count);

    setCartPopup(true);
  };

  const handleQuantity = (item, index, type) => {
    let new_qty;

    if (item.instock.toLowerCase() !== "in-stock") {
      return null;
    } else {
      if (type === "decrease") {
        if (item.quantity === 1) {
          new_qty = item.quantity;
        } else {
          new_qty = item.quantity - 1;
        }
      } else {
        new_qty = item.quantity + 1;
      }
    }

    const newArray = wishList.map((wl, i) => {
      if (index === i) {
        return { ...wl, quantity: new_qty };
      } else {
        return wl;
      }
    });
    setWishList(newArray);
  };

  const handleCart = async (item, count) => {
    const token = localStorage.getItem("token");

    if (user) {
      const data = {
        userId: user._id,
        products: [
          {
            productId: item._id,
            category: item.category[0],
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

  const removeItem = async (item) => {
    deleteWishList(item);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user && user._id;
    const token = localStorage.getItem("token");

    if (user) {
      await publicRequest
        .delete(`/wishlists/delete?user=${userId}&itemId=${item._id}`, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const calculateOrgPrice = (cat, discount_item, qty, price, market_price) => {
    if (discount_item === true || cat === "coupon") {
      orgPrice = qty * market_price;
      totalOrgAmount = totalOrgAmount + orgPrice;
    } else {
      orgPrice = qty * price;
      totalOrgAmount = totalOrgAmount + orgPrice;
    }
  };

  const getWishlist = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user?._id;
    let token = localStorage.getItem("token");

    if (user) {
      // GET PRODUCT IDs FROM USER WISHLIST
      await publicRequest
        .get(`/wishlists/find/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          wishlistData = res.data;

          wishlistData.forEach((ele) => {
            productIds.push(ele.productId);
          });
        })
        .catch((err) => {
          console.log(err.response.data);
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
              wishlistData.forEach((p, i) => {
                if (item._id === p.productId) {
                  item.quantity = wishlistData[i].quantity;
                }
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      localStorage.setItem("wishlist", JSON.stringify(productData));
      setWishList(JSON.parse(localStorage.getItem("wishlist")));
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    // <></>
    <Container>
      {dialogProduct && (
        <CartDialog
          cartPopup={cartPopup}
          setCartPopup={setCartPopup}
          product={dialogProduct}
          count={dialogProduct?.quantity}
        />
      )}
      {/* {!user ? (
        <Wrapper>
          <EmptyPage page="wishlist" />
        </Wrapper>
      ) : */}
      {/* ( */}
      <Wrapper>
        {wishList.length === 0 ? (
          <EmptyPage page="wishlist" />
        ) : (
          <>
            <TitleWrapper>
              {user ? (
                <PageTitle>{user.name}'s Wishlist</PageTitle>
              ) : (
                <PageTitle>Your Wishlist</PageTitle>
              )}
              {wishList.length > 1 ? (
                <ItemsCount>&nbsp;({wishList.length} items)</ItemsCount>
              ) : (
                <ItemsCount>&nbsp;({wishList.length} item)</ItemsCount>
              )}
            </TitleWrapper>
            {wishList?.map((item, index) => (
              <ItemList key={item._id}>
                <Product>
                  <Link
                    style={{ display: "flex", justifyContent: "center" }}
                    className={`${
                      item.instock.toLowerCase() !== "in-stock" && "fade"
                    }`}
                    to={`/${item.category}/product/${item._id}`}
                  >
                    <Image src={item.image[0]}></Image>
                  </Link>

                  {/* FOR MOBILE */}
                  <MobileContainer>
                    {calculateOrgPrice(
                      item.category[0],
                      item.discount_item,
                      item.quantity,
                      item.price,
                      item.market_price
                    )}
                    <MobileDescription
                      className={`${
                        item.instock.toLowerCase() !== "in-stock" && "fade"
                      }`}
                    >
                      {item.title}
                    </MobileDescription>
                    <MobilePrice
                      className={`${
                        item.instock.toLowerCase() !== "in-stock" && "hide"
                      }`}
                    >
                      {item.price.toLocaleString()} Ks.
                    </MobilePrice>
                    {item.discount_item || item.coupon_percent ? (
                      <MobileSmallPrice
                        className={`${
                          item.instock.toLowerCase() !== "in-stock" && "hide"
                        }`}
                      >
                        {orgPrice.toLocaleString()} Ks.
                      </MobileSmallPrice>
                    ) : (
                      <></>
                    )}
                    <MobileStatusBox
                      className={
                        item.instock.toLowerCase() === "in-stock" && "instock"
                      }
                    >
                      {item.instock.toLowerCase() === "in-stock" ? (
                        <Status className="instock">{item.instock}</Status>
                      ) : (
                        <Status>{item.instock}</Status>
                      )}
                    </MobileStatusBox>
                  </MobileContainer>
                  {/* FOR MOBILE */}
                </Product>

                <Div>
                  <Description
                    id="desc"
                    className={`${
                      item.instock.toLowerCase() !== "in-stock" && "fade"
                    }`}
                  >
                    {item.title}
                  </Description>
                  <SelectContainer>
                    <Amount
                      className={`${
                        item.instock.toLowerCase() !== "in-stock" && "fade"
                      }`}
                    >
                      <Description className="qty">Quantity : </Description>
                      <RemoveIcon
                        style={icon}
                        onClick={() => handleQuantity(item, index, "decrease")}
                        // onClick={() => handleRemoveProduct(item)}
                      ></RemoveIcon>
                      <Number>{item.quantity}</Number>
                      {item._id === "649bfd4fd8950ba197d356d8" ? (
                        <AddIcon style={lenovo}></AddIcon>
                      ) : (
                        <AddIcon
                          style={icon}
                          onClick={() =>
                            handleQuantity(item, index, "increase")
                          }
                        ></AddIcon>
                      )}
                    </Amount>
                    <Description
                      className="remove"
                      onClick={() => removeItem(item)}
                    >
                      Remove
                    </Description>

                    {/* FOR MOBILE */}
                    <RemoveDesc
                      className="remove"
                      onClick={() => removeItem(item)}
                    >
                      Remove
                    </RemoveDesc>
                    <MobileButton
                      type="submit"
                      value={`Add to Cart`}
                      className={
                        item.instock?.toLowerCase() !== "in-stock" &&
                        "inactive1"
                      }
                      disabled={
                        item.instock?.toLowerCase() !== "in-stock" && true
                      }
                      onClick={() => addToCart(item, item.quantity)}
                    />
                    {/* FOR MOBILE */}
                  </SelectContainer>
                </Div>

                <StatusBox>
                  {item.instock.toLowerCase() === "in-stock" ? (
                    <Status className="instock">{item.instock}</Status>
                  ) : (
                    <Status>{item.instock}</Status>
                  )}
                </StatusBox>

                <PriceSection
                  className={`${
                    item.instock.toLowerCase() !== "in-stock" && "hide"
                  }`}
                >
                  <Price>{item.price.toLocaleString()} Ks.</Price>

                  {calculateOrgPrice(
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

                  <Button
                    type="submit"
                    value={`Add to Cart (${item.quantity})`}
                    className={
                      item.instock?.toLowerCase() !== "in-stock" && "inactive"
                    }
                    disabled={
                      item.instock?.toLowerCase() !== "in-stock" && true
                    }
                    onClick={() => addToCart(item, item.quantity)}
                  />
                </PriceSection>
              </ItemList>
            ))}
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default WishList;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { publicRequest } from "../../requestMethods";
import "./style.css";

const Container = styled.div`
  width: 460px;
  background: #ffffff;
  border: 1px solid #dee3e5;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 769px) {
    width: 90%;
    overflow-y: scroll;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header = styled.p`
  font-weight: 700;
  font-size: 18px;
  color: #002734;
  padding-bottom: 10px;

  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  border-bottom: ${(props) =>
    props.className === "last-box" ? "none" : "1px solid #dee3e5"};
`;
const Item = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 769px) {
    /* flex-direction: column; */
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 30%;
`;

const Image = styled.img`
  width: 120px;
  height: 100px;
  object-fit: cover;

  @media only screen and (max-width: 769px) {
    width: 80px;
    height: 80px;
  }
`;
const Desc = styled.div`
  // width: 250px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #002734;
  font-size: 16px;
  font-size: ${(props) => props.className === "total" && "18px"};
  font-weight: ${(props) => props.className === "total" && "bold"};

  padding: 0 20px;
  line-height: 24px;
  height: 72px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: pre-wrap;

  @media only screen and (max-width: 769px) {
    line-height: 24px;
    height: 48px;
    -webkit-line-clamp: 2;
  }
`;
const Quantity = styled.div`
  // width: 30px;
  width: 20%;
  display: flex;
  justify-content: flex-end;
  color: #000000;
  font-weight: 700;
  font-size: 14px;
`;

const Box = styled.div`
  width: 100%;
  /* margin: 15px 0; */
  padding: 20px 0;
  display: ${(props) => (props.status === "hide" ? "none" : "flex")};
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media only screen and (max-width: 769px) {
    padding: 10px 0;
    /* display: ${(props) => props.id === "coupon-box" && "none"}; */
  }
`;

const Text = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  color: ${(props) => (props.className === "saving" ? "#2B9456" : "#758a91")};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  @media only screen and (max-width: 769px) {
    font-size: 14px;
  }
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  font-weight: 700;
  font-size: 16px;
  color: #002734;

  @media only screen and (max-width: 769px) {
    font-size: 14px;
  }
`;

const SmallPrice = styled.div`
  font-weight: 400;
  font-size: 16px;
  padding-top: 5px;
  text-align: right;
  text-decoration: line-through;
  text-decoration-color: #2b9456;
  color: #758a91;

  @media only screen and (max-width: 769px) {
    font-size: 14px;
  }
`;

const Tag = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: #2b9456;
  border-radius: 4px;
  padding: 3px 8px;
`;

const PlaceHolder = styled.div`
  position: absolute;
  top: 35px;
  left: 17px;

  transition: all 0.3s ease-in-out;

  pointer-events: none;

  font-weight: 400;
  font-size: 16px;
  color: #4a666f;
  background-color: #fff;

  @media only screen and (max-width: 769px) {
    top: 22px;
  }
`;

const Input = styled.input`
  padding: 10px 16px;
  border-radius: 4px;
  border: 1px solid #758a91;
  background: #ffffff;

  font-size: 17px;
  font-weight: 400;
  color: #002734;

  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border: 2px solid #00688b;
  }

  &:focus + ${PlaceHolder} {
    top: 4px;
    left: 8px;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: #00688b;
    padding: 0 3px;
    margin: 0 5px;
  }
`;

const Span = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #002734;
  padding: 0 10px;
`;

const Message = styled.div`
  position: absolute;
  top: ${(props) => (props.className === "green" ? "50px" : "75px")};
  left: ${(props) => (props.className === "green" ? "2px" : "15px")};

  font-weight: 400;
  font-size: 13px;

  background: ${(props) => (props.className === "green" ? "#E6F2EB" : "#fff")};
  padding: 5px;
  border-radius: 4px;

  color: ${(props) => props.className !== "green" && "#cc0000"};

  display: flex;
  align-items: center;

  @media only screen and (max-width: 769px) {
    top: ${(props) => (props.className === "green" ? "35px" : "58px")};
    left: ${(props) => (props.className === "green" ? "2px" : "10px")};
  }
`;

const Button = styled.button`
  padding: 16px 32px;
  gap: 8px;

  width: 150px;

  background: ${(props) => (props.disabled ? "#b0bcc0" : "#00688b")};
  border: none;
  border-radius: 4px;

  font-weight: 700;
  font-size: 16px;
  color: #ffffff;

  transition: all 0.3s ease-in-out;
  cursor: ${(props) => (props.disabled ? "context-menu" : "pointer")};

  &:hover {
    background: ${(props) => (props.disabled ? "#b0bcc0" : "#2B829F")};
  }

  @media only screen and (max-width: 769px) {
    padding: 12px 16px;
    width: 100px;
  }
`;

const couponIconStyle = {
  fontSize: "14px",
  marginRight: "5px",
};

const Finalist = ({ orderProducts, orderTotal, deliFee, cartItems, deli }) => {
  const location = useLocation();

  const finalPage = location.pathname.split("/")[2];

  let couponItem = false;
  const [orderInfo, setOrderInfo] = useState();
  const [couponValue, setCouponValue] = useState(); // state for saving user applied coupon in input field
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState(); // state for coupon status
  const [couponApplied, setCouponApplied] = useState(); // checking if this order has applied coupon
  const [couponAmount, setCouponAmount] = useState();

  const totalFinalAmount = orderTotal
    ? orderTotal - deliFee
    : parseInt(localStorage.getItem("total"));

  let grandTotal;

  let orgPrice;
  let totalOrgAmount = 0;
  let totalSavingAmount = 0;
  let totalItemCount = 0;

  const checkCouponItem = (coupon_percent) => {
    if (coupon_percent) {
      couponItem = true;
      // couponPrice = ( coupon_percent * market_price ) / 100;
    }
  };

  const calculateTotalItem = (qty) => {
    totalItemCount = totalItemCount + qty;
  };

  const calculateOrgAmount = (
    discount,
    qty,
    price,
    market_price,
    coupon_percent
  ) => {
    if (discount > 0) {
      orgPrice = qty * market_price;
      totalOrgAmount = totalOrgAmount + orgPrice;
    } else {
      if (coupon_percent) {
        orgPrice = qty * market_price;
        totalOrgAmount += orgPrice;
      } else {
        orgPrice = qty * price;
        totalOrgAmount = totalOrgAmount + orgPrice;
      }
    }
  };

  const calculateSavingAmount = () => {
    totalSavingAmount = totalOrgAmount - totalFinalAmount;
  };

  const applyCoupon = async () => {
    let token = localStorage.getItem("token");
    const order = JSON.parse(localStorage.getItem("order"));

    await publicRequest
      .put(`/coupons/find?code=${couponValue}&orderId=${order._id}`, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let status = res.status;

        if (status === 200) {
          setMessage(res.data.message);
          setSuccess(true);

          setCouponAmount(res.data.coupon_amount);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setMessage(err.response.data);
          setSuccess(false);
        }
      });
  };

  const getUserOrder = async () => {
    const order = JSON.parse(localStorage.getItem("order"));
    const token = localStorage.getItem("token");
    const orderId = order && order._id;

    if (order) {
      await publicRequest
        .get(`/orders/find/${orderId}`, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          setOrderInfo(res.data[0]);
          if (res.data[0]) {
            localStorage.setItem("order", JSON.stringify(res.data[0]));
          }

          setCouponApplied(res.data[0].coupon);

          if (res.data[0].coupon) {
            setCouponAmount(res.data[0].coupon_amount);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getGrandTotal = () => {
    if (couponAmount) {
      if (deli) {
        grandTotal = parseInt(totalFinalAmount) + deli - couponAmount;
      } else if (orderInfo?.delivery_fees) {
        grandTotal =
          parseInt(totalFinalAmount) + orderInfo.delivery_fees - couponAmount;
      } else {
        grandTotal = parseInt(totalFinalAmount) - couponAmount;
      }
    } else {
      if (deli >= 0) {
        grandTotal = parseInt(totalFinalAmount) + deli;
      } else if (orderInfo?.delivery_fees) {
        grandTotal = parseInt(totalFinalAmount) + orderInfo.delivery_fees;
      } else {
        grandTotal = parseInt(totalFinalAmount);
      }
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  return orderProducts ? (
    <Container>
      <Wrapper>
        <Header>Order Summary</Header>
        <List>
          {orderProducts.map((item) => (
            <Item key={item._id}>
              {calculateTotalItem(item.quantity)}
              {calculateOrgAmount(
                item.discount,
                item.quantity,
                item.price,
                item.market_price,
                item.coupon_percent
              )}
              {checkCouponItem(item.coupon_percent)}
              <ImageContainer>
                <Image src={item.imageURL} alt={item.productTitle}></Image>
              </ImageContainer>
              <Desc>{item.productTitle}</Desc>
              <Quantity>x {item.quantity}</Quantity>
            </Item>
          ))}
        </List>

        <List>
          <Box>
            <Text>
              Subtotal ({totalItemCount} {totalItemCount > 1 ? "items" : "item"}
              )
            </Text>
            <PriceSection>
              <Price>{parseInt(totalFinalAmount).toLocaleString()} Ks.</Price>
              {/* <Price>{total.toLocaleString()} Ks.</Price> */}
              {totalOrgAmount.toString() !== totalFinalAmount.toString() && (
                <SmallPrice>{totalOrgAmount.toLocaleString()} Ks.</SmallPrice>
              )}
            </PriceSection>
          </Box>

          {calculateSavingAmount()}

          {totalSavingAmount > 0 && (
            <Box>
              <Text className="saving">Savings</Text>
              <Tag>- {totalSavingAmount.toLocaleString()} Ks.</Tag>
            </Box>
          )}

          <Box>
            <Text>Delivery fees</Text>
            <Price>
              {deliFee.toLocaleString()}
              Ks.
            </Price>
          </Box>
          {couponItem &&
            (success || couponApplied ? (
              <Box id="coupon-box" style={{ paddingBottom: "50px" }}>
                <Text>
                  Coupon Code:{" "}
                  <Span>{couponValue ? couponValue : couponApplied}</Span>
                </Text>
                <Price>-{couponAmount} Ks.</Price>
                <Message className="green">
                  <TaskAltOutlinedIcon style={couponIconStyle} />
                  Coupon Code Applied
                </Message>
              </Box>
            ) : (
              <Box
                id="coupon-box"
                style={{ paddingBottom: "30px" }}
                className="box-container"
                status={
                  finalPage === "order-confirmed" || !finalPage ? "hide" : ""
                }
              >
                <Input
                  type="text"
                  value={couponValue}
                  onChange={(e) => setCouponValue(e.target.value)}
                />
                <PlaceHolder className={couponValue && "filled"}>
                  Enter Coupon Code
                </PlaceHolder>
                {message && <Message className="red">{message}</Message>}

                <Button onClick={() => applyCoupon()} disabled={!couponValue}>
                  Apply
                </Button>
              </Box>
            ))}
        </List>

        <List className="last-box">
          {/* {getGrandTotal()} */}
          <Box>
            <Text>Total</Text>
            <Price>{orderTotal.toLocaleString()} Ks.</Price>
          </Box>
        </List>

        <List className="last-box">
          <Box>
            <InfoOutlinedIcon
              style={{ color: "#758a91", paddingRight: "10px" }}
            />
            <Text>
              Transportation charges may vary due to your shipping method or
              address.
            </Text>
          </Box>
        </List>
      </Wrapper>
    </Container>
  ) : cartItems ? (
    <Container>
      <Wrapper>
        <Header>Order Summary</Header>
        <List>
          {cartItems.map((item) => (
            <Item key={item._id}>
              {calculateTotalItem(item.quantity)}
              {calculateOrgAmount(
                item.discount_item,
                item.quantity,
                item.price,
                item.market_price,
                item.coupon_percent
              )}
              {checkCouponItem(item.coupon_percent)}
              <ImageContainer>
                <Image src={item.image[0]} alt={item.title}></Image>
              </ImageContainer>
              <Desc>{item.title}</Desc>
              <Quantity>x {item.quantity}</Quantity>
            </Item>
          ))}
        </List>

        <List>
          <Box>
            <Text>
              Subtotal ({totalItemCount} {totalItemCount > 1 ? "items" : "item"}
              )
            </Text>
            <PriceSection>
              <Price>{parseInt(totalFinalAmount).toLocaleString()} Ks.</Price>
              {/* <Price>{total.toLocaleString()} Ks.</Price> */}
              {totalOrgAmount.toString() !== totalFinalAmount.toString() && (
                <SmallPrice>{totalOrgAmount.toLocaleString()} Ks.</SmallPrice>
              )}
            </PriceSection>
          </Box>

          {calculateSavingAmount()}

          {totalSavingAmount > 0 && (
            <Box>
              <Text className="saving">Savings</Text>
              <Tag>- {totalSavingAmount.toLocaleString()} Ks.</Tag>
            </Box>
          )}

          <Box>
            <Text>Delivery fees</Text>
            <Price>
              {typeof deli === "number"
                ? deli
                : orderInfo?.delivery_fees
                ? orderInfo?.delivery_fees
                : 0}
              {/* ? deli
                : // : deliFee
                // ? deliFee
                orderInfo?.delivery_fees
                ? orderInfo?.delivery_fees
                : 0}{" "} */}{" "}
              Ks.
            </Price>
          </Box>
          {couponItem &&
            (success || couponApplied ? (
              <Box id="coupon-box" style={{ paddingBottom: "50px" }}>
                <Text>
                  Coupon Code:{" "}
                  <Span>{couponValue ? couponValue : couponApplied}</Span>
                </Text>
                <Price>-{couponAmount} Ks.</Price>
                <Message className="green">
                  <TaskAltOutlinedIcon style={couponIconStyle} />
                  Coupon Code Applied
                </Message>
              </Box>
            ) : (
              <Box
                id="coupon-box"
                style={{ paddingBottom: "30px" }}
                className="box-container"
                status={
                  finalPage === "order-confirmed" || !finalPage ? "hide" : ""
                }
              >
                <Input
                  type="text"
                  value={couponValue}
                  onChange={(e) => setCouponValue(e.target.value)}
                />
                <PlaceHolder className={couponValue && "filled"}>
                  Enter Coupon Code
                </PlaceHolder>
                {message && <Message className="red">{message}</Message>}

                <Button onClick={() => applyCoupon()} disabled={!couponValue}>
                  Apply
                </Button>
              </Box>
            ))}
        </List>

        <List className="last-box">
          {getGrandTotal()}
          <Box>
            <Text>Total</Text>
            <Price>{grandTotal.toLocaleString()} Ks.</Price>
          </Box>
        </List>

        <List className="last-box">
          <Box>
            <InfoOutlinedIcon
              style={{ color: "#758a91", paddingRight: "10px" }}
            />
            <Text>
              Transportation charges may vary due to your shipping method or
              address.
            </Text>
          </Box>
        </List>
      </Wrapper>
    </Container>
  ) : (
    <></>
  );
};

export default Finalist;

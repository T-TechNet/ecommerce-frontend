import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { publicRequest } from "../../../requestMethods";
import styled from "styled-components";

// mui icons
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CancelSheet from "./CancelSheet";
import "./Scroll.css";
import "../../step.css";

//for item order
import Item from "./Item";

import ayapay from "../../../assets/PaymentLogos/AYA_Pay_Logo.svg";
import kbzpay from "../../../assets/PaymentLogos/kpayLogo.webp";
import cbpay from "../../../assets/PaymentLogos/CB_Pay.png";
import kbzmbanking from "../../../assets/PaymentLogos/kbzMobileBanking.jpg";
import ayambanking from "../../../assets/PaymentLogos/AYAMobileBanking.jpg";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Desktop = styled.div`
  width: 80%;

  @media screen and (max-width: 1250px) {
    width: 100%;
  }
`;
const Route = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 45px;
  cursor: context-menu;
`;

const arrowIcon = {
  fontSize: "30px",
  color: "#000",
  paddingRight: "2px",
};

const cancelIcon = {
  fontSize: "30px",
  color: "#CC0000",
  paddingRight: "2px",
};

const Icon = {
  fontSize: "20px",
  color: "#002734",
  paddingRight: "2px",
  marginRight: "5px",
};

const circleIcon = {
  fontSize: "12px",
};

const checkIcon = {
  fontSize: "18px",
};

const arrowUp = {
  fontSize: "46px",
  color: "white",
};

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 20px;

  @media only screen and (min-width: 700px) and (max-width: 820px) {
    margin-right: 7px;
  }
`;

const Cart = styled.div`
  width: 95%;
  background: #ebeeef;
  border-radius: 5px;
  margin-top: 10px;
`;

const Header = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 20px;
`;

const Row2 = styled.div`
  margin-bottom: 20px;
  margin-left: 20px;
`;

const State = styled.div`
  height: 20px;
  display: inline-flex;
  padding: 2px 8px 6px 8px;
  align-items: flex-start;
  gap: 10px;
  margin-right: 10px;
  border-radius: 4px;
  border: none;
  background: ${(props) =>
    props.className === "pending"
      ? "#FF9C2B"
      : props.className === "preparing"
      ? "#FFD700"
      : props.className === "shipped"
      ? "#00688B"
      : "#2B9456"};
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;

  @media only screen and (max-width: 759px) {
    font-size: 15px;
    // padding: 2px 4px 2px 4px;
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const CancelBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  align-items: flex-start;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const CancelBtn = styled.button`
  color: #cc0000;
  border: 0px;
  background: #fff;
  font-size: 16px;
  font-weight: 700;

  &:hover {
    color: #2eb7ae;
  }

  @media only screen and (max-width: 759px) {
    font-size: 15px;
  }

  @media screen and (min-width: 860px) and (max-width: 930px) {
    font-size: 15px;
  }
`;

const LightweightFont = styled.p`
  font-weight: 0;
  color: #758a91;
  font-size: 14px;
  font-weight: 400;
`;

const AddressDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 40px;
  margin-right: 5px;

  @media only screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;
const Col = styled.div`
  width: 100%;
`;

const AddressCart = styled.div`
  display: flex;
  flex-direction: column;
  background: #e6f0f3;
  margin: 15px 0;
  padding: 20px 20px;
  border-radius: 5px;
  width: 82%;
`;

const PaymentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 40px;
  width: 100%;
`;

const PaymentCart = styled.div`
  display: flex;
  background: #e6f0f3;
  margin: 15px 0;
  padding: 20px 20px;
  border-radius: 5px;
  width: 39%;
  align-items: center;

  @media only screen and (max-width: 700px) {
    width: 77%;
  }
`;

const Img = styled.img`
  margin-right: 20px;
  width: 50px;
  height: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 40px;
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #bfc9cc;
  margin: 10px 0;
`;

const ProductHeader = styled.h4`
  width: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const PriceHeader = styled.h4`
  width: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const QtyHeader = styled.h4`
  width: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const TotalHeader = styled.h4`
  width: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;
  margin: 10px 0px;

  @media only screen and (max-width: 940px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const ColorBoldFont = styled.p`
  display: inline-block;
  color: #03a89e;
  font-size: 15px;
`;

const DateDisplay = styled.span`
  color: #00688b;
  font-weight: 400;
`;

const Date = styled.span`
  font-size: 15px;
  color: #00688b;
  margin-left: 5px;
`;

const ViewOrderDetail = () => {
  const { ordNum } = useParams();

  //steps
  const steps = [
    "Order Placed",
    "pending",
    "preparing",
    "shipped",
    "delivered",
  ];

  const [myOrder, setMyOrder] = useState(); // for storing order details from axios req
  const [orderStatus, setOrderStatus] = useState();
  const [productDetails, setProductDetails] = useState();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [isOpen, setIsOpen] = useState(false);

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  const showPayLogo = () => {
    if (myOrder.payment === "AYA Pay") {
      return <Img src={ayapay} />;
    } else if (myOrder.payment === "KBZ Pay") {
      return <Img src={kbzpay} />;
    } else if (myOrder.payment === "CB Pay") {
      return <Img src={cbpay} />;
    } else if (myOrder.payment === "KBZ MBanking") {
      return <Img src={kbzmbanking} />;
    } else if (myOrder.payment === "KBZ (Special)") {
      return <Img src={kbzmbanking} />;
    } else if (myOrder.payment === "AYA MBanking") {
      return <Img src={ayambanking} />;
    } else if (myOrder.payment === "AYA (Special)") {
      return <Img src={ayambanking} />;
    } else {
    }
  };

  // const fetchDataFromAPI = async (array) => {
  //   let token = localStorage.getItem("token");
  //   let productIds = [];

  //   // Separating product ids to array
  //   array &&
  //     array.forEach((item) => {
  //       productIds.push(item.productId);
  //     });

  //   // fetching product details from mongodb with separated ids
  //   const response = await publicRequest.get(
  //     `/products/find?id=${productIds}&type=array`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         token: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   // ADD BOUGHT QUANTITY TO PRODUCT
  //   // productData.forEach((item) => {
  //   //   array.forEach((p, i) => {
  //   //     if (item._id === p.productId) {
  //   //       item.quantity = array[i].quantity;
  //   //     }
  //   //   });
  //   // });

  //   let productData = response.data;

  //   array &&
  //     array.forEach((item) => {
  //       productData.forEach((p, i) => {
  //         if (item.productId === p._id) {
  //           item.imageURL = p.image[0];
  //           item.productTitle = p.title;
  //         }
  //       });
  //     });

  //   setProductDetails(array);
  // };

  const getOrderDetail = async () => {
    await publicRequest
      .get(`/orders/find/${ordNum}`)
      .then((res) => {
        setMyOrder(res.data[0]);
        setProductDetails(res.data[0].products);
        // fetchDataFromAPI(res.data[0].products);
        setOrderStatus(res.data[0].status);
      })
      .catch((err) => console.log(err));
  };

  const calculateEstimatedArrivalDate = () => {
    let date = parseInt(myOrder.updatedAt.substring(8, 10));
    let updatedDate = date + 3;

    let prefix = myOrder.updatedAt.substring(0, 8);

    return prefix + updatedDate.toString();
  };

  useEffect(() => {
    getOrderDetail();
  }, [ordNum]);

  return (
    <>
      {myOrder && (
        <Container>
          <Desktop>
            <Route>
              <span
                style={{
                  color: "#758A91",
                  fontSize: "16px",
                  fontWeight: "400",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/${user.username}/orders`)}
              >
                My Orders
              </span>
              <ArrowRightIcon style={arrowIcon} />
              <ColorBoldFont>Order Number : {ordNum.slice(-15)}</ColorBoldFont>
            </Route>
            <CartContainer>
              <Cart>
                <Header>
                  <Row1>
                    <div>
                      <strong>
                        Order Number :{" "}
                        <ColorBoldFont>{ordNum.slice(-15)}</ColorBoldFont>{" "}
                      </strong>
                      <State className={myOrder.status}>{myOrder.status}</State>
                      <Date>on : {myOrder.updatedAt.substring(0, 10)}</Date>
                    </div>

                    {/* CANCEL ORDER DIV */}

                    {/* <CancelBtnContainer>
                  <div
                    style={{ display: "flex" }}
                    onClick={() => toggleBottomSheet()}
                  >
                    <HighlightOffIcon style={cancelIcon} />
                    <CancelBtn>Cancel Order</CancelBtn>
                  </div>
                  <LightweightFont>within 01:06:12</LightweightFont>
                  <CancelSheet open={isOpen} setOpen={setIsOpen} />
                </CancelBtnContainer> */}
                  </Row1>
                  {myOrder.date && (
                    <Row2>
                      <small>
                        <span
                          style={{
                            color: "#667D85",
                            fontSize: "14px",
                            fontWeight: "400",
                          }}
                        >
                          Placed order on :{" "}
                        </span>{" "}
                        {myOrder.date}
                      </small>
                    </Row2>
                  )}
                </Header>

                {/* ORDER TRACKING PROGRESS BAR */}
                <div className="wrapper">
                  {steps.map((step, i) => (
                    <div
                      key={i}
                      className={`step-item ${
                        step === orderStatus && "active"
                      } ${i < steps.indexOf(orderStatus) && "complete"}`}
                    >
                      {/* ICON UI */}
                      <div className="step">
                        {i < steps.indexOf(orderStatus) ||
                        steps.indexOf(orderStatus) === 4 ? (
                          <CheckIcon style={checkIcon} />
                        ) : (
                          <CircleIcon style={circleIcon} />
                        )}
                      </div>

                      {/* STATUS DISPLAY */}
                      {step === "pending" ? (
                        <p>Pending</p>
                      ) : step === "preparing" ? (
                        <p>Preparing to Ship</p>
                      ) : step === "shipped" ? (
                        <p>Shipped</p>
                      ) : step === "delivered" ? (
                        <p>Delivered</p>
                      ) : (
                        <p>Order Placed</p>
                      )}

                      {/* TOOLTIP FOR EACH STATUS */}
                      {steps.indexOf(orderStatus) === i && (
                        <>
                          {orderStatus === "pending" && (
                            <div style={{ position: "relative" }}>
                              <ArrowDropUpIcon style={arrowUp} />
                              <div
                                className="tooltip"
                                style={{
                                  position: "absolute",
                                  top: "27px",
                                  right: "-380px",
                                }}
                              >
                                Thanks for your order! We are currently
                                verifying it and we will update you when we are
                                done.
                              </div>
                            </div>
                          )}
                          {orderStatus === "preparing" && (
                            <div
                              style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <ArrowDropUpIcon style={arrowUp} />
                              <div
                                className="tooltip"
                                style={{ position: "absolute", top: "27px" }}
                              >
                                Your order has been verified and we're getting
                                ready to ship it. We'll notify you when it's on
                                its way!
                                <br></br>
                                <ColorBoldFont>
                                  Started preparing on :
                                </ColorBoldFont>{" "}
                                <DateDisplay>
                                  {myOrder.updatedAt.substring(0, 10)}
                                </DateDisplay>
                              </div>
                            </div>
                          )}
                          {orderStatus === "shipped" && (
                            <div
                              style={{
                                position: "relative",
                              }}
                            >
                              <ArrowDropUpIcon style={arrowUp} />
                              <div
                                className="tooltip"
                                style={{
                                  position: "absolute",
                                  top: "27px",
                                  right: "-160px",
                                }}
                              >
                                We've shipped your order! The estimated arrival
                                time may vary depending on the delivery service
                                used.
                                <br></br>
                                <ColorBoldFont style={{ color: "#03A89E" }}>
                                  Shipped on :
                                </ColorBoldFont>{" "}
                                <DateDisplay>
                                  {myOrder.updatedAt.substring(0, 10)}{" "}
                                </DateDisplay>
                                <ColorBoldFont
                                  style={{
                                    marginLeft: "30px",
                                    color: "#03A89E",
                                  }}
                                >
                                  Estimated arrival on :{" "}
                                </ColorBoldFont>{" "}
                                <DateDisplay>
                                  {calculateEstimatedArrivalDate()}
                                </DateDisplay>
                              </div>
                            </div>
                          )}
                          {orderStatus === "delivered" && (
                            <div
                              style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                              }}
                            >
                              <ArrowDropUpIcon style={arrowUp} />
                              <div
                                className="tooltip"
                                style={{
                                  position: "absolute",
                                  top: "27px",
                                }}
                              >
                                Your order has been delivered! Thank you for
                                shopping with us.
                                <br></br>
                                <ColorBoldFont>
                                  Delivered on :
                                </ColorBoldFont>{" "}
                                <DateDisplay>
                                  {myOrder.updatedAt.substring(0, 10)}
                                </DateDisplay>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </Cart>
            </CartContainer>

            {/* DELIVERY & BILLING ADDRESSES */}
            <AddressDiv>
              {/* DELIVERY ADDRESS */}
              {myOrder.delivery === "delivery" ? (
                <Col>
                  <h4>Delivery Address</h4>
                  <AddressCart>
                    {myOrder.name}
                    <Flex>
                      <div style={{ display: "flex", marginRight: "10px" }}>
                        <PhoneIcon style={Icon} />
                        {myOrder.phnum}
                      </div>
                      <div style={{ display: "flex" }}>
                        <MailOutlineIcon style={Icon} />
                        {myOrder.email}
                      </div>
                    </Flex>
                    <div style={{ display: "flex" }}>
                      <LocationOnOutlinedIcon style={Icon} />
                      {myOrder?.address}, {myOrder?.city},{" "}
                      {myOrder?.region.charAt(0).toUpperCase() +
                        myOrder?.region.slice(1)}
                    </div>
                  </AddressCart>
                </Col>
              ) : (
                <Col>
                  <h4>Pick up Address</h4>
                  <AddressCart>
                    Rangoon Discount Office
                    <Flex>
                      <div style={{ display: "flex", marginRight: "10px" }}>
                        <PhoneIcon style={Icon} />
                        09942095359
                      </div>
                      <div style={{ display: "flex" }}>
                        <MailOutlineIcon style={Icon} />
                        sales@rangoondiscount.com
                      </div>
                    </Flex>
                    <div style={{ display: "flex" }}>
                      <LocationOnOutlinedIcon style={Icon} />
                      11-A, Mya Wut Yee Lane, A One Street, Ward 5, Mayangone
                      Township, Yangon.
                    </div>
                  </AddressCart>
                </Col>
              )}

              {/* BILLING ADDRESS */}
              <Col>
                <h4>Billing Address</h4>
                <AddressCart>
                  {myOrder.billing_address.name}
                  <Flex>
                    <div style={{ display: "flex", marginRight: "10px" }}>
                      <PhoneIcon style={Icon} />
                      {myOrder.billing_address.phnum}
                    </div>
                    <div style={{ display: "flex" }}>
                      <MailOutlineIcon style={Icon} />
                      {myOrder.billing_address.email}
                    </div>
                  </Flex>
                  <div style={{ display: "flex" }}>
                    <LocationOnOutlinedIcon style={Icon} />
                    {myOrder.billing_address.address},{" "}
                    {myOrder.billing_address.city},{" "}
                    {myOrder.billing_address.region.charAt(0).toUpperCase() +
                      myOrder.billing_address.region.slice(1)}
                  </div>
                </AddressCart>
              </Col>
            </AddressDiv>

            {/* PAYMENT METHOD */}
            <PaymentDiv>
              <h4>Payment Method</h4>
              <PaymentCart>
                {/* <Img src={AYA} /> */}
                {showPayLogo()}
                {myOrder.payment}
              </PaymentCart>
            </PaymentDiv>

            {/* ORDER ITEMS */}
            <Wrapper>
              <h4>Items ordered ({myOrder.products.length}) </h4>
              <Hr></Hr>
              <div style={{ display: "flex" }}>
                <ProductHeader>Product</ProductHeader>
                <PriceHeader>Price</PriceHeader>
                <QtyHeader>Quantity</QtyHeader>
                <TotalHeader>Total</TotalHeader>
              </div>
              <Hr></Hr>

              <Item item={productDetails} order={myOrder} />
            </Wrapper>
          </Desktop>
        </Container>
      )}
    </>
  );
};

export default ViewOrderDetail;

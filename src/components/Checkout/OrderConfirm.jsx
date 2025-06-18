import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InfoIcon from "@mui/icons-material/Info";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { publicRequest } from "../../requestMethods";
import { useLocation, useNavigate } from "react-router-dom";
import ayapay from "../../assets/PaymentLogos/AYA_Pay_Logo.svg";
import kbzpay from "../../assets/PaymentLogos/kpayLogo.webp";
import cbpay from "../../assets/PaymentLogos/CB_Pay.png";
import kbzmbanking from "../../assets/PaymentLogos/kbzMobileBanking.jpg";
import ayambanking from "../../assets/PaymentLogos/AYAMobileBanking.jpg";
import Overlay from "../Categories/Overlay";
import SummaryBottomSheet from "./SummaryBottomSheet";
import CheckIcon from "@mui/icons-material/Check";
import FinalistDesktop from "./FinalistDesktop";
//step for desktop
import "../../components/step.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: context-menu;

  @media only screen and (max-width: 769px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  width: 1150px;
  margin: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media only screen and (max-width: 1204px) {
    width: 90%;
    margin-top: 20px;
  }
`;

const SummaryContainer = styled.div`
  display: none;

  @media only screen and (max-width: 769px) {
    width: 90%;
    padding: 20px;
    background: #dee3e5;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  color: #00688b;
`;

const TotalAmount = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #002734;
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  @media only screen and (min-width: 1203px) {
    display: none;
  }
  @media only screen and (max-width: 769px) {
    display: none;
  }
`;
const Text2 = styled.div`
  display: flex;
  padding-bottom: 10px;
  color: #758a91;
`;
const ShowHideContainer = styled.div`
  padding: 5px;
  width: 30%;
  @media only screen and (min-width: 1203px) {
    width: 40%;
  }
  @media only screen and (max-width: 769px) {
    display: none;
  }
`;
const NoticeBar = styled.div`
  width: 95%;
  background: #fff3e6;
  border-radius: 8px;
  padding: 10px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  gap: 5px;

  @media only screen and (max-width: 769px) {
    width: 93%;
  }
`;
const DisplayContainer = styled.div`
  width: 100%;
  padding: 30px 0;
  gap: 25px;
  display: flex;
  align-items: flex-start;

  @media only screen and (max-width: 769px) {
    padding: 10px 0;
  }
`;

const DisplayWrapper = styled.div`
  //   width: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 30px;
  @media only screen and (max-width: 769px) {
    width: 100%;
  }
  gap: 30px;
  display: flex;
  flex-direction: column;
  width: 70%;
  @media only screen and (min-width: 1203px) {
    width: 60%;
  }
`;
const Display = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Status = styled.p`
  padding: 5px;

  @media only screen and (max-width: 769px) {
    font-weight: 400;
    font-size: 14px;
  }
`;

const Block = styled.div``;

const Agreement = styled.div`
  display: ${(props) => (props.className === "desktop" ? "flex" : "none")};
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 769px) {
    padding: 10px 0;
    justify-content: flex-start;
    display: ${(props) => (props.className === "mobile" ? "flex" : "none")};
  }
`;
const IconDiv = styled.div`
  color: #758a91;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #00688b;
    cursor: pointer;
  }
`;
const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #000000;
`;
const Span = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: #00688b;

  &:hover {
    color: #03a89e;
  }
`;

const Section = styled.div`
  display: flex;

  @media only screen and (max-width: 769px) {
    flex-direction: column;
  }
`;
const ButtonContainer = styled.div`
  gap: 20px;
  padding: 20px 0;
  display: ${(props) => (props.className === "desktop" ? "flex" : "none")};
  justify-content: flex-end;
  width: 100%;
  @media only screen and (max-width: 769px) {
    flex-direction: column-reverse;
    padding: 10px 0;
    display: ${(props) => (props.className === "mobile" ? "flex" : "none")};
  }
`;

const Button = styled.input`
  width: 200px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  color: white;
  padding: 16px 32px;
  gap: 8px;
  border-radius: 4px;

  cursor: ${(props) => (props.disabled === false ? "pointer" : "context-menu")};
  background-color: ${(props) =>
    props.disabled === false ? "#00688B" : "#B0BCC0"};

  &:hover {
    background: ${(props) =>
      props.disabled === false ? "#2B829F" : "#B0BCC0"};
    box-shadow: ${(props) =>
      props.disabled === false ? "0px 1px 2px rgba(0, 0, 0, 0.3)" : ""};
    transform: ${(props) =>
      props.disabled === false ? "translate(-0.5px, 0.5px)" : ""};
    transition: all 0.3s ease;
  }

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  // width: 135px;
  font-size: 16px;
  color: #00688b;
  font-weight: 700;
  background-color: white;

  padding: 16px 0px;
  gap: 8px;

  border: 1px solid #94a4aa;
  border-radius: 4px;

  cursor: context-menu;

  &:hover {
    background: #e6f0f3;
    border: 1px solid #dee3e5;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 769px) {
    // width: 81%;
    width: 100%;
  }

  @media only screen and (max-width: 366px) {
    // width: 79%;
    width: 100%;
  }
`;

const InfoContainer = styled.div`
  padding: ${(props) =>
    props.className === "payment" ? "20px" : "10px 10px 15px 10px"};
  background: #e6f0f3;
  border-radius: 8px;
`;

const Div = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 769px) {
    padding: 5px 0;
  }
`;

const InfoLabel = styled.div`
  padding: 10px 30px 0 0;
  font-weight: 400;
  font-size: 16px;
  color: #002734;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 769px) {
    align-items: flex-start;
    padding: 10px 0 0 0;
  }
`;

const Label = styled.p`
  font-weight: 700;
  color: ${(props) => (props.className === "edit" ? "#00688B" : "#000000")};
  font-size: 16px;
  /* width: ${(props) => (props.className === "info" ? "40%" : "60%")};  */
  padding: 5px;
  padding-left: ${(props) => props.className === "payment" && "0"};
  display: flex;
  align-items: center;
  /* justify-content: ${(props) => props.className === "edit" && "flex-end"}; */

  cursor: ${(props) => props.className === "edit" && "pointer"};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  padding: 0 10px 0 15px;
  object-fit: cover;
`;

const infoIcon = {
  fontSize: "18px",
  paddingRight: "10px",
};

const notice = {
  // padding: "0 10px",
  color: "#FF8800",
};

const expand = {
  paddingLeft: "10px",
};

const checkIcon = {
  fontSize: "18px",
};

///shipping step container
const Circle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 25px;
  height: 25px;
  margin-right: 10px;

  color: #fff;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.className === "active"
        ? "#00688B"
        : props.className === "complete"
        ? "#007E33"
        : "#B0BCC0"};
  background: ${(props) =>
    props.className === "active"
      ? "#00688B"
      : props.className === "complete"
      ? ""
      : "#b0bcc0"};

  @media only screen and (max-width: 769px) {
    display: none;
  }
`;
const Terms = styled.span`
  text-decoration: underline;
  text-decoration-thickness: 0.1px;

  text-underline-offset: 2px;
  color: #00688b;
`;
const Hr = styled.hr`
  margin-top: 8px;
  width: 100%;
`;

///shipping step container for desktop
const StepDesktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 95%;
  height: 50px;
  padding: 0 20px 0 10px;
  margin-bottom: 20px;

  border-radius: 4px;
  border: 1px solid var(--neutral-n-40, #dee3e5);
  background: var(--white, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);

  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
`;

const Step = styled.span`
  border: 2px solid
    ${(props) =>
      props.className === "active"
        ? "#00688B"
        : props.className === "complete"
        ? "#007E33"
        : "#B0BCC0"};
  background: ${(props) =>
    props.className === "active"
      ? "#00688B"
      : props.className === "complete"
      ? ""
      : "#b0bcc0"};
  width: 90%;
  padding: 20px;
  background: #e6f0f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 769px) {
    display: none;
  }
`;

const P = styled.p`
  font-size: 14px;
  color: ${(props) =>
    props.className === "active"
      ? "#002734"
      : props.className === "complete"
      ? "#007E33"
      : "#94A4AA"};
`;
const ArrowIcon = (isActive, isComplete) => ({
  paddingRight: "15px",
  color: isActive || isComplete ? "#002734" : "#B0BCC0",
});

const check = {
  color: "green",
};

const OrderConfirm = ({ user, setCartItems, cartItems, total }) => {
  const [open, setOpen] = useState(false);

  const toggleBottomSheet = () => {
    setOpen(!open);
  };

  const totalFinalAmount = parseInt(localStorage.getItem("total"));

  const location = useLocation();
  let fees = location.state.fees;
  const path = location.pathname.split("/")[2];
  // checkout step status
  const [orderStatus, setOrderStatus] = useState(path);
  // steps
  const steps = ["contact", "payment", "order-confirmation"];

  // for arrowRightIcon desktop steps
  const isActive = true;

  const [checkbox, setCheckbox] = useState(false);

  const token = localStorage.getItem("token");
  const order = JSON.parse(localStorage.getItem("order"));
  // var base64String;
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const getOrder = async () => {
    await publicRequest
      .get(`/orders/find/${order._id}`, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInfo(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const showImage = () => {
  //   base64String = btoa(
  //     String.fromCharCode(...new Uint8Array(info.receipt.data.data))
  //   );
  // };

  const handlePlaceOrder = () => {
    confirmOrder();
    clearCart();

    // TODO: BUG
    localStorage.removeItem("cart");
    localStorage.removeItem("order");
    localStorage.removeItem("total");
  };

  const confirmOrder = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    let ts = Date.now();

    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

    let order_date = year + "-" + month + "-" + date;

    let data;

    if (user) {
      data = {
        userId: user._id,
        user_confirmation: true,
        date: order_date,
      };
    } else {
      data = {
        user_confirmation: true,
        date: order_date,
      };
    }

    if (user) {
      sessionStorage.setItem("orderId", order._id);

      // logged in user confirm
      await publicRequest
        .put(`/orders/confirm/${order._id}`, data, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          localStorage.removeItem("cart");
          localStorage.removeItem("order");
          localStorage.removeItem("total");
          const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
          setCartItems(localCart);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          navigate("/checkout/order-confirmed");
        });
    } else {
      sessionStorage.setItem("orderId", order._id);

      // guest user confirm
      await publicRequest
        .put(`/orders/guest-confirm/${order._id}`, data)
        .then((res) => {
          localStorage.removeItem("cart");
          localStorage.removeItem("order");
          localStorage.removeItem("total");
          const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
          setCartItems(localCart);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          navigate("/checkout/order-confirmed");
        });
    }
  };

  const clearCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      await publicRequest
        .delete(`carts/${user._id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          navigate("/checkout/order-confirmed", {
            state: {
              deli: fees,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/checkout/order-confirmed", {
        state: {
          deli: fees,
        },
      });
    }
  };

  const showPayLogo = () => {
    if (info.payment === "AYA Pay") {
      return <Img src={ayapay} />;
    } else if (info.payment === "KBZ Pay") {
      return <Img src={kbzpay} />;
    } else if (info.payment === "CB Pay") {
      return <Img src={cbpay} />;
    } else if (info.payment === "KBZ MBanking") {
      return <Img src={kbzmbanking} />;
    } else if (info.payment === "KBZ (Special)") {
      return <Img src={kbzmbanking} />;
    } else if (info.payment === "AYA MBanking") {
      return <Img src={ayambanking} />;
    } else if (info.payment === "AYA (Special)") {
      return <Img src={ayambanking} />;
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Container>
      {/* PROGRESS BAR MOBILE */}
      <Step>
        <h4>Checkout</h4>
        <div className="wrapper">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`step-item ${step === orderStatus && "active"} ${
                i < steps.indexOf(orderStatus) && "complete"
              }`}
            >
              {/* ICON UI */}
              <div className="step">
                {i < steps.indexOf(orderStatus) ||
                steps.indexOf(orderStatus) === 4 ? (
                  <CheckIcon style={checkIcon} />
                ) : (
                  <>{i + 1}</>
                )}
              </div>

              {/* STATUS DISPLAY */}
              {step === "contact" ? (
                <>
                  <p>Address </p>
                  <p>Information</p>
                </>
              ) : step === "payment" ? (
                <>
                  <p>Payment </p>
                  <p>Method</p>
                </>
              ) : (
                <>
                  <p>Order </p>
                  <p>Confirmation</p>
                </>
              )}
            </div>
          ))}
        </div>
      </Step>

      {/* SUMMARY FOR MOBILE */}
      <SummaryContainer>
        <Tab onClick={toggleBottomSheet}>
          View Summary <ExpandMoreOutlinedIcon style={expand} />
          <Overlay open={open} setOpen={setOpen} />
        </Tab>
        {info && info.coupon_amount ? (
          <TotalAmount>{info.amount.toLocaleString()} Ks.</TotalAmount>
        ) : (
          <TotalAmount>{totalFinalAmount.toLocaleString()} Ks.</TotalAmount>
        )}
        {/* <TotalAmount>{totalFinalAmount.toLocaleString()} Ks.</TotalAmount> */}
        <SummaryBottomSheet
          open={open}
          setOpen={setOpen}
          setCartItems={setCartItems}
          cartItems={cartItems}
          total={total}
        />
      </SummaryContainer>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Wrapper>
          {/* PROGESS BAR DESKTOP */}
          <StepDesktop>
            <Flex>
              <Flex>
                <Circle className="complete">
                  <CheckIcon style={check} />
                </Circle>
                <P className="complete">Address Information</P>
              </Flex>

              <Flex>
                <ArrowRightIcon style={ArrowIcon(isActive)} />
                <Circle className="complete">
                  <CheckIcon style={{ color: "green" }} />
                </Circle>
                <P className="complete">Payment Method</P>
              </Flex>

              <Flex>
                <ArrowRightIcon style={ArrowIcon(isActive)} />
                <Circle className="active">3</Circle>
                <P className="active">Order Confirmation</P>
              </Flex>
            </Flex>
          </StepDesktop>

          <NoticeBar>
            <InfoIcon style={notice} />
            <Status>
              Please take a few minutes to verify whether your information is
              correct.
            </Status>
          </NoticeBar>

          <DisplayContainer>
            {info && (
              <DisplayWrapper>
                <Block>
                  <Agreement className="mobile">
                    <IconDiv onClick={() => setCheckbox(!checkbox)}>
                      {checkbox ? (
                        <CheckBoxOutlinedIcon style={{ color: "#00688B" }} />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                    </IconDiv>
                    <Text>
                      I have read and agreed to the website{" "}
                      <Link
                        to="/terms-and-conditions"
                        style={{ textDecoration: "none" }}
                      >
                        <Span>terms and conditions</Span>
                      </Link>
                    </Text>
                  </Agreement>

                  <ButtonContainer className="mobile">
                    {/* <BackButton onClick={() => navigate(-1)}>Back</BackButton> */}
                    <Button
                      type={"submit"}
                      value="Place Order"
                      disabled={!checkbox}
                      onClick={() => handlePlaceOrder()}
                    />
                  </ButtonContainer>
                </Block>

                {/* FOR DELIVERY ADDRESS */}
                {info.delivery === "pickup" ? (
                  <>
                    <Display>
                      <TitleContainer>
                        <Label>Pickup Address</Label>
                        {/* <Label className="edit" onClick={() => navigate(-1)}>
                        <EditOutlinedIcon style={{ paddingRight: "5px" }} />
                        Edit
                      </Label> */}
                      </TitleContainer>
                      <InfoContainer>
                        <Div>
                          <Label>Rangoon Discount Office</Label>
                        </Div>
                        <Section>
                          <InfoLabel>
                            <PhoneOutlinedIcon style={infoIcon} />
                            09942095359
                          </InfoLabel>
                          <InfoLabel>
                            <EmailOutlinedIcon style={infoIcon} />
                            sales@rangoondiscount.com
                          </InfoLabel>
                        </Section>
                        <Section>
                          <InfoLabel>
                            <PlaceOutlinedIcon style={infoIcon} />
                            11-A, Mya Wut Yee Lane, A One Street, Ward 5,
                            Mayangone Township, Yangon.
                          </InfoLabel>
                        </Section>
                      </InfoContainer>
                    </Display>

                    <Display>
                      <TitleContainer>
                        <Label>Pickup Date & Time</Label>
                        <Label className="edit" onClick={() => navigate(-2)}>
                          <EditOutlinedIcon style={{ paddingRight: "5px" }} />
                          Edit
                        </Label>
                      </TitleContainer>

                      <InfoContainer>
                        <Section>
                          <InfoLabel>
                            <CalendarMonthOutlinedIcon style={infoIcon} />
                            {info.pickup_date}
                          </InfoLabel>
                        </Section>
                        <Section>
                          <InfoLabel>
                            <ScheduleOutlinedIcon style={infoIcon} />
                            {info.pickup_time}
                          </InfoLabel>
                        </Section>
                      </InfoContainer>
                    </Display>
                  </>
                ) : (
                  <Display>
                    <TitleContainer>
                      <Label>Delivery Address</Label>
                      <Label className="edit" onClick={() => navigate(-2)}>
                        <EditOutlinedIcon style={{ paddingRight: "5px" }} />
                        Edit
                      </Label>
                    </TitleContainer>
                    <InfoContainer>
                      <Div>
                        <Label>{info.name}</Label>
                      </Div>
                      <Section>
                        <InfoLabel>
                          <PhoneOutlinedIcon style={infoIcon} />
                          {info.phnum}
                        </InfoLabel>
                        <InfoLabel>
                          <EmailOutlinedIcon style={infoIcon} />
                          {info.email}
                        </InfoLabel>
                      </Section>
                      <Section>
                        <InfoLabel>
                          <PlaceOutlinedIcon style={infoIcon} />
                          {info.address}, {info.city},{" "}
                          {info.region.charAt(0).toUpperCase() +
                            info.region.slice(1)}
                        </InfoLabel>
                      </Section>
                    </InfoContainer>
                  </Display>
                )}

                <Display>
                  <TitleContainer>
                    <Label>Billing Address</Label>
                    <Label className="edit" onClick={() => navigate(-1)}>
                      <EditOutlinedIcon style={{ paddingRight: "5px" }} />
                      Edit
                    </Label>
                  </TitleContainer>
                  <InfoContainer>
                    <Div>
                      <Label>{info.billing_address.name}</Label>
                    </Div>
                    <Section>
                      <InfoLabel>
                        <PhoneOutlinedIcon style={infoIcon} />
                        {info.billing_address.phnum}
                      </InfoLabel>
                      <InfoLabel>
                        <EmailOutlinedIcon style={infoIcon} />
                        {info.billing_address.email}
                      </InfoLabel>
                    </Section>
                    <Section>
                      <InfoLabel>
                        <PlaceOutlinedIcon style={infoIcon} />
                        {info.billing_address.address},{" "}
                        {info.billing_address.city},{" "}
                        {info.billing_address.region.charAt(0).toUpperCase() +
                          info.billing_address.region.slice(1)}
                      </InfoLabel>
                    </Section>
                  </InfoContainer>
                </Display>

                {/* FOR PAYMENT METHOD */}
                <Display>
                  <TitleContainer>
                    <Label>Payment Method</Label>
                    <Label className="edit" onClick={() => navigate(-1)}>
                      <EditOutlinedIcon style={{ paddingRight: "5px" }} />
                      Edit
                    </Label>
                  </TitleContainer>
                  <InfoContainer className="payment">
                    <Div>
                      <Label className="payment">{info.payment}</Label>
                      {/* <Img src={ayapay} /> */}
                      {showPayLogo()}
                    </Div>
                    <Section>
                      <InfoLabel>
                        Click the “Place Order” button below and the
                        instructions of purchasing the product will be given in
                        the next page.
                      </InfoLabel>
                    </Section>
                  </InfoContainer>
                </Display>

                {/* FOR TERMS AND CONDITIONS */}
                <Block>
                  <Agreement className="desktop">
                    <IconDiv onClick={() => setCheckbox(!checkbox)}>
                      {checkbox ? (
                        <CheckBoxOutlinedIcon style={{ color: "#00688B" }} />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                    </IconDiv>
                    <Text>
                      I have read and agreed to the website{" "}
                      <Link
                        to="/terms-and-conditions"
                        style={{ textDecoration: "none" }}
                      >
                        <Span>terms and conditions</Span>
                      </Link>
                    </Text>
                  </Agreement>
                  <ButtonContainer className="desktop">
                    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    <Button
                      type={"submit"}
                      value="Place Order"
                      disabled={!checkbox}
                      onClick={() => handlePlaceOrder()}
                    />
                  </ButtonContainer>

                  <ButtonContainer className="mobile">
                    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                  </ButtonContainer>
                </Block>
                <Hr></Hr>

                <Link to="/terms-and-conditions">
                  <Terms>Terms and Conditions</Terms>
                </Link>
                <Box>
                  <InfoOutlinedIcon
                    style={{ color: "#758a91", paddingRight: "10px" }}
                  />
                  <Text2>
                    Transportation charges may vary due to your shipping method
                    or address.
                  </Text2>
                </Box>
              </DisplayWrapper>
            )}
            {/* SUMMARY FOR DESKTOP */}
            <ShowHideContainer>
              {/* <Finalist cartItems={cartItems} total={total} deli={fees} />
               */}
              <FinalistDesktop
                cartItems={cartItems}
                total={total}
                deli={fees}
              />
            </ShowHideContainer>
          </DisplayContainer>
        </Wrapper>
      </div>
    </Container>
  );
};

export default OrderConfirm;

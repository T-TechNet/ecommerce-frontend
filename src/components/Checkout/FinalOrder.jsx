import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import styled from "styled-components";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import envelope from "../../assets/Envelope.svg";

import ayapay from "../../assets/PaymentLogos/AYA_Pay_Logo.svg";
import kbzpay from "../../assets/PaymentLogos/kpayLogo.webp";
import cbpay from "../../assets/PaymentLogos/CB_Pay.png";
import kbzmbanking from "../../assets/PaymentLogos/kbzMobileBanking.jpg";
import ayambanking from "../../assets/PaymentLogos/AYAMobileBanking.jpg";

import kpayqr from "../../assets/QRCodes/kpayQR.png";
import cbpayqr from "../../assets/QRCodes/cbpay.png";
import ayapayqr from "../../assets/QRCodes/ayapay.png";
import ayacurrentqr from "../../assets/QRCodes/AYAcurrent.png";
import ayaspecialqr from "../../assets/QRCodes/AYAspecial.png";

import "../../components/step.css";
import CheckIcon from "@mui/icons-material/Check";
import FinalistDesktop from "./FinalistDesktop";

import SummaryBottomSheet from "./SummaryBottomSheet";
import Overlay from "../Categories/Overlay";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const Container = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 769px) {
    padding: 15px 0 30px 0;
  }
`;
const Wrapper = styled.div`
  width: 1150px;

  margin: 0px 20px 20px 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media only screen and (max-width: 1204px) {
    width: 93%;
    margin: 0;
    padding: 0;
    margin-top: 20px;
  }
`;

const DisplayContainer = styled.div`
  width: 100%;
  padding: 30px 0;
  gap: 25px;
  display: flex;
  align-items: flex-start;
  margin-left: 15px;

  @media only screen and (max-width: 769px) {
    padding: 10px 0;
  }
`;

const DisplayWrapper = styled.div`
  gap: 30px;
  display: flex;
  flex-direction: column;
  width: 70%;

  @media only screen and (min-width: 1203px) {
    width: 60%;
  }

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;
const Top = styled.div`
  // width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;
const Check = styled.div`
  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const MessageDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding-bottom: 10px;
  font-weight: 700;
  font-size: 20px;
  color: #002734;

  @media only screen and (max-width: 769px) {
    font-size: 16px;
  }
`;

const Desc = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #002734;

  @media only screen and (max-width: 769px) {
    font-size: 14px;
    width: ${(props) => props.className === "orderId" && "30%"};
  }

  @media only screen and (max-width: 366px) {
    font-size: 14px;
    width: ${(props) => props.className === "orderId" && "35%"};
  }
`;
const Status = styled.div`
  padding-top: 20px;
  // border-bottom: 1px solid #dee3e5;
`;

const Row = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 15px;

  @media only screen and (max-width: 769px) {
    gap: 10px;
  }
`;
const Tag = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #758a91;

  @media only screen and (max-width: 769px) {
    font-size: 14px;
  }
`;

const Copy = styled.div`
  padding: 0 10px;
  font-weight: 400;
  font-size: 14px;
  color: #00688b;

  display: flex;
  align-items: center;

  cursor: pointer;

  @media only screen and (max-width: 769px) {
    font-size: 14px;
    flex: 1;
  }
`;

const Span = styled.span`
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;
const BlockContainer = styled.div`
  width: 95%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media only screen and (max-width: 769px) {
    width: 100%;
    gap: 25px;
  }
`;

const Display = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoContainer = styled.div`
  padding: ${(props) => (props.className === "payment" ? "20px" : "15px")};
  background: #e6f0f3;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Labels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media only screen and (max-width: 769px) {
    gap: 15px;
  }

  @media only screen and (max-width: 366px) {
    flex: 1;
    /* width: 80px;
    height: 80px; */
  }
`;

const QRcode = styled.img`
  width: 100px;
  height: 100px;

  @media only screen and (max-width: 366px) {
    flex: 1;
    /* width: 80px;
    height: 80px; */
  }
`;

const InfoLabel = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #002734;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 769px) {
    font-size: 14px;
    align-items: flex-start;
  }
`;

const Label = styled.p`
  font-weight: 700;
  font-size: ${(props) => (props.className === "title" ? "18px" : "16px")};
  color: #000000;
  padding: ${(props) => props.className === "title" && "10px 0"};
  padding-left: ${(props) => props.className === "payment" && "0"};
  display: flex;
  align-items: center;

  @media only screen and (max-width: 769px) {
    font-size: ${(props) => (props.className === "contact" ? "14px" : "16px")};
  }
`;

const Section = styled.div`
  display: flex;
  gap: 30px;

  @media only screen and (max-width: 769px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const AlertBox = styled.div`
  padding-top: 10px;
  color: #cc0000;
  font-size: 16px;

  display: flex;

  @media only screen and (max-width: 769px) {
    font-size: 14px;
  }
`;

const Alert = styled.div``;
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

const TopButtonContainer = styled.div`
  display: none;

  @media only screen and (max-width: 769px) {
    width: 100%;
    margin: 0 30px;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
`;

const Button = styled.div`
  width: fit-content;
  padding: 16px 20px;
  background: #00688b;

  border-radius: 4px;
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  @media only screen and (max-width: 769px) {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Div = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`;

const copyIcon = {
  fontSize: "16px",
  color: "#00688B",
  padding: "0 5px",
};

const infoIcon = {
  fontSize: "18px",
  paddingRight: "10px",
};

const checkIcon = {
  fontSize: "18px",
};

///shipping step container
const Step = styled.div`
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

const ShowHideContainer = styled.div`
  @media only screen and (max-width: 769px) {
    display: none;
  }
  padding: 5px;
  width: 30%;
  @media only screen and (min-width: 1203px) {
    width: 40%;
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
    margin-bottom: 20px;
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
const expand = {
  paddingLeft: "10px",
};
const Terms = styled.span`
  text-decoration: underline;
  text-decoration-thickness: 0.1px;

  text-underline-offset: 2px;
  color: #00688b;
`;
const Hr = styled.hr`
  margin: 5px 0px;

  width: 95%;
`;
const StepDesktop = styled.div`
  @media only screen and (max-width: 769px) {
    display: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background: orange;
  // margin-top: 20px;
  margin-bottom: 10px;
  padding: 0px 15px;
  margin-left: 15px;
  width: 95%;
  height: 50px;
  border: 1px solid #000;
  border-radius: 4px;
  border: 1px solid var(--neutral-n-40, #dee3e5);
  background: var(--white, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  font-weight: 700;
`;
const FinalOrder = ({ setCartItems, cartItems, total }) => {
  const [open, setOpen] = useState(false);

  const toggleBottomSheet = () => {
    setOpen(!open);
  };

  const [totalFinalAmount, setTotalFinalAmount] = useState(0);

  ///////////steps
  const steps = ["contact", "payment", "order-confirmation"];

  const [info, setInfo] = useState();
  const navigate = useNavigate();

  let orderDate;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getOrder = async () => {
    // const order = JSON.parse(localStorage.getItem("order"));
    const orderId = sessionStorage.getItem("orderId");

    await publicRequest
      .get(`/orders/find/${orderId}`)
      .then((res) => {
        setInfo(res.data[0]);
        setTotalFinalAmount(res.data[0].amount);
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

  const copyOrderId = (orderId) => {
    navigator.clipboard.writeText(orderId);
  };

  const getCurrentDate = () => {
    const today = new Date();

    let year = today.getFullYear(); // 2023
    let month = months[today.getMonth()]; // current month
    let day = today.getDate(); // current day 1, 13, 27 etc.

    let date;

    if (day === 1 || day === 21 || day === 31) {
      date = day + "st";
    } else if (day === 2 || day === 22) {
      date = day + "nd";
    } else if (day === 3 || day === 23) {
      date = day + "rd";
    } else {
      date = day + "th";
    }

    orderDate = date + " " + month + ", " + year;
    return <Desc>{orderDate}</Desc>;
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
    }
  };

  const showRelatedDetails = (payment) => {
    if (payment === "AYA Pay") {
      return (
        <>
          {/* <InfoLabel>
            1. Open&nbsp;<b>“AYA PAY Wallet”</b>&nbsp;app
          </InfoLabel>
          <InfoLabel>2. Go to “Pay Bills”</InfoLabel>
          <InfoLabel>3. Search for “Rangoon Discount”</InfoLabel>
          <InfoLabel>
            4. Fill in the required fields and make the payment
          </InfoLabel> */}

          <FlexContainer>
            <QRcode src={ayapayqr} />

            <Labels>
              <InfoLabel>
                1. Scan this qr code from your "AYA Pay" Application
              </InfoLabel>
              <InfoLabel>2. Make the payment</InfoLabel>
            </Labels>
          </FlexContainer>
        </>
      );
    } else if (payment === "KBZ Pay") {
      return (
        <>
          <FlexContainer>
            <QRcode src={kpayqr} />

            <Labels>
              <InfoLabel>
                1. Scan this qr code from your "KBZ Pay" Application
              </InfoLabel>
              <InfoLabel>2. Make the payment</InfoLabel>
            </Labels>
          </FlexContainer>
        </>
      );
    } else if (payment === "CB Pay") {
      return (
        <>
          <FlexContainer>
            <QRcode src={cbpayqr} />

            <Labels>
              <InfoLabel>
                1. Scan this qr code from your "CB Pay" Application
              </InfoLabel>
              <InfoLabel>2. Make the payment</InfoLabel>
            </Labels>
          </FlexContainer>
        </>
      );
    } else if (payment === "AYA (Special)") {
      return (
        <>
          <FlexContainer>
            <QRcode src={ayaspecialqr} />

            <Labels>
              <InfoLabel>
                1. Scan this qr code from your "CB Pay" Application
              </InfoLabel>
              <InfoLabel>2. Make the payment</InfoLabel>
            </Labels>
          </FlexContainer>
        </>
      );
    } else if (payment === "AYA MBanking") {
      return (
        <>
          <FlexContainer>
            <QRcode src={ayacurrentqr} />

            <Labels>
              <InfoLabel>
                1. Scan this qr code from your "CB Pay" Application
              </InfoLabel>
              <InfoLabel>2. Make the payment</InfoLabel>
            </Labels>
          </FlexContainer>
        </>
      );
    } else if (payment === "KBZ MBanking") {
      return (
        <>
          <InfoLabel>1. Open “KBZ MBanking” app</InfoLabel>
          <InfoLabel>2. Go to “Transfer Own"</InfoLabel>
          <InfoLabel>3. Fill 05730199906454002 in "To Account" field</InfoLabel>
          <InfoLabel>
            4. Fill in the other required fields and make the payment
          </InfoLabel>
        </>
      );
    } else if (payment === "KBZ (Special)") {
      return (
        <>
          <InfoLabel>1. Open “KBZ MBanking” app</InfoLabel>
          <InfoLabel>2. Go to “Transfer Own"</InfoLabel>
          <InfoLabel>3. Fill 05713799906454001 in "To Account" field</InfoLabel>
          <InfoLabel>
            4. Fill in the other required fields and make the payment
          </InfoLabel>
        </>
      );
    } else if (payment === "Cash On Delivery" || payment === "Cash On Pickup") {
      return null;
    }
  };

  const handleContinue = () => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(localCart);
    navigate("/");
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    info && (
      <Container>
        {/* ORDER TRACKING PROGRESS BAR FOR MOBILE*/}
        <Step>
          <h4>Checkout Complete</h4>
          <div className="wrapper">
            {steps.map((step, i) => (
              <div key={i} className={"step-item complete"}>
                {/* ICON UI */}
                <div className="step">
                  <CheckIcon style={checkIcon} />
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

        {/* SUMMARRY FOR MOBILE*/}
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
            orderProducts={info.products}
            orderTotal={info.amount}
            deliFee={info.delivery_fees}
          />
        </SummaryContainer>
        {/* FOR MOBILE VIEW */}
        <TopButtonContainer>
          <Button onClick={() => handleContinue()}>Continue Shopping</Button>
        </TopButtonContainer>

        <Wrapper>
          <StepDesktop>Checkout Complete</StepDesktop>

          <DisplayContainer>
            {info && (
              <DisplayWrapper>
                <Top>
                  <Check>
                    <MessageDiv>
                      <Img src={envelope} />
                      <MessageContainer>
                        <Title>Thank You {info?.name} !</Title>
                        <Desc>
                          We received your order. Kindly proceed with the
                          payment.
                        </Desc>
                      </MessageContainer>
                    </MessageDiv>

                    <Status>
                      <Row>
                        <Tag>Order Number :</Tag>
                        <Desc className="orderId">{info?._id.slice(-15)}</Desc>
                        <Copy onClick={() => copyOrderId(info?._id)}>
                          <ContentCopyIcon style={copyIcon} />
                          <Span>Copy Number</Span>
                        </Copy>
                      </Row>
                      <Row>
                        <Tag>Order Date :</Tag>
                        {getCurrentDate()}
                      </Row>
                      <Row>
                        <Tag>Payable Amount :</Tag>
                        <Desc style={{ fontWeight: "700" }}>
                          {info?.amount.toLocaleString()} Ks.
                        </Desc>
                      </Row>
                    </Status>
                  </Check>
                </Top>
                <Hr></Hr>
                <BlockContainer>
                  <Display>
                    <Label className="title">Payment Instructions</Label>
                    <InfoContainer className="payment">
                      <Div>
                        {showPayLogo()}
                        <Label>{info?.payment}</Label>
                      </Div>
                      {showRelatedDetails(info?.payment)}
                    </InfoContainer>
                    <AlertBox>
                      <InfoOutlinedIcon style={{ paddingRight: "10px" }} />
                      {info?.payment === "Cash On Delivery" ? (
                        <Alert>
                          Please make sure to complete the payment when the
                          order arrives at your door.
                        </Alert>
                      ) : info?.payment === "Cash On Pickup" ? (
                        <Alert>
                          Please make sure to complete the payment before you
                          receive the order.
                        </Alert>
                      ) : (
                        <Alert>
                          Please make sure to complete the payment within 1-3
                          days. Otherwise, your order will be canceled.
                        </Alert>
                      )}
                    </AlertBox>
                  </Display>

                  <Display>
                    <Label className="title">Order Update</Label>
                    <InfoContainer>
                      <InfoLabel>
                        You may receive the order update via the following email
                        address and phone number.
                      </InfoLabel>
                      <Section>
                        <InfoLabel
                          style={{ fontWeight: "700", color: "#00688B" }}
                        >
                          <EmailOutlinedIcon style={infoIcon} />
                          {info?.email}
                        </InfoLabel>
                        <InfoLabel
                          style={{ fontWeight: "700", color: "#00688B" }}
                        >
                          <PhoneOutlinedIcon style={infoIcon} />
                          {info?.phnum}
                        </InfoLabel>
                      </Section>
                    </InfoContainer>
                  </Display>

                  {info?.delivery === "delivery" ? (
                    <Display>
                      <Label className="title">Delivery Address</Label>
                      <InfoContainer>
                        <Label>{info?.name}</Label>
                        <Section>
                          <InfoLabel>
                            <PhoneOutlinedIcon style={infoIcon} />
                            {info?.phnum}
                          </InfoLabel>
                          <InfoLabel>
                            <EmailOutlinedIcon style={infoIcon} />
                            {info?.email}
                          </InfoLabel>
                        </Section>
                        <Section>
                          <InfoLabel>
                            <PlaceOutlinedIcon style={infoIcon} />
                            {info?.address}, {info?.city},{" "}
                            {info?.region.charAt(0).toUpperCase() +
                              info?.region.slice(1)}
                          </InfoLabel>
                        </Section>
                      </InfoContainer>
                    </Display>
                  ) : (
                    <>
                      <Display>
                        <Label className="title">Pickup Address</Label>
                        <InfoContainer>
                          <Label>Rangoon Discount Office</Label>
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
                        <Label className="title">Pickup Date & Time</Label>
                        <InfoContainer>
                          <InfoLabel>
                            <CalendarMonthOutlinedIcon style={infoIcon} />
                            {info?.pickup_date}
                          </InfoLabel>
                          <InfoLabel>
                            <ScheduleOutlinedIcon style={infoIcon} />
                            {info?.pickup_time}
                          </InfoLabel>
                        </InfoContainer>
                      </Display>
                    </>
                  )}

                  <Display>
                    <Label className="title">Billing Address</Label>
                    <InfoContainer>
                      <Label>{info?.billing_address.name}</Label>
                      <Section>
                        <InfoLabel>
                          <PhoneOutlinedIcon style={infoIcon} />
                          {info?.billing_address.phnum}
                        </InfoLabel>
                        <InfoLabel>
                          <EmailOutlinedIcon style={infoIcon} />
                          {info?.billing_address.email}
                        </InfoLabel>
                      </Section>
                      <Section>
                        <InfoLabel>
                          <PlaceOutlinedIcon style={infoIcon} />
                          {info?.billing_address.address}
                        </InfoLabel>
                      </Section>
                    </InfoContainer>
                  </Display>

                  <Display>
                    <Label className="title">Need Help?</Label>
                    <InfoContainer>
                      <Label className="contact">
                        Contact us during office hours from 9:00 AM to 5:00 PM
                      </Label>
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
                    </InfoContainer>
                  </Display>

                  <ButtonContainer>
                    <Button onClick={() => handleContinue()}>
                      Continue Shopping
                    </Button>
                  </ButtonContainer>
                </BlockContainer>
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

            {info && (
              <ShowHideContainer>
                {/* <Finalist cartItems={cartItems} total={total} deli={deli} /> */}
                <FinalistDesktop
                  orderProducts={info.products}
                  orderTotal={info.amount}
                  deliFee={info.delivery_fees}
                />
              </ShowHideContainer>
            )}
          </DisplayContainer>
        </Wrapper>
      </Container>
    )
  );
};

export default FinalOrder;

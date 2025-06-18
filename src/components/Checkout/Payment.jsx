import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import BillingForm from "./BillingForm";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import PaymentMethod from "./PaymentMethod";
import Overlay from "../Categories/Overlay";
import SummaryBottomSheet from "./SummaryBottomSheet";
import CheckIcon from "@mui/icons-material/Check";
import FinalistDesktop from "./FinalistDesktop";
import "../../components/step.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 769px) {
    flex-direction: column;
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

const Wrapper = styled.div`
  width: 1150px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;

  @media only screen and (max-width: 1203px) {
    width: 93%;
    padding: 0;
  }
`;
const Display = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const RadioContainer = styled.div`
  padding: 20px 5px;
`;

const RadioButtons = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 25px;

  @media only screen and (max-width: 769px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const RadioDiv = styled.div`
  padding: 20px 10px;
  background: #f5f6f7;
  border: 1px solid #dee3e5;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  width: 265px;
  display: flex;
  align-items: center;
  cursor: context-menu;

  @media only screen and (max-width: 769px) {
    width: 95%;
  }
`;

const Period = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

const InfoContainer = styled.div`
  width: 90%;
  padding: 10px;
  background: #e6f0f3;
  border-radius: 8px;

  @media only screen and (max-width: 769px) {
    width: 93%;
    margin-left: 5px;
  }
`;

const Div = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 769px) {
    padding-bottom: 5px;
  }
`;

const Section = styled.div`
  padding: 5px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  /* justify-content: space-evenly; */

  @media only screen and (max-width: 769px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
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
    padding: 0;
    align-items: flex-start;
  }
`;

const Label = styled.p`
  font-weight: ${(props) => props.className === "title" && "700"};
  color: ${(props) => (props.className === "edit" ? "#00688B" : "#002734")};
  font-size: ${(props) => props.className === "title" && " 18px"};
  width: ${(props) => (props.className === "info" ? "40%" : "60%")};
  padding: 5px;
  padding-right: ${(props) => props.className === "info" && "0"};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.className === "edit" && "flex-end"};

  cursor: ${(props) => props.className === "edit" && "pointer"};

  @media only screen and (max-width: 769px) {
    padding: 0 0 0 5px;
    padding-right: ${(props) => props.className === "edit" && "5px"};
  }
`;

const ButtonContainer = styled.div`
  width: 92%;
  gap: 20px;
  padding: 40px 0;
  display: flex;
  justify-content: flex-end;

  @media only screen and (max-width: 769px) {
    flex-direction: column-reverse;
    width: 100%;
    padding: 30px 0 20px 0;
  }
`;

const Button = styled.input`
  width: 40%;
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

  width: 20%;
  font-size: 16px;
  color: #00688b;
  font-weight: 700;
  background-color: white;

  padding: 16px 32px;
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
    width: 100%;
    padding: 16px 0px;
  }
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
const Text = styled.div`
  display: flex;
  padding-bottom: 10px;
  color: #758a91;
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

const infoIcon = {
  fontSize: "18px",
  paddingRight: "10px",
};

const expand = {
  paddingLeft: "10px",
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
const Terms = styled.span`
  text-decoration: underline;
  text-decoration-thickness: 0.1px;

  text-underline-offset: 2px;
  color: #00688b;
`;
const Hr = styled.hr`
  margin: 20px 0px;

  width: 100%;
`;
///shipping step container for desktop
const StepDesktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 95%;
  height: 50px;
  margin: 20px 0 0 10px;
  padding-right: 20px;

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
const Span = styled.span`
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
const ArrowIcon = (isActive) => ({
  paddingRight: "15px",
  color: isActive ? "#002734" : "#B0BCC0",
});
const radio = { fontSize: "20px", padding: "0 15px 0 10px" };

const Payment = ({ user, setCartItems, cartItems, total }) => {
  const [open, setOpen] = useState(false);

  const toggleBottomSheet = () => {
    setOpen(!open);
  };

  const totalFinalAmount = parseInt(localStorage.getItem("total"));

  const navigate = useNavigate();
  const location = useLocation();
  let fees = location.state.fees;

  const path = location.pathname.split("/")[2];

  // checkout step status
  const [orderStatus, setOrderStatus] = useState(path);

  // For steps mapping list
  const steps = ["contact", "payment", "order-confirmation"];

  // for arrowRightIcon desktop steps
  let isActive = false;
  let isComplete = false;

  if (path === "payment") {
    isActive = true;
    isComplete = true;
  }

  const [billingAddress, setBillingAddress] = useState(
    "Same as delivery Address"
  );
  const [activeOne, setActiveOne] = useState(true);
  const [activeTwo, setActiveTwo] = useState(false);

  const [payment, setPayment] = useState("");
  // const [file, setFile] = useState("empty");
  // const form = file ? payment && file : payment;
  const form = billingAddress && payment;

  const order = JSON.parse(localStorage.getItem("order"));

  const [info, setInfo] = useState();

  const handleSelect = (type) => {
    if (type === "new") {
      setBillingAddress("new");
      setActiveOne(false);
      setActiveTwo(true);
    } else {
      setBillingAddress("same");
      setActiveOne(true);
      setActiveTwo(false);
    }
  };

  const onSubmit = async () => {
    const token = localStorage.getItem("token");

    // if (e.file) {
    //   formData = {
    //     billing_address: billingAddress,
    //     payment: e.payment,
    //     receipt: e.file[0],
    //   };
    // } else {
    //   formData = {
    //     billing_address: billingAddress,
    //     payment: e.payment,
    //   };
    // }

    let data = {
      billing_address: {
        status: billingAddress,
        name: info.name,
        phnum: info.phnum,
        email: info.email,
        address: info.address,
        city: info.city,
        region: info.region,
      },
      payment: payment,
    };

    await publicRequest
      .put(`/orders/${order._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.setItem("order", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/checkout/order-confirmation", {
      state: {
        fees: fees,
      },
    });
  };

  const getOrder = async () => {
    const token = localStorage.getItem("token");
    const order = JSON.parse(localStorage.getItem("order"));

    if (order) {
      await publicRequest
        .get(`/orders/find/${order._id}`, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          let orderInfo = res.data[0];
          setInfo(orderInfo); // to pass order info into forms
          handleSelect(orderInfo?.billing_address?.status);
          setPayment(orderInfo.payment);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Container>
      {/* ORDER TRACKING PROGRESS BAR FOR MOBILE*/}
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
      {/* SUMMARY FOR MOBILE*/}
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

        <SummaryBottomSheet
          open={open}
          setOpen={setOpen}
          setCartItems={setCartItems}
          cartItems={cartItems}
          total={total}
        />
      </SummaryContainer>
      {/* <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        > */}

      <Wrapper>
        {/* PROGRESS BAR FOR DESKTOP */}
        <StepDesktop>
          <Flex>
            {/* Stage 1 */}
            <Flex>
              <Span className="complete">
                <CheckIcon style={{ color: "green" }} />
              </Span>
              <P className="complete">Address Information</P>
            </Flex>
            {/* Stage 2 */}
            <Flex>
              <ArrowRightIcon style={ArrowIcon(isActive)} />
              <Span className="active">2</Span>
              <P className="active">Payment Method</P>
            </Flex>
            {/* Stage 3 */}
            <Flex>
              <ArrowRightIcon style={ArrowIcon()} />
              <Span>3</Span>
              <P>Order Confirmation</P>
            </Flex>
          </Flex>
        </StepDesktop>

        <div style={{ display: "flex" }}>
          <Display>
            <Label className="title">2. Payment Method</Label>
            {info?.delivery === "pickup" ? (
              <RadioContainer>
                <Period>Billing Address</Period>
                <InfoLabel>
                  Enter the address that matches your payment method.
                </InfoLabel>
                <BillingForm
                  info={info}
                  billingAddress={billingAddress}
                  fees={fees}
                />
              </RadioContainer>
            ) : (
              <RadioContainer>
                <InfoLabel>Choose the billing address:</InfoLabel>
                <RadioButtons>
                  <RadioDiv
                    style={{
                      border: activeOne
                        ? "2px solid #00688B"
                        : "1px solid #BFC9CC",
                    }}
                    onClick={() => handleSelect("same")}
                  >
                    {activeOne ? (
                      <RadioButtonCheckedIcon
                        style={{
                          fontSize: "20px",
                          padding: "0 15px 0 10px",
                          color: "#00688B",
                        }}
                      />
                    ) : (
                      <RadioButtonUncheckedIcon style={radio} />
                    )}
                    <Period>Same as delivery address</Period>
                  </RadioDiv>

                  <RadioDiv
                    style={{
                      border: activeTwo
                        ? "2px solid #00688B"
                        : "1px solid #BFC9CC",
                    }}
                    onClick={() => handleSelect("new")}
                  >
                    {activeTwo ? (
                      <RadioButtonCheckedIcon
                        style={{
                          fontSize: "20px",
                          padding: "0 15px 0 10px",
                          color: "#00688B",
                        }}
                      />
                    ) : (
                      <RadioButtonUncheckedIcon style={radio} />
                    )}
                    <Period>New billing address</Period>
                  </RadioDiv>
                </RadioButtons>
              </RadioContainer>
            )}

            {info?.delivery === "delivery" && activeOne ? (
              <div>
                <InfoContainer>
                  <Div>
                    <Label>{info?.name}</Label>
                    <Label className="edit" onClick={() => navigate(-1)}>
                      <EditOutlinedIcon style={{ paddingRight: "5px" }} />
                      Edit
                    </Label>
                  </Div>
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
                  {info?.delivery === "delivery" && (
                    <Section>
                      <InfoLabel>
                        <PlaceOutlinedIcon style={infoIcon} />
                        {info?.address}, {info?.city},{" "}
                        {info?.region.charAt(0).toUpperCase() +
                          info?.region.slice(1)}
                      </InfoLabel>
                    </Section>
                  )}
                </InfoContainer>
                <PaymentMethod
                  info={info}
                  payment={payment}
                  setPayment={setPayment}
                />
                <ButtonContainer>
                  <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                  <Button
                    type={"submit"}
                    value="Continue"
                    disabled={!form}
                    onClick={() => onSubmit()}
                  />
                </ButtonContainer>
              </div>
            ) : info?.delivery === "delivery" && activeTwo ? (
              <BillingForm
                info={info}
                billingAddress={billingAddress}
                fees={fees}
              />
            ) : (
              <></>
            )}
            <Hr></Hr>

            <Link to="/terms-and-conditions">
              <Terms>Terms and Conditions</Terms>
            </Link>
            <Box>
              <InfoOutlinedIcon
                style={{ color: "#758a91", paddingRight: "10px" }}
              />
              <Text>
                Transportation charges may vary due to your shipping method or
                address.
              </Text>
            </Box>
          </Display>

          <ShowHideContainer>
            {/* <Finalist
            cartItems={cartItems}
            setCartItems={setCartItems}
            total={total}
            deli={fees}
          /> */}
            <FinalistDesktop
              cartItems={cartItems}
              setCartItems={setCartItems}
              total={total}
              deli={fees}
            />
          </ShowHideContainer>
        </div>
      </Wrapper>
      {/* </div> */}
    </Container>
  );
};

export default Payment;

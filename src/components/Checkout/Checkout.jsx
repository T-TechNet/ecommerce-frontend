import React, { useState } from "react";
import styled from "styled-components";
import ContactInformation from "./ContactInformation";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import Overlay from "../Categories/Overlay";
import SummaryBottomSheet from "./SummaryBottomSheet";
import "../../components/step.css";
import CheckIcon from "@mui/icons-material/Check";
import FinalistDesktop from "./FinalistDesktop";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 769px) {
    flex-direction: column;
    overflow-y: scroll;
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media only screen and (min-width: 769px) and (max-width: 1204px) {
    width: 95%;
    margin-top: 20px;
  }

  @media only screen and (max-width: 769px) {
    width: 100%;
    margin-top: 20px;
  }
`;
const Wrapper2 = styled.div`
  width: 1150px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media only screen and (max-width: 1204px) {
    width: 100%;
  }
`;

const ShowHideContainer = styled.div`
  padding: 5px;
  width: 30%;

  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

const expand = {
  paddingLeft: "10px",
};

const Div = styled.div`
  @media only screen and (max-width: 769px) {
    width: 100%;
  }

  width: 70%;
`;

const checkIcon = {
  fontSize: "18px",
};

///shipping step container for mobile
const Step = styled.div`
  @media only screen and (min-width: 769px) {
    display: none;
  }
  width: 90%;
  padding: 20px;
  background: #e6f0f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// shipping step container for desktop
const StepDesktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 95%;
  height: 50px;
  margin: 0px 0px 20px 5px;
  padding: 0px 20px 0px 10px;

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
  margin-right: 10px;
  color: #fff;
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

const ArrowIcon = (isComplete) => ({
  paddingRight: "15px",
  color: isComplete ? "#002734" : "#B0BCC0",
});

const Checkout = ({ user, setCartItems, cartItems, total }) => {
  const [deli, setDeli] = useState();
  const [deliFee, setDeliFee] = useState();

  const [open, setOpen] = useState(false);

  const toggleBottomSheet = () => {
    setOpen(!open);
  };

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const totalFinalAmount = parseInt(localStorage.getItem("total"));

  //steps
  const steps = ["contact", "payment", "order-confirmation"];
  const orderStatus = path; // to define current step

  // For arrowRightIcon desktop steps
  let isActive = false;

  if (path === "contact") {
    isActive = true;
  }

  return (
    <Container>
      {/* PROGRESS BAR FOR MOBILE */}
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
        <TotalAmount>{totalFinalAmount.toLocaleString()} Ks.</TotalAmount>
        <SummaryBottomSheet
          open={open}
          setOpen={setOpen}
          setCartItems={setCartItems}
          cartItems={cartItems}
          total={totalFinalAmount}
          deli={deli}
          deliFee={deliFee}
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
          {/* PROGRESS BAR FOR DESKTOP */}
          <StepDesktop>
            <Flex>
              {/* Stage 1 */}
              <Flex>
                <Span className="active">1</Span>
                <P className="active">Address Information</P>
              </Flex>

              {/* Stage 2 */}
              <Flex>
                <ArrowRightIcon style={ArrowIcon()} />
                <Span>2</Span>
                <P>Payment Method</P>
              </Flex>

              {/* Stage 3 */}
              <Flex>
                <ArrowRightIcon style={ArrowIcon()} />
                <Span>3</Span>
                <P>Order Confirmation</P>{" "}
              </Flex>
            </Flex>
          </StepDesktop>

          <Wrapper2>
            <Div>
              <ContactInformation
                user={user}
                deli={deli}
                setDeli={setDeli}
                cartItems={cartItems}
                total={totalFinalAmount}
              />
            </Div>

            <ShowHideContainer>
              {/* <Finalist
            shipping={shipping}
            setCartItems={setCartItems}
            cartItems={cartItems}
            total={totalFinalAmount}
            deli={deli}
            deliFee={deliFee}
          /> */}
              <FinalistDesktop
                setCartItems={setCartItems}
                cartItems={cartItems}
                total={totalFinalAmount}
                deli={deli}
                deliFee={deliFee}
              />
            </ShowHideContainer>
          </Wrapper2>
        </Wrapper>
      </div>
    </Container>
  );
};

export default Checkout;

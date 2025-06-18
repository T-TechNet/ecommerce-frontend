import React, { useState } from "react";
import styled from "styled-components";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AYA from "../assets/AYAPay.png";
import "../components/UserSection/OrderDataDetail/Scroll.css";
import "./cancelStep.css";
import Item from "./UserSection/OrderDataDetail/Item";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import RedoIcon from "@mui/icons-material/Redo";
///Reorder Detail For ReorderBtn in Cancel Detail (data passed from cart)
import ReorderDetailSheet from "./UserSection/OrderDataDetail/ReorderDetailSheet";

const Desktop = styled.div``;

const Route = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 45px;
`;

const arrowIcon = {
  fontSize: "30px",
  color: "#758A91",
  paddingRight: "2px",
};
const redoIcon = {
  fontSize: "30px",
  color: "#00688B",
  paddingRight: "2px",
};
const Icon = {
  fontSize: "20px",
  color: "#002734",
  paddingRight: "2px",
  marginRight: "5px",
};
const closeIcon = {
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
  padding: 2px 4px 6px 4px;
  align-items: flex-start;
  gap: 10px;
  margin-right: 10px;
  border-radius: 4px;
  border: none;
  background: #d52b2b;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  @media only screen and (max-width: 759px) {
    font-size: 12px;
    padding: 2px 4px 2px 4px;
  }
  @media only screen and (max-width: 700px) {
    display: none;
  }
  @media screen and (min-width: 860px) and (max-width: 930px) {
    font-size: 14px;
  }
`;
const ReorderBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  align-items: flex-start;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const ReorderBtn = styled.button`
  color: #00688b;
  border: 0px;
  background: #fff;
  font-size: 16px;
  font-weight: 700;

  &:hover {
    color: #2eb7ae;
  }

  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }

  @media screen and (min-width: 860px) and (max-width: 930px) {
    font-size: 14px;
  }
`;
// const LightweightFont = styled.p`
//   font-weight: 0;
//   color: #758a91;
//   font-size: 14px;
//   font-weight: 400;
//   @media only screen and (max-width: 759px) {
//     font-size: 12px;
//   }
// `;
// const StepContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 40px 0;
// `;
// const ProgressBar = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: space-between;
//   width: 70%;
//   counter-reset: step;

//   &::before {
//     content: " ";
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     height: 4px;
//     width: 100%;
//     background-color: #dee3e5;
//   }
// `;
// const ProgressStep = styled.div`
//   width: 2.1875rem;
//   height: 2.1875rem;
//   background-color: #dee3e5;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &::before {
//     counter-increment: step;
//     content: counter(step);
//     z-index: 1;
//   }
// `;

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

const ColorBoldFont = styled.h5`
  display: inline-block;
  color: #03a89e;
  font-size: 15px;
`;

const CancelFont = styled.h5`
  display: inline-block;
  color: #d52b2b;
  font-size: 14px;
`;

const CancelDetail = (props) => {
  //steps
  const steps = ["Order Placed", "Canceled"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  // console.log(props.cartItems)
  var item = props.cartItems;
  const [isOpen, setIsOpen] = useState(false);
  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Desktop>
      <Route>
        My Orders
        <ArrowRightIcon style={arrowIcon} />
        <ColorBoldFont>
          Order Number : <ColorBoldFont>1234567890</ColorBoldFont>
        </ColorBoldFont>
      </Route>
      <CartContainer>
        <Cart>
          <Header>
            <Row1>
              <div>
                <strong>
                  Order Number : <ColorBoldFont>1234567890</ColorBoldFont>{" "}
                </strong>
                {/* just static/ to get state from backend and depending on state to classify color */}
                <State>Canceled</State>
                <span>on : 01.01.2023</span>
              </div>
              <ReorderBtnContainer>
                <div
                  style={{ display: "flex" }}
                  onClick={() => toggleBottomSheet()}
                >
                  <RedoIcon style={redoIcon} />
                  <ReorderBtn>Reorder</ReorderBtn>
                </div>

                <ReorderDetailSheet
                  open={isOpen}
                  setOpen={setIsOpen}
                  item={item}
                />
              </ReorderBtnContainer>
            </Row1>
            <Row2>
              <small>Placed order on : 01.01.2023</small>
            </Row2>
          </Header>
          <div className="wrapper">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`stepItem ${currentStep === i + 1 && "Active"} ${
                  i + 1 < currentStep && "Complete"
                }`}
              >
                <div className="Step">
                  {i + 1 < currentStep ? (
                    <CheckIcon style={checkIcon} />
                  ) : (
                    <CloseIcon style={closeIcon} />
                  )}
                </div>
                <span>{step}</span>
                {currentStep === i + 1 && (
                  <>
                    {step === "Canceled" && (
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <ArrowDropUpIcon style={arrowUp} />
                        <div
                          className="tooltip"
                          style={{
                            position: "absolute",
                            top: "27px",
                            fontSize: "13px",
                          }}
                        >
                          Your order has been canceled. Please reach out to us
                          for more information.<br></br>
                          <CancelFont>Order Canceled on : </CancelFont>
                          <span style={{ color: "#00688B", fontSize: "12px" }}>
                            {" "}
                            04.04.2023
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <button
              className="btn"
              style={{ padding: "4px 16px", marginTop: "20px" }}
              onClick={() => {
                currentStep === steps.length
                  ? setComplete(true)
                  : setCurrentStep((prev) => prev + 1);
              }}
            >
              {currentStep === steps.length ? "Finish" : "Next"}
            </button>
          </div>
        </Cart>
      </CartContainer>
      <AddressDiv>
        <Col>
          <h4>Delivery Address</h4>
          <AddressCart>
            Min Htet Aung
            <Flex>
              <div style={{ display: "flex", marginRight: "10px" }}>
                <PhoneIcon style={Icon} />
                09123456789
              </div>
              <div style={{ display: "flex" }}>
                <MailOutlineIcon style={Icon} />
                minhtetaung21@gmail.com
              </div>
            </Flex>
            <div style={{ display: "flex" }}>
              <LocationOnOutlinedIcon style={Icon} />
              No. 310, Thukha 3rd Street, Alone,Yangon
            </div>
          </AddressCart>
        </Col>
        <Col>
          <h4>Billing Address</h4>
          <AddressCart>
            Min Htet Aung
            <Flex>
              <div style={{ display: "flex", marginRight: "10px" }}>
                <PhoneIcon style={Icon} />
                09123456789
              </div>
              <div style={{ display: "flex" }}>
                <MailOutlineIcon style={Icon} />
                minhtetaung21@gmail.com
              </div>
            </Flex>
            <div style={{ display: "flex" }}>
              <LocationOnOutlinedIcon style={Icon} />
              No. 310, Thukha 3rd Street, Alone,Yangon
            </div>
          </AddressCart>
        </Col>
      </AddressDiv>

      <PaymentDiv>
        <h4>Payment Method</h4>
        <PaymentCart>
          <Img src={AYA} />
          AYA Pay
        </PaymentCart>
      </PaymentDiv>
      <Wrapper>
        <h4>Items ordered (7) </h4>
        <Hr></Hr>
        <div style={{ display: "flex" }}>
          <ProductHeader>Product</ProductHeader>
          <PriceHeader>Price</PriceHeader>
          <QtyHeader>Quantity</QtyHeader>
          <TotalHeader>Total</TotalHeader>
        </div>
        <Hr></Hr>

        <Item item={item} />
      </Wrapper>
    </Desktop>
  );
};

export default CancelDetail;

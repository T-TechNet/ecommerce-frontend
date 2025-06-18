import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AYA from "../assets/AYAPay.png";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";
import "../components/step.css";
import ItemMobile from "../components/UserSection/OrderDataDetail/ItemMobile";
import { Link } from "react-router-dom";

const Container = styled.div`
  @media only screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;
const Header = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const Tab = styled.div`
  display: flex;
  margin: 0 30px;
  padding: 25px 0;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
`;
const Cart = styled.div`
  background: #ebeeef;
`;
const CartHeader = styled.div`
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  background: #fff;
  border-radius: 3px;
  padding: 10px 10px;
  line-height: 30px;
`;
const State = styled.span`
  background: #cc0000;
  color: #fff;
  padding: 4px 10px;
  border-radius: 7px;
  font-size: 14px;
`;
const ButtonContainer = styled.div`
  border: 0.5px solid #03a89e;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  border-radius: 7px;
  padding: 8px;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;
const ColCart = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  background: #e6f0f3;
  padding: 10px 10px;
`;
const ColFlex = styled.div`
  display: flex;
  padding: 5px 0;
  align-items: center;
`;
const Img = styled.img`
  margin-right: 20px;
`;
const Icon = {
  fontSize: "16px",
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

const Font = styled.span`
  font-size: 14px;
  color: #002734;
  font-weight: normal;
`;
const ColorBoldFont = styled.p`
  display: inline-block;
  color: #03a89e;
  font-size: 14px;
`;
const CancelFont = styled.p`
  display: inline-block;
  color: #cc0000;
  font-size: 14px;
`;
const Tooltip = styled.p`
  margin-top: 5px;
  color: #667d85;
  fontsize: 13px;
  font-weight: 400;
`;
const ReorderFont = styled.h5`
  color: #03a89e;
  font-size: 14px;
  margin-right: 5px;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
const Row = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const Market = styled.p`
  text-decoration: line-through;
  color: #2b9456;
  font-size: 14px;
`;
const Hr = styled.hr`
  width: 100%;
  border: 1px solid #bfc9cc;
  margin: 10px 0;
`;
const Save = styled.button`
  display: inline-flex;
  padding: 2px 4px 2px 4px;
  align-items: flex-start;
  gap: 10px;

  border-radius: 4px;
  border: none;
  background: #2b9456;

  color: #fff;

  cursor: pointer;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const ProgressCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
const ProgressBar = styled.div`
  width: 6px;
  height: 100px;
  margin-left: 12px;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;
const Progress = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;
const Label = styled.div`
  font-weight: bold;
`;
const Date = styled.span`
  font-size: 13px;
  color: #00688b;
  margin-left: 5px;
`;

const CancelDetailMobile = (props) => {
  var item = props.cartItems;
  // console.log(item)
  //steps
  const steps = [
    "Order Placed",
    "Processing",
    "Preparing to Ship",
    "Shipped",
    "Delivered",
  ];
  const [currentStep, setCurrentStep] = useState(1);
  // const [complete, setComplete] = useState(false);
  const [selectedStep, setSelectedStep] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  // const toggleBottomSheet = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <Container>
      <Header>
        <Tab>
          <Link to={{ pathname: "/:username/orders" }}>
            <ArrowBackIcon style={{ marginRight: "20px" }} />
          </Link>

          <ColorBoldFont>Order Number : 1234567891011</ColorBoldFont>
        </Tab>
      </Header>

      <Main>
        <Cart>
          <CartHeader>
            <h4>
              Order Number : <ColorBoldFont>1234567891011</ColorBoldFont>
            </h4>
            <Font>Placed order on : 04.04.2023</Font>
            <br></br>
            <State>Canceled</State>
            <Font> on : 04.04.2023</Font>
          </CartHeader>

          <div style={{ marginTop: "20px", marginLeft: "20px" }}>
            <Wrapper>
              <Progress>
                <ProgressCircle
                  style={{
                    background: selectedStep >= 0 ? "#CC0000" : "#B0BCC0",
                  }}
                >
                  {selectedStep > 0 ? (
                    <CheckIcon style={checkIcon} />
                  ) : (
                    <CircleIcon style={circleIcon} />
                  )}
                </ProgressCircle>

                <ProgressBar
                  style={{
                    background: selectedStep > 0 ? "#CC0000" : "#B0BCC0",
                  }}
                />
              </Progress>

              <Label
                style={{ color: selectedStep === 0 ? "#CC0000" : "#667D85" }}
              >
                Order placed
              </Label>
            </Wrapper>

            <Wrapper>
              <Progress>
                <ProgressCircle
                  style={{
                    background: selectedStep >= 1 ? "#CC0000" : "#B0BCC0",
                  }}
                >
                  {selectedStep > 1 ? (
                    <CheckIcon style={checkIcon} />
                  ) : (
                    <CircleIcon style={circleIcon} />
                  )}
                </ProgressCircle>
              </Progress>
              <div>
                <Label
                  style={{ color: selectedStep === 1 ? "#CC0000" : "#667D85" }}
                >
                  Processing
                </Label>
                {selectedStep === 1 && (
                  <>
                    <div>
                      <Tooltip>
                        Your order has been canceled. Please reach out to us for
                        more information
                      </Tooltip>
                      <CancelFont>Ordered canceled on :</CancelFont>{" "}
                      <Date>04.04.2023</Date>
                    </div>
                  </>
                )}
              </div>
            </Wrapper>
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
              onClick={() => setSelectedStep(selectedStep + 1)}
            >
              {currentStep === steps.length ? "Finish" : "Next"}
            </button>
          </div>
        </Cart>
        {/* it's just static. if state is delivered or canceled it'll show Reorder button instead this. */}
        <ButtonContainer>
          <ReorderFont>Reorder</ReorderFont>
        </ButtonContainer>
        <Col>
          <h4>Delivery Address</h4>
          <ColCart>
            <h4>Min Htet Aung</h4>
            <ColFlex>
              <PhoneIcon style={Icon} />
              <Font>09123456789</Font>{" "}
            </ColFlex>
            <ColFlex>
              <MailOutlineIcon style={Icon} />
              <Font>minhtetaung21@gmail.com</Font>
            </ColFlex>
            <ColFlex>
              <LocationOnOutlinedIcon style={Icon} />
              <Font>No. 310, Thukha 3rd Street, Alone,Yangon</Font>{" "}
            </ColFlex>
          </ColCart>
        </Col>
        <Col>
          <h4>Billing Address</h4>
          <ColCart>
            <h4>Min Htet Aung</h4>
            <ColFlex>
              <PhoneIcon style={Icon} />
              <Font>09123456789</Font>
            </ColFlex>
            <ColFlex>
              <MailOutlineIcon style={Icon} />
              <Font>minhtetaung21@gmail.com</Font>
            </ColFlex>
            <ColFlex>
              <LocationOnOutlinedIcon style={Icon} />
              <Font>No. 310, Thukha 3rd Street, Alone,Yangon</Font>{" "}
            </ColFlex>
          </ColCart>
        </Col>
        <Col>
          <h4>Payment Method</h4>
          <ColCart>
            <ColFlex>
              <Img src={AYA} />
              AYA Pay
            </ColFlex>
          </ColCart>
        </Col>
        <Col>
          <h4>Items Ordered (7)</h4>
          <ItemMobile item={item} />
          <Hr></Hr>
          <Footer>
            <FooterCol>
              <Row>
                <span style={{ color: "#758A91" }}>Subtotal(7 items)</span>
                <div>
                  <strong>5,269,900 Ks.</strong> <Market>8,957,000 Ks.</Market>
                </div>
              </Row>
              <Row>
                <span style={{ color: "#2b9456" }}>Savings</span>
                <Save>-3,687,100 Ks.</Save>
              </Row>
              <Row>
                <span style={{ color: "#758A91" }}>Delivery fee</span>
                <strong>3,500 Ks.</strong>
              </Row>
              <Hr></Hr>
              <Row>
                <span style={{ color: "#758A91" }}>Total</span>
                <strong>5,273,400 Ks.</strong>
              </Row>
            </FooterCol>
          </Footer>
        </Col>

        <div style={{ margin: "auto" }}>
          <ColFlex>
            <ErrorOutlineIcon
              style={{ fontSize: "14px", paddingRight: "5px" }}
            />
            <Tooltip>Transportation charges may vary </Tooltip>
          </ColFlex>
          <Tooltip>due to your shipping method or address.</Tooltip>
        </div>
      </Main>
    </Container>
    //  <p>hi</p>
  );
};

export default CancelDetailMobile;

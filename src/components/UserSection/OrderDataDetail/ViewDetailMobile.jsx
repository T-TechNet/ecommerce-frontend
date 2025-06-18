import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { publicRequest } from "../../../requestMethods";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";
import ItemMobile from "./ItemMobile";
import "../../../components/step.css";

import ayapay from "../../../assets/PaymentLogos/AYA_Pay_Logo.svg";
import kbzpay from "../../../assets/PaymentLogos/kpayLogo.webp";
import cbpay from "../../../assets/PaymentLogos/CB_Pay.png";
import kbzmbanking from "../../../assets/PaymentLogos/kbzMobileBanking.jpg";
import ayambanking from "../../../assets/PaymentLogos/AYAMobileBanking.jpg";

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
  background: #ff9c2b;
  color: #fff;
  padding: 4px 10px;
  border-radius: 7px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  border: 0.5px solid #cc0000;
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
  width: 50px;
  height: 50px;
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

const Font = styled.p`
  font-size: 14px;
  color: #002734;
  font-weight: normal;
`;

const ColorBoldFont = styled.p`
  display: inline-block;
  color: #03a89e;
  font-size: 14px;
`;

const Tooltip = styled.p`
  margin-top: 5px;
  color: #667d85;
  fontsize: 13px;
  font-weight: 400;
`;

const CancelFont = styled.h5`
  color: #c00;
  font-size: 14px;
  margin-right: 5px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media only screen and (max-width: 500px) {
    justify-content: center;
  }
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
  text-align: right;
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
  font-weight: 400;
`;

const ProgressCircle = styled.div`
  width: 30px;
  height: 31px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  @media only screen and (max-width: 350px) {
    width: 30px;
    height: 33px;
  }
`;

const ProgressBar = styled.div`
  width: 6px;
  height: 78%;
  margin-left: 12px;

  @media only screen and (max-width: 495px) {
    height: 80%;
  }

  @media only screen and (max-width: 440px) {
    height: 81%;
  }

  @media only screen and (max-width: 400px) {
    height: 82%;
  }

  @media only screen and (max-width: 350px) {
    height: 85%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Progress = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  min-height: 80px;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Date = styled.span`
  font-size: 13px;
  color: #00688b;
  margin-left: 5px;
`;

const ViewDetailMobile = () => {
  const { ordNum } = useParams();

  const [selectedStep, setSelectedStep] = useState(0);

  const [myOrder, setMyOrder] = useState(); // for storing order details from axios req
  const [productDetails, setProductDetails] = useState();

  const [finalSubTotal, setFinalSubTotal] = useState();
  const [originalSubTotal, setOriginalSubTotal] = useState();

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

  const checkCurrentStep = (stats) => {
    if (stats === "pending") {
      setSelectedStep(1);
    } else if (stats === "preparing") {
      setSelectedStep(2);
    } else if (stats === "shipped") {
      setSelectedStep(3);
    } else if (stats === "delivered") {
      setSelectedStep(4);
    } else if (stats === "canceled") {
      // setSelectedStep(5);
    } else {
    }
  };

  const calculateEstimatedArrivalDate = () => {
    if (myOrder) {
      let date = parseInt(myOrder.updatedAt.substring(8, 10));
      let updatedDate = date + 3;

      let prefix = myOrder.updatedAt.substring(0, 8);

      return prefix + updatedDate.toString();
    }
  };

  const getOrderDetail = async () => {
    await publicRequest
      .get(`/orders/find/${ordNum}`)
      .then((res) => {
        setMyOrder(res.data[0]);
        setProductDetails(res.data[0].products);
        checkCurrentStep(res.data[0].status); // DETECTING STEP FOR PROGRESS BAR
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrderDetail();
  }, [ordNum]);

  return (
    <>
      {myOrder && (
        <Container>
          <Header>
            <Tab>
              <Link to={`/${user.username}/orders`}>
                <ArrowBackIcon style={{ marginRight: "20px" }} />
              </Link>

              <ColorBoldFont>Order Number : {ordNum.slice(-15)}</ColorBoldFont>
            </Tab>
          </Header>

          <Main>
            <Cart>
              <CartHeader>
                <h4>
                  Order Number :{" "}
                  <ColorBoldFont>{ordNum.slice(-15)}</ColorBoldFont>
                </h4>
                {myOrder.data && <Font>Placed order on : {myOrder.date}</Font>}
                <State>{myOrder.status}</State>
              </CartHeader>

              {/* VERITCAL PROGRESS BAR */}
              <div style={{ marginTop: "20px", marginLeft: "20px" }}>
                {/* order placed */}
                <Wrapper>
                  <Progress>
                    <ProgressCircle
                      style={{
                        background: selectedStep >= 0 ? "#00688B" : "#B0BCC0",
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
                        background: selectedStep > 0 ? "#00688B" : "#B0BCC0",
                      }}
                    />
                  </Progress>

                  <Label
                    style={{
                      color: selectedStep === 0 ? "#00688B" : "#667D85",
                    }}
                  >
                    Order placed
                  </Label>
                </Wrapper>

                {/* pending */}
                <Wrapper>
                  <Progress>
                    <ProgressCircle
                      style={{
                        background: selectedStep >= 1 ? "#00688B" : "#B0BCC0",
                      }}
                    >
                      {selectedStep > 1 ? (
                        <CheckIcon style={checkIcon} />
                      ) : (
                        <CircleIcon style={circleIcon} />
                      )}
                    </ProgressCircle>{" "}
                    <ProgressBar
                      style={{
                        background: selectedStep > 1 ? "#00688B" : "#B0BCC0",
                      }}
                    />
                  </Progress>
                  <div>
                    <Label
                      style={{
                        color: selectedStep === 1 ? "#00688B" : "#667D85",
                      }}
                    >
                      Processing
                    </Label>
                    {selectedStep === 1 && (
                      <div style={{ padding: "10px 0" }}>
                        <Tooltip>
                          Thanks for your order! We are currently verifying it
                          and we will update you when we are done.
                        </Tooltip>
                        <ColorBoldFont>Started processing on :</ColorBoldFont>{" "}
                        <Date>{myOrder.updatedAt.substring(0, 10)}</Date>
                      </div>
                    )}
                  </div>
                </Wrapper>

                {/* preparing to ship */}
                <Wrapper>
                  <Progress>
                    <ProgressCircle
                      style={{
                        background: selectedStep >= 2 ? "#00688B" : "#B0BCC0",
                      }}
                    >
                      {selectedStep > 2 ? (
                        <CheckIcon style={checkIcon} />
                      ) : (
                        <CircleIcon style={circleIcon} />
                      )}
                    </ProgressCircle>

                    <ProgressBar
                      style={{
                        background: selectedStep > 2 ? "#00688B" : "#B0BCC0",
                      }}
                    />
                  </Progress>
                  <div>
                    <Label
                      style={{
                        color: selectedStep === 2 ? "#00688B" : "#667D85",
                      }}
                    >
                      Preparing to ship
                    </Label>

                    {selectedStep === 2 && (
                      <div style={{ padding: "10px 0" }}>
                        <Tooltip>
                          Your order has been verified and we're getting ready
                          to ship it. We'll notify you when it's on its way!
                        </Tooltip>
                        <ColorBoldFont>Started preparing on :</ColorBoldFont>{" "}
                        <Date>{myOrder.updatedAt.substring(0, 10)}</Date>
                      </div>
                    )}
                  </div>
                </Wrapper>

                {/* shipped */}
                <Wrapper>
                  <Progress>
                    <ProgressCircle
                      style={{
                        background: selectedStep >= 3 ? "#00688B" : "#B0BCC0",
                      }}
                    >
                      {selectedStep > 3 ? (
                        <CheckIcon style={checkIcon} />
                      ) : (
                        <CircleIcon style={circleIcon} />
                      )}
                    </ProgressCircle>

                    <ProgressBar
                      style={{
                        background: selectedStep > 3 ? "#00688B" : "#B0BCC0",
                      }}
                    />
                  </Progress>
                  <div>
                    <Label
                      style={{
                        color: selectedStep === 3 ? "#00688B" : "#667D85",
                      }}
                    >
                      Shipped
                    </Label>
                    {selectedStep === 3 && (
                      <div style={{ padding: "10px 0" }}>
                        <Tooltip>
                          We've shipped your order! The estimated arrival time
                          may vary depending on the delivery service used.
                        </Tooltip>

                        <ColorBoldFont>Shipped on :</ColorBoldFont>
                        <Date>{myOrder.updatedAt.substring(0, 10)}</Date>
                        <br></br>
                        <ColorBoldFont>Estimated arrival on :</ColorBoldFont>
                        <Date>{calculateEstimatedArrivalDate()}</Date>
                      </div>
                    )}
                  </div>
                </Wrapper>

                {/* delivered */}
                <Wrapper>
                  <Progress>
                    <ProgressCircle
                      style={{
                        background: selectedStep >= 4 ? "#00688B" : "#B0BCC0",
                      }}
                    >
                      {selectedStep === 4 && <CheckIcon style={checkIcon} />}
                    </ProgressCircle>
                  </Progress>
                  <div>
                    <Label
                      style={{
                        color: selectedStep === 4 ? "#00688B" : "#667D85",
                      }}
                    >
                      Delivered
                    </Label>
                    {selectedStep === 4 && (
                      <div>
                        <Tooltip>
                          Your order has been delivered! Thank you for shopping
                          with us.
                        </Tooltip>

                        <ColorBoldFont>Delivered on :</ColorBoldFont>
                        <Date>{myOrder.updatedAt.substring(0, 10)}</Date>
                      </div>
                    )}
                  </div>
                </Wrapper>
              </div>
            </Cart>

            {/* If state is delivered or canceled it'll show Reorder button instead this. */}
            {/* <ButtonContainer>
          <CancelFont>Cancel Order</CancelFont>
          <Font>within 01:30:21</Font>{" "}
        </ButtonContainer> */}

            {/* DELIVERY AND PICKUP ADDRESSES */}
            {myOrder.delivery === "delivery" ? (
              <Col>
                <h4>Delivery Address</h4>
                <ColCart>
                  <h4>{myOrder.name}</h4>
                  <ColFlex>
                    <PhoneIcon style={Icon} />
                    <Font>{myOrder.phnum}</Font>{" "}
                  </ColFlex>
                  <ColFlex>
                    <MailOutlineIcon style={Icon} />
                    <Font>{myOrder.email}</Font>
                  </ColFlex>
                  <ColFlex>
                    <LocationOnOutlinedIcon style={Icon} />
                    <Font>
                      {myOrder?.address}, {myOrder?.city},{" "}
                      {myOrder?.region.charAt(0).toUpperCase() +
                        myOrder?.region.slice(1)}
                    </Font>{" "}
                  </ColFlex>
                </ColCart>
              </Col>
            ) : (
              <Col>
                <h4>Pick up Address</h4>
                <ColCart>
                  <h4>Rangoon Discount Office</h4>
                  <ColFlex>
                    <PhoneIcon style={Icon} />
                    <Font>09942095359</Font>{" "}
                  </ColFlex>
                  <ColFlex>
                    <MailOutlineIcon style={Icon} />
                    <Font>sales@rangoondiscount.com</Font>
                  </ColFlex>
                  <ColFlex>
                    <LocationOnOutlinedIcon style={Icon} />
                    <Font>
                      11-A, Mya Wut Yee Lane, A One Street, Ward 5, Mayangone
                      Township, Yangon.
                    </Font>{" "}
                  </ColFlex>
                </ColCart>
              </Col>
            )}

            {/* BILLING ADDRESS */}
            <Col>
              <h4>Billing Address</h4>
              <ColCart>
                <h4>{myOrder.billing_address.name}</h4>
                <ColFlex>
                  <PhoneIcon style={Icon} />
                  <Font>{myOrder.billing_address.phnum}</Font>
                </ColFlex>
                <ColFlex>
                  <MailOutlineIcon style={Icon} />
                  <Font>{myOrder.billing_address.email}</Font>
                </ColFlex>
                <ColFlex>
                  <LocationOnOutlinedIcon style={Icon} />
                  <Font>
                    {myOrder.billing_address.address},{" "}
                    {myOrder.billing_address.city},{" "}
                    {myOrder.billing_address.region.charAt(0).toUpperCase() +
                      myOrder.billing_address.region.slice(1)}
                  </Font>{" "}
                </ColFlex>
              </ColCart>
            </Col>

            <Col>
              <h4>Payment Method</h4>
              <ColCart>
                <ColFlex>
                  {showPayLogo()}
                  {myOrder.payment}
                </ColFlex>
              </ColCart>
            </Col>

            <Col>
              <h4>Items Ordered ({myOrder.products.length})</h4>
              <ItemMobile
                item={productDetails}
                order={myOrder}
                setFinalSubTotal={setFinalSubTotal}
                setOriginalSubTotal={setOriginalSubTotal}
              />
              <Hr></Hr>

              <Footer>
                <FooterCol>
                  <Row>
                    <span style={{ color: "#758A91" }}>
                      Subtotal ({myOrder.products.length}{" "}
                      {myOrder.products.length === 1 ? "item" : "items"})
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <strong>{finalSubTotal?.toLocaleString()} Ks.</strong>{" "}
                      {originalSubTotal && originalSubTotal > 0 && (
                        <Market>{originalSubTotal.toLocaleString()} Ks.</Market>
                      )}
                    </div>
                  </Row>
                  {originalSubTotal &&
                    finalSubTotal &&
                    originalSubTotal > finalSubTotal && (
                      <Row>
                        <span style={{ color: "#2b9456" }}>Savings</span>
                        <Save>
                          -{(originalSubTotal - finalSubTotal).toLocaleString()}{" "}
                          Ks.
                        </Save>
                      </Row>
                    )}
                  <Row>
                    <span style={{ color: "#758A91" }}>Delivery fees</span>
                    <strong>{myOrder.delivery_fees} Ks.</strong>
                  </Row>
                  <Hr></Hr>
                  <Row>
                    <span style={{ color: "#758A91" }}>Total</span>
                    <strong>{myOrder.amount.toLocaleString()} Ks.</strong>
                  </Row>
                </FooterCol>
              </Footer>
            </Col>

            {/* <div style={{ margin: "auto" }}>
              <ColFlex>
                <ErrorOutlineIcon
                  style={{
                    fontSize: "14px",
                    paddingRight: "5px",
                    color: "#667D85",
                  }}
                />
                <Tooltip>Transportation charges may vary </Tooltip>
              </ColFlex>
              <Tooltip>due to your shipping method or address.</Tooltip>
            </div> */}
          </Main>
        </Container>
      )}
    </>
  );
};

export default ViewDetailMobile;

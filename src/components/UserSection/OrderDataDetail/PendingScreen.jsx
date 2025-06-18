import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CancelSheet from "./CancelSheet";
import CircularProgress from "@mui/material/CircularProgress";
// FOR MOBILE VIEW MOREVERT ICON
import MoreVert from "@mui/icons-material/MoreVert";
import MorevertMobile from "./MorevertMobile";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { publicRequest } from "../../../requestMethods";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Div = styled.div`
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.16);
  padding: 15px 15px;
  height: 190px;
  margin: 0 5px;
`;
const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Data = styled.div`
  display: flex;
  align-items: center;
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
  background: ${(props) =>
    props.className === "processing"
      ? "#FF9C2B"
      : props.className === "preparetoship"
      ? "#FFD700"
      : "#00688B"};
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
const StateMobile = styled.div`
  height: 20px;
  display: inline-flex;
  padding: 2px 4px 6px 4px;
  align-items: flex-start;
  gap: 10px;
  margin-right: 10px;
  border-radius: 4px;
  border: none;
  background: ${(props) =>
    props.className === "processing"
      ? "#FF9C2B"
      : props.className === "preparetoship"
      ? "#FFD700"
      : "#00688B"};
  color: #fff;
  margin-right: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  @media only screen and (max-width: 759px) {
    font-size: 12px;
    padding: 2px 4px 2px 4px;
  }
  @media only screen and (min-width: 701px) {
    display: none;
  }
  @media screen and (min-width: 860px) and (max-width: 930px) {
    font-size: 14px;
  }
`;
const CancelBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  align-items: flex-start;

  @media only screen and (max-width: 759px) {
    margin-right: 0px;
  }

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
    font-size: 12px;
  }

  @media screen and (min-width: 860px) and (max-width: 930px) {
    font-size: 14px;
  }
`;
const Divider = styled.span`
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const ViewBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  @media only screen and (max-width: 759px) {
    margin-left: 5px;
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const ViewBtn = styled.button`
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
const LightweightFont = styled.p`
  font-weight: 0;
  color: #758a91;
  font-size: 14px;
  font-weight: 400;
  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }
`;
const BoldFont = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;

  @media only screen and (max-width: 759px) {
    font-size: 12px;
    padding: 2px 4px 2px 4px;
  }
`;
const OrderNumFont = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #03a89e;
  margin-left: 7px;
  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }

  @media screen and (min-width: 860px) and (max-width: 930px) {
    font-size: 14px;
  }
`;
const NormalFont = styled.p`
  font-size: 16px;

  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }

  @media screen and (min-width: 860px) and (max-width: 930px) {
    font-size: 14px;
  }
`;
const DateFont = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-left: 7px;
  color: #002734;

  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }
`;
const Hr = styled.hr`
  width: 100%;
  border: 1px solid #bfc9cc;
  margin-top: 10px;
  margin-bottom: 13px;
`;
const ImageContainer = styled.div`
  display: flex;
  margin-top: 12px;
  position: relative;
`;
const ImageCart = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  padding: 7px;
  padding-bottom: 0px;
  position: relative;
`;
const Qty = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  padding: 2px 2px 2px 2px;
  background: #2eb7ae;
  color: #fff;
  position: absolute;
  left: 40px;
  top: -10px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 13px;
  border: 0.5px solid white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;
const TotalQty = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50px;
  background: #00688b;
  color: #fff;
  position: absolute;
  right: -35px;
  top: 15px;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const TotalQtyMobile = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50px;
  background: #00688b;
  color: #fff;
  position: absolute;
  right: -35px;
  top: 15px;
  align-items: center;
  justify-content: center;
  display: flex;
  @media only screen and (min-width: 701px) {
    display: none;
  }
`;
const ImgResponsive = styled.div`
  display: flex;
`;
const MoreVertIcon = styled.div`
  display: flex;
  @media only screen and (min-width: 701px) {
    display: none;
  }
`;
const ShipDate = styled.div`
  display: flex;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const ShipDateMobile = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (min-width: 701px) {
    display: none;
  }
`;
const SubTotal = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const SubTotalMobile = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;

  @media only screen and (min-width: 701px) {
    display: none;
  }
`;

//for mobile view bottom sheet
const MoreVertContainer = styled.div`
  display: none;

  @media only screen and (max-width: 759px) {
    display: flex;
    align-items: center;

    gap: 20px;
  }

  @media only screen and (max-width: 320px) {
    display: flex;
    align-items: center;

    gap: 5px;
  }
`;

const PendingScreen = ({ orders }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderIndex, setOrderIndex] = useState();
  const [info, setInfo] = useState();

  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState();

  const desktopItems = 6;
  const mobileItems = 4;

  // Check if the user is on a mobile device
  const isMobile = window.innerWidth <= 701; // You can adjust the breakpoint as needed

  // Determine the number of items based on the device
  const numItemsToShow = isMobile ? mobileItems : desktopItems;

  const toggleBottomSheet = (order, index) => {
    setInfo(order);
    setOrderIndex(index);
    setIsOpen(!isOpen);
  };

  const fetchDataFromAPI = async (array) => {
    let token = localStorage.getItem("token");
    let productIds = [];

    // Separating product ids to array
    array &&
      array.forEach((item) => {
        productIds.push(item.productId);
      });

    // fetching product details from mongodb with separated ids
    const response = await publicRequest.get(
      `/products/find?id=${productIds}&type=array`,
      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      }
    );

    // console.log(response.data);

    // ADD BOUGHT QUANTITY TO PRODUCT

    let productData = response.data;

    productData.forEach((item) => {
      array.forEach((p, i) => {
        if (item._id === p.productId) {
          item.quantity = array[i].quantity;
        }
      });
    });

    // console.log("after adding quantity", productData);

    return productData;
  };

  const getProductDetails = async () => {
    const promises =
      orders &&
      orders.map(async (o) => {
        const data = await fetchDataFromAPI(o.products);
        return data;
      });

    const allData = promises && (await Promise.all(promises));
    setProductDetails(allData);
  };

  useEffect(() => {
    // console.log(orders);

    // TO DO

    // NEW PENDING ORDER DOES NOT APPEAR
    // CHECK PENDING ORDERS IN DATABASE
    getProductDetails();
  }, [orders]);

  return (
    <List>
      {orders &&
        orders.map((order, index) => (
          <Div key={order._id}>
            <ItemContainer>
              <Data>
                <NormalFont>Order Number : </NormalFont>
                <OrderNumFont>{order._id.slice(-15)}</OrderNumFont>
                {order.status === "pending" ? (
                  <State className="processing">{order.status}</State>
                ) : order.status === "preparing" ? (
                  <State className="preparetoship">
                    {order.status} to ship
                  </State>
                ) : (
                  <>
                    {/* {console.log(order.updatedAt.substring(0, 10))} */}
                    <State className="shipped">{order.status}</State>
                    <ShipDate>
                      <LightweightFont>on : </LightweightFont>
                      <DateFont>{order.updatedAt.substring(0, 10)}</DateFont>
                    </ShipDate>
                  </>
                )}
              </Data>
              <Data>
                {/* {order.status === "pending" ? (
                <>
                  <CancelBtnContainer>
                    <CancelBtn onClick={() => toggleBottomSheet(order)}>
                      Cancel Order
                    </CancelBtn>
                    <LightweightFont>within 01:06:12</LightweightFont>
                    <CancelSheet open={isOpen} setOpen={setIsOpen} />
                  </CancelBtnContainer>
                </>
              ) : (
                ""
              )} */}

                {/* {order.status === "pending" ? <Divider>|</Divider> : ""} */}
                <ViewBtnContainer
                  onClick={() => navigate(`/myorders/${order._id}`)}
                >
                  <ViewBtn>View Detail</ViewBtn>
                </ViewBtnContainer>

                <MoreVertContainer>
                  <MoreVertIcon onClick={() => toggleBottomSheet(order, index)}>
                    <MoreVert />
                  </MoreVertIcon>
                  <MorevertMobile
                    open={isOpen}
                    setOpen={setIsOpen}
                    orderIndex={orderIndex}
                    info={info}
                    productDetails={productDetails}
                  />
                </MoreVertContainer>
              </Data>
            </ItemContainer>
            <ItemContainer>
              {order.date && (
                <Data>
                  <LightweightFont>Placed order on : </LightweightFont>
                  <DateFont>{order.date}</DateFont>
                </Data>
              )}
            </ItemContainer>
            <Data>
              {order.status === "pending" ? (
                <StateMobile className="processing">{order.status}</StateMobile>
              ) : order.status === "preparing" ? (
                <StateMobile className="preparetoship">
                  {order.status}
                </StateMobile>
              ) : (
                <>
                  <StateMobile className="shipped">{order.status}</StateMobile>
                  {/* <ShipDateMobile>
                  <LightweightFont>on : </LightweightFont>
                  <DateFont>{order.shippedDate}</DateFont>
                </ShipDateMobile> */}
                </>
              )}
            </Data>

            <Hr></Hr>
            <ItemContainer>
              <Data>
                <BoldFont>
                  {order.products.length}{" "}
                  {order.products.length > 1 ? "items" : "item"}
                </BoldFont>

                <SubTotalMobile>
                  <NormalFont> Subtotal : </NormalFont>
                  <BoldFont>{order.amount.toLocaleString()} Ks.</BoldFont>
                </SubTotalMobile>
              </Data>
            </ItemContainer>
            <ItemContainer>
              <ImageContainer>
                {
                  order.products.slice(0, numItemsToShow).map((item) => (
                    <ImageCart key={item._id}>
                      <Image src={item.imageURL} />

                      {item.quantity > 1 ? <Qty>{item.quantity}</Qty> : ""}
                    </ImageCart>
                  ))
                  // ) : (
                  //   <CircularProgress
                  //     size="1rem"
                  //     style={{
                  //       color: "#03A89E",
                  //       padding: "20px 10px",
                  //     }}
                  //   />
                  // )
                }
                {order.products.length > 6 ? (
                  <>
                    {" "}
                    <TotalQty>
                      +{order.products.length - numItemsToShow}
                    </TotalQty>{" "}
                    <TotalQtyMobile>
                      +{order.products.length - numItemsToShow}
                    </TotalQtyMobile>
                  </>
                ) : (
                  ""
                )}
                {/* <ImageCart>
                  <Image src={order.img1} />
                  {order.img1Qty > 1 ? <Qty>{order.img1Qty}</Qty> : ""}
                  </ImageCart>
                  {order.img2 ? (
                  <ImageCart>
                  <Image src={order.img2} />

                    {order.img2Qty > 1 ? <Qty>{order.img2Qty}</Qty> : ""}
                    </ImageCart>
                    ) : (
                  ""
                  )}
                  {order.img3 ? (
                    <ImageCart>
                    <Image src={order.img3} />
                    {order.img3Qty > 1 ? <Qty>{order.img3Qty}</Qty> : ""}
                  </ImageCart>
                ) : (
                  ""
                )} */}

                {/* <ImgResponsive>
                {order.img4 ? (
                  <ImageCart>
                    <Image src={order.img4} />
                    {order.img4Qty > 1 ? <Qty>{order.img4Qty}</Qty> : ""}
                  </ImageCart>
                  ) : (
                    ""
                )}
                {order.img5 ? (
                  <ImageCart>
                  <Image src={order.img5} />
                  {order.img5Qty > 1 ? <Qty>{order.img5Qty}</Qty> : ""}
                  </ImageCart>
                  ) : (
                    ""
                    )}
                    {order.img6 ? (
                      <ImageCart>
                      <Image src={order.img6} />
                      {order.img6Qty > 1 ? <Qty>{order.img6Qty}</Qty> : ""}
                      </ImageCart>
                ) : (
                  ""
                  )}
                  </ImgResponsive> */}
              </ImageContainer>
              <SubTotal>
                <NormalFont> Subtotal : </NormalFont>
                <BoldFont>{order.amount.toLocaleString()} Ks.</BoldFont>
              </SubTotal>
            </ItemContainer>
          </Div>
        ))}
    </List>
  );
};

export default PendingScreen;

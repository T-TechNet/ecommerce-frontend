import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReorderSheet from "./ReorderSheet";
// for mobile morevert button click
import MoreVert from "@mui/icons-material/MoreVert";
import MorevertMobile from "./MorevertMobile";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { publicRequest } from "../../../requestMethods";
import { CircularProgress } from "@mui/material";

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
  height: 180px;
  flex-shrink: 0;
  max-width: 1140px;
`;
const ItemContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const Data = styled.div`
  display: flex;
  align-items: center;
`;
const StateMobile = styled.div`
  height: 20px;
  display: inline-flex;
  padding: 2px 4px 6px 4px;
  margin-right: 5px;
  gap: 10px;
  border-radius: 4px;
  border: none;
  background: #2b9456;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

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
const State = styled.div`
  height: 20px;
  display: inline-flex;
  padding: 2px 4px 4px 4px;
  align-items: flex-start;
  gap: 10px;
  margin-right: 10px;
  border-radius: 4px;
  border: none;
  background: #2b9456;

  color: #fff;
  margin-left: 10px;
  cursor: pointer;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

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
  margin-right: 10px;

  @media only screen and (max-width: 759px) {
    margin-right: 0px;
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const ReorderBtn = styled.button`
  color: #03a89e;
  border: 0px;
  background: #fff;
  font-size: 15px;
  font-weight: 700;

  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }

  @media screen and (min-width: 860px) and (max-width: 930px) {
    font-size: 14px;
  }
`;
const ViewBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const ViewBtn = styled.button`
  color: #00688b;
  border: 0px;
  background: #fff;
  font-size: 15px;
  font-weight: 700;

  &:hover {
    color: #2eb7ae;
  }
  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }

  @media screen and (min-width: 860px) and (max-width: 930px) {
    font-size: 13px;
  }
`;
const Divider = styled.span`
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const MoreVertIcon = styled.div`
  display: flex;
  @media only screen and (min-width: 701px) {
    display: none;
  }
`;
const LightweightFont = styled.p`
  font-weight: 0;
  color: #758a91;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }
`;
const BoldFont = styled.p`
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-left: 5px;

  @media only screen and (max-width: 759px) {
    font-size: 12px;
    padding: 2px 4px 2px 4px;
  }
`;
const OrderNumFont = styled.p`
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
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
  margin-left: 4px;
  margin-right: 5px;
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
  flex-shrink: 0;
  padding: 7px;
  padding-bottom: 0px;
  position: relative;
`;
const Qty = styled.div`
  width: 25px;
  border-radius: 50px;
  padding: 2px 2px 2px 2px;
  background: #2eb7ae;
  color: #fff;
  position: absolute;
  left: 55px;
  top: -2px;
  align-items: center;
  justify-content: center;
  display: flex;
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
  @media only screen and (max-width: 700px) {
    display: none;
  }
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

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const CompleteDate = styled.div`
  display: flex;
  alignitems: flex-end;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const CompleteDateMobile = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (min-width: 701px) {
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
const SubTotal = styled.div`
  display: flex;

  @media only screen and (max-width: 700px) {
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

const CompleteScreen = ({ orders }) => {
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

  //   // console.log(response.data);

  //   // ADD BOUGHT QUANTITY TO PRODUCT

  //   let productData = response.data;

  //   productData.forEach((item) => {
  //     array.forEach((p, i) => {
  //       if (item._id === p.productId) {
  //         item.quantity = array[i].quantity;
  //       }
  //     });
  //   });

  //   // console.log("after adding quantity", productData);

  //   return productData;
  // };

  // const getProductDetails = async () => {
  // const promises =
  //   orders &&
  //   orders.map(async (o) => {
  //     const data = await fetchDataFromAPI(o.products);
  //     return data;
  //   });
  // const allData = promises && (await Promise.all(promises));
  // setProductDetails(allData);
  // orders && orders.map((order) => {
  //   setProductDetails((prevData) => {
  //     // Assuming order.productId is the key to update
  //     return {
  //       ...prevData,
  //       [order.productId]: order.productDetails, // Adjust this based on your data structure
  //     };
  //   });
  // })
  // if (orders) {
  //   const products = orders.map((item) => item.products);
  //   setProductDetails(products);
  // }
  // };

  // useEffect(() => {
  //   getProductDetails();
  // }, [orders]);

  return (
    <List>
      {orders &&
        orders.map((order, index) => (
          <Div key={order._id}>
            <ItemContainer>
              <Data>
                <NormalFont> Order Number: </NormalFont>
                <OrderNumFont>{order._id.slice(-15)}</OrderNumFont>
                <State>{order.status}</State>
                <CompleteDate>
                  <LightweightFont>on: </LightweightFont>
                  <DateFont>{order.updatedAt.substring(0, 10)}</DateFont>
                </CompleteDate>
              </Data>
              <Data>
                {/* <ReorderBtnContainer>
                  <ReorderBtn onClick={() => toggleBottomSheet(order)}>
                    Reorder
                  </ReorderBtn>
                  <ReorderSheet
                    open={isOpen}
                    setOpen={setIsOpen}
                    product={product}
                  />
                </ReorderBtnContainer>
                <Divider>|</Divider> */}
                <ViewBtnContainer>
                  <ViewBtn onClick={() => navigate(`/myorders/${order._id}`)}>
                    View Detail
                  </ViewBtn>
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
              <Data>
                <LightweightFont>Placed order on: </LightweightFont>
                <DateFont>{order.date}</DateFont>
              </Data>
            </ItemContainer>

            {/* Order status mobile */}
            <Data>
              <StateMobile>{order.status}</StateMobile>
              {/* <CompleteDateMobile>
                <LightweightFont>on: </LightweightFont>
                <DateFont>{order.deliveredDate}</DateFont>
              </CompleteDateMobile> */}
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
                  //   // <CircularProgress
                  //   //   size="1rem"
                  //   //   style={{
                  //   //     color: "#03A89E",
                  //   //     padding: "20px 10px",
                  //   //   }}
                  //   // />
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

export default CompleteScreen;

import React, { useState } from "react";
import styled from "styled-components";
import ReorderSheet from "./ReorderSheet";
import CancelSheet from "./CancelSheet";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 0 20px;
`;
const Wrapper = styled.div``;
const Data = styled.div`
  display: flex;
  align-items: center;
`;
const OrderNumFont = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #03a89e;
  margin-left: 7px;
`;
const DateFont = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-left: 7px;
`;
const BoldFont = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  padding: 2px 4px 2px 4px;
`;
const NormalFont = styled.p`
  font-size: 14px;
`;
const LightweightFont = styled.p`
  font-weight: 0;
  color: #758a91;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-left: 5px;
`;
const StateMobile = styled.div`
  margin-top: 5px;
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
      : props.className === "shipped"
      ? "#00688B"
      : props.className === "canceled"
      ? "#D52B2B"
      : "#2B9456"};

  color: #fff;
  margin-right: 5px;
  cursor: pointer;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const ShipDateMobile = styled.div`
  display: flex;
  align-items: center;
`;
const Hr = styled.hr`
  width: 100%;
  border: 1px solid #bfc9cc;
  margin-top: 10px;
  margin-bottom: 13px;
`;
const ImageContainer = styled.div`
  display: inline-flex;
  margin-top: 8px;
  position: relative;
`;
const ImageCart = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  padding: 7px;
  padding-bottom: 0px;
  position: relative;
`;
const Qty = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50px;
  padding: 2px 2px 2px 2px;
  background: #2eb7ae;
  color: #fff;
  position: absolute;
  left: 37px;
  top: -7px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 13px;
  border: 0.5px solid white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
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
const SubTotalMobile = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;

  @media only screen and (min-width: 701px) {
    display: none;
  }
`;
const ViewBtn = styled.button`
  width: 95%;
  height: 40px;
  background: #00688b;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;

  &:hover {
    background: #2b829f;
  }
`;
const CancelBtn = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 95%;
  height: 40px;
  color: #cc0000;
  border-radius: 5px;
  border-color: #cc0000;
  border-width: 1px;
  font-weight: bold;
  font-size: 15px;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e6f6f5;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;
const ReorderBtn = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 95%;
  height: 40px;
  color: #00688b;
  border-radius: 5px;
  border-color: #00688b;
  border-width: 1px;
  font-weight: bold;
  font-size: 15px;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e6f6f5;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;
const CancelContainer = styled.div`
  display: none;
  margin-bottom: 5px;
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
const ReorderContainer = styled.div`
  display: none;
  margin-bottom: 5px;
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
const MorevertSheet = ({ info, productDetails, orderIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <Container onClick={(e) => handleClick(e)}>
      {info ? (
        <>
          <Wrapper>
            <Data>
              <NormalFont>Order Number : </NormalFont>
              {info ? <OrderNumFont>{info._id.slice(-15)}</OrderNumFont> : ""}
            </Data>

            {info.status === "pending" ? (
              <StateMobile className="processing">{info.status}</StateMobile>
            ) : info.status === "preparing" ? (
              <StateMobile className="preparetoship">{info.status}</StateMobile>
            ) : info.status === "shipped" ? (
              <StateMobile className="shipped">{info.status}</StateMobile>
            ) : info.status === "canceled" ? (
              <StateMobile className="canceled">{info.status}</StateMobile>
            ) : (
              <StateMobile className="completed">{info.status}</StateMobile>
            )}

            <Hr></Hr>

            <Data>
              <BoldFont>
                {info.products.length}{" "}
                {info.products.length > 1 ? "items" : "item"}
              </BoldFont>
              <SubTotalMobile>
                <NormalFont> Subtotal : </NormalFont>
                <BoldFont>{info.amount.toLocaleString()} Ks.</BoldFont>
              </SubTotalMobile>
            </Data>

            <ImageContainer>
              {productDetails ? (
                productDetails[orderIndex].slice(0, 4).map((item) => (
                  <ImageCart key={item._id}>
                    <Image src={item.image[0]} />

                    {item.quantity > 1 ? <Qty>{item.quantity}</Qty> : ""}
                  </ImageCart>
                ))
              ) : (
                <CircularProgress
                  size="1rem"
                  style={{
                    color: "#03A89E",
                    padding: "20px 10px",
                  }}
                />
              )}
              {productDetails && productDetails[orderIndex].length > 4 ? (
                <TotalQtyMobile>
                  +{productDetails[orderIndex].length - 4}
                </TotalQtyMobile>
              ) : (
                ""
              )}
              {/* {info.typeQty > 4 ? (
                <>
                  <TotalQtyMobile>+1</TotalQtyMobile>
                </>
              ) : (
                ""
              )} */}
              {/* <ImageCart>
                <Image src={info.img1} />
                {info.img1Qty > 1 ? <Qty>{info.img1Qty}</Qty> : ""}
              </ImageCart>
              {info.img2 ? (
                <ImageCart>
                  <Image src={info.img2} />

                  {info.img2Qty > 1 ? <Qty>{info.img2Qty}</Qty> : ""}
                </ImageCart>
              ) : (
                ""
              )}
              {info.img3 ? (
                <ImageCart>
                  <Image src={info.img3} />
                  {info.img3Qty > 1 ? <Qty>{info.img3Qty}</Qty> : ""}
                </ImageCart>
              ) : (
                ""
              )}
              {info.img4 ? (
                <ImageCart>
                  <Image src={info.img4} />
                  {info.img4Qty > 1 ? <Qty>{info.img4Qty}</Qty> : ""}
                </ImageCart>
              ) : (
                ""
              )}
              {info.typeQty > 4 ? (
                <>
                  <TotalQtyMobile>+1</TotalQtyMobile>
                </>
              ) : (
                ""
              )} */}
            </ImageContainer>
            <Hr></Hr>
            {/* {info.status === "Canceled" ? (
              <Link to={{ pathname: "/myorders/mobile/ordNum/cancel" }}>
                {" "}
                <ViewBtn>View Detail</ViewBtn>
              </Link>
            ) : (
              <Link to={{ pathname: "/myorders/mobile/ordNum" }}>
                {" "}
                <ViewBtn>View Detail</ViewBtn>
              </Link>
            )} */}

            {info.status === "Canceled" ? (
              <ViewBtn onClick={() => navigate(`/myorders/view/${info._id}`)}>
                View Detail
              </ViewBtn>
            ) : (
              <ViewBtn onClick={() => navigate(`/myorders/view/${info._id}`)}>
                View Detail
              </ViewBtn>
            )}

            {info.status === "Processing" && (
              <>
                <CancelContainer>
                  <CancelBtn onClick={toggleBottomSheet}>
                    Cancel Order
                    <LightweightFont>within 01:30:21</LightweightFont>
                  </CancelBtn>
                  <CancelSheet open={isOpen} setOpen={setIsOpen} />
                </CancelContainer>
              </>
            )}
            {info.status === "Completed" && (
              <>
                <ReorderContainer>
                  <ReorderBtn onClick={toggleBottomSheet}>Reorder</ReorderBtn>
                  <ReorderSheet open={isOpen} setOpen={setIsOpen} info={info} />
                </ReorderContainer>
              </>
            )}
            {info.status === "Canceled" && (
              <>
                <ReorderContainer>
                  <ReorderBtn onClick={toggleBottomSheet}>Reorder</ReorderBtn>
                  <ReorderSheet open={isOpen} setOpen={setIsOpen} info={info} />
                </ReorderContainer>
              </>
            )}
          </Wrapper>
        </>
      ) : (
        ""
      )}
    </Container>
  );
};

export default MorevertSheet;

import React from "react";
import styled from "styled-components";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import kbzpay from "../../assets/PaymentLogos/kpayLogo.webp";
import ayapay from "../../assets/PaymentLogos/AYA_Pay_Logo.svg";
import cbpay from "../../assets/PaymentLogos/CB_Pay.png";
import kbzmbanking from "../../assets/PaymentLogos/kbzMobileBanking.jpg";
import ayambanking from "../../assets/PaymentLogos/AYAMobileBanking.jpg";

const Container = styled.div`
  @media only screen and (max-width: 769px) {
    padding: 10px 0;
  }

  @media only screen and (max-width: 366px) {
    padding: 10px 0 10px 5px;
  }
`;

const InfoLabel = styled.div`
  padding: 10px 30px 10px 0;
  font-weight: 400;
  font-size: 16px;
  color: #002734;
  display: flex;
  align-items: center;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;

const RadioChip = styled.div`
  width: fit-content;
  padding: 15px;
  background: #f5f6f7;
  border: 1px solid #dee3e5;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  @media only screen and (max-width: 769px) {
    width: 100%;
    justify-content: space-between;
    padding: 12px 15px;
  }
`;

const RadioDiv = styled.div`
  display: flex;
  align-items: center;
  color: #94a4aa;

  &:hover {
    color: #00688b;
  }
`;

const Data = styled.p`
  font-weight: 700;
  font-size: 14px;
  color: #002734;
  padding: 10px 5px 10px 0;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  padding: 0 10px 0 15px;
  object-fit: cover;
`;

const radio = {
  fontSize: "18px",
  paddingRight: "10px",
};

const PaymentMethod = ({ info, payment, setPayment }) => {
  const handlePayment = (method, delivery) => {
    if (method === "cod") {
      if (delivery === "pickup") {
        setPayment("Cash On Pickup");
      } else {
        setPayment("Cash On Delivery");
      }
    } else if (method === "kbzpay") {
      setPayment("KBZ Pay");
    } else if (method === "ayapay") {
      setPayment("AYA Pay");
    } else if (method === "cbpay") {
      setPayment("CB Pay");
    } else if (method === "kbzmbanking") {
      setPayment("KBZ MBanking");
    } else if (method === "kbzspecial") {
      setPayment("KBZ (Special)");
    } else if (method === "ayambanking") {
      setPayment("AYA MBanking");
    } else if (method === "ayaspecial") {
      setPayment("AYA (Special)");
    } else {
    }
  };

  return (
    <Container>
      <InfoLabel>Select the payment method:</InfoLabel>
      <RadioContainer>
        {info.delivery === "pickup" || info.amount < 150000 ? (
          <>
            {/* COD */}
            <RadioChip
              style={{
                border:
                  payment === "Cash On Delivery" || payment === "Cash On Pickup"
                    ? "2px solid #00688B"
                    : "1px solid #dee3e5",
              }}
              onClick={() => handlePayment("cod", info.delivery)}
            >
              <RadioDiv>
                {payment === "Cash On Delivery" ||
                payment === "Cash On Pickup" ? (
                  <RadioButtonCheckedIcon
                    style={{
                      fontSize: "18px",
                      paddingRight: "10px",
                      color: "#00688B",
                    }}
                  />
                ) : (
                  <RadioButtonUncheckedIcon style={radio} />
                )}
                {info.delivery === "pickup" ? (
                  <Data>Cash On Pickup</Data>
                ) : (
                  <Data>Cash On Delivery</Data>
                )}
              </RadioDiv>
            </RadioChip>
          </>
        ) : (
          <></>
        )}

        {/* KBZ Current */}
        <RadioChip
          style={{
            border: payment === "KBZ MBanking" && "2px solid #00688B",
          }}
          onClick={() => handlePayment("kbzmbanking")}
        >
          <RadioDiv>
            {payment === "KBZ MBanking" ? (
              <RadioButtonCheckedIcon
                style={{
                  fontSize: "18px",
                  paddingRight: "10px",
                  color: "#00688B",
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon style={radio} />
            )}
            <Data>KBZ MBanking</Data>
          </RadioDiv>
          <Img src={kbzmbanking}></Img>
        </RadioChip>

        {/* KPAY */}
        <RadioChip
          style={{
            border: payment === "KBZ Pay" && "2px solid #00688B",
          }}
          onClick={() => handlePayment("kbzpay")}
        >
          <RadioDiv>
            {payment === "KBZ Pay" ? (
              <RadioButtonCheckedIcon
                style={{
                  fontSize: "18px",
                  paddingRight: "10px",
                  color: "#00688B",
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon style={radio} />
            )}
            <Data>KBZ Pay</Data>
          </RadioDiv>
          <Img src={kbzpay}></Img>
        </RadioChip>

        {/* CB Pay */}
        <RadioChip
          style={{
            border: payment === "CB Pay" && "2px solid #00688B",
          }}
          onClick={() => handlePayment("cbpay")}
        >
          <RadioDiv>
            {payment === "CB Pay" ? (
              <RadioButtonCheckedIcon
                style={{
                  fontSize: "18px",
                  paddingRight: "10px",
                  color: "#00688B",
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon style={radio} />
            )}
            <Data>CB Pay</Data>
          </RadioDiv>
          <Img src={cbpay}></Img>
        </RadioChip>

        {/* AYAPay */}
        <RadioChip
          style={{
            border: payment === "AYA Pay" && "2px solid #00688B",
          }}
          onClick={() => handlePayment("ayapay")}
        >
          <RadioDiv>
            {payment === "AYA Pay" ? (
              <RadioButtonCheckedIcon
                style={{
                  fontSize: "18px",
                  paddingRight: "10px",
                  color: "#00688B",
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon style={radio} />
            )}
            <Data>AYA Pay</Data>
          </RadioDiv>
          <Img src={ayapay}></Img>
        </RadioChip>

        {/* KBZ Special */}
        <RadioChip
          style={{
            border: payment === "KBZ (Special)" && "2px solid #00688B",
          }}
          onClick={() => handlePayment("kbzspecial")}
        >
          <RadioDiv>
            {payment === "KBZ (Special)" ? (
              <RadioButtonCheckedIcon
                style={{
                  fontSize: "18px",
                  paddingRight: "10px",
                  color: "#00688B",
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon style={radio} />
            )}
            <Data>KBZ (Special)</Data>
          </RadioDiv>
          <Img src={kbzmbanking}></Img>
        </RadioChip>

        {/* AYA Current */}
        <RadioChip
          style={{
            border: payment === "AYA MBanking" && "2px solid #00688B",
          }}
          onClick={() => handlePayment("ayambanking")}
        >
          <RadioDiv>
            {payment === "AYA MBanking" ? (
              <RadioButtonCheckedIcon
                style={{
                  fontSize: "18px",
                  paddingRight: "10px",
                  color: "#00688B",
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon style={radio} />
            )}
            <Data>AYA MBanking</Data>
          </RadioDiv>
          <Img src={ayambanking}></Img>
        </RadioChip>

        {/* AYA Special */}
        <RadioChip
          style={{
            border: payment === "AYA (Special)" && "2px solid #00688B",
          }}
          onClick={() => handlePayment("ayaspecial")}
        >
          <RadioDiv>
            {payment === "AYA (Special)" ? (
              <RadioButtonCheckedIcon
                style={{
                  fontSize: "18px",
                  paddingRight: "10px",
                  color: "#00688B",
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon style={radio} />
            )}
            <Data>AYA (Special)</Data>
          </RadioDiv>
          <Img src={ayambanking}></Img>
        </RadioChip>
      </RadioContainer>
    </Container>
  );
};

export default PaymentMethod;

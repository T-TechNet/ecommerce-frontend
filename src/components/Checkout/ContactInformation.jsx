import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";
import box from "../../assets/Pickup.svg";
import scooter from "../../assets/Delivery.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeliveryForm from "./DeliveryForm";
import PickupForm from "./PickupForm";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Form = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  // align-items: flex-start;
  justify-content: center;

  @media only screen and (max-width: 769px) {
    width: 50%;
    padding: 20px;
  }
`;

const FormControl = styled.div`
  width: 90%;
  margin: 10px 5px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Div = styled.div`
  box-sizing: border-box;
  background-color: #f5f6f7;
  border: 1px solid #dee3e5;
  border-radius: 8px;

  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 769px) {
    padding: 6px 12px;
  }
`;

const InfoWrapper = styled.div`
  color: #00688b;
  font-size: 16px;
`;

const Tag = styled.div`
  line-height: 25px;
  font-weight: ${(props) => (props.id === "bold" ? "700" : "400")};
  color: ${(props) => props.className === "login" && "#000000"};
`;

// const LogoutButton = styled.div`
//   border: 1px solid #94a4aa;
//   line-height: 25px;
//   font-weight: 700;
//   font-size: 14px;
//   color: #00688b;
//   border-radius: 4px;
//   padding: 8px 16px;
//   gap: 8px;
//   cursor: pointer;

//   @media only screen and (max-width: 759px) {
//     padding: 4px 8px;
//   }
// `;

const LoginButton = styled.div`
  background: #00688b;
  color: #ffffff;
  border-radius: 4px;
  line-height: 25px;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 16px;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    transform: translate(-0.5px, 0.5px);
    transition: all 0.3s ease;
  }
  @media only screen and (min-width: 769px) and (max-width: 1204px) {
    width: 15%;
    display: flex;
    justify-content: center;
    padding: 8px 8px;
  }
  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

const Login = styled.span`
  color: #00688b;
  font-weight: bold;
  font-size: 16px;
  margin-left: 10px;

  @media only screen and (min-width: 769px) {
    display: none;
  }
`;

const Label = styled.p`
  font-weight: ${(props) => (props.className === "title" ? "700" : "400")};
  font-size: ${(props) => (props.className === "title" ? "18px" : "16px")};
  color: ${(props) => props.className === "title" && "#002734"};

  font-size: ${(props) => props.className === "login" && "13px"};

  background-color: ${(props) => props.className === "email" && "#028F97"};
  color: ${(props) => props.className === "email" && "white"};
  width: 100%;
  margin: ${(props) => props.className === "email" && "5px 0"};
  padding: ${(props) => props.className === "email" && "10px 0 10px 5px"};
  padding-bottom: 15px;
  border-radius: ${(props) => props.className === "email" && "5px"};

  display: flex;
  align-items: center;
`;

const Option = styled.div`
  position: relative;
  padding: 15px 30px;
  background: #f5f6f7;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;

  border: ${(props) =>
    props.className === true ? "2px solid #00688b" : "1px solid #dee3e5"};

  font-weight: 700;
  font-size: 16px;
  color: #002734;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: context-menu;

  @media only screen and (max-width: 769px) {
    flex-direction: column;
    padding: 15px 30px;
    gap: 5px;
  }
`;

const Img = styled.img`
  padding-right: 20px;

  @media only screen and (max-width: 769px) {
    padding: 0px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
`;

const check = {
  position: "absolute",
  top: "-15",
  right: "-12",
  zIndex: "1",
  backgroundColor: "#ffffff",
  color: "#00688B",
  borderRadius: "50%",
  // border: "2px solid #FFFFFF",
};

const ContactInformation = ({ user, deli, setDeli, cartItems, total }) => {
  const [method, setMethod] = useState("delivery");

  // states for handling forms
  const [delivery, setDelivery] = useState(true);
  const [pickup, setPickup] = useState(false);

  const [info, setInfo] = useState(); // for storing order info

  // const logOut = () => {
  //   if (window.confirm("Are you sure you want to log out?")) {
  //     setUser(null);
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("token");
  //     sessionStorage.setItem("guest", "true");
  //     navigate(0);
  //   }
  // };

  const getOrder = async () => {
    const token = localStorage.getItem("token");
    const order = JSON.parse(localStorage.getItem("order"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user && user._id;

    // user logged in, pending order exists
    if (order && user) {
      await publicRequest
        .get(`/orders/find?userId=${userId}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          let orderInfo = res.data[0];
          localStorage.setItem("order", JSON.stringify(orderInfo));
          setInfo(orderInfo); // to pass order info into forms
          setMethod(orderInfo.delivery); // to show form

          if (orderInfo.delivery === "delivery") {
            setDelivery(true);
            setPickup(false);
          } else {
            setDelivery(false);
            setPickup(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (order) {
      // guest user, pending order exists
      await publicRequest
        .get(`/orders/find/${order._id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
          },
        })
        .then((res) => {
          let orderInfo = res.data[0];
          localStorage.setItem("order", JSON.stringify(orderInfo));
          setInfo(orderInfo); // to pass order info into forms
          setMethod(orderInfo.delivery); // to show form according to user option
          if (orderInfo.delivery === "delivery") {
            setDelivery(true);
            setPickup(false);
          } else {
            setDelivery(false);
            setPickup(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  // const getUserProfile = async () => {
  //   const token = localStorage.getItem("token");
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   //  GET REGION FOR SELECT OPTION
  //   await publicRequest
  //     .get(`/users/find/${user._id}`, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         token: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setAddresses(res.data.addresses);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleOption = (option) => {
    setMethod(option);
    if (option === "delivery") {
      setDelivery(true);
      setPickup(false);
      setDeli(info && info.delivery_fees);
    } else {
      setPickup(true);
      setDelivery(false);
      setDeli(0);
    }
  };

  useEffect(() => {
    getOrder();
    // getUserProfile();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Form>
          <FormControl>
            <Label className="title">1. Address Information</Label>
            {user ? (
              <Div>
                <InfoWrapper>
                  <Tag id="bold">{user.name}</Tag>
                  <Tag>{user.email}</Tag>
                </InfoWrapper>
                {/* <LogoutButton
                  id="bold"
                  classname="button"
                  onClick={() => logOut()}
                >
                  Log Out
                </LogoutButton> */}
              </Div>
            ) : (
              <>
                <Div>
                  <InfoWrapper>
                    <Tag classname="login">
                      Log in to your account for better checkout experience!
                      <Login>Log in</Login>
                    </Tag>
                  </InfoWrapper>
                  <LoginButton id="bold">Log in</LoginButton>
                </Div>
              </>
            )}
          </FormControl>
          <FormControl>
            <Label>Choose the option:</Label>
            <Row>
              <Option
                className={delivery}
                onClick={() => handleOption("delivery")}
              >
                <Img src={scooter} /> Delivery
                {delivery && <CheckCircleIcon style={check} />}
              </Option>
              <Option className={pickup} onClick={() => handleOption("pickup")}>
                <Img src={box} />
                Pickup
                {pickup && <CheckCircleIcon style={check} />}
              </Option>
            </Row>
          </FormControl>
          {method === "delivery" ? (
            <DeliveryForm
              user={user}
              method={method}
              deli={deli}
              setDeli={setDeli}
              cartItems={cartItems}
              total={total}
              info={info}
            />
          ) : (
            <PickupForm
              user={user}
              method={method}
              deli={deli}
              setDeli={setDeli}
              cartItems={cartItems}
              total={total}
              info={info}
            />
          )}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ContactInformation;

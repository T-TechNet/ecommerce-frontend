import React, { useEffect, useState } from "react";
import styled from "styled-components";
import group from "../../assets/Profile/Group.png";
import { publicRequest } from "../../requestMethods";
import SideMenuList from "./SideMenuList";
import SideMenuListMobile from "./SideMenuListMobile";
import OrderData from "./OrderData";
import ErrorPage from "../../pages/ErrorPage";
import Loading from "../Loading";
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: context-menu;
`;
const Wrapper = styled.div`
  width: 1140px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 759px) {
    width: 90%;
    margin: 0;
  }
`;

const Div = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  @media only screen and (max-width: 759px) {
    display: none;
  }
`;

const Img = styled.img`
  height: 40px;
  position: absolute;
  right: 0px;
`;

const UserInfo = styled.div`
  width: 100%;
  color: #fff;
  background-color: #314d5f;
  padding: 20px 30px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;
`;
const Msg = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const Welcome = styled.div`
  margin-left: 30px;
`;

const InfoSection = styled.div`
  width: 100%;
  display: flex;
`;

const Order = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState(); // for storing user data
  const [orders, setOrders] = useState(); // for storing user data

  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (user) {
      await publicRequest
        .get(`/users/getOrders/${user._id}`, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        })

        .then((res) => {
          setOrders(res.data.data);
          setUserInfo(res.data.userInfo);
          localStorage.setItem("user", JSON.stringify(res.data.userInfo));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return user ? (
    userInfo ? (
      <Container>
        <Wrapper>
          <Div>
            <UserInfo>
              <Msg>Hello,{userInfo.name}</Msg>
              <Welcome>You've arrived at your account. Welcome in!</Welcome>
            </UserInfo>

            <Img src={group} />
          </Div>

          <SideMenuListMobile userInfo={userInfo} />
          <InfoSection>
            <SideMenuList userInfo={userInfo} />
            <OrderData orders={orders} />
          </InfoSection>
        </Wrapper>
      </Container>
    ) : (
      <Container>
        <Wrapper>
          <Loading />
        </Wrapper>
      </Container>
    )
  ) : (
    <ErrorPage />
  );
};

export default Order;

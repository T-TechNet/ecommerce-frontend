import React, { useEffect, useState } from "react";
import styled from "styled-components";
import group from "../../assets/Profile/Group.png";
import { publicRequest } from "../../requestMethods";
import EditDialog from "./EditDialog";
import ErrorPage from "../../pages/ErrorPage";
import Loading from "../Loading";
import SideMenuList from "./SideMenuList";
import SideMenuListMobile from "./SideMenuListMobile";
import AddressData from "./AddressData";
import AddressForm from "./AddressForm";

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

const Address = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false); // fpr toggling address form
  const [type, setType] = useState(false); // for detecting new or edit address to reset form
  const [userInfo, setUserInfo] = useState(); // for storing user data
  const [serverError, setServerError] = useState();

  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (user) {
      await publicRequest
        .get(`/users/find/${user._id}`, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        })

        .then((res) => {
          setUserInfo(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => console.log(err));
    }
  };

  //   const onSubmit = async (value) => {
  //     let data = {
  //       newData: value,
  //       toUpdate: type,
  //     };

  //     let token = localStorage.getItem("token");

  //     await publicRequest
  //       .put(`/users/${userInfo._id}`, data, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           token: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setOpen(false);
  //         setUserInfo("");
  //         getUser();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   const onPasswordSubmit = async (currentPw, newPw, confirmPw) => {
  //     let data = {
  //       oldData: currentPw,
  //       newData: newPw,
  //       toUpdate: type,
  //     };
  //     let token = localStorage.getItem("token");
  //     await publicRequest
  //       .put(`/users/${userInfo._id}`, data, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           token: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setOpen(false);
  //         setUserInfo("");
  //         getUser();
  //       })
  //       .catch((err) => {
  //         setServerError(err.response.data);
  //       });
  //   };

  useEffect(() => {
    getUser();
  }, []);

  return user ? (
    userInfo ? (
      <Container>
        <Wrapper>
          {/* OPEN FORM FOR ADDING OR EDITING ADDRESSES */}
          <AddressForm
            type={type}
            open={open}
            setOpen={setOpen}
            userInfo={userInfo}
            getUser={getUser}
          />

          <Div>
            <UserInfo>
              <Msg>Hello, {userInfo.name}</Msg>
              <Welcome>You've arrived at your account. Welcome in!</Welcome>
            </UserInfo>

            <Img src={group} />
          </Div>

          <SideMenuListMobile userInfo={userInfo} />

          <InfoSection>
            <SideMenuList userInfo={userInfo} />

            {/* SHOWING LIST OF ADDRESSES */}
            <AddressData
              userInfo={userInfo}
              setOpen={setOpen}
              setType={setType}
              type={type}
              getUser={getUser}
            />
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

export default Address;

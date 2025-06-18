import React from "react";
import styled from "styled-components";
import CircleIcon from "@mui/icons-material/Circle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const DataTable = styled.div`
  flex: 2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.16);
  padding: 20px 40px;

  @media only screen and (max-width: 759px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.div`
  color: #002734;
  padding-bottom: 30px;
  font-size: 18px;
  font-weight: 700;

  @media only screen and (max-width: 759px) {
    padding-bottom: 20px;
  }
`;

const DatatableHr = styled.hr`
  width: 100%;
  border: 1px solid #dee3e5;
  margin: auto;
`;
const InfoDiv = styled.div`
  padding: 28px 0;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 759px) {
    padding: 20px 0;
  }
`;

const ColumnDiv = styled.div`
  display: flex;
  width: 100%;

  @media only screen and (max-width: 759px) {
    flex-direction: column;
    flex: 2;
    gap: 5px;
  }
`;
const Tag = styled.div`
  width: 30%;
  color: #667d85;
  font-size: 16px;
  font-weight: 700;

  @media only screen and (max-width: 759px) {
    font-size: 14px;
    width: 100%;
  }
`;
const Data = styled.div`
  width: 50%;
  color: #758a91;
  font-size: 16px;

  @media only screen and (max-width: 759px) {
    width: 100%;
    font-size: 14px;
    font-weight: 400;
  }
`;
const ChangeDiv = styled.div`
  width: 20%;
  color: #00688b;
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;

  @media only screen and (max-width: 759px) {
    flex: 1;
    font-weight: 400;
  }
`;

const circle = {
  fontSize: "11px",
  color: "#758A91",
  paddingRight: "2px",
};

const editIcon = {
  paddingRight: "10px",
};

const UserData = ({ userInfo, setOpen, setType }) => {
  const openEditBox = (type) => {
    setOpen(true);
    setType(type);
  };

  return (
    <DataTable>
      <Title>Profile</Title>
      <DatatableHr></DatatableHr>
      <InfoDiv>
        <ColumnDiv>
          <Tag>Name</Tag>
          <Data>{userInfo.name}</Data>
        </ColumnDiv>
        <ChangeDiv onClick={() => openEditBox("Name")}>
          <EditOutlinedIcon style={editIcon} />
          Change
        </ChangeDiv>
      </InfoDiv>
      <DatatableHr></DatatableHr>
      <InfoDiv>
        <ColumnDiv>
          <Tag>Email Address</Tag>
          <Data>{userInfo.email}</Data>
        </ColumnDiv>
        <ChangeDiv></ChangeDiv>
      </InfoDiv>
      <DatatableHr></DatatableHr>
      <InfoDiv>
        <ColumnDiv>
          <Tag>Phone Number</Tag>
          <Data>{userInfo.phnum ? userInfo.phnum : "-"}</Data>
        </ColumnDiv>
        <ChangeDiv onClick={() => openEditBox("Phone Number")}>
          <EditOutlinedIcon style={editIcon} />
          Change
        </ChangeDiv>
      </InfoDiv>
      <DatatableHr></DatatableHr>
      <InfoDiv>
        <ColumnDiv>
          <Tag>Password</Tag>
          <Data>
            <CircleIcon style={circle} />
            <CircleIcon style={circle} />
            <CircleIcon style={circle} />
            <CircleIcon style={circle} />
            <CircleIcon style={circle} />
            <CircleIcon style={circle} />
            <CircleIcon style={circle} />
            <CircleIcon style={circle} />
            <CircleIcon style={circle} />
            <CircleIcon style={circle} />
          </Data>
        </ColumnDiv>
        <ChangeDiv onClick={() => openEditBox("Password")}>
          <EditOutlinedIcon style={editIcon} />
          Change
        </ChangeDiv>
      </InfoDiv>
    </DataTable>
  );
};

export default UserData;

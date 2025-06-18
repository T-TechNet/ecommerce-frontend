import React, { useState } from "react";
import styled from "styled-components";
import CircleIcon from "@mui/icons-material/Circle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import AddressForm from "./AddressForm";

const DataTable = styled.div`
  flex: 2;
  background: #fff;
  /* padding: 20px 40px; */

  @media only screen and (max-width: 759px) {
    margin-bottom: 20px;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const Title = styled.div`
  color: #002734;
  font-size: 18px;
  font-weight: 700;

  @media only screen and (max-width: 759px) {
    padding-bottom: 20px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Box = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  border-radius: 8px;
  border-left: ${(props) =>
    props.className ? "5px solid #00688b" : "5px solid transparent"};
  background: #fff;
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.16);

  padding: 10px 15px;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Info = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: ${(props) => (props.className === "name" ? "700" : "400")};
`;
const ButtonContainer = styled.div`
  display: flex;
`;
const Button = styled.div`
  padding: 0 10px;
  border-right: ${(props) =>
    props.className === "edit" && "1.5px solid #a3b1b6"};
  color: ${(props) => (props.className === "edit" ? "#00688b" : "#cc0000")};
  font-weight: 700;
  cursor: pointer;
`;

const Section = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  @media only screen and (max-width: 759px) {
    padding: 30px;
    justify-content: flex-start;
  }
`;
const Header = styled.p`
  font-size: 32px;
  font-weight: 700;
  color: white;
  background-image: linear-gradient(to bottom, #00688b, #03a89e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media only screen and (max-width: 759px) {
    font-size: 23px;
    text-align: center;
  }
`;
const Message = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 400;

  @media only screen and (max-width: 759px) {
    font-size: 16px;
    text-align: center;
  }
`;
const AddNew = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #00688b;
  color: #fff;
  font-size: 16px;
  font-weight: 700;

  padding: ${(props) =>
    props.className === "small" ? "8px 16px" : "16px 32px"};
  margin: ${(props) => (props.className === "small" ? "0px" : "10px 0")};
  border-radius: 4px;

  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  }
`;

const AddressData = ({ type, getUser, userInfo, setOpen, setType }) => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [index, setIndex] = useState();

  const openEditBox = (type, addressToEdit, i) => {
    setSelectedAddress(addressToEdit);
    setIndex(i);
    setOpenEditForm(true);
    setType(type);
  };

  return (
    <DataTable>
      {/* OPEN FORM FOR ADDING OR EDITING ADDRESSES */}
      <AddressForm
        userInfo={userInfo}
        getUser={getUser}
        type={type}
        setOpen={setOpen}
        setIndex={setIndex}
        index={index}
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        setSelectedAddress={setSelectedAddress}
        selectedAddress={selectedAddress}
      />

      {userInfo.addresses.length > 0 ? (
        <>
          <HeadContainer>
            <Title>Delivery Addresses</Title>
            <AddNew
              className="small"
              onClick={() => openEditBox("Add New Delivery Address")}
            >
              <AddIcon style={{ paddingRight: "8px" }} />
              Add New
            </AddNew>
          </HeadContainer>
          <List>
            {userInfo.addresses.map((value, i) => (
              <Box key={i} className={value.default}>
                <Data>
                  <Info className="name">{value.name}</Info>
                  <Info>
                    {value.address} | {value.city} |{" "}
                    {value.region.charAt(0).toUpperCase() +
                      value.region.slice(1)}
                  </Info>
                  <Info>{value.phnum}</Info>
                </Data>
                <ButtonContainer>
                  <Button
                    className="edit"
                    onClick={() =>
                      openEditBox("Edit Delivery Address", value, i)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      openEditBox("Remove Delivery Address", value, i)
                    }
                  >
                    Remove
                  </Button>
                </ButtonContainer>
              </Box>
            ))}
          </List>
        </>
      ) : (
        <Section>
          <Header>You haven’t saved any address yet</Header>
          <Message>
            You can save many addresses here and make checkout process quicker
          </Message>
          <AddNew onClick={() => openEditBox("Add New Delivery Address")}>
            <AddIcon style={{ paddingRight: "8px" }} />
            Add New
          </AddNew>
        </Section>
      )}
    </DataTable>
  );
};

export default AddressData;

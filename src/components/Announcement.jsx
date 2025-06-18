import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";

const Container = styled.div`
  height: 12px;
  padding: 10px 20px;
  background-color: #068c94;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    height: 20px;
    padding: 10px;
  }

  @media only screen and (max-width: 530px) {
    height: 40px;
    padding-top: 15px;
  }
`;

const Section = styled.div`
  width: 1150px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 759px) {
    width: 100%;
  }

  @media only screen and (max-width: 530px) {
    flex-direction: column;
    justify-content: center;
    gap: 7px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 5px;

  @media only screen and (max-width: 530px) {
    justify-content: center;
  }
`;

// const Contact = styled.div`
//   border-right: 0.5px solid #000;
//   display: flex;
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;

// const Email = styled.a.attrs({
//   href: "mailto: sales@rangoondiscount.com",
// })`
//   text-decoration: none;
//   color: white;
//   padding: 0 10px;
//   font-size: 13px;

//   @media (max-width: 759px) {
//     padding: 0 5px;
//   }
// `;

const Div = styled.div`
  padding: 0 10px;
  border-right: ${(props) =>
    props.className !== "phone" && " 0.5px solid #fff"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Info = styled.div`
  font-size: 13px;

  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }
`;

const Text = styled.div`
  color: #fff;
  font-size: 13px;

  @media only screen and (max-width: 759px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 530px) {
    display: flex;
    justify-content: center;
  }
`;

const icon = {
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
};

const Announcement = () => {
  return (
    <Container>
      <Section>
        <Wrapper>
          {/* <Contact className="contact">
            <MailOutlineIcon style={icon}></MailOutlineIcon>
            <Email>Contact</Email>
          </Contact> */}

          <Div>
            <AccessTimeIcon style={icon}></AccessTimeIcon>
            <Info>9:30am - 5:00pm</Info>
          </Div>

          <Div className="phone">
            <PhoneIcon style={icon}></PhoneIcon>
            <Info>09942095359</Info>
          </Div>
        </Wrapper>

        <Text>အချိန်နှင့်အမျှ စျေးနှုန်းအပြောင်းအလဲရှိနိုင်ပါသည်။</Text>
      </Section>
    </Container>
  );
};

export default Announcement;

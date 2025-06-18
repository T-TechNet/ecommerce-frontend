import React from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  padding: 20px 0 10px 0;
  background-color: #002734;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 759px) {
    justify-content: flex-start;
    align-items: flex-start;
    padding: 15px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  color: #fff;

  @media only screen and (max-width: 759px) {
    width: 90%;
    height: 100%;
  }
`;

const FlexContainer = styled.div`
  position: relative;
  width: 1150px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media screen and (max-width: 1203px) {
    width: 100%;
  }

  @media only screen and (max-width: 759px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Section = styled.div`
  padding: 15px 0;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Line = styled.div`
  padding-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: #03a89e;
  width: 80px;
`;

const Span = styled.span`
  height: 8px;
  width: 8px;
  background-color: #03a89e;
  border-radius: 50%;
  display: inline-block;
`;

const NavLinks = styled.div``;

const Bar = styled.div`
  font-size: 16px;
  background-color: #002734;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 759px) {
    margin-left: -50px;
    font-size: 14px;
    width: 300px;
  }
`;

const Icons = styled.div``;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const Address = styled.div``;

const Url = styled.p`
  padding: 10px 0;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Info = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: 759px) {
    width: 300px;
  }

  @media screen and (max-width: 380px) {
    width: 280px;
  }
`;

const Text = styled.div`
  flex: 2;
  line-height: 25px;

  @media screen and (max-width: 759px) {
    text-align: start;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  }
`;

// const FormWrapper = styled.div`
//   padding: 15px 0;
//   /* display: ${(props) => (props.className === "large" ? "flex" : "none")};
//   flex-direction: column;
//   margin-bottom: 10px;

//   @media only screen and (max-width: 759px) {
//     display: ${(props) => (props.className === "small" ? "flex" : "none")};
//   } */
// `;

// const Form = styled.form`
//   display: flex;
//   @media only screen and (max-width: 759px) {
//     flex-direction: column;
//   }
// `;

// const Input = styled.input.attrs({
//   placeholderTextColor: "#577079",
//   fontSize: "16px",
// })`
//   padding: 0 25px;
//   border-radius: 3px;
//   border: none;
//   background-color: #ffffff;

//   box-sizing: border-box;

//   width: 255px;
//   height: 50px;

//   border: 1px solid #b0bcc0;
//   border-radius: 4px;
//   @media only screen and (max-width: 759px) {
//     width: 350px;
//     height: 50px;
//   }
// `;

// const Button = styled.button`
//   padding: 16px 32px;
//   gap: 8px;
//   margin-left: 8px;
//   border: none;
//   font-size: 16px;
//   background-color: #00688b;
//   color: white;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #2b829f;
//     transform: translate(-0.5px, 0.5px);
//     transition: all 0.3s ease;
//   }
//   @media only screen and (max-width: 759px) {
//     width: 350px;
//     height: 35px;
//     margin-left: 0px;
//     margin-top: 10px;
//     padding: 0px;
//   }
// `;

const Row = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 920px) {
    width: 80%;
  }

  @media only screen and (max-width: 759px) {
    width: 100%;
    gap: 70px;
  }

  @media only screen and (max-width: 350px) {
    gap: 30px;
  }
`;

const UrlContainer = styled.div``;

const CopyRight = styled.div`
  font-size: 14px;

  @media screen and (max-width: 1203px) {
    text-align: center;
    align-items: center;
  }
`;

const social = {
  color: "#F4F4F4",
  fontSize: "40px",
  marginRight: "15px",
};

const isMobile = window.innerWidth <= 759;

const icon = {
  marginRight: isMobile ? "20px" : "40px",
  fontSize: "30px",
};

const navlink = {
  textDecoration: "none",
  color: "#D3D3D3",
};

const Footer = ({ click }) => {
  // const [showForm, setShowForm] = useState(false);
  // const [deviceType, setDeviceType] = useState("");

  // useEffect(() => {
  //   if (window.innerWidth < 600) {
  //     setShowForm(true);
  //   } else {
  //     setShowForm(false);
  //   }
  // });

  // const isMobile = window.innerWidth <= 759;

  // useEffect(() => {
  //   const handleResize = () => {
  //     setDeviceType(isMobile ? "mobile" : "desktop");
  //   };

  //   handleResize(); // Call the function initially

  //   // Attach the event listener
  //   window.addEventListener("resize", handleResize);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <Container>
      <Wrapper>
        <FlexContainer>
          {/* Email subscribe, Social media links, explore section */}
          <Column>
            {/* SECTION 1 - SUBSCRIBE EMAIL */}
            {/* <Section>
              <TitleWrapper>
                <Title>Be The First To Know With Our Emails</Title>
                <Line>
                  <Hr></Hr>
                  <Span></Span>
                </Line>
              </TitleWrapper>

              <FormWrapper className="small">
                <Form>
                  <Input
                    aria-label="Your email address"
                    name="email_address"
                    placeholder="Your Email Address"
                    required
                    type="email"
                  />
                  <Button>Get Notified</Button>
                </Form>
              </FormWrapper>
            </Section> */}

            {/* SECTION 2 - SOCIAL MEDIA */}
            <Section>
              <TitleWrapper>
                <Title>Follow Us</Title>
                <Line>
                  <Hr></Hr>
                  <Span></Span>
                </Line>
              </TitleWrapper>

              <Icons>
                <Box>
                  <IconButton
                    aria-label="Go to facebook"
                    onClick={() =>
                      window.open("https://www.facebook.com/rangoondiscount")
                    }
                  >
                    <FacebookRoundedIcon style={social} />
                  </IconButton>
                  <IconButton
                    aria-label="Go to Twitter"
                    onClick={() =>
                      window.open("https://twitter.com/RangoonDiscount")
                    }
                  >
                    <TwitterIcon style={social} />
                  </IconButton>
                  <IconButton
                    aria-label="Go to Instagram"
                    onClick={() =>
                      window.open(
                        "https://instagram.com/rangoondiscount?igshid=YmMyMTA2M2Y="
                      )
                    }
                  >
                    <InstagramIcon style={social} />
                  </IconButton>
                </Box>
              </Icons>
            </Section>

            {/* SECTION 3 - EXPLORE */}
            <Section>
              <TitleWrapper>
                <Title>Explore Us</Title>
                <Line>
                  <Hr></Hr>
                  <Span></Span>
                </Line>
              </TitleWrapper>

              <NavLinks>
                <Row>
                  <UrlContainer>
                    <Url onClick={click}>Login</Url>
                    <Link to="/list/hotdeals?page=1" style={navlink}>
                      <Url>Hot Deals</Url>
                    </Link>
                    <Link to="/list/gadget/all?page=1" style={navlink}>
                      <Url>Gadget Devices</Url>
                    </Link>
                  </UrlContainer>

                  <UrlContainer>
                    <Link to="/list/sales/all?page=1" style={navlink}>
                      <Url>December Promotion</Url>
                    </Link>
                    <Link to="/list/laptop/all?page=1" style={navlink}>
                      <Url>Laptops</Url>
                    </Link>
                    <Link to="/list/phone/all?page=1" style={navlink}>
                      <Url>Mobile Phones</Url>
                    </Link>
                  </UrlContainer>
                </Row>
              </NavLinks>
            </Section>
          </Column>

          {/* COLUMN 2 */}
          <Column>
            {/* SECTION 1 - CONTACT US */}
            <Section>
              <TitleWrapper>
                <Title>Contact Us</Title>
                <Line>
                  <Hr></Hr>
                  <Span></Span>
                </Line>
              </TitleWrapper>

              <Address>
                <Info>
                  <PlaceOutlinedIcon style={icon} />
                  <Text>
                    No. 222A, Bo Nyar Na Street, 9 Mile, Mayangone Township,
                    Yangon.
                  </Text>
                </Info>
                <Info>
                  <LocalPhoneOutlinedIcon style={icon} />
                  <Text>+959942095359</Text>
                </Info>
                <Info>
                  <MailOutlinedIcon style={icon} />
                  <Text>sales@rangoondiscount.com</Text>
                </Info>
              </Address>
            </Section>
          </Column>
        </FlexContainer>
        <Bar>
          <>
            {isMobile ? (
              <CopyRight>
                @ &nbsp; All rights reserved by Rangoon Discount @ 2022
              </CopyRight>
            ) : (
              <CopyRight>
                @ All rights reserved by Rangoon Discount @ 2022
              </CopyRight>
            )}
          </>
        </Bar>
      </Wrapper>
    </Container>
  );
};

export default Footer;

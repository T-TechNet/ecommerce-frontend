import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import ProductItemMobile from "./ProductItemMobile";
import { publicRequest } from "../../requestMethods";
import ImageSlider from "./ImageSlider";
import ImageSliderMobile from "./ImageSliderMobile";
import Asus from "../../assets/Partners/Asus.png";
import Equip from "../../assets/Partners/Equip.png";
import Level1 from "../../assets/Partners/Levelone.png";
import Ignitent from "../../assets/Partners/Ignitenet.jpg";
import Lenovo from "../../assets/Partners/Lenovo.png";
import Msi from "../../assets/Partners/MSI.jpg";
import Ubiquiti from "../../assets/Partners/Ubiquiti.jpg";
import Linksys from "../../assets/Partners/Linksys.png";
import Nikomax from "../../assets/Partners/Nikomax.jpg";
import RujiAndReyee from "../../assets/Partners/RuijiAndReyee.jpg";
import Teltonika from "../../assets/Partners/Teltonika.jpg";
import Edgecore from "../../assets/Partners/Edgecore.jpg";
import Digitus from "../../assets/Partners/Digitus.jpg";
import BDCOM from "../../assets/Partners/BDCOM.jpg";
import Dell from "../../assets/Partners/Dell.jpg";
import MakroTik from "../../assets/Partners/Mikrotik.svg";
import Remax from "../../assets/Partners/Remax.png";
import hotdealsarrow from "../../assets/Hot_Deals.svg";
import line from "../../assets/Line.svg";
import TestimonialCard from "../Feedback/TestimonialCard";
import FeedbackDialog from "../Feedback/FeedbackDialog";
import FeedbackPopup from "../Feedback/FeedbackPopup";
import Overlay from "../Categories/Overlay";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Leaf from "../Feedback/Leaf";
import "../../css/snackbar.css";
import { useNavigate } from "react-router-dom";
import Countdown from "./Countdown";
import balloon1 from "../../assets/HomeDisplay/promo1.png";
import balloon2 from "../../assets/HomeDisplay/promo2.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // @media screen and (max-width: 1203px) {
  // }

  // @media only screen and (max-width: 768px){
  //   // background: lightblue;
  //   width: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;

  // }
`;
const Wrapper = styled.div`
  width: 1150px;
  margin: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media only screen and (max-width: 1204px) {
    width: 100%;
    margin-top: 20px;
  }
`;
const Row = styled.div`
  width: 100%;
  padding: 20px 0;
  // width: 1150px;
  background-color: ${(props) =>
    props.className === "gray"
      ? "#f4f4f4"
      : props.className === "blue"
      ? "#E6F0F3"
      : "#ffffff"};
  display: ${(props) => (props.id === "hide" ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
`;

const H4 = styled.p`
  color: #03a89e;
  font-size: 18px;

  @media screen and (max-width: 769px) {
    padding-bottom: 8px;
  }
`;

const Strong = styled.p`
  font-size: 20px;
`;

const InfoContainer = styled.div`
  padding-bottom: 10px;
  width: 1140px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1203px) {
    width: 90%;
  }
  @media only screen and (max-width: 769px) {
    padding-bottom: 10px;
    display: ${(props) => (props.className === "scrollX" ? "none" : "flex")};
  }
`;

const RowWrapper = styled.div`
  // width: 100%;
  width: 1140px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 5px;
  @media screen and (max-width: 1204px) {
    width: 90%;
  }
`;
const ImageWrapper = styled.div`
  // width: 100%;
  width: 1140px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1203px) {
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BallonImg = styled.img`
  /* width: 180px;
  height: 150px; */
  width: 220px;
  height: 190px;

  @media screen and (max-width: 980px) {
    width: 160px;
    height: 130px;
  }

  @media screen and (max-width: 700px) {
    width: 200px;
    height: 170px;
    display: ${(props) =>
      props.className === "hide-image" ? "none" : "block"};
  }

  @media screen and (max-width: 600px) {
    width: 30%;
    height: 25%;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Arrow = styled.div`
  border-color: ${(props) =>
    props.className === "rate" ? "#fff" : " #00688b"};
  border-style: solid;
  width: 5px;
  height: 5px;
  text-align: center;
  border-width: 0 3.5px 3.5px 0;
  display: inline-block;
  padding: 2px;

  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);

  @media only screen and (max-width: 769px) {
    padding: 1px;
    border-width: 0 3px 3px 0;
    border-color: ${(props) =>
      props.className === "rate" ? "#00688b" : " #00688b"};
  }
`;

const LinkWrapper = styled.div`
  color: #00688b;
  display: flex;
  align-items: center;

  cursor: pointer;

  &:hover {
    color: #03a89e;
    transition: 0.3s ease-in-out all;
  }

  &:hover ${Arrow} {
    border: solid #03a89e;
    width: 5px;
    height: 5px;
    text-align: center;
    border-width: 0 3.5px 3.5px 0;
    display: inline-block;
    padding: 2px;
    transition: 0.3s ease-in-out all;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  @media screen and (max-width: 769px) {
    cursor: pointer;
    user-select: none;
    display: ${(props) => (props.className === "feedback" ? "none" : " flex")};
  }
`;

const ViewMoreButton = styled.div`
  border-radius: 4px;
  background: #00688b;
  padding: 16px 48px;
  margin: 20px 0;
  color: #fff;
  font-size: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  }
`;

const FeedbackBtn = styled.div`
  margin: 20px 0px;
  border: 1px solid #94a4aa;
  border-radius: 4px;
  color: #00688b;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    color: #03a89e;
    transition: 0.3s ease-in-out all;
  }

  &:hover ${Arrow} {
    border: solid #03a89e;
    width: 5px;
    height: 5px;
    text-align: center;
    border-width: 0 3.5px 3.5px 0;
    display: inline-block;
    padding: 2px;
    transition: 0.3s ease-in-out all;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  @media screen and (min-width: 769px) {
    display: none;
  }
`;
const Hr = styled.hr`
  border: none;
  height: 3px;
  background-image: linear-gradient(to right, #03a89e, #00688b);
  width: 120px;

  @media only screen and (max-width: 759px) {
    display: none;
  }
`;

const HotDealsTitle = styled.div`
  display: none;

  @media only screen and (max-width: 759px) {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: ${(props) => (props.className === "view" ? "16px" : "20px")};
    color: #ff8800;
  }
`;

const Title = styled.div`
  width: fit-content;
  color: ${(props) => (props.className === "rate" ? "#fff" : "#00688B")};
  font-weight: bold;
  font-size: ${(props) =>
    props.className === "view"
      ? "20px"
      : props.className === "rate"
      ? "16px"
      : props.className === "feedback"
      ? "20px"
      : "24px"};
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media only screen and (max-width: 769px) {
    font-size: ${(props) =>
      props.className === "view"
        ? "18px"
        : props.className === "rate"
        ? "15px"
        : props.className === "feedback"
        ? "14px"
        : "20px"};
    padding: 0px;
    color: ${(props) => (props.className === "rate" ? "#00688B" : "#00688B")};
  }
`;

const Span = styled.span`
  height: 12px;
  width: 12px;
  background-color: #00688b;
  border-radius: 50%;
  display: inline-block;

  @media only screen and (max-width: 759px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 1160px;
  padding: 20px 0 50px 0;
  gap: 40px;

  @media screen and (max-width: 1203px) {
    width: 100%;
    padding: 20px 0;
    gap: 50px;
  }
`;

const LOGOS = styled.img`
  width: 140px;
  padding: 10px;

  @media screen and (max-width: 759px) {
    width: 120px;
  }
`;

const Image = styled.img`
  @media screen and (max-width: 1203px) {
    display: ${(props) => props.className === "line" && "none"};
  }
  @media screen and (max-width: 759px) {
    display: none;
  }
`;

const Dialog = styled.div`
  @media screen and (max-width: 769px) {
    display: none;
  }
`;

const Popup = styled.div`
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const HomeDisplay = ({ wishList, handleAddProduct, handleWishList }) => {
  const [laptop, setLaptop] = useState([]);
  const [allinOne, setAllinOne] = useState([]);
  const [laptopAcce, setLaptopAcce] = useState([]);
  const [wifi, setWifi] = useState([]);
  const [networkAcce, setNetworkAcce] = useState([]);
  const [switches, setSwitches] = useState([]);
  const [routers, setRouters] = useState([]);
  const [hotDeals, setHotDeals] = useState([]);
  const [gadget, setGadget] = useState([]);
  const [powerSolution, setPowerSolution] = useState([]);
  const [phone, setPhone] = useState([]);
  const [salesInfo, setSalesInfo] = useState("");
  const [salesItem, setSalesItem] = useState([]);
  const [couponItems, setCouponItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const [openFeedback, setOpenFeedback] = useState(false);

  const [display, setDisplay] = useState(false); // for show/hide sales row

  const navigate = useNavigate();

  const [success, setSuccess] = useState(false); // state for snackbar

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false); // close the snackbar
  };

  const handleGiveFeedback = () => {
    setOpenFeedback(true);
  };

  // Function to check if the window size qualifies as "mobile"
  const checkIsMobile = () => {
    const isMobileSize = window.innerWidth <= 768;
    setIsMobile(isMobileSize);
  };

  const getCouponItems = async () => {
    try {
      const res = await publicRequest.get(`/coupon-item?request=related`);
      setCouponItems(res.data.data);
    } catch (err) {}
  };

  const getHotDeals = async () => {
    try {
      const res = await publicRequest.get(`/products/hotdeals`);
      setHotDeals(res.data.data);
    } catch (err) {}
  };

  const getLaptop = async () => {
    try {
      const res = await publicRequest.get(
        `/laptops?type=laptop&request=related`
      );
      setLaptop(res.data);
    } catch (err) {}
  };

  const getAllinOne = async () => {
    try {
      const res = await publicRequest.get(
        `/laptops?type=aio,desktop&request=related`
      );
      setAllinOne(res.data);
    } catch (err) {}
  };

  const getGadget = async () => {
    try {
      const res = await publicRequest.get(`/gadgets?request=related`);
      setGadget(res.data);
    } catch (err) {}
  };

  const getRouter = async () => {
    try {
      const res = await publicRequest.get(
        `/network?type=router&request=related`
      );
      setRouters(res.data);
    } catch (err) {}
  };

  const getSwitch = async () => {
    try {
      const res = await publicRequest.get(
        `/network?type=switch&request=related`
      );
      setSwitches(res.data);
    } catch (err) {}
  };

  const getWifi = async () => {
    try {
      const res = await publicRequest.get(`/network?type=wifi&request=related`);
      setWifi(res.data);
    } catch (err) {}
  };

  const getAccessory = async () => {
    try {
      const network_res = await publicRequest.get(
        `/network?type=accessory&request=related`
      );
      setNetworkAcce(network_res.data);

      const laptop_res = await publicRequest.get(
        `/laptops?type=accessory&request=related`
      );
      setLaptopAcce(laptop_res.data);
    } catch (err) {}
  };

  const getPowerSolution = async () => {
    try {
      const res = await publicRequest.get(`/powersolution?request=related`);
      setPowerSolution(res.data);
    } catch (err) {}
  };

  const getPhone = async () => {
    try {
      const res = await publicRequest.get(`/phone?request=related`);
      setPhone(res.data);
    } catch (err) {}
  };

  const getSalesItems = async () => {
    try {
      const res = await publicRequest.get(
        `/products/sales/get?request=related`
      );
      if (res.data.message) {
        setDisplay(false);
      } else {
        setDisplay(true);
        setSalesInfo(res.data.salesInfo);
        setSalesItem(res.data.products);
      }
    } catch (err) {}
  };

  const handleClick = (category, type) => {
    if (category === "hotdeals") {
      window.location.href = `/list/${category}?page=1`;
    } else {
      window.location.href = `/list/${category}/${type}?page=1`;
    }
  };

  const viewTestimonial = () => {
    navigate("/testimonials");
  };

  useEffect(() => {
    getCouponItems();
    getHotDeals();
    getLaptop();
    getAllinOne();
    getGadget();
    getRouter();
    getSwitch();
    getWifi();
    getAccessory();
    getPowerSolution();
    getPhone();
    getSalesItems();
  }, []);

  useEffect(() => {
    checkIsMobile(); // Call the function on initial render

    // Event listener callback function to handle resize
    const handleResize = () => {
      checkIsMobile(); // Call the function when the window is resized
    };
    // Set the initial state
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* for desktop */}
      <Dialog>
        <FeedbackDialog feedback={openFeedback} setFeedback={setOpenFeedback} />
      </Dialog>
      {/* for mobile */}
      <Popup>
        <Overlay open={openFeedback} setOpen={setOpenFeedback} />
        <Snackbar
          className="snackbar-mobile"
          open={success}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Review Submitted!
          </Alert>
        </Snackbar>
        <FeedbackPopup
          setSuccess={setSuccess}
          open={openFeedback}
          setOpen={setOpenFeedback}
        />
      </Popup>

      <Container>
        <Wrapper>
          <ImageWrapper>
            {isMobile ? <ImageSliderMobile /> : <ImageSlider />}
          </ImageWrapper>
        </Wrapper>

        {/* <Row className="gray">
          <Grid />
        </Row> */}

        <Row className="white" id={display ? "show" : "hide"}>
          <InfoContainer>
            <TitleWrapper
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <BallonImg
                className="hide-image"
                src={balloon1}
                alt="Thadingyut Lantern"
              />
              <Countdown setDisplay={setDisplay} salesInfo={salesInfo} />
              <BallonImg src={balloon2} alt="Thadingyut Lantern" />
            </TitleWrapper>
          </InfoContainer>

          <RowWrapper>
            {isMobile ? (
              <ProductItemMobile item={salesItem} />
            ) : (
              <ProductItem
                item={salesItem}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>

          <LinkWrapper>
            <ViewMoreButton onClick={() => handleClick("sales", "all")}>
              View All Products
            </ViewMoreButton>
          </LinkWrapper>
        </Row>

        <Row className="gray">
          <InfoContainer>
            <TitleWrapper>
              <Title style={{ color: "#ff9c2b" }}>Limited Offer !!</Title>
              <Hr
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #ff9c2b, #d52b2b)",
                }}
              ></Hr>
              <Span style={{ background: "#cc0000" }}></Span>
            </TitleWrapper>
            <LinkWrapper onClick={() => handleClick("coupon", "all")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
          </InfoContainer>

          <RowWrapper>
            {isMobile ? (
              <ProductItemMobile item={couponItems} />
            ) : (
              <ProductItem
                item={couponItems}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="white">
          <InfoContainer>
            <Image src={hotdealsarrow} />
            <Image src={line} className="line" />
            <TitleWrapper>
              <HotDealsTitle>Hot Deals !!</HotDealsTitle>
            </TitleWrapper>
            <LinkWrapper onClick={() => handleClick("hotdeals")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
          </InfoContainer>

          <RowWrapper>
            {isMobile ? (
              <ProductItemMobile item={hotDeals} />
            ) : (
              <ProductItem
                item={hotDeals}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="gray">
          <InfoContainer>
            <TitleWrapper>
              <Title>Mobile Phones & Tablets</Title>
              <Hr></Hr>
              <Span></Span>
            </TitleWrapper>
            <LinkWrapper onClick={() => handleClick("phone", "all")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
          </InfoContainer>

          <RowWrapper>
            {isMobile ? (
              <ProductItemMobile item={phone} />
            ) : (
              <ProductItem
                item={phone}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="white">
          <InfoContainer>
            <TitleWrapper>
              <Title>Laptop</Title>
              <Hr></Hr>
              <Span></Span>
            </TitleWrapper>
            {/* View More link */}
            <LinkWrapper onClick={() => handleClick("laptop", "all")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
          </InfoContainer>

          <RowWrapper>
            {isMobile ? (
              <ProductItemMobile item={laptop} />
            ) : (
              <ProductItem
                item={laptop}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="gray">
          <InfoContainer>
            <TitleWrapper>
              <Title>Desktop & All in One</Title>
              <Hr></Hr>
              <Span></Span>
            </TitleWrapper>
            {/* View More link */}
            <LinkWrapper onClick={() => handleClick("laptop", "aio-desktop")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
          </InfoContainer>

          <RowWrapper>
            {isMobile ? (
              <ProductItemMobile item={allinOne} />
            ) : (
              <ProductItem
                item={allinOne}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="white">
          <InfoContainer>
            <TitleWrapper>
              <Title>Computer Accessories</Title>
              <Hr></Hr>
              <Span></Span>
            </TitleWrapper>
            {/* View More link */}
            <LinkWrapper onClick={() => handleClick("laptop", "accessory")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
          </InfoContainer>

          <RowWrapper>
            {isMobile ? (
              <ProductItemMobile item={laptopAcce} />
            ) : (
              <ProductItem
                item={laptopAcce}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="gray">
          <InfoContainer>
            <TitleWrapper>
              <Title>Gadget Devices</Title>
              <Hr></Hr>
              <Span></Span>
            </TitleWrapper>
            {/* View More link */}
            <LinkWrapper onClick={() => handleClick("gadget", "all")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
          </InfoContainer>

          <RowWrapper>
            {isMobile ? (
              <ProductItemMobile item={gadget} />
            ) : (
              <ProductItem
                item={gadget}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="white">
          <InfoContainer>
            <TitleWrapper>
              <Title>Power Solution</Title>
              <Hr></Hr>
              <Span></Span>
            </TitleWrapper>
            <LinkWrapper onClick={() => handleClick("power solution", "all")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
          </InfoContainer>
          <RowWrapper>
            {/* <CategoryItem category="network" item="accessory" /> */}
            {isMobile ? (
              <ProductItemMobile item={powerSolution} />
            ) : (
              <ProductItem
                item={powerSolution}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="gray">
          <InfoContainer>
            <TitleWrapper>
              <Title>Router</Title>
              <Hr></Hr>
              <Span></Span>
            </TitleWrapper>
            {/* <Link to={`list/network/router`} style={{ textDecoration: "none" }}> */}
            <LinkWrapper onClick={() => handleClick("network", "router")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
            {/* </Link> */}
          </InfoContainer>
          <RowWrapper>
            {isMobile ? (
              <ProductItemMobile item={routers} />
            ) : (
              <ProductItem
                item={routers}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="white">
          <InfoContainer>
            <TitleWrapper>
              <Title>Switch</Title>
              <Hr></Hr>
              <Span></Span>
            </TitleWrapper>
            {/* <Link to={`list/network/switch`} style={{ textDecoration: "none" }}> */}
            <LinkWrapper onClick={() => handleClick("network", "switch")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
            {/* </Link> */}
          </InfoContainer>
          <RowWrapper>
            {isMobile ? (
              <ProductItemMobile item={switches} />
            ) : (
              <ProductItem
                item={switches}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="gray">
          <InfoContainer>
            <TitleWrapper>
              <Title>Wifi</Title>
              <Hr></Hr>
              <Span></Span>
            </TitleWrapper>
            {/* <Link to={`list/network/wifi`} style={{ textDecoration: "none" }}> */}
            <LinkWrapper onClick={() => handleClick("network", "wifi")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
            {/* </Link> */}
          </InfoContainer>
          <RowWrapper>
            {/* <CategoryItem category="network" item="wifi" /> */}
            {isMobile ? (
              <ProductItemMobile item={wifi} />
            ) : (
              <ProductItem
                item={wifi}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="white">
          <InfoContainer>
            <TitleWrapper>
              <Title>Network Accessories</Title>
              <Hr></Hr>
              <Span></Span>
            </TitleWrapper>
            <LinkWrapper onClick={() => handleClick("network", "accessory")}>
              <Title className="view">View More</Title>
              <Arrow></Arrow>
              <Arrow></Arrow>
            </LinkWrapper>
          </InfoContainer>

          <RowWrapper>
            {/* <CategoryItem category="network" item="accessory" /> */}
            {isMobile ? (
              <ProductItemMobile item={networkAcce} />
            ) : (
              <ProductItem
                item={networkAcce}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            )}
          </RowWrapper>
        </Row>

        <Row className="gray">
          <InfoContainer>
            <H4>Rangoon Discount</H4>
          </InfoContainer>

          <InfoContainer>
            <Strong>We Care About Our Customers Experience Too !</Strong>
            <LinkWrapper
              className="feedback"
              style={{
                background: "#00688B",
                padding: "10px",
                borderRadius: "4px",
              }}
              onClick={() => viewTestimonial()}
            >
              <Title className="rate">View All Feedbacks</Title>
              <Arrow className="rate"></Arrow>
              <Arrow className="rate"></Arrow>
            </LinkWrapper>
          </InfoContainer>

          {/* Testimonial Carousel */}
          <TestimonialCard />

          <FeedbackBtn className="feedback" onClick={() => viewTestimonial()}>
            <Title className="rate">View All Feedbacks</Title>
            <Arrow className="rate"></Arrow>
            <Arrow className="rate"></Arrow>
          </FeedbackBtn>
        </Row>

        {/* Give Feedback Section */}
        <Row className="blue">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Leaf />
            <p style={{ padding: "0px 10px" }}>
              Please let us know your thoughts about us as we value your opinion
            </p>
            <Leaf />
          </div>

          <InfoContainer
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
            onClick={() => handleGiveFeedback()}
          >
            <LinkWrapper
              style={{
                background: "#00688B",
                padding: "10px 20px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
              }}
            >
              <Title className="feedback" style={{ color: "#fff" }}>
                Give Feedback
              </Title>
            </LinkWrapper>
          </InfoContainer>
        </Row>

        <Wrapper>
          {/* Logo section starts here */}
          <LogoContainer>
            <LOGOS src={Asus} />
            <LOGOS src={Equip} />
            <LOGOS src={Level1} />
            <LOGOS src={Ignitent} />
            <LOGOS src={Digitus} />
            <LOGOS src={Lenovo} />
            <LOGOS src={Msi} />
            <LOGOS src={MakroTik} />
            <LOGOS src={Ubiquiti} />
            <LOGOS src={Linksys} />
            <LOGOS src={Nikomax} />
            <LOGOS src={BDCOM} />
            <LOGOS src={Teltonika} />
            <LOGOS src={Edgecore} />
            <LOGOS src={RujiAndReyee} />
            <LOGOS src={Dell} />
            <LOGOS src={Remax} />
          </LogoContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default HomeDisplay;

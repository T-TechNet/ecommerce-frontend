import styled from "styled-components";
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import Carousel from "better-react-carousel";
import mobile1 from "../../assets/HomeDisplay/mobile1.jpg";
import mobile2 from "../../assets/HomeDisplay/mobile2.jpg";
import mobile3 from "../../assets/HomeDisplay/mobile3.jpg";
import mobile4 from "../../assets/HomeDisplay/mobile4.jpg";

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const block = {
  width: "92%",
  paddingBottom: "5px",
  paddingRight: "1%",
};

const ImageSliderMobile = () => {
  const MyDot = (
    { isActive } // is not going to work since there is a viewport limit on the npm package
  ) => (
    <span
      style={{
        display: "inline-block",
        marginTop: "-15px",
        marginRight: "0px",
        marginBottom: "17px",
        boxSizing: "border-box",
        width: "15px",
        height: "15px",
        backgroundColor: isActive ? "#FFFFFF" : "#B0BCC0",
        border: isActive ? "5px solid #03A89E" : "none",
        borderRadius: "50%",
      }}
    ></span>
  );
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // };
  return (
    <div
      style={{
        height: "auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Carousel
        cols={1}
        rows={1}
        // gap={20}
        loop
        showDots
        hideArrow
        containerStyle={block}
        dot={MyDot}
        autoplay={4000}
      >
        <Carousel.Item>
          <Img src={mobile1} />
        </Carousel.Item>
        <Carousel.Item>
          <Img src={mobile2} />
        </Carousel.Item>
        <Carousel.Item>
          <Img src={mobile3} />
        </Carousel.Item>
        <Carousel.Item>
          <Img src={mobile4} />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageSliderMobile;

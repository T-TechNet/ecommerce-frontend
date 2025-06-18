import React from "react";
import styled from "styled-components";
import Carousel from "better-react-carousel";
import image1 from "../../assets/HomeDisplay/desktop1.jpg";
import image2 from "../../assets/HomeDisplay/desktop2.jpg";
import image3 from "../../assets/HomeDisplay/desktop3.jpg";
import image4 from "../../assets/HomeDisplay/desktop4.jpg";

const ImgSlide = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const ImageSlider = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [autoPlay, setAutoPlay] = useState(true);
  // const [touchPosition, setTouchPosition] = useState(null);
  // let timeout = null;

  // const goToPrevious = () => {
  //   setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  // };

  // const goToNext = () => {
  //   setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  // };

  // const goToSlide = (slideIndex) => {
  //   setCurrentIndex(slideIndex);
  // };

  // useEffect(() => {
  //   timeout = autoPlay && setTimeout(() => goToNext(), 5000);
  // });

  // const handleTouchStart = (e) => {
  //   const touchDown = e.touches[0].clientX;
  //   setTouchPosition(touchDown);
  // };

  // const handleTouchMove = (e) => {
  //   const touchDown = touchPosition;

  //   if (touchDown === null) {
  //     return;
  //   }

  //   const currentTouch = e.touches[0].clientX;
  //   const diff = touchDown - currentTouch;

  //   if (diff > 5) {
  //     goToNext();
  //   }

  //   if (diff < -5) {
  //     goToPrevious();
  //   }

  //   setTouchPosition(null);
  // };

  const block = {
    paddingBottom: "25px",
    width: "100%",
  };

  const MyDot = ({ isActive }) => (
    <span
      style={{
        marginTop: "-30px",
        boxSizing: "border-box",
        width: "15px",
        height: "15px",
        backgroundColor: isActive ? "#FFFFFF" : "#B0BCC0",
        border: isActive ? "5px solid #03A89E" : "none",
        borderRadius: "50%",
      }}
    ></span>
  );

  return (
    <ImgSlide>
      <Carousel
        cols={2}
        rows={1}
        gap={20}
        loop
        showDots
        hideArrow
        containerStyle={block}
        dot={MyDot}
        autoplay={4000}
      >
        <Carousel.Item>
          <Img src={image1} />
        </Carousel.Item>
        <Carousel.Item>
          <Img src={image2} />
        </Carousel.Item>
        <Carousel.Item>
          <Img src={image3} />
        </Carousel.Item>
        <Carousel.Item>
          <Img src={image4} />
        </Carousel.Item>
      </Carousel>
    </ImgSlide>
  );
};

export default ImageSlider;

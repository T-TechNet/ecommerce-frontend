import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  height: 100%;
  width: 100%;
  
`;

const ArrowContainer = styled.button`
 border-radius: 50%;
 background-color: white;

`;

const LeftArrow = styled(ArrowLeftOutlinedIcon)`
  position: absolute;
  top: 50%;
  left: 60px;
  transform: translateY(-50%);
  color: #00688B;
  cursor: pointer;
  border-radius: 25%;
  background-color: #ffffffcf;
`;

const RightArrow = styled(ArrowRightOutlinedIcon)`
  position: absolute;
  top: 50%;
  right: 60px;
  transform: translateY(-50%);
  color: #00688B;
  cursor: pointer;
  border-radius: 25%;
   background-color: #ffffffcf;
`;


const LargeImageContainer = styled.div`
  border: 1px solid #bfc9cc;
  padding: 20px;
  width: 380px;
  height: 320px;
  border-radius: 8px;
  /* object-fit: cover; */
  object-position: center;
  cursor: pointer;
  /*dee added*/
 position: relative;
`;

const LargeImage = styled.img`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: contain;
  cursor: pointer;
`;

const SmallImages = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  scrollbar-width: thin;
  margin: 20px 0;
`;

const SmallImage = styled.img`
  height: 60px;
  width: 60px;
  padding: 10px;
  object-fit: contain;
  margin: 0 10px;
  border: ${(props) =>
    props.className === "active" ? "2px solid #6BA7BC" : "1px solid #dee3e5"};
  border-radius: 8px;
  cursor: pointer;

  /* &:hover {
    border: 2px solid #2496c4;
  } */
`;

const FullImageContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.className ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  animation: fade-in linear 250ms forwards;
  z-index: 1;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
  }
`;
const Square = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  @media only screen and (max-width: 1200px) {
    width: 60%;
  }

  @media only screen and (max-width: 900px) {
    width: 70%;
  }

  @media only screen and (max-width: 759px) {
    width: 90%;
  }
`;

const FullImage = styled.img`
  position: absolute;
  height: 90%;
  width: 100%;
  object-fit: contain;
  
`;



const Tag = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background-color: #cc0000;
  padding: 3px 7px;
  border: 0.1px solid #cc0000;
  border-radius: 4px;
`;

const ArrowStyles = {
  fontSize: "50px",
}



const ProductImageSlider = ({ product }) => {
  let imgArr = [];

  product.image.map((i) => {
    imgArr.push({
      url: `${i}`,
      title: '',
    });
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageModal, setImageModal] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setImageModal(false);
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imgArr.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imgArr.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleCloseModal = (e) => {
    if (e.target === containerRef.current) {
      // Check if the click event originated from the background element
      setImageModal(false);
    }
  };

  if (imageModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return (
    <Container>
      <FullImageContainer
        className={imageModal ? 'active' : ''}
        onClick={handleCloseModal}
        ref={containerRef}
      >
        <ArrowContainer onClick={goToPrevious}>
          <LeftArrow style={ArrowStyles}/>
        </ArrowContainer>
        <Square>
          <FullImage
            src={imgArr[currentIndex].url}
            onClick={(e) => e.stopPropagation()}
            isVisible={imageModal}
          />
        </Square>
        <ArrowContainer onClick={goToNext}>
          <RightArrow style={ArrowStyles}/>
        </ArrowContainer>
      </FullImageContainer>
      {/* {product.discount > 0 && <Tag>- {product.discount}%</Tag>} */}

      <LargeImageContainer>
      <LargeImage src={imgArr[currentIndex].url} onClick={() => setImageModal(true)} />
      {product.discount > 0 && <Tag>- {product.discount}%</Tag>}
      </LargeImageContainer>

      <SmallImages>
        {imgArr.map((slide, slideIndex) => (
          <SmallImage
            key={slideIndex}
            src={slide.url}
            onClick={() => goToSlide(slideIndex)}
            className={slideIndex === currentIndex ? 'active' : ''}
          />
        ))}
      </SmallImages>
    </Container>
  );
};

export default ProductImageSlider;
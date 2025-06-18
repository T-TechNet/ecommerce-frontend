import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToDbWishlist } from "../../utility/wishlist";

const Container = styled.div`
  // @media screen and (max-width: 759px) {
  //   position: relative;
  //   display: flex;
  //   flex: 1;
  //   flex-direction: column;
  //   justify-content: flex-start;
  //   align-items: center;
  //   height: 100%;
  //   width: 100%;
  // }
  @media screen and (max-width: 769px) {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;

const LargeImage = styled.img`
  @media screen and (max-width: 769px) {
    border: 1px solid #bfc9cc;
    padding: 20px;
    border-radius: 8px;
    object-fit: contain;
    object-position: center;
    cursor: pointer;
    width: 300px;
    height: 300px;
    transition: opacity 0.2s ease-in-out;
    opacity: ${(props) => (props.isVisible ? "1" : "0")};
  }
`;

const SmallImages = styled.div`
  @media screen and (max-width: 769px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    scrollbar-width: thin;
    margin: 20px 0;
    gap: 20px;
  }
`;

const Dot = styled.div`
  @media screen and (max-width: 769px) {
    width: 15px;
    height: 15px;
    box-sizing: border-box;
    background-color: ${(props) => (props.isActive ? "#FFFFFF" : "#B0BCC0")};
    border: ${(props) => (props.isActive ? "5px solid #03A89E" : "none")};
    border-radius: 50%;
    cursor: pointer;
  }
`;

const FullImageContainer = styled.div`
  @media screen and (max-width: 769px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: ${(props) => (props.className ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    z-index: 1;
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

  @media only screen and (max-width: 769px) {
    width: 85%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FullImage = styled.img`
  @media screen and (max-width: 769px) {
    position: absolute;
    height: 90%;
    width: 100%;
    transition: 0.2s ease-in-out;
    opacity: ${(props) => (props.isVisible ? "1" : "0")};
  }
`;

const Fav = styled.div`
  position: absolute;
  top: 15px;
  right: 18px;
  color: #000000;
  border-radius: 50%;
  padding: 8px 8px 4px 8px;
  opacity: 1;
  border-radius: 50%;
`;

const Fav2 = styled.div`
  position: absolute;
  top: 15px;
  right: 18px;
  padding: 8px 8px 4px 8px;
  color: #ffffff;
  background-color: #cc0000;
  border-radius: 50%;
`;

const Tag = styled.div`
  @media screen and (max-width: 769px) {
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    background-color: #cc0000;
    padding: 3px 7px;
    border: 0.1px solid #cc0000;
    border-radius: 4px;
  }
`;

const ProductImageSlider = ({ product, wishList, handleWishList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageModal, setImageModal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const startX = useRef(null);
  const startY = useRef(null);
  const [imageVisible, setImageVisible] = useState(true);
  let imgArr = [];
  let wishListExist;
  const imageTimerRef = useRef(null); // Reference to the setTimeout timer

  product.image.map((i) => {
    imgArr.push({
      url: `${i}`,
      title: "",
    });
  });

  const checkWishList = (id) => {
    wishListExist = undefined;
    let temp = wishList.find((w) => w._id === id);
    if (temp !== undefined) {
      wishListExist = temp;
    }
  };

  useEffect(() => {
    setImageVisible(true); // Show the first image immediately

    return () => {
      clearTimeout(imageTimerRef.current); // Clear any pending timers
    };
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setImageVisible(true);
    }, 500); // Delay of 500ms (0.5 seconds)

    return () => clearTimeout(delay);
  }, []);

  const goToPrevious = () => {
    setImageVisible(false); // Hide the current image

    imageTimerRef.current = setTimeout(() => {
      setCurrentIndex(
        currentIndex === 0 ? product.image.length - 1 : currentIndex - 1
      );
      setImageVisible(true); // Show the new image after a delay
    }, 200); // Delay of 1 second for the fade-out animation
  };

  const goToNext = () => {
    setImageVisible(false); // Hide the current image

    imageTimerRef.current = setTimeout(() => {
      setCurrentIndex(
        currentIndex === product.image.length - 1 ? 0 : currentIndex + 1
      );
      setImageVisible(true); // Show the new image after a delay
    }, 200); // Delay of 1 second for the fade-out animation
  };

  const goToSlide = (slideIndex) => {
    setImageVisible(false); // Hide the current image

    imageTimerRef.current = setTimeout(() => {
      setCurrentIndex(slideIndex);
      setImageVisible(true); // Show the new image after a delay
    }, 200); // Delay of 1 second for the fade-out animation
  };

  const handleSwipe = (deltaX) => {
    if (deltaX > 0) {
      goToPrevious();
    } else if (deltaX < 0) {
      goToNext();
    }
  };

  if (imageModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  const addtoWishList = (product, count) => {
    const user = JSON.parse(localStorage.getItem("user"));

    handleWishList(product, count);
    if (user) {
      addToDbWishlist(product, count);
    }
    setIsClicked(!isClicked); // Toggle the clicked state
  };

  return (
    <Container>
      <FullImageContainer
        className={imageModal ? "show" : ""}
        onClick={() => setImageModal(false)}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          startX.current = touch.clientX;
          startY.current = touch.clientY;
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          const deltaX = touch.clientX - startX.current;
          const deltaY = touch.clientY - startY.current;

          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
          }
        }}
        onTouchEnd={(e) => {
          const touch = e.changedTouches[0];
          const deltaX = touch.clientX - startX.current;
          const deltaY = touch.clientY - startY.current;

          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            handleSwipe(deltaX);
          }
        }}
      >
        <Square>
          <FullImage
            src={imgArr[currentIndex].url}
            isVisible={imageVisible}
            onClick={(e) => e.stopPropagation()}
          />
        </Square>
      </FullImageContainer>
      {product.discount > 0 && <Tag>- {product.discount}%</Tag>}
      {checkWishList(product._id)}
      {wishListExist ? (
        <Fav2>
          <FavoriteIcon onClick={() => addtoWishList(product, -1)} />
        </Fav2>
      ) : (
        <Fav>
          <FavoriteBorderIcon onClick={() => addtoWishList(product, 1)} />
        </Fav>
      )}
      <LargeImage
        src={imgArr[currentIndex].url}
        isVisible={imageVisible}
        onClick={() => setImageModal(true)}
        //  It captures the initial touch position by accessing the coordinates of the first touch event
        // The startX and startY variables are updated with these coordinates, representing the starting position of the touch gesture.
        onTouchStart={(e) => {
          const touch = e.touches[0];
          startX.current = touch.clientX;
          startY.current = touch.clientY;
        }}
        // calculates the horizontal (deltaX) and vertical (deltaY) distances traveled by subtracting the starting touch position from the current touch position.
        // If the horizontal distance is greater than the vertical distance, it means the user is swipinghorizontally.
        // In such cases, the e.preventDefault() function is called to prevent scrolling or other default touch behaviors.
        onTouchMove={(e) => {
          const touch = e.touches[0];
          const deltaX = touch.clientX - startX.current;
          const deltaY = touch.clientY - startY.current;
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
          }
        }}
        // This event is triggered when the user removes their finger from the screen after touching.
        // It calculates the final horizontal and vertical distances (deltaX and deltaY) in a similar manner as onTouchMove.
        onTouchEnd={(e) => {
          const touch = e.changedTouches[0];
          const deltaX = touch.clientX - startX.current;
          const deltaY = touch.clientY - startY.current;

          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            handleSwipe(deltaX);
          }
        }}
      />
      <SmallImages>
        {product.image.map((slide, slideIndex) => (
          <Dot
            key={slideIndex}
            isActive={slideIndex === currentIndex}
            onClick={() => goToSlide(slideIndex)}
          />
        ))}
      </SmallImages>
    </Container>
  );
};

export default ProductImageSlider;

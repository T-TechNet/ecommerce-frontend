import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TestCarousel.css";
import { getTestimonial } from "../../utility/testimonial";
import Quote from "./Quote";
import Star from "./Star";

const Card = styled.div`
  width: 95%;
  border-radius: 10px 10px 10px 10px;
  background: #e6f0f3;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 7px solid #03a89e;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #758a91;
  border: 1px solid #fff;
  color: #fff;
  margin: 0px 10px;

  @media screen and (max-width: 769px) {
    display: none;
  }
`;

const TestimonialCard = () => {
  const [TestimonialData, setTestimonialData] = useState([]);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://graph.facebook.com/v17.0/108621082024465/ratings?access_token=3554207284898457|519a6d98fef92e7aef3af2b1edf8ee05`
  //       );

  //       console.log("fetching", response);

  //       if (response.data && response.data.data) {
  //         setReviews(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching reviews:", error);
  //     }
  //   };

  //   fetchReviews();
  // }, []);

  useEffect(() => {
    const myPromise = getTestimonial(); // fetching testimonials from database;

    myPromise
      .then((result) => {
        setTestimonialData(result);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const renderStars = (numOfRate) => {
    const stars = [];

    for (let i = 1; i <= numOfRate; i++) {
      stars.push(<Star type="single" key={i} />);
    }

    return stars;
  };

  // react slick carousel start
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    draggable: true, // Enable draggable
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          draggable: true, // Enable draggable
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          draggable: true, // Enable draggable
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          draggable: true, // Enable draggable
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          draggable: true, // Enable draggable
          swipeToSlide: true,
        },
      },
    ],
  };

  // testing react slick carousel end
  return (
    <>
      <div
        style={{
          zIndex: "4",
          width: "100%",
          maxHeight: "200px",
          marginTop: "10px",
          display: "inline-block",
        }}
      >
        <Slider ref={sliderRef} {...settings}>
          {TestimonialData.map((data, index) => (
            <div
              key={index}
              className="card"
              current={index === 0 ? "true" : undefined}
            >
              <Card>
                {/* quote svg */}
                <Quote />

                <p>{data.name}</p>

                {/* function for rendering stars */}
                {renderStars(data.rating)}

                <p>{data.review}</p>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button className="button" onClick={previous}>
          <ChevronLeftIcon />
        </Button>
        <Button className="button" onClick={next}>
          <ChevronRightIcon />
        </Button>
      </div>
    </>
  );
};

export default TestimonialCard;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getTestimonial } from "../../utility/testimonial";
import { Link } from "react-router-dom";
import FeedbackDialog from "../Feedback/FeedbackDialog";

const Container = styled.div``;
const Wrapper = styled.div`

display: ${props => props.className === 'card' ? 'flex' : ''};

`;

const Progress = styled.div`
  width: 70%;
  height: 16px;
  border-radius: 2px;
  background: #dee3e5;
  display: inline-block;
  position: relative;

  @media screen and (min-width: 600px) {
    width: 80%;
  }

  &::after {
    content: "";
    width: ${(props) => props.percent || 0}%;
    height: 100%;
    background-color: ${(props) => props.color || "#03a89e"};
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 2px;
    transition: width 0.3s ease; /* Add a smooth transition for width */
  }
`;
const Rating = styled.p`
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
const RatingDiv = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const RateSpace = styled.div`
  display: inline-block;
  //   margin-left: 20px;
  width: ${(props) => (props.className === "rate" ? "10%" : "14%")};
  @media screen and (max-width: 500px) {
    width: ${(props) => (props.className === "rate" ? "10px" : "50px")};
    margin-left: 5px;
  }
  @media screen and (min-width: 400px) and (max-width: 500px) {
    margin-left: 10px;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ReviewBtn = styled.div`
  width: fit-content;
  background: ${(props) => (props.className === "see" ? "#fff" : "#00688b")};
  color: ${(props) => (props.className === "see" ? "#00688b" : "#fff")};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #94a4aa;
  margin: 0px 15px 0px 20px;
  @media screen and (max-width: 800px) {
    font-size: 15px;
  }
  @media screen and (max-width: 769px) {
    width: 100%;
    padding: 10px 0px;

    margin: 20px;
  }
`;
const Card = styled.div`
min-width: 80%;
height: fit-content;
  
  border-radius: 8px;
  border: 1px solid #DEE3E5;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.16);
  padding: 20px 10px;
 
`;
const Div = styled.div`
display:flex;
overflow-x: scroll;
gap:15px;

/* Hide the scrollbar */
scrollbar-width: none; /* Firefox */
-ms-overflow-style: none; /* Internet Explorer */

/* Webkit (Safari/Chrome) scrollbar */
&::-webkit-scrollbar {
  width: 0.2rem; /* You can adjust the width as needed */
}

&::-webkit-scrollbar-track {
  background: transparent; /* This is to hide the scrollbar track */
}

&::-webkit-scrollbar-thumb {
  background: transparent; /* This is to hide the scrollbar thumb */
}
`;
const Dialog = styled.div`
  @media screen and (max-width: 769px) {
    display: none;
  }
`;
const ProductReviewMobile = () => {
  const [TestimonialData, setTestimonialData] = useState([]);
  const [averageRating, setAverageRating] = useState();
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState(false);

  const renderAverageStars = () => {
    const stars = [];

    for (let i = 1; i <= Math.floor(averageRating); i++) {
      stars.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          key={i}
        >
          <path
            d="M13.9987 20.7315L21.2087 25.0832L19.2954 16.8815L25.6654 11.3632L17.277 10.6515L13.9987 2.9165L10.7204 10.6515L2.33203 11.3632L8.70203 16.8815L6.7887 25.0832L13.9987 20.7315Z"
            fill="#FF9C2B"
          />
        </svg>
      );
    }

    return stars;
  };

  const renderStars = (numOfRate) => {
    const stars = [];

    for (let i = 1; i <= numOfRate; i++) {
      stars.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          key={i}
        >
          <g clipPath="url(#clip0_214_1141)">
            <path
              d="M9.62016 6.66671L8.00016 1.33337L6.38016 6.66671H1.3335L5.4535 9.60671L3.88683 14.6667L8.00016 11.54L12.1202 14.6667L10.5535 9.60671L14.6668 6.66671H9.62016Z"
              fill="#FF9C2B"
            />
          </g>
          <defs>
            <clipPath id="clip0_214_1141">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    }

    return stars;
  };

  const showAllRatingPercents = () => {
    const ratings = [];

    const calculatePercent = (i) => {
      const rating = TestimonialData.filter((r) => r.rating === i);

      const percent = (rating.length * 100) / TestimonialData.length;

      return Math.round(percent);
    };

    for (let i = 5; i >= 1; i--) {
      ratings.push(
        <RatingDiv key={i}>
          <RateSpace>
            <Rating>
              {i} {i === 1 ? "Star" : "Stars"}
            </Rating>
          </RateSpace>
          <Progress percent={calculatePercent(i)}></Progress>
          <RateSpace className="rate">
            <Rating>{calculatePercent(i)}%</Rating>
          </RateSpace>
        </RatingDiv>
      );
    }

    return ratings;
  };
  useEffect(() => {
    const myPromise = getTestimonial(); // fetching testimonials from database;

    myPromise
      .then((result) => {
        setTestimonialData(result);
        if (Array.isArray(result)) {
          const sumOfRatings = result.reduce((a, b) => a + b.rating, 0);

          const avg = sumOfRatings / result.length;

          setAverageRating(avg);
        } else {
          console.error("The PromiseResult is not an array.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const handleGiveFeedback = (e) => {
    e.preventDefault();
    setFeedback(true);
    setOpen(!open);
  };
  return (
    <Container>
      {/* for desktop */}
      <Dialog>
        <FeedbackDialog feedback={feedback} setFeedback={setFeedback} />
      </Dialog>

      <Wrapper>
        <div
          style={{
            marginTop: "5px",
            marginBottom: "15px",
          }}
        >
          <strong>{averageRating && averageRating.toFixed(1)}</strong> out of{" "}
          <strong>5</strong>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {renderAverageStars()}
          <div style={{ margin: "0 5px" }}>
            ({TestimonialData.length} reviews)
          </div>
        </div>

        {showAllRatingPercents()}
      </Wrapper>
      <Wrapper className="card" >
        <Div >
        {TestimonialData.slice(0, 6).map((data, index) => (
        
          <Card key={data._id}>
            <span style={{ fontWeight: "bold", color: "#000" }}>
              {data.name}
            </span>
            <br></br>
            <span
              style={{ fontSize: "13px", color: "#758A91" }}
            >
              17th April, 2023
            </span>
            <span>|</span>
            <span
              style={{ color: "#007E33", fontSize: "14px", marginLeft: "10px" }}
            >
              Verified Purchaser
            </span>

            <div
              style={{
                marginTop: "3px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              {renderStars(data.rating)}
              <span style={{ marginLeft: "20px", fontSize: "13px" }}>
                {data.rating} stars
              </span>
            </div>

            <p
              style={{ marginTop: "10px", color: "#000", fontWeight: "normal" }}
            >
              {data.review}
            </p>
          </Card>
          
        ))}
        </Div>
      </Wrapper>
      <BtnDiv>
        <ReviewBtn className="see">See all reviews</ReviewBtn>

        <ReviewBtn className="write" onClick={(e) => handleGiveFeedback(e)}>
          Write a review
        </ReviewBtn>
      </BtnDiv>
    </Container>
  );
};

export default ProductReviewMobile;

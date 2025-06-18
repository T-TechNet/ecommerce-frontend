import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ArrowRightSharp from "@mui/icons-material/ArrowRightSharp";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import FeedbackDialog from "../components/Feedback/FeedbackDialog";
import FeedbackPopup from "../components/Feedback/FeedbackPopup";
import Overlay from "../components/Categories/Overlay";
import { getTestimonial } from "../utility/testimonial";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Arrow from "../components/Feedback/Arrow";
import Star from "../components/Feedback/Star";
import Quote from "../components/Feedback/Quote";
import "../css/snackbar.css";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Path = styled.div`
  margin-top: 20px;
  width: 1140px;
  display: flex;
  align-self: flex-start;

  @media screen and (max-width: 1204px) {
    width: 100%;
    gap: 10px;
    padding: 0px 25px;
  }
`;
const Pathname = styled.p`
  color: ${(props) => (props.className === "green" ? "#03a89e" : "#758a91")};
  font-weight: ${(props) => (props.className === "green" ? "700" : "400")};
`;

const Wrapper = styled.div`
  margin-top: 10px;
  width: 1140px;
  display: flex;

  @media screen and (max-width: 1204px) {
    width: 100%;
    gap: 10px;
  }

  @media screen and (max-width: 769px) {
    flex-direction: column;
  }
`;
const Div = styled.div`
  width: 50%;
  padding: ${(props) => (props.className === "right" ? null : "0px 25px")};

  box-shadow: ${(props) =>
    props.className === "right" ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : null};
  border-radius: ${(props) => (props.className === "right" ? "8px" : null)};
  @media screen and (min-width: 1204px) {
    padding: 10px 0px;
  }

  @media screen and (min-width: 900px) and (max-width: 1204px) {
    margin-right: 20px;
  }
  @media screen and (max-width: 769px) {
    width: 90%;
    margin-left: ${(props) => (props.className === "right" ? "25px" : null)};
  }
  margin-top: 20px;
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
const Hr = styled.hr`
  border: none;
  height: 3px;
  background-image: linear-gradient(to right, #03a89e, #00688b);
  width: 120px;
  @media only screen and (max-width: 759px) {
    display: none;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const FeedbackBtn = styled.div`
  width: fit-content;
  background: #00688b;
  color: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  font-weight: bold;
  cursor: pointer;

  @media screen and (max-width: 769px) {
    width: 100%;
    padding: 10px 0px;
  }
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

const Card = styled.div`
  width: 24%;
  border-radius: 10px 10px 10px 10px;
  background: #e6f0f3;
  border-bottom: 7px solid #03a89e;
  box-sizing: border-box;
  background-color: #f0f0f0;
  padding: 18px;

  @media screen and (min-width: 769px) and (max-width: 900px) {
    width: 33%;
  }

  @media screen and (max-width: 769px) {
    width: 97%;
  }
`;

const StackDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 769px) {
    width: 100%;
    padding-bottom: 30px;
  }
`;
const Wrap = styled.div`
  width: 100%;
`;
const TestimonialDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap; /* Wrap by height */
  max-height: 1100px; /* Specify the maximum height as needed */
  max-width: 100%;
  margin: 20px 0;

  @media screen and (max-width: 1204px) {
    padding: 20px;
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
  margin-left: 20px;
  width: ${(props) => (props.className === "rate" ? "6%" : "14%")};

  @media screen and (max-width: 500px) {
    width: ${(props) => (props.className === "rate" ? "10px" : "50px")};
    margin-left: 5px;
  }

  @media screen and (min-width: 400px) and (max-width: 500px) {
    margin-left: 10px;
  }
`;
const TestimonialContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-left: 25px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1204px) {
    margin-left: 0px;
  }
`;
const FeedbackContainer = styled.div`
  width: 100%;
  margin-left: 25px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1204px) {
    width: 100%;
    margin-left: 0px;
  }
`;
const PathContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 25px;

  @media screen and (max-width: 1204px) {
    margin-left: 0px;
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Testimonial = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page"));
  const [feedback, setFeedback] = useState(false);
  const [averageRating, setAverageRating] = useState();

  const [TestimonialData, setTestimonialData] = useState([]);

  const [success, setSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false); // close the snackbar
  };

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
    setPage(value);
  };

  const handleGiveFeedback = (e, product, count) => {
    e.preventDefault();
    setFeedback(true);
    setOpen(!open);
  };

  const renderStars = (numOfRate, type) => {
    const stars = [];

    for (let i = 1; i <= Math.floor(numOfRate); i++) {
      stars.push(<Star type={type} key={i} index={i} />);
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

  return (
    <Container>
      {/* for desktop */}
      <Dialog>
        <FeedbackDialog feedback={feedback} setFeedback={setFeedback} />
      </Dialog>
      {/* for mobile */}
      <Popup>
        <Overlay open={open} setOpen={setOpen} />
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
        <FeedbackPopup setSuccess={setSuccess} open={open} setOpen={setOpen} />
      </Popup>

      <Wrap
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PathContainer style={{}}>
          <Path>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Pathname>Home</Pathname>
            </Link>
            <ArrowRightSharp />

            <Pathname className={"green"}>Customers' Feedbacks</Pathname>
          </Path>
        </PathContainer>

        <FeedbackContainer>
          <Wrapper>
            <Div>
              <strong style={{ fontSize: "20px" }}>
                We Care About Our Customers Experience Too !
              </strong>
              <br />
              <TitleWrapper style={{ margin: "20px 0px" }}>
                <span style={{ marginRight: "10px" }}>About </span>
                <span style={{ color: "#03A89E" }}>Rangoon Discount</span>
                <Hr style={{ marginLeft: "10px" }}></Hr>
                <Span></Span>
              </TitleWrapper>

              <div style={{ marginBottom: "20px", display: "flex" }}>
                <Arrow />
                <span style={{ marginLeft: "10px" }}>
                  Not just hear from us, hear from the other customers too.
                </span>
              </div>

              <div style={{ marginBottom: "20px", display: "flex" }}>
                <Arrow />
                <span style={{ marginLeft: "10px" }}>
                  Read {TestimonialData.length} reviews from the other customers
                  how they see us.
                </span>
              </div>

              <div style={{ marginBottom: "20px", display: "flex" }}>
                <Arrow />
                <span style={{ marginLeft: "10px" }}>
                  Please let us know your thoughts. It would be much
                  appreciated!
                </span>
              </div>

              <FeedbackBtn onClick={(e) => handleGiveFeedback(e)}>
                Give Feedback
              </FeedbackBtn>
            </Div>

            <Div className="right">
              <div
                style={{
                  marginLeft: "20px",
                  marginTop: "5px",
                  marginBottom: "15px",
                }}
              >
                <strong>{averageRating && averageRating.toFixed(1)}</strong> out
                of <strong>5</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  marginLeft: "15px",
                }}
              >
                {renderStars(averageRating, "average")}

                <div style={{ margin: "0 5px" }}>
                  ({TestimonialData.length} reviews)
                </div>
              </div>

              {showAllRatingPercents()}
            </Div>
          </Wrapper>
        </FeedbackContainer>

        <TestimonialContainer>
          <Wrapper>
            <TestimonialDiv>
              {TestimonialData.map((data, index) => (
                <Card key={data._id}>
                  <Quote />

                  <p>{data.name}</p>
                  {renderStars(data.rating, "single")}
                  <p>{data.review}</p>
                </Card>
              ))}
            </TestimonialDiv>
          </Wrapper>
        </TestimonialContainer>
        {/* <StackDiv>
          <Pagination count={10} page={page} onChange={handlePageChange} />
        </StackDiv> */}
      </Wrap>
    </Container>
  );
};

export default Testimonial;

import React, { useState } from "react";
import "../Categories/bottomsheet.css";
import "../../css/snackbar.css";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { publicRequest } from "../../requestMethods";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 5px;
`;

const Nav = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 759px) {
    gap: 20px;
    flex-direction: ${(props) => props.className === "button" && "column"};
    align-items: ${(props) => props.className === "button" && "flex-start"};
  }
`;

const Input = styled.input`
  width: 60%;
  border: 1px solid #b0bcc0;
  border-radius: 4px;
  margin: 5px 0;
  padding: 8px 10px;
  font-weight: 400;
  font-size: 16px;
  color: #002734;

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 400px) {
    width: 93%;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 759px) {
    gap: ${(props) => props.className === "button" && "15px"};
    align-items: flex-start;
    width: ${(props) => props.className === "button" && "100%"};
    flex-direction: ${(props) =>
      props.className === "button" && "column-reverse"};
  }
`;
const Header = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #002734;
`;

const Button1 = styled.button`
  width: 100%;
  padding: 16px 32px;
  background: ${(props) =>
    props.className === "active" ? "#00688b" : "#B0BCC0"};
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  cursor: ${(props) => props.className === "active" && "pointer"};

  &:hover {
    background: ${(props) =>
      props.className === "active" ? "#2b829f" : "#B0BCC0"};
    box-shadow: ${(props) =>
      props.className === "active" && "0px 1px 2px rgba(0, 0, 0, 0.3)"};
    transform: ${(props) =>
      props.className === "active" && "translate(-0.5px, 0.5px)"};
  }
`;
const Div = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
`;
const PlaceHolder = styled.div`
  position: absolute;
  top: 30px;
  left: 20px;
  pointer-events: none;
  transition: 0.3s;

  font-weight: 400;
  font-size: 16px;
  color: #4a666f;
  background-color: #fff;
`;
const TextArea = styled.textarea`
  border: 1px solid #b0bcc0;
  border-radius: 4px;
  width: 95%;
  margin: 15px 0;
  padding: 15px 10px;
  font-weight: 400;
  font-size: 16px;
  color: #002734;

  &:focus {
    outline: none;
    border: 2px solid #00688b;
  }

  &:focus + ${PlaceHolder} {
    top: 7px;
    left: 10px;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: #00688b;
    padding: 0 3px;
    margin: 0 5px;
  }
`;

const Count = styled.div`
  margin: 0 15px 10px 15px;
  color: #577079;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

const FeedbackPopup = ({ setSuccess, open, setOpen }) => {
  const items = [1, 2, 3, 4, 5];
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [textValue, setTextValue] = useState("");
  const maxLength = 500;

  const form = name && rating && textValue;

  const handleTextareaChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      setTextValue(e.target.value);
    }
  };

  // setting state with clicked star
  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const submitFeedback = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    const userId = user ? user._id : "";

    const data = {
      name: name,
      userId: userId,
      rating: rating,
      review: textValue,
    };

    // submitting review to server
    await publicRequest
      .post("/testimonials", data)
      .then((res) => {
        setName("");
        setRating("");
        setTextValue("");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    open && (
      <Container className={`feedback-bottomSheet ${open ? "open" : ""}`}>
        <Wrapper>
          <Nav>
            <Header>Let us know your thought !</Header>

            <ButtonBox onClick={() => setOpen(false)}>
              <CloseIcon />
            </ButtonBox>
          </Nav>
          <br />

          <strong style={{ color: "#00688b" }}>Your Name</strong>
          <br />
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />

          <strong style={{ color: "#00688b" }}>Rating</strong>
          <br />
          {items.map((value, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              onClick={() => handleStarClick(value)}
            >
              <path
                d="M13.9987 20.7315L21.2087 25.0832L19.2954 16.8815L25.6654 11.3632L17.277 10.6515L13.9987 2.9165L10.7204 10.6515L2.33203 11.3632L8.70203 16.8815L6.7887 25.0832L13.9987 20.7315Z"
                fill={value <= rating ? "#FF9C2B" : "#DEE3E5"}
              />
            </svg>
          ))}
          <Div className="feedback-popup">
            <TextArea
              rows="4"
              cols="50"
              value={textValue}
              onChange={(e) => handleTextareaChange(e)}
            />
            <PlaceHolder className={textValue && "filled"}>
              Write your feedback here
            </PlaceHolder>
          </Div>
          <Count>
            {textValue.length}/{maxLength}
          </Count>
          <Nav className="button">
            <Button1
              className={form && "active"}
              disabled={!form}
              onClick={(e) => submitFeedback(e)}
            >
              Submit Feedback
            </Button1>
          </Nav>
        </Wrapper>
      </Container>
    )
  );
};

export default FeedbackPopup;

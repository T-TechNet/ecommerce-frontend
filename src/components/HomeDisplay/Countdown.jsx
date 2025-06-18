import React from "react";
import styled from "styled-components";
import CountdownTimer from "react-countdown";

const TimerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
`;

const Title = styled.p`
  font-size: 40px;
  text-align: center;
  font-family: "Gill Sans", sans-serif;

  animation: colorChange 3s infinite;

  @media screen and (max-width: 920px) {
    font-size: 30px;
  }

  @media screen and (max-width: 769px) {
    width: 100%;
  }

  @media screen and (max-width: 540px) {
    font-size: 28px;
  }

  @media screen and (max-width: 330px) {
    font-size: 25px;
  }

  @keyframes colorChange {
    0% {
      color: #e6c300;
    }
    50% {
      color: #ffa500;
    }
    100% {
      color: #e6c300;
    }
  }
`;

const BlockContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media screen and (max-width: 920px) {
    width: 80%;
    gap: 10px;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Plate = styled.div`
  background-image: linear-gradient(to bottom, #ffd700, #60c5c1);
  padding: 10px 12px;
  border-radius: 4px;
  font-weight: 700;
  font-family: Inter, sans-serif;
  font-size: 32px;
  letter-spacing: 1.28px;

  @media screen and (max-width: 920px) {
    font-size: 25px;
    padding: 11px 13px;
  }

  @media screen and (max-width: 540px) {
    font-size: 22px;
  }

  @media screen and (max-width: 330px) {
    font-size: 20px;
    padding: 10px 12px;
  }
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #000;
  text-align: left;

  @media screen and (max-width: 1100px) {
    font-size: 14px;
  }
`;

const Countdown = ({ setDisplay, salesInfo }) => {
  const targetDate = new Date(salesInfo && salesInfo.endDate).getTime();

  const Completionist = () => (
    <Label style={{ fontSize: "20px" }}>Sales Ended!</Label>
  );

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setDisplay(false);
      return <Completionist />;
    } else {
      return (
        <BlockContainer>
          <Block>
            <Label>Days</Label>
            <Plate>{days < 10 ? `0${days}` : days}</Plate>
          </Block>
          <span style={{ marginBottom: "-18px", fontSize: "20px" }}>:</span>
          <Block>
            <Label>Hours</Label>
            <Plate>{hours < 10 ? `0${hours}` : hours}</Plate>
          </Block>
          <span style={{ marginBottom: "-18px", fontSize: "20px" }}>:</span>
          <Block>
            <Label>Mins</Label>
            <Plate>{minutes < 10 ? `0${minutes}` : minutes}</Plate>
          </Block>
          <span style={{ marginBottom: "-18px", fontSize: "20px" }}>:</span>
          <Block>
            <Label>Secs</Label>
            <Plate>{seconds < 10 ? `0${seconds}` : seconds}</Plate>
          </Block>
        </BlockContainer>
      );
    }
  };

  return salesInfo ? (
    <TimerDiv>
      <Title>{salesInfo.name}</Title>
      <CountdownTimer date={targetDate} renderer={renderer} />
    </TimerDiv>
  ) : (
    <></>
  );
};

export default Countdown;

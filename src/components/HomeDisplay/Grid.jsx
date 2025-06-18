import React from "react";
import styled from "styled-components";
import Countdown from "react-countdown";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 20px;

  width: 70%;
  padding: 30px 10px;
  margin-bottom: 30px;

  @media screen and (max-width: 1247px) {
    width: 90%;
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
  }

  @media screen and (max-width: 1100px) {
    width: 90%;
  }

  @media screen and (max-width: 769px) {
    flex-direction: column;
    gap: 20px;
    padding: 10px;
  }
`;

const CountContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media screen and (max-width: 769px) {
    width: 100%;
    gap: 10px;
  }
`;

const Title = styled.p`
  font-size: 40px;
  /* color: #ffcc00; */
  text-align: center;
  font-family: "Gill Sans", sans-serif;

  animation: colorChange 3s infinite;

  @media screen and (max-width: 920px) {
    font-size: 30px;
  }

  @media screen and (max-width: 769px) {
    width: 100%;
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

const TimerDiv = styled.div`
  display: flex;
  justify-content: center;
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

  @media screen and (max-width: 830px) {
    width: 80%;
    gap: 10px;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Plate = styled.div`
  background-image: linear-gradient(to bottom, #ffe073, #60c5c1);
  padding: 15px 20px;
  border-radius: 4px;
  font-size: 40px;

  @media screen and (max-width: 1100px) {
    font-size: 35px;
    padding: 12px 17px;
  }

  @media screen and (max-width: 1000px) {
    padding: 10px 15px;
  }

  @media screen and (max-width: 920px) {
    font-size: 25px;
    padding: 11px 16px;
  }
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;

  @media screen and (max-width: 1100px) {
    font-size: 14px;
  }
`;

const GridContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-gap: 20px 0px; */
  width: fit-content;
  margin: 0 auto;
`;

const Item = styled.img`
  width: 130px;
  height: 130px;
  border: 1px solid transparent;
  border-radius: 50%;
  object-fit: contain;

  display: flex;
  align-items: center;
  justify-content: center;
  /* cursor: pointer; */
  /* transition: transform 0.2s, box-shadow 0.2s; */
  /* 
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    animation: float 1s ease-in-out infinite;
  } */

  /* @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  } */

  @media screen and (max-width: 920px) {
    width: 110px;
    height: 110px;
  }

  @media screen and (max-width: 769px) {
    width: 130px;
    height: 130px;
  }
`;

const Button = styled.div`
  position: absolute;
  top: 40%;
  right: 31%;
  background-color: #fedf73;
  border-radius: 8px;
  padding: 16px 32px;
  z-index: 3px;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #fadb1e;
    box-shadow: 3px 10px 10px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 920px) {
    right: 32%;
    padding: 12px 20px;
  }

  @media screen and (max-width: 769px) {
    right: 35%;
    /* padding: 12px 20px; */
  }
`;

function GridItem({ key, content }) {
  return <Item src={content} />;
}

function CountdownTimer() {
  // Set the target date and time for your countdown
  const targetDate = new Date("2023-10-31T23:59:59").getTime();

  return (
    <TimerDiv>
      <Countdown
        date={targetDate}
        renderer={({ days, hours, minutes, seconds }) => (
          <BlockContainer>
            <Block>
              <Plate>{days < 10 ? `0${days}` : days}</Plate>
              <Label>Days</Label>
            </Block>
            <span style={{ marginTop: "-30px", fontSize: "24px" }}>:</span>
            <Block>
              <Plate>{hours < 10 ? `0${hours}` : hours}</Plate>
              <Label>Hours</Label>
            </Block>
            <span style={{ marginTop: "-30px", fontSize: "24px" }}>:</span>
            <Block>
              <Plate>{minutes < 10 ? `0${minutes}` : minutes}</Plate>
              <Label>Mins</Label>
            </Block>
            <span style={{ marginTop: "-30px", fontSize: "24px" }}>:</span>
            <Block>
              <Plate>{seconds < 10 ? `0${seconds}` : seconds}</Plate>
              <Label>Secs</Label>
            </Block>
          </BlockContainer>
        )}
      />
    </TimerDiv>
  );
}

const Grid = () => {
  const imageArray = [
    "https://64.media.tumblr.com/a753fa6f9571ecc678e1aaa7272cc2dc/32964901ae35af3a-a4/s540x810/679248c7a3198c7284ba26d945720b61797621ad.pnj",
    "https://64.media.tumblr.com/71b94366f838009bea917f2c30947b2c/586280f2da0bf3ef-46/s1280x1920/eb4ebfa6f9f77bc5eac878d1199250f1a8c2dddf.pnj",
    "https://64.media.tumblr.com/3134cd2c7dfb79db903d7d2302e0cada/53bc4932b79cd982-10/s1280x1920/62829cfd82bfc30f87b7b9de50a7f57492ded8f9.pnj",
    "https://64.media.tumblr.com/6845dd7bd70012ad4eb4a1e7f168fb63/d099013bc97c339e-2a/s1280x1920/3f04e372fd1bb543c5361538eca451daa5387176.pnj",
    "https://remaxonlineshop.com/cdn/shop/products/WeChatImage_202205121033071_f944b4be-2b45-4a3a-bff3-777d0d269e57.jpg?v=1664822437",
    "https://64.media.tumblr.com/ec1c44f6c72e4529cd689d336c61fadd/32964901ae35af3a-3e/s640x960/71bcccc7a587d295d01cb8d47a3eae9f07f63765.pnj",
  ];

  return (
    <Container>
      <CountContainer>
        <Title>THADINGYUT SALES</Title>
        <Label>ending in</Label>
        <CountdownTimer />
      </CountContainer>
      <GridContainer>
        {imageArray.map((img, i) => (
          <GridItem key={i} content={img} />
        ))}

        {/* <GridItem content="Item 1" />
        <GridItem content="Item 2" />
        <GridItem content="Item 3" />
        <GridItem content="Item 4" /> */}
        <Button>SHOP NOW!</Button>
      </GridContainer>
    </Container>
  );
};

export default Grid;

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1140px;
  display: flex;
  align-items: center;
  justify-content: center;
 
  
  // @media (min-width: 800px) and (max-width: 1203px) {
  //   width: 900px;
  // }
  @media screen and (max-width: 1204px) {
    width: 100%;
    margin-left: -10px;
  }
  // @media screen and (max-width: 759px) {
  //   width: 100%;
  //   margin-left: -10px;
  // }
  @media screen and (max-width: 769px) {
    width: 100%;
    margin-left: -10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and(min-width: 769px) and (max-width: 1204px) {
    width: 100%;
  }
  // @media screen and (max-width: 759px) {
  //   width: 100%;
  // }
  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Title = styled.div`
  font-weight: 600;
  /* padding: 10px 0; */
  width: 100%;
  @media (min-width: 800px) and (max-width: 1203px) {
  }
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 800px) and (max-width: 1203px) {
  }
`;

const Row = styled.div`
  width: 100%;
  font-size: 18px;
  padding: 20px 10px;
  margin: 5px 0;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 50px;
  /* flex-direction: column; */
  background-color: ${(props) =>
    props.className === 2 ||
    props.className === 6 ||
    props.className === 10 ||
    props.className === 14 ||
    props.className === 18 ||
    props.className === 22 ||
    props.className === 26 ||
    props.className === 30 ||
    props.className === 34 ||
    props.className === 38 ||
    props.className === 42 ||
    props.className === 46 ||
    props.className === 50 ||
    props.className === 54 ||
    props.className === 58 ||
    props.className === 62 ||
    props.className === 66
      ? "#fff"
      : "#e6f0f3"};
  @media (min-width: 800px) and (max-width: 1203px) {
  }
  // @media screen and (max-width: 759px) {
  //   background-color: #fff;
  //   flex-direction: column;
  //   font-size: 13px;
  //   gap: 0px;
  //   padding: 0;
  //   margin: 0;
  // }
  @media screen and (max-width: 769px) {
    background-color: #fff;
    flex-direction: column;
    font-size: 16px;
    gap: 0px;
    padding: 0;
    margin: 0;
  }
  // @media screen and (max-width: 1204px){
  //   flex-direction: column;
  //   overflow-x: scroll;
  // }
   /* Firefox */
    scrollbar-color: #fff #fff; /* first is scrollbar, second is thumb */

    /* Chrome, Edge, and Safari */
    &::-webkit-scrollbar {
      width: 1px;
    }

    &::-webkit-scrollbar-track {
      background: #fff;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #fff;
    }
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media (min-width: 800px) and (max-width: 1203px) {
  }

  @media screen and (max-width: 769px) {
    background-color: ${(props) =>
      props.className % 2 === 0 ? "#e6f0f3" : "#fff"};

    padding: 20px;
    margin-left: 20px;
  }
`;

const Specification = ({ item }) => {
  let data = item.specification;
  let keyList;
  let valueList;
  let even = [];
  let odd = [];

  if (data) {
    keyList = Object.keys(data);
    valueList = Object.values(data);

    for (var i = 0; i < keyList.length; ++i) {
      if (i % 2 === 0) {
        even.push(keyList[i]);
      } else {
        odd.push(keyList[i]);
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        {keyList &&
          keyList.map((key, i) => {
            let index = i;

            if (index % 2 === 0) {
              return (
                <Row className={i} key={i}>
                  <Div className={i}>
                    <Title>{keyList[index]}</Title>
                    <Column>{data[key]}</Column>
                  </Div>

                  <Div>
                    <Title>{keyList[index + 1]}</Title>
                    <Column>{data[keyList[index + 1]]}</Column>
                  </Div>
                </Row>
              );
            }
          })}
      </Wrapper>
    </Container>
  );
};

export default Specification;

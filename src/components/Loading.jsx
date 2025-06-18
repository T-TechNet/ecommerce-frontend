import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  @media screen and (max-width: 1203px) {
    width: 950px;
  }
`;

const Msg = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #758a91;
  padding: 10px 0;
`;

const Loading = () => {
  return (
    <Wrapper>
      <CircularProgress style={{ color: "#03A89E" }} />
      <Msg>Loading...</Msg>
    </Wrapper>
  );
};

export default Loading;

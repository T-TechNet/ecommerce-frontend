import React from "react";
import styled from "styled-components";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useMenuContext } from "../../context/MenuContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &:hover {
    background-color: #e6f0f3;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 15px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Subtitle = styled.div`
  font-size: 16px;
`;

const SidenavRow = (props) => {
  const { setSubContainer, setSubContainerEntries, setSubTitle } =
    useMenuContext();

  const openRow = () => {
    setSubContainer(true);
    setSubContainerEntries(props.entries);
    setSubTitle(props.text);
  };

  const handleClick = () => {
    if (props.url) {
      window.location.href = `${props.url}`;
      props.closeNav();
    }
  };

  return (
    <Container onClick={() => props.entries && openRow()}>
      {props.entries ? (
        <Wrapper>
          <Subtitle>{props.text}</Subtitle>
          <KeyboardArrowRightIcon />
        </Wrapper>
      ) : (
        <Wrapper onClick={() => handleClick()}>
          <Subtitle>{props.text}</Subtitle>
        </Wrapper>
      )}
    </Container>
  );
};

export default SidenavRow;

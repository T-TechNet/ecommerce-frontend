import React from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMenuContext } from "../../context/MenuContext";
import SidenavRow from "./SidenavRow";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  transform: translateX(420px);
`;
const Header = styled.div`
  padding: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e6f0f3;
  }
`;

const Title = styled.div`
  font-size: 16px;
`;

const SubTitle = styled.div`
  padding: 25px;
  font-weight: 700;
  font-size: 20px;
`;

const arrow = {
  marginRight: "10px",
};

const link = {
  textDecoration: "none",
  color: "#000000",
};

const SubContainer = (props) => {
  const { subContainerEntries, setSubContainer, subTitle } = useMenuContext();
  return (
    <Container
      style={
        props.state === "entering"
          ? { animation: "moveSubContainer .3s forwards" }
          : props.state === "entered"
          ? { transform: "translateX(0px)" }
          : { animation: "moveSubContainer .3s reverse forwards" }
      }
    >
      <Header onClick={() => setSubContainer(false)}>
        <ArrowBackIcon style={arrow} />
        <Title>Main Menu</Title>
      </Header>
      <hr></hr>
      <SubTitle>{subTitle && subTitle}</SubTitle>
      {subContainerEntries.map((superEntry) => (
        <div onClick={props.closeNav}>
          {subTitle !== "Laptop" && subTitle !== "PC" ? (
            <Link
              to={`/list/network/${subTitle.toLowerCase()}/${superEntry.title}`}
              style={link}
            >
              <SidenavRow text={superEntry.title} />
            </Link>
          ) : (
            <Link
              to={`/list/${subTitle.toLowerCase()}/${superEntry.title}`}
              style={link}
            >
              <SidenavRow text={superEntry.title} />
            </Link>
          )}
        </div>
      ))}
      <div style={{ minHeight: "60px" }}></div>
    </Container>
  );
};

export default SubContainer;

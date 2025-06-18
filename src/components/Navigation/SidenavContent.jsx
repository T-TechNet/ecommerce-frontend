import React from "react";
import styled from "styled-components";
import { useMenuContext } from "../../context/MenuContext";
import SidenavRow from "./SidenavRow";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 83%;
  overflow-y: scroll;
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

  @media only screen and (max-width: 759px) {
    height: 81%;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  padding: 20px 25px;
`;

const SidenavContent = (props) => {
  const { entryStore } = useMenuContext();

  return (
    <Container
      style={
        props.state === "exiting"
          ? { animation: "moveMainContainer .3s forwards" }
          : props.state === "entering"
          ? { animation: "moveMainContainer .3s reverse forwards" }
          : null
      }
    >
      {entryStore &&
        entryStore.map((entry, index) => {
          return (
            <>
              <Title key={index}>{entry.title}</Title>
              {entry.entries.map((sub, i) => {
                return !entry.entries[i].entries ? (
                  <SidenavRow
                    title={entry.title}
                    text={sub.title}
                    url={sub.url}
                    closeNav={props.closeNav}
                  />
                ) : (
                  <SidenavRow
                    title={entry.title}
                    text={sub.title}
                    url={sub.url}
                    entries={sub.entries}
                    closeNav={props.closeNav}
                  />
                );
              })}
              <hr></hr>
            </>
          );
        })}
    </Container>
  );
};

export default SidenavContent;

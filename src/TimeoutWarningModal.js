import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "100%",
    padding: "15px",
    fontSize: "20px",
  },
};

const Header = styled.h2`
  background-color: #1e89b4;
  top: 16px;
  left: 16px;
  padding: 10px;
  border-radius: 5px;
  font-size: 20px;
  color: white;
  text-align: center;
`;

const Text = styled.p`
  padding: 10px;
`;

const LogOff = styled.button`
  cursor: pointer;
  width: max-content;
  height: fit-content;
  padding: 8px;
  margin: 0 10px;
  border: 1px solid #01384a;
  border-radius: 4px;
  color: black;
`;

const StayLoggedIn = styled.button`
  cursor: pointer;
  width: max-content;
  height: fit-content;
  padding: 8px;
  margin: 0 10px;
  border: 1px solid #01384a;
  background-color: #1e89b4;
  border-radius: 4px;
  color: white;

  &:hover {
    background-color: #00688b;
  }
`;

export const TimeoutWarningModal = ({ setUser, isOpen, onRequestClose }) => {
  const [counter, setCounter] = useState(60);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.setItem("guest", "true");
    navigate(0);
  };

  const onLogOffCall = () => {
    handleLogout();
  };

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  return (
    <div>
      <Modal isOpen={isOpen} style={customStyles} contentLabel="Modal">
        <Header>Session Timeout</Header>
        <Text>
          You're being timed out due to inactivity. Please choose to stay signed
          in or to logoff. Otherwise, you will be logged off automatically in{" "}
          {counter} seconds
        </Text>
        <LogOff onClick={onLogOffCall}>Log off</LogOff>
        <StayLoggedIn onClick={onRequestClose}>Stay Logged In</StayLoggedIn>
      </Modal>
    </div>
  );
};

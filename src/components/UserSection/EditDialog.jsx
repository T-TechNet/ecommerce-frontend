import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import "./placeholder.css";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 16px 32px;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 5px;
  animation: pop-swirl linear 250ms forwards;

  @keyframes pop-swirl {
    0% {
      transform: scale(0) rotate(0deg);
      z-index: 10;
    }

    50% {
      transform: scale(0.5) rotate(0deg);
      z-index: 10;
    }

    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @media only screen and (max-width: 759px) {
    width: 70%;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 700;
`;

const Box = styled.div`
  position: relative;
  padding: 40px 0;

  @media only screen and (max-width: 759px) {
    padding: 30px 0;
    width: 95%;
  }
`;

const Section = styled.div`
  padding: 20px 0;
`;

const PasswordBox = styled.div`
  position: relative;
  padding: 20px 0;
`;

const PlaceHolder = styled.div`
  position: absolute;
  top: 55px;
  left: 15px;
  pointer-events: none;
  transition: 0.3s;

  font-weight: 400;
  font-size: 16px;
  color: #4a666f;
  background-color: #fff;

  @media only screen and (max-width: 759px) {
    top: 45px;
  }
`;

const PlaceHolder2 = styled.div`
  position: absolute;
  top: 35px;
  left: 15px;
  pointer-events: none;
  transition: 0.3s;

  font-weight: 400;
  font-size: 16px;
  color: #4a666f;
  background-color: #fff;
`;

const Input = styled.input`
  width: 94%;
  padding: 14px 12px;
  border-radius: 4px;
  border: 1px solid #758a91;
  background: #ffffff;

  font-size: 17px;
  font-weight: 400;
  color: #002734;

  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border: 2px solid #00688b;
  }

  &:focus + ${PlaceHolder} {
    top: 32px;
    left: 5px;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: #00688b;
    padding: 0 3px;
    margin: 0 5px;

    @media only screen and (max-width: 759px) {
      top: 22px;
    }
  }

  &:focus + ${PlaceHolder2} {
    top: 12px;
    left: 5px;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: #00688b;
    padding: 0 3px;
    margin: 0 5px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 759px) {
    justify-content: center;
    flex-direction: column-reverse;
    gap: 10px;
  }
`;

const CancelButton = styled.div`
  border-radius: 4px;
  padding: 16px 32px;
  border: 1px solid #94a4aa;

  color: #00688b;
  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  @media only screen and (max-width: 759px) {
    display: none;
  }
`;

const SubmitButton = styled.input`
  border-radius: 4px;
  border: none;
  background: ${(props) => (props.disabled === false ? "#00688b" : "#b0bcc0")};
  padding: 16px 32px;
  color: #fff;
  margin-left: 20px;
  cursor: pointer;

  font-size: 16px;
  font-weight: 700;

  @media only screen and (max-width: 759px) {
    margin-left: 0px;
    width: 100%;
  }
`;

const Error = styled.span`
  color: #cc0000;
  font-size: 13px;
  margin: 0 0 10px 5px;
`;

const eye = {
  color: "#94A4AA",
  position: "absolute",
  top: "35px",
  right: "15px",
  cursor: "pointer",
};

const EditDialog = ({
  type,
  open,
  setOpen,
  userInfo,
  onSubmit,
  onPasswordSubmit,
  serverError,
}) => {
  const {
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [value, setValue] = useState();

  const [currentPw, setCurrentPw] = useState();
  const [newPw, setNewPw] = useState();
  const [confirmPw, setConfirmPw] = useState();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [match, setMatch] = useState(true);

  const toggleCurrPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleCfPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const name = watch("name");
  const phnum = watch("phnum");

  const formStatus = name || phnum ? true : false;

  const passwordFormStatus = currentPw && newPw && confirmPw;

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handlePasswordChange = (e, type) => {
    if (type === "current") {
      setCurrentPw(e.target.value);
    } else if (type === "new") {
      setNewPw(e.target.value);
    } else if (type === "confirm") {
      setConfirmPw(e.target.value);
    } else {
    }
  };

  const handleCancel = () => {
    setValue("");
    setOpen(false);
  };

  const handleSubmit = (value) => {
    setOpen(false);
    onSubmit(value);
  };

  const handlePasswordSubmit = (currentPw, newPw, confirmPw) => {
    if (newPw !== confirmPw) {
      setMatch(false);
    } else {
      setMatch(true);
      // setOpen(false);
      onPasswordSubmit(currentPw, newPw, confirmPw);
    }
  };

  useEffect(() => {
    reset({ ...userInfo });
  }, [userInfo]);

  return (
    open && (
      <Container>
        <Wrapper>
          <HeaderDiv>
            <Header>{type}</Header>
            <CloseIcon onClick={() => setOpen(false)} />
          </HeaderDiv>
          {type === "Name" ? (
            <Box className="edit-input-container">
              <Input
                name={type}
                type="text"
                {...register("name", {})}
                value={value ? value : ""} // condition added to remove input field warning
                onChange={handleChange}
              />
              <PlaceHolder className={name && "filled"}>{type}</PlaceHolder>
            </Box>
          ) : type === "Phone Number" ? (
            <Box className="edit-input-container">
              <Input
                name={type}
                type="text"
                {...register("phnum", {})}
                value={value ? value : ""} // condition added to remove input field warning
                onChange={handleChange}
              />
              <PlaceHolder className={phnum ? "filled" : ""}>
                {type}
              </PlaceHolder>
            </Box>
          ) : type === "Password" ? (
            <Section>
              {/* CURRENT PASSWORD */}
              <PasswordBox className="password-input-container">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPw ? currentPw : ""}
                  onChange={(e) => handlePasswordChange(e, "current")}
                />
                <PlaceHolder2 className={currentPw && "filled"}>
                  Current {type}
                </PlaceHolder2>
                <div onClick={toggleCurrPassword}>
                  {!showCurrentPassword ? (
                    <VisibilityIcon style={eye} />
                  ) : (
                    <VisibilityOffIcon style={eye} />
                  )}
                </div>
                {serverError && <Error>{serverError}</Error>}
              </PasswordBox>

              {/* NEW PASSWORD */}
              <PasswordBox className="password-input-container">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPw ? newPw : ""}
                  onChange={(e) => handlePasswordChange(e, "new")}
                />
                <PlaceHolder2 className={newPw && "filled"}>
                  New {type}
                </PlaceHolder2>
                <div onClick={toggleNewPassword}>
                  {!showNewPassword ? (
                    <VisibilityIcon style={eye} />
                  ) : (
                    <VisibilityOffIcon style={eye} />
                  )}
                </div>
              </PasswordBox>

              {/* CONFIRM PASSWORD */}
              <PasswordBox className="password-input-container">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPw ? confirmPw : ""}
                  onChange={(e) => handlePasswordChange(e, "confirm")}
                />
                <PlaceHolder2 className={confirmPw && "filled"}>
                  Confirm {type}
                </PlaceHolder2>
                <div onClick={toggleCfPassword}>
                  {!showConfirmPassword ? (
                    <VisibilityIcon style={eye} />
                  ) : (
                    <VisibilityOffIcon style={eye} />
                  )}
                </div>
                {!match && <Error>Passwords do not match!</Error>}
              </PasswordBox>
            </Section>
          ) : (
            <></>
          )}

          <ButtonContainer>
            <CancelButton onClick={() => handleCancel()}>Cancel</CancelButton>
            {type === "Password" ? (
              <SubmitButton
                type="submit"
                value="Save Changes"
                onClick={() =>
                  handlePasswordSubmit(currentPw, newPw, confirmPw)
                }
                disabled={!passwordFormStatus}
              />
            ) : (
              <SubmitButton
                type="submit"
                value="Save Changes"
                onClick={() => handleSubmit(value)}
                disabled={!formStatus}
              />
            )}
          </ButtonContainer>
        </Wrapper>
      </Container>
    )
  );
};

export default EditDialog;

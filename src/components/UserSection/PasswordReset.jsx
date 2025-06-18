import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";
import "./placeholder.css";
import resetPassword from "../../assets/ResetPassword.svg";
import resetSuccessful from "../../assets/ResetSuccessful.svg";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  position: relative;
  width: 1150px;
  margin: 30px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 759px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Img = styled.img`
  @media only screen and (max-width: 759px) {
    display: ${(props) => (props.className !== "before" ? "block" : "none")};
    width: 150px;
    height: 150px;
  }
`;

const InfoSection = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 20px;

  @media only screen and (max-width: 759px) {
    width: 90%;
    align-items: ${(props) => props.className === "before" && "flex-start"};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;

  @media only screen and (max-width: 759px) {
    width: 100%;
  }
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 32px;

  background: linear-gradient(180deg, #00688b 0%, #03a89e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media only screen and (max-width: 759px) {
    font-size: 23px;
  }
`;

const Header = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
`;

const Div = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 759px) {
    width: 100%;
  }
`;

const PlaceHolder = styled.div`
  position: absolute;
  top: 15px;
  left: 18px;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  font-weight: 400;
  font-size: 16px;
  color: #4a666f;
  background-color: #fff;
`;

const Input = styled.input`
  padding: 15px;
  width: 350px;

  border: 1px solid #758a91;
  border-radius: 4px;

  gap: 10px;

  font-weight: 400;
  font-size: 16px;

  color: #4a666f;

  &:focus {
    outline: none;
    border: 2px solid #00688b;
  }

  &:focus + ${PlaceHolder} {
    top: -7px;
    left: 8px;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: #00688b;
    padding: 0 3px;
    margin: 0 5px;
  }

  @media only screen and (max-width: 759px) {
    width: 90%;
  }
`;

const Error = styled.span`
  width: 350px;
  color: #cc0000;
  font-size: 13px;

  @media only screen and (max-width: 759px) {
    width: 100%;
  }
`;

const Button = styled.input`
  padding: 16px 32px;
  margin-top: 10px;
  gap: 8px;
  width: 380px;

  background: #00688b;
  border-radius: 4px;
  border: none;

  font-weight: 700;
  font-size: 16px;
  color: #ffffff;

  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #2b829f;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  }

  @media only screen and (max-width: 759px) {
    width: 330px;
  }

  @media only screen and (max-width: 366px) {
    width: 310px;
  }
`;

const Description = styled.p`
  padding: 20px 0;
  font-weight: 400;
  color: #002734;

  @media only screen and (max-width: 759px) {
    text-align: center;
    font-size: 16px;
  }
`;

const PasswordReset = ({ click }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [newPW, setNewPW] = useState();
  const [confirmPW, setConfirmPW] = useState();
  const [success, setSuccess] = useState(false);

  let { id } = useParams();
  let { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    const data = {
      id: id,
      token: token,
      password: e.password,
    };

    await publicRequest
      .post(`/users/reset-password/`, data)
      .then((res) => {
        // console.log(res);
        setSuccess(true);
        // alert("Your password is successfully reset!");
        // navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      {success ? (
        <Wrapper>
          <Img src={resetSuccessful} />
          <InfoSection>
            <Title>Reset Successfully</Title>
            <Description>
              Your password has been reset successfully. You can now log in to
              your account with the new password.
            </Description>

            <Button type="submit" value="Log In" onClick={click} />
          </InfoSection>
        </Wrapper>
      ) : (
        <Wrapper>
          <Img className="before" src={resetPassword} />
          <InfoSection className="before">
            <Header>Reset Password</Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Div className="forget-password-container">
                <Input
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required!",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                      message:
                        "Password must contain at least 8 characters with a mix of letters, numbers & symbols.",
                    },
                  })}
                  onChange={(e) => setNewPW(e.target.value)}
                />
                <PlaceHolder className={newPW && "filled"}>
                  New Password
                </PlaceHolder>
                {errors.password && errors.password.type === "required" && (
                  <Error>{errors.password.message}</Error>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <Error>{errors.password.message}</Error>
                )}
              </Div>

              <Div className="forget-password-container">
                <Input
                  type="password"
                  {...register("cfpassword", {
                    validate: (val) => {
                      if (watch("cfpassword") === "") {
                        return null;
                      } else if (watch("password") !== val) {
                        return "Your passwords do not match.";
                      }
                    },
                  })}
                  onChange={(e) => setConfirmPW(e.target.value)}
                />
                <PlaceHolder className={confirmPW && "filled"}>
                  Confirm Password
                </PlaceHolder>
                {errors.cfpassword && errors.cfpassword.type === "validate" && (
                  <Error>{errors.cfpassword.message}</Error>
                )}
              </Div>
              <Button type={"submit"} value="Reset Password" />
            </Form>
          </InfoSection>
        </Wrapper>
      )}
    </Container>
  );
};

export default PasswordReset;

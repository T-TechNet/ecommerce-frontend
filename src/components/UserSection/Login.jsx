import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";
import Cookies from "js-cookie";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 50%;
  height: fit-content;
  padding: 30px 0 10px 0;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
  background-image: linear-gradient(to right, #03a89e, #00688b);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

const Form = styled.form`
  padding: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Input = styled.input`
  border: none;
  background-color: #dcecf4;
  width: 80%;
  padding: 10px;
  margin: 5px;
  border-radius: 1px;
`;

const Error = styled.span`
  width: 300px;
  text-align: center;
  color: #e13f31;
  font-size: 12px;
`;

const Additional = styled.div`
  width: 100%;
  padding: 0;
  margin: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.p`
  text-decoration: underline;
  margin: 0 30px;

  &:hover {
    color: ${(props) => props.type === "fpw" && "red"};
    color: ${(props) => props.type === "create" && "blue"};
  }
`;

const Button = styled.input`
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  background-color: #354f60;
  width: 100px;
  margin-top: 30px;
  padding: 10px;
  cursor: ${(props) => (props.disabled === false ? "pointer" : "")};
  background-color: ${(props) =>
    props.disabled === false ? "#006788" : "#9CBCCD"};

  &:hover {
    box-shadow: ${(props) =>
      props.disabled === false ? "0 0 5px gray" : "none"};
    transform: ${(props) =>
      props.disabled === false ? "scale(1.05)" : "none"};
  }
`;

const Login = ({ setUser, popup, setPopup }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const pw = watch("password");
  const form = email && pw;
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    await publicRequest
      .post("/auth/login", e)
      .then((res) => {
        // console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.accessToken);
        localStorage.removeItem("cart");
        sessionStorage.removeItem("guest");
        setUser(JSON.parse(localStorage.getItem("user")));
        // Cookies.set("token", res.data.accessToken, { expires: 1 });
        // Cookies.set("user", JSON.stringify(res.data), { expires: 1 });
        // setUser(JSON.parse(Cookies.get("user")));
        // Cookies.remove("guest");
        popup ? setPopup(false) : <></>;
        setServerError("");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        {success ? (
          // <Wrapper>
          //   <Title>You're logged in!</Title>
          //   <Text>
          //     Go to <Link to="/">Home</Link> Page.
          //   </Text>
          // </Wrapper>
          navigate("/")
        ) : (
          <Div>
            <Title>Welcome to Rangoon Discount!</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Email Address"
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <Error>{errors.email.message}</Error>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <Error>{errors.email.message}</Error>
              )}
              <Input
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required!",
                  },
                })}
              />
              {errors.password && <Error>{errors.password.message}</Error>}
              {serverError ? (
                <Error>Your email or password is incorrect!</Error>
              ) : (
                <></>
              )}

              <Additional>
                <Link to="/forgot-password">
                  <Info type="fpw">Forgot Password?</Info>
                </Link>
                <Link to="/register">
                  <Info type="create" onClick={() => setPopup(false)}>
                    Create an account
                  </Info>
                </Link>
              </Additional>

              <Button type={"submit"} value="LOGIN" disabled={!form} />
            </Form>
          </Div>
        )}
      </Wrapper>
    </Container>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";
import "./placeholder.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getUserOrder, saveCart, saveWishList } from "../../utility/loggedin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// //oAuth with google
// import { signIn } from "../oAuth/Script";
// //oAuth with facebook
// import FacebookLogin from "react-facebook-login";

const Container = styled.div``;

const Wrapper = styled.div`
  width: 400px;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: flex-start; */

  @media screen and (max-width: 759px) {
    width: 335px;
  }
  @media screen and (max-width: 380px) {
    width: 320px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Div = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
`;

const PlaceHolder = styled.div`
  position: absolute;
  top: 30px;
  left: 40px;
  pointer-events: none;
  transition: 0.3s;

  font-weight: 400;
  font-size: 16px;
  color: #4a666f;
  background-color: #fff;
`;

const Input = styled.input`
  border: 1px solid #b0bcc0;
  border-radius: 4px;
  width: 80%;
  margin: 15px 0;
  padding: 15px 10px;

  font-weight: 400;
  font-size: 16px;
  color: #002734;

  &:focus {
    outline: none;
    border: 2px solid #00688b;
  }

  &:focus + ${PlaceHolder} {
    top: 7px;
    left: 30px;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: #00688b;
    padding: 0 3px;
    margin: 0 5px;
  }
`;

const Error = styled.span`
  position: absolute;
  top: 75px;
  width: 300px;
  text-align: center;
  color: #e13f31;
  font-size: 12px;
`;

const Additional = styled.div`
  padding: 0;
  margin: 10px 0;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Info = styled.p`
  /* text-decoration: underline; */
  color: #00688b;
  font-size: 14px;
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.type === "fpw" && "red"};
    color: ${(props) => props.type === "create" && "blue"};
  }
  @media screen and (max-width: 759px) {
  }
`;

const Button = styled.input`
  color: white;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  width: 85%;
  margin: 15px 0;
  padding: 15px 10px;
  cursor: ${(props) => (props.disabled === false ? "pointer" : "")};
  background-color: #00688b;
  /* background-color: ${(props) =>
    props.disabled === false ? "#00688B" : "#9CBCCD"}; */

  &:hover {
    background-color: #2b829f;
    transform: translate(-0.5px, 0.5px);
    transition: all 0.3s ease;
  }
`;

const Hr = styled.hr`
  width: 85%;
  margin: 25px 0;
`;

const eye = {
  color: "#94A4AA",
  position: "absolute",
  top: "30px",
  right: "40px",
  cursor: "pointer",
};

const LoginForm = (props) => {
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

  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const onSubmit = async (e) => {
    await publicRequest
      .post("/auth/login", e)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.accessToken);
        // localStorage.removeItem("cart");
        sessionStorage.removeItem("guest");
        // setUser(JSON.parse(localStorage.getItem("user")));
        setServerError("");
        setSuccess(true);

        getUserOrder();
        saveWishList(); //save wishlist in database
        saveCart(); //save cart in database
        props.closePanel();
        navigate("/");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
      });
  };

  const viewPage = (page) => {
    props.closePanel();
    if (page === "password") {
      navigate("/forgot-password");
    } else {
      navigate("/register");
    }
  };

  // OAUTH WITH FACEBOOK START
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "321283037150081",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v10.0",
      });
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const responseFacebook = (response) => {
    console.log(response);
    if (response.status !== "unknown") {
      // User is logged in
      setLoggedIn(true);
      setUserData(response);
    }
  };

  const handleLogout = () => {
    window.FB.logout(function (response) {
      // Log the user out from Facebook
      setLoggedIn(false); // Update the app's state to indicate that the user is logged out
    });
  };

  // OAUTH WITH FACEBOOK END

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Div className="login-input-container">
            <Input
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
            <PlaceHolder className={email && "filled"}>
              Email Address
            </PlaceHolder>
            {errors.email && errors.email.type === "required" && (
              <Error>{errors.email.message}</Error>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <Error>{errors.email.message}</Error>
            )}
          </Div>
          <Div className="login-input-container">
            <Input
              type={passwordType}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required!",
                },
              })}
              onFocus={() => setServerError("")}
            />
            <PlaceHolder className={pw && "filled"}>Password</PlaceHolder>
            <div onClick={togglePassword}>
              {passwordType === "password" ? (
                <VisibilityIcon style={eye} />
              ) : (
                <VisibilityOffIcon style={eye} />
              )}
            </div>
            {errors.password && <Error>{errors.password.message}</Error>}
            {serverError ? (
              <Error>Your email or password is incorrect!</Error>
            ) : (
              <></>
            )}
          </Div>
          <Additional>
            <Info onClick={() => viewPage("password")}>
              Forgot your password?
            </Info>
          </Additional>
          <Button type={"submit"} value="Log in" disabled={!form} />
        </Form>
        {/* FOR OAUTH GOOGLE BUTTON */}
        {/* <button onClick={signIn}>Sign In with Google</button> */}

        {/* FOR OAUTH FACEBOOK BUTTON START*/}

        {/* <div>
        <Routes>
        <Route path="/" element={loggedIn ? (<> <button onClick={handleLogout}>Logout</button> <Navigate to="/dashboard" /></>)  : <FacebookLogin
            appId="321283037150081"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            // scope="ads_read,ads_management"
          />} />
          <Route
            path="/dashboard"
            element={loggedIn ? <><Dashboard userData={userData} />  <button onClick={handleLogout}>Logout</button> </>: <Navigate to="/" />}
          />
        </Routes>
      </div> */}

        {/* <FacebookLogin
          appId="321283037150081"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          // scope="ads_read,ads_management"
        /> */}

        {/* FOR OAUTH FACEBOOK BUTTON END*/}

        <Hr></Hr>
        <Info onClick={() => viewPage("signup")}>
          Don't have an account? Create.
        </Info>
      </Wrapper>
    </Container>
  );
};

{
  /* FOR OAUTH FACEBOOK */
}
// function Dashboard({ userData }) {

//   return (
//     <div>
//       <h1>Welcome, {userData.name}</h1>
//       <img src={userData.picture?.data?.url} alt={userData.name} />
//       {/* Additional dashboard content */}

//     </div>
//   );
// }

export default LoginForm;

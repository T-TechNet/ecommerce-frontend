import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import styled from "styled-components";
import "./style.css";
import box from "../../assets/BoxWithLocator.svg";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Form = styled.form``;

const FormControl = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 769px) {
    align-items: flex-start;
  }
`;

const PlaceHolder = styled.div`
  position: absolute;
  top: 25px;
  left: 20px;
  pointer-events: none;
  transition: 0.3s;

  font-weight: 400;
  font-size: 16px;
  color: #4a666f;
  background-color: #fff;
`;

const Input = styled.input`
  width: ${(props) =>
    props.status === "full" ? "95%" : props.status === "half" && "88%"};
  border-radius: 5px;
  border: 1px solid #758a91;
  font-size: 17px;
  padding: 15px;
  margin: 10px 5px;
  background: #fff;

  cursor: context-menu;
  display: flex;

  /* for hiding blinking cursor */
  color: ${(props) => props.className === "select" && "transparent"};
  text-shadow: ${(props) => props.className === "select" && "0 0 0 #002734"};

  &:focus {
    outline: none;
    border: 2px solid #00688b;
  }

  &:focus + ${PlaceHolder} {
    top: 2px;
    left: 10px;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.4px;
    color: #00688b;
    padding: 0 3px;
    margin: 0 5px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1204px) {
    width: ${(props) =>
      props.status === "full" ? "95%" : props.status === "half" && "85%"};
    padding: 15px 10px;
  }

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 35px;

  @media only screen and (max-width: 769px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
  }
`;

const Div = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;

  @media only screen and (min-width: 769px) {
    width: ${(props) => props.id === "half" && "50%"};
  }

  @media only screen and (max-width: 769px) {
    width: 88%;
  }
`;

const Title = styled.p`
  padding: 10px 5px;
  font-weight: 700;
  font-size: 16px;
  color: #002734;
`;

const AddressContainer = styled.div`
  background: #e6f0f3;
  border-radius: 8px;
  margin: 10px 0;
  padding: 20px 30px;
  display: flex;

  @media only screen and (max-width: 769px) {
    width: 100%;
    padding: 12px 18px;
  }
`;

const Img = styled.img`
  padding: 0 40px 0 10px;

  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

const Error = styled.span`
  text-align: left;
  color: #e13f31;
  font-size: 13px;
  padding: 0 0 0 10px;
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border-radius: 4px;

  @media only screen and (max-width: 769px) {
    justify-content: center;
    width: 88%;
    padding: 0px 15px;
    margin: 10px 5px;
    background-color: #00688b;
  }
`;

const Button = styled.input`
  font-size: 16px;
  font-weight: 700;
  border: none;
  color: white;
  padding: 16px 32px;
  gap: 8px;

  background-color: #00688b;
  cursor: pointer;

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Week = styled.div`
  margin: 10px;
  display: flex;
  gap: ${(props) => (props.className === "timeslot" ? "30px" : "11px")};
  padding: 10px 0;

  @media only screen and (min-width: 1050px) {
    width: 100%;
    justify-content: space-between;
  }

  @media only screen and (min-width: 769px) and (max-width: 1204px) {
    gap: 17px;
  }

  @media only screen and (max-width: 769px) {
    width: 110%;
    gap: 17px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const DatePad = styled.div`
  padding: 10px 20px 5px 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: context-menu;

  &:hover {
    background: #dee3e5;
    border-radius: 16px;
  }
`;

const Day = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
`;
const DateTag = styled.div`
  font-weight: 400;
  font-size: 23px;
  line-height: 17px;
  padding: 15px 0 5px 0;
`;

const TimeSlot = styled.div`
  border: 1px solid #bfc9cc;
  border-radius: 8px;
  padding: 7px 16px 9px;
  gap: 16px;
  display: flex;
  align-items: center;
  cursor: context-menu;

  @media only screen and (max-width: 769px) {
    padding: 5px 10px;
    gap: 10px;
  }
`;

const RadioDiv = styled.div`
  display: flex;
  align-items: center;
  color: #94a4aa;

  &:hover {
    color: #00688b;
  }
`;

const Period = styled.div`
  font-weight: 400;
  font-size: 16px;
`;

const Notification = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 769px) {
    width: 110%;
  }
`;
const Message = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;

  color: #577079;

  @media only screen and (max-width: 769px) {
    padding-left: 10px;
  }
`;

const Terms = styled.span`
  text-decoration: underline;
  text-decoration-thickness: 0.1px;
  text-underline-offset: 2px;
  color: #00688b;
  margin-left: 5px;
`;

const Hr = styled.hr`
  margin: 25px 0px 20px 0px;
  padding: 0px 20px;
  @media only screen and (max-width: 769px) {
    width: 85%;
    margin: 25px 0px 20px 5px;
    padding-right: 25px;
  }
`;

const PickupForm = ({ user, method, deli, cartItems, total, info }) => {
  var week = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  const fulldays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [formName, setFormName] = useState();
  const [formPhnum, setFormPhnum] = useState();
  const [formEmail, setFormEmail] = useState();

  const [pickupDate, setPickupDate] = useState();
  const [pickupTime, setPickupTime] = useState();
  const [dateIndex, setDateIndex] = useState();
  const [activeOne, setActiveOne] = useState();
  const [activeTwo, setActiveTwo] = useState();
  const [activeThree, setActiveThree] = useState();

  const [formErrors, setFormErrors] = useState({});

  let holdDay;

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      let products = [];
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const order = JSON.parse(localStorage.getItem("order"));
      const productTotal = parseInt(localStorage.getItem("total"));

      cartItems.forEach((item) => {
        products.push({
          productId: item._id,
          productTitle: item.title,
          imageURL: item.image[0],
          price: item.price,
          market_price: item.market_price,
          discount: item.discount,
          category: item.category[0],
          quantity: item.quantity,
        });
      });

      // GETTING FULL PICK UP DATE IN FORMAT
      const thisDate = new Date();
      let year = thisDate.getFullYear(); // 2023
      let month = months[thisDate.getMonth()]; // current month
      let day = fulldays[dateIndex]; // current day
      let date;

      if (pickupDate === 1 || pickupDate === 21 || pickupDate === 31) {
        date = pickupDate + "st";
      } else if (pickupDate === 2 || pickupDate === 22) {
        date = pickupDate + "nd";
      } else if (pickupDate === 3 || pickupDate === 23) {
        date = pickupDate + "rd";
      } else {
        date = pickupDate + "th";
      }

      let fullPickupDate = date + " " + month + ", " + year + " (" + day + ")";

      // DATA TO BE SENT
      let data;

      if (user) {
        data = {
          userId: user._id,
          name: formName,
          phnum: formPhnum,
          email: formEmail,
          amount: productTotal,
          products: products,
          delivery: method,
          delivery_fees: 0,
          pickup_date: fullPickupDate,
          pickup_time: pickupTime,
        };
      } else {
        data = {
          name: formName,
          phnum: formPhnum,
          email: formEmail,
          amount: productTotal,
          products: products,
          delivery: method,
          delivery_fees: 0,
          pickup_date: fullPickupDate,
          pickup_time: pickupTime,
        };
      }

      if (user) {
        // IF LOGGED IN USER, SEND DATA INCLUDING USER ID
        await publicRequest
          .post("/orders", data, {
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${token}`,
            },
          })
          .then((res) => {
            localStorage.setItem("order", JSON.stringify(res.data));
            navigate("/checkout/payment", {
              state: {
                fees: deli,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (order) {
        // IF GUEST USER BUT THE USER ALREADY HAS A PENDING ORDER, FIND ORDER WITH ORDER ID AND CONTINUE
        await publicRequest
          .post(`/orders/guest?orderId=${order._id}`, data)
          .then((res) => {
            localStorage.setItem("order", JSON.stringify(res.data));
            navigate("/checkout/payment", {
              state: {
                fees: deli,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // IF GUEST USER AND THE USER DOES NOT HAVE A PENDING ORDER, CREATE A NEW ORDER AND CONTINUE
        await publicRequest
          .post(`/orders/guest`, data)
          .then((res) => {
            localStorage.setItem("order", JSON.stringify(res.data));
            navigate("/checkout/payment", {
              state: {
                fees: deli,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};

    if (!formName) {
      errors.name = "Name is required";
    }

    if (!formPhnum) {
      errors.phone = "Phone Number is required";
    }

    if (!formEmail) {
      errors.email = "Email is required";
    } else if (!isEmailValid(formEmail)) {
      errors.email = "Please enter a valid email address";
    }

    if (!pickupDate) {
      errors.date = "Select pick up date";
    }

    if (!pickupTime) {
      errors.time = "Select pick up time";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Email validation
  const isEmailValid = (email) => {
    // You can use regular expression for more thorough email validation
    return email.includes("@") && email.includes(".");
  };

  const getWeek = () => {
    var curr = new Date(); // Get the current date
    curr.setDate(curr.getDate() + 2); // Add 2 days to get the first day

    for (let i = 0; i < 7; i++) {
      // Loop for a week (7 days)
      var obj = {};
      var temp = new Date(curr); // Create a copy of the current date
      var realDay = days[temp.getDay()]; // Get the day name

      obj.day = realDay;
      obj.date = temp.getDate();

      week.push(obj);

      curr.setDate(curr.getDate() + 1); // Move to the next day
    }
  };

  const getPickupDate = (day, date) => {
    setPickupDate(date);
    setDateIndex(days.indexOf(day)); // setting index from days array to get fullday
  };

  const getPickupTime = (time) => {
    if (time === "morning") {
      setPickupTime("9AM - 12PM");
      setActiveOne(true);
      setActiveTwo(false);
      setActiveThree(false);
    } else if (time === "noon") {
      setPickupTime("1PM - 3PM");
      setActiveOne(false);
      setActiveTwo(true);
      setActiveThree(false);
    } else {
      setPickupTime("4PM - 5PM");
      setActiveOne(false);
      setActiveTwo(false);
      setActiveThree(true);
    }
  };

  const calculateHoldDay = () => {
    var curr = new Date(); // get current date
    var todayDate = curr.getDate();
    holdDay = pickupDate - todayDate;
  };

  // const resetDateTime = () => {
  //   if (info?.pickup_time === "9AM - 12PM") {
  //     setActiveOne(true);
  //     setActiveTwo(false);
  //     setActiveThree(false);
  //   } else if (info?.pickup_time === "1PM - 3PM") {
  //     setPickupTime("1PM - 3PM");
  //     setActiveOne(false);
  //     setActiveTwo(true);
  //     setActiveThree(false);
  //   } else if (info?.pickup_time === "4PM - 5PM") {
  //     setPickupTime("4PM - 5PM");
  //     setActiveOne(false);
  //     setActiveTwo(false);
  //     setActiveThree(true);
  //   } else {
  //   }
  // };

  useEffect(() => {
    if (info) {
      setFormName(info.name);
      setFormPhnum(info.phnum);
      setFormEmail(info.email);
    } else if (user) {
      setFormName(user.name);
      setFormEmail(user.email);
    } else {
      const order = JSON.parse(localStorage.getItem("order"));
      if (order) {
        setFormName(info.name);
        setFormPhnum(info.phnum);
        setFormEmail(order.email);
      }
    }
  }, []);

  return (
    <Container>
      <Form>
        <FormControl>
          <Row>
            <Div className="input-container">
              <Input
                status="half"
                type="text"
                onChange={(e) => setFormName(e.target.value)}
                value={formName ? formName : ""}
              />
              <PlaceHolder className={formName && "filled"}>
                Full Name
              </PlaceHolder>
              {formErrors.name && <Error>{formErrors.name}</Error>}
            </Div>

            <Div className="input-container">
              <Input
                status="half"
                type="number"
                onChange={(e) => setFormPhnum(e.target.value)}
                value={formPhnum ? formPhnum : ""}
              />
              <PlaceHolder className={formPhnum && "filled"}>
                Phone Number
              </PlaceHolder>
              {formErrors.phone && <Error>{formErrors.phone}</Error>}
            </Div>
          </Row>

          <Div className="input-container">
            <Input
              type="email"
              onChange={(e) => setFormEmail(e.target.value)}
              value={formEmail ? formEmail : ""}
            />
            <PlaceHolder className={formEmail && "filled"}>
              Email Address
            </PlaceHolder>
            {formErrors.email && <Error>{formErrors.email}</Error>}
          </Div>

          <Div>
            <Title>Pickup location & time</Title>
            <AddressContainer>
              <Img src={box} />
              <p>
                11-A, Mya Wut Yee Lane, A One Street, Ward 5, Mayangone
                Township, Yangon.
              </p>
            </AddressContainer>

            {getWeek()}

            {formErrors.date && <Error>{formErrors.date}</Error>}

            <Week>
              {week.map((obj, index) => (
                <DatePad
                  key={index}
                  style={{
                    backgroundColor: pickupDate === obj.date ? "#00688b" : "",
                    color: pickupDate === obj.date ? "white" : "black",
                  }}
                  onClick={() => getPickupDate(obj.day, obj.date)}
                >
                  <Day>{obj.day}</Day>
                  <DateTag>{obj.date}</DateTag>
                </DatePad>
              ))}
            </Week>

            {formErrors.time && <Error>{formErrors.time}</Error>}

            <Week className="timeslot">
              <TimeSlot
                style={{
                  border: activeOne ? "1px solid #00688B" : "1px solid #BFC9CC",
                }}
                onClick={() => getPickupTime("morning")}
              >
                <RadioDiv>
                  {activeOne ? (
                    <RadioButtonCheckedIcon
                      style={{ fontSize: "18px", color: "#00688B" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon style={{ fontSize: "18px" }} />
                  )}
                </RadioDiv>
                <Period>9a.m - 12p.m</Period>
              </TimeSlot>
              <TimeSlot
                style={{
                  border: activeTwo ? "1px solid #00688B" : "1px solid #BFC9CC",
                }}
                onClick={() => getPickupTime("noon")}
              >
                <RadioDiv>
                  {activeTwo ? (
                    <RadioButtonCheckedIcon
                      style={{ fontSize: "18px", color: "#00688B" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon style={{ fontSize: "18px" }} />
                  )}
                </RadioDiv>
                <Period>1p.m - 3p.m</Period>
              </TimeSlot>
              <TimeSlot
                style={{
                  border: activeThree
                    ? "1px solid #00688B"
                    : "1px solid #BFC9CC",
                }}
                onClick={() => getPickupTime("evening")}
              >
                <RadioDiv>
                  {activeThree ? (
                    <RadioButtonCheckedIcon
                      style={{ fontSize: "18px", color: "#00688B" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon style={{ fontSize: "18px" }} />
                  )}
                </RadioDiv>
                <Period>4p.m - 5p.m</Period>
              </TimeSlot>
            </Week>

            {calculateHoldDay()}

            {pickupTime && holdDay > 0 && (
              <Notification>
                <InfoOutlinedIcon style={info} />
                <Message>
                  We will hold your order for{" "}
                  <span style={{ color: "#CC0000" }}>
                    {holdDay} {holdDay === 1 ? "day" : "days"}
                  </span>
                  . After that, your order will be cancelled.
                </Message>
              </Notification>
            )}
          </Div>
          <ButtonContainer>
            <Button
              type={"submit"}
              value="Continue"
              onClick={(e) => onSubmit(e)}
            />
          </ButtonContainer>
        </FormControl>

        <Hr></Hr>

        <Link to="/terms-and-conditions">
          <Terms>Terms and Conditions</Terms>
        </Link>
      </Form>
    </Container>
  );
};

export default PickupForm;

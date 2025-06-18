import React from "react";
import styled from "styled-components";
import TestimonialData from "../TestimonialData";

const accessToken =
  "EAAEkNIlNO4EBO25iPwCPFVP0aMGxEQMEKXJbxFcPZCC0Ee1tmONqeygABxZAlpOSBT0UYJZAwVrG3Xq23QVMrk4zRC8f2MMFjTYszzwvADGrjr00f3ZCw4yYaZCD5ZCMgkZCDXJnDlCD1VMPqU4c4RfJoa93ZBZBpS9cldL39zaYJUcp7apZCDwKLAc7Y1P6eABAbTrZCac1LF4R6GvZB3V3b6yGb2gIvFx1Aj1w8ZAgkoOBcCr1B91ozD8IZAdEZAGnYZAQZBgZDZD";
const pageId = "108621082024465";

const Div = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 30px;
  width: 100%;
  overflow-x: scroll; /* Enable horizontal scrolling */

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
`;

const Card = styled.div`
  width: 200px;
  border-radius: 10px 10px 10px 10px;
  background: #e6f0f3;
  padding: 20px;
  border-bottom: 7px solid #03a89e;
`;

const TestimonialCard = () => {
  let reviews;

  const url = `https://graph.facebook.com/v17.0/${pageId}?fields=overall_star_rating,ratings{review_text,created_time,rating}&access_token=${accessToken}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.ratings && data.ratings.data) {
        reviews = data.ratings.data;
        // Handle the reviews data as needed in your React component state.
      } else {
        throw new Error("Invalid response format");
      }
    })
    .catch((error) => {
      console.error("Error fetching Facebook Page reviews", error);
    });

  return (
    <Div>
      {/* {TestimonialData.map((data, index) => (
        <div style={{ width: "300px" }}>
          <Card key={index}>
            
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g clip-path="url(#clip0_2814_31626)">
                <circle
                  cx="20"
                  cy="20"
                  r="20"
                  fill="url(#paint0_linear_2814_31626)"
                />
                <path
                  d="M10.5714 27H15.2857L18.4286 21V12H9V21H13.7143L10.5714 27ZM23.1429 27H27.8571L31 21V12H21.5714V21H26.2857L23.1429 27Z"
                  fill="white"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_2814_31626"
                  x1="20"
                  y1="0"
                  x2="20"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#03A89E" />
                  <stop offset="1" stop-color="#00688B" />
                </linearGradient>
                <clipPath id="clip0_2814_31626">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
            
            <p>{data.name}</p>
            
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_214_1141)">
                <path
                  d="M9.62016 6.66671L8.00016 1.33337L6.38016 6.66671H1.3335L5.4535 9.60671L3.88683 14.6667L8.00016 11.54L12.1202 14.6667L10.5535 9.60671L14.6668 6.66671H9.62016Z"
                  fill="#FF9C2B"
                />
              </g>
              <defs>
                <clipPath id="clip0_214_1141">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_214_1141)">
                <path
                  d="M9.62016 6.66671L8.00016 1.33337L6.38016 6.66671H1.3335L5.4535 9.60671L3.88683 14.6667L8.00016 11.54L12.1202 14.6667L10.5535 9.60671L14.6668 6.66671H9.62016Z"
                  fill="#FF9C2B"
                />
              </g>
              <defs>
                <clipPath id="clip0_214_1141">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_214_1141)">
                <path
                  d="M9.62016 6.66671L8.00016 1.33337L6.38016 6.66671H1.3335L5.4535 9.60671L3.88683 14.6667L8.00016 11.54L12.1202 14.6667L10.5535 9.60671L14.6668 6.66671H9.62016Z"
                  fill="#FF9C2B"
                />
              </g>
              <defs>
                <clipPath id="clip0_214_1141">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>{data.desc}</p>
          </Card>
        </div>
      ))} */}
      {/* <script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
      ></script>
      <div class="elfsight-app-0569c761-c836-4938-8c5e-e0da483a2a09"></div> */}
      {reviews && console.log("reviews : " + reviews)}
    </Div>
  );
};

export default TestimonialCard;

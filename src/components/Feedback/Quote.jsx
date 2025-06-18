// Quote svg used in feedback session

import React from "react";

const Quote = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <g clipPath="url(#clip0_2814_31626)">
        <circle cx="20" cy="20" r="20" fill="url(#paint0_linear_2814_31626)" />
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
          <stop stopColor="#03A89E" />
          <stop offset="1" stopColor="#00688B" />
        </linearGradient>
        <clipPath id="clip0_2814_31626">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Quote;

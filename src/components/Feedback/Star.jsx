// Star svg used in feedback session

import React from "react";

const Star = ({ type, measure, index }) => {
  if (type === "single") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 28 28"
        fill="none"
        key={index}
      >
        <path
          d="M13.9987 20.7315L21.2087 25.0832L19.2954 16.8815L25.6654 11.3632L17.277 10.6515L13.9987 2.9165L10.7204 10.6515L2.33203 11.3632L8.70203 16.8815L6.7887 25.0832L13.9987 20.7315Z"
          fill="#FF9C2B"
        />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        key={index}
      >
        <path
          d="M13.9987 20.7315L21.2087 25.0832L19.2954 16.8815L25.6654 11.3632L17.277 10.6515L13.9987 2.9165L10.7204 10.6515L2.33203 11.3632L8.70203 16.8815L6.7887 25.0832L13.9987 20.7315Z"
          fill="#FF9C2B"
        />
      </svg>
    );
  }
};

export default Star;

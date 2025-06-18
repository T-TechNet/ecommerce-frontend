import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import styled from "@emotion/styled";
import ProductReviewMobile from "./ProductReviewMobile";

const accordionStyle = {
  margin: 0, // Remove margin
  border: "1px solid #DEE3E5",
};

// const Button = styled.button`
//   font: 16px;
//   background: ${(props) => (props.className === "write" ? "#00688B" : "")};
// `;

export default function AccordionMobile() {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const handleChange1 = (event, isExpanded) => {
    setExpanded1(isExpanded);
  };
  const handleChange2 = (event, isExpanded) => {
    setExpanded2(isExpanded);
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <Accordion
        style={accordionStyle}
        expanded1={expanded1}
        onChange={handleChange1}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            style={{
              font: "black",
              fontWeight: "600",
              color: expanded1 ? "#00688B" : "inherit",
            }}
            className="spec"
          >
            Specifications
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={accordionStyle}
        expanded2={expanded2}
        onChange={handleChange2}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography
            style={{
              font: "black",
              fontWeight: "600",
              color: expanded2 ? "#00688B" : "inherit",
            }}
          >
            Rating & Reviews
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <ProductReviewMobile />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

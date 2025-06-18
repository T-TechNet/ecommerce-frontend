import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Specification from "./Specification";
import ProductReview from "./ProductReview";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "4px",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#03A89E",
  },
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(20),
    lineHeight: "24px",
    fontFamily: "Open Sans",
    marginRight: theme.spacing(1),
    color: "#85979E",
    "&.Mui-selected": {
      color: "#002734",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PC({ item }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className="PCcontainer"
      style={{
        width: "100%",
        padding: "20px 0 40px 0",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab label="Specifications" {...a11yProps(0)} />
            <StyledTab label="About This Item" {...a11yProps(1)} />
            {/* <StyledTab label="Reviews & Ratings" {...a11yProps(2)} /> */}
            {/* <StyledTab label="Resource" disabled {...a11yProps(2)} /> */}
          </StyledTabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Specification item={item} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <p
            style={{
              fontWeight: "400",
              fontSize: "18px",
              lineHeight: "27px",
              color: "#000000",
            }}
          >
            {item.overview ? item.overview : item.desc}
          </p>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProductReview />
        </TabPanel>
      </Box>
    </div>
  );
}

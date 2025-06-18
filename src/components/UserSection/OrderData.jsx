import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import style from "styled-components";
//TO SHOW ORDER STATE TAB
import PendingScreen from "./OrderDataDetail/PendingScreen";
import CompleteScreen from "./OrderDataDetail/CompleteScreen";
import CancelScreen from "./OrderDataDetail/CancelScreen";
import EmptyOrderScreen from "./OrderDataDetail/EmptyOrderScreen";

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
    width: "80%",
    backgroundColor: "#03A89E",
  },
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(15),
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
        <Box sx={{ p: "30px 10px 30px 0px" }}>
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

const DataTable = style.div`
  flex: 3;
  background: #fff;
 
@media only screen and (max-width: 759px) {
    margin-bottom: 20px;
  }
`;

const OrderData = ({ orders }) => {
  const [value, setValue] = React.useState(0);

  const [pendingOrders, setPendingOrders] = useState();
  const [deliveredOrders, setDeliveredOrders] = useState();
  const [canceledOrders, setCanceledOrders] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterOrders = () => {
    let pOrders = [];
    let dOrders = [];
    let cOrders = [];

    orders.forEach((element) => {
      if (element.status === "delivered") {
        dOrders.push(element);
      } else if (
        element.status === "pending" ||
        element.status === "shipped" ||
        element.status === "preparing"
      ) {
        pOrders.push(element);
      } else if (element.status === "cancelled") {
        cOrders.push(element);
      }
    });

    setPendingOrders(pOrders);
    setDeliveredOrders(dOrders);
    setCanceledOrders(cOrders);
  };

  useEffect(() => {
    filterOrders();
  }, [orders]);

  return (
    <DataTable>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab label="Pending" {...a11yProps(0)} />
            <StyledTab label="Completed" {...a11yProps(1)} />
            <StyledTab label="Canceled" {...a11yProps(2)} />
          </StyledTabs>
        </Box>

        <TabPanel value={value} index={0}>
          {pendingOrders?.length > 0 ? (
            <PendingScreen orders={pendingOrders} />
          ) : (
            <EmptyOrderScreen type="pending" />
          )}
        </TabPanel>

        <TabPanel value={value} index={1}>
          {deliveredOrders?.length > 0 ? (
            <CompleteScreen orders={deliveredOrders} />
          ) : (
            <EmptyOrderScreen type="completed" />
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {canceledOrders?.length > 0 ? (
            <CancelScreen orders={canceledOrders} />
          ) : (
            <EmptyOrderScreen type="canceled" />
          )}
        </TabPanel>
      </Box>
    </DataTable>
  );
};

export default OrderData;

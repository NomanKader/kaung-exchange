import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  CategoryOutlined,
  AccountCircleOutlined,
  ProductionQuantityLimits,
  SellOutlined,
  Money,
  MonetizationOn,
} from "@mui/icons-material";
import DecryptDataComponent from "../../../data/aes/DecryptData";

export const mainListItems = (history) => {
  const userRole = DecryptDataComponent(sessionStorage.getItem("userRole"));

  return (
    <React.Fragment>
      {userRole === "Admin" ? (
        <>
          {/* <ListItemButton onClick={() => history.push("/admin/dashboard")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton> */}
          <ListItemButton onClick={() => history.push("/admin/mobilemoney")}>
            <ListItemIcon>
              <MonetizationOn/>
            </ListItemIcon>
            <ListItemText primary="Wallet" />
          </ListItemButton>
          {/* <ListItemButton onClick={() => history.push("/admin/stock")}>
            <ListItemIcon>
              <ProductionQuantityLimits />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItemButton>
          <ListItemButton onClick={() => history.push("/admin/report")}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItemButton> */}
        </>
      ) : (
        <ListItemButton onClick={() => history.push("/cashier/sale")}>
          <ListItemIcon>
            <SellOutlined />
          </ListItemIcon>
          <ListItemText primary="Sale" />
        </ListItemButton>
      )}
    </React.Fragment>
  );
};

export const secondaryListItems = (history) => {
  const userRole = DecryptDataComponent(sessionStorage.getItem("userRole"));

  return (
    userRole === "Admin" && (
      <React.Fragment>
        <ListItemButton onClick={() => history.push("/admin/user")}>
          <ListItemIcon>
            <AccountCircleOutlined />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItemButton>
      </React.Fragment>
    )
  );
};
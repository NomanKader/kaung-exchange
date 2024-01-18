import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { AccountCircleRounded } from "@mui/icons-material";

const DashboardCardComponent = ({ title, data }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            {title=='Total Users'?
            <AccountCircleRounded fontSize="large" color="primary" />:
            <MonetizationOnIcon fontSize="large" color="primary" />
            }            
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {title}
            </Typography>
          </Grid>
        </Grid>
        {title==="Daily Sales" ?
        <Typography variant="h5" sx={{ ml: 5 }} color="primary" gutterBottom>
          { parseInt(data).toLocaleString()+ " MMK"}
        </Typography>:
        title=="Total Products"?
        <Typography variant="h5" sx={{ ml: 5 }} color="primary" gutterBottom>
          {data}
        </Typography>:
        <Typography variant="h5" sx={{ ml: 5 }} color="primary" gutterBottom>
          {data}
      </Typography>
        }
      </CardContent>
    </Card>
  );
};

export default DashboardCardComponent;

import { Card,CardContent,Grid,Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
export default function DashboardSaleReportCardComponent({ title, data }) {
  return (
    <Card sx={{width:{xs:'100%',lg:'30%'}}}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <MonetizationOnIcon fontSize="large" color="primary" />
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ ml: 5 }} color="primary" gutterBottom>
          {data.toLocaleString()+ " MMK"}
        </Typography>
      </CardContent>
    </Card>
  );
}

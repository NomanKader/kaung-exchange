import {
  ThemeProvider,
  Container,
  Grid,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import theme from "../../../theme";
import AppBarDrawerComponent from "../../../components/AppBarDrawer/AppBarDrawerComponent";
import DashboardCardComponent from "../../../components/Card/DashboardCardComponent";
import userData from "../../../data/user_data";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import GetDashboardDataAPI from "../../../api/dashboard/DashboardController";
import DashboardStockCardComponent from "../../../components/Card/DashboardStockCardComponent";
import DecryptDataComponent from "../../../data/aes/DecryptData";
import _GetUserRoleService from "../../../service/GetUserRoleService";
// TODO remove, this demo shouldn't need to reset the theme.
export default function DashboardPage({ history }) {
  const [dashboardData, setDashboardData] = useState([]);
  const [lowStockData, setLowStockData] = useState([]);
  const [stockData, setStockData] = useState(0);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [showTable, setShowTable] = useState(false);
  console.log(userData.User_Role);
  useEffect(() => {
    const accessStatus=_GetUserRoleService();
    accessStatus.then((res)=>{
      if(res==true){

      }
      else{
        history.push('/');
      }
    })
  }, [dashboardData]);
  const handleStock = () => {
    console.log("Product", product);
    //getting product stock quantity by product name
    axios
      .get(
        process.env.REACT_APP_API_ENDPOINT +
          "product/quantity/" +
          product.Product_Name
      )
      .then((response) => {
        setStockData(response.data.availableQuantity);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const columns = [
    {
      name: "index",
      label: "SrNo",
    },
    {
      name: "product",
      label: "Product",
    },
  ];

  const options = {
    selectableRows: "none",
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBarDrawerComponent history={history} title="Dashboard">
        <Container
          sx={{
            mt: 4,
            mb: 4,
            ml: 0,
            flex: 1,
            flexDirection: "row",
            display: "flex",
          }}
        >
          <Grid container spacing={3} sx={{ flexDirection: "row" }}>
            {/* Chart */}
            <Grid item xs={12} md={4} lg={4}>
              <DashboardCardComponent
                title="Daily Sales"
                data={parseInt(dashboardData.totalSaleAmount || 0)}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <DashboardCardComponent
                title="Total Products"
                data={dashboardData.totalProducts}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <DashboardCardComponent
                title="Total Users"
                data={dashboardData.totalUsers}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={2}>
              <Autocomplete
                id="product-autocomplete"
                options={products}
                getOptionLabel={(option) => option.Product_Name}
                sx={{ width: { lg: "100%", xs: "80%" }, mt: 1 }}
                value={product}
                onChange={(event, newValue) => setProduct(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product"
                    variant="outlined"
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Button
                disabled={product == null}
                variant="contained"
                sx={{ mt: { xs: 1, lg: 4 } }}
                onClick={() => handleStock()}
              >
                Check Stock
              </Button>
            </Grid>
            {/* Show Stock Card */}
            <Grid item xs={12} lg={12}>
              <DashboardStockCardComponent title="Quantity" data={stockData} />
            </Grid>
            {/* MUI Datatable to display sales data */}
            <Grid item xs={12} md={12} lg={12}>
              {showTable ? (
                <MUIDataTable
                  title="Low Stock List"
                  data={lowStockData}
                  columns={columns}
                  options={options}
                />
              ) : (
                <h1>Loading...</h1>
              )}
            </Grid>
          </Grid>
        </Container>
      </AppBarDrawerComponent>
    </ThemeProvider>
  );
}

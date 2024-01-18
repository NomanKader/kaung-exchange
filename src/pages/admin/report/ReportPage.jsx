import React, { useEffect,useState } from "react";
import { Grid, Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";
import AppBarDrawerComponent from "../../../components/AppBarDrawer/AppBarDrawerComponent";
import DashboardSaleReportCardComponent from "../../../components/Card/DashhboardSaleReportCardComponent";
import _GetUserRoleService from "../../../service/GetUserRoleService";
export default function ReportPage({ history }) {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [salesData, setSalesData] = useState([]);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [showTable, setShowTable] = useState(true);
  useEffect(() => {
    const accessStatus=_GetUserRoleService();
    accessStatus.then((res)=>{
      if(res==true){
        handleSaleReport();
      }
      else{
        history.push('/');
      }
    })
  }, []);
  const handleSaleReport = () => {
    setShowTable(false);
    const from_date = dayjs(fromDate).format("YYYY-MM-DD");
    const to_date = dayjs(toDate).format("YYYY-MM-DD");
    setSalesData([]);
    // Fetch sales data based on fromDate and toDate
    axios
      .get(
        process.env.REACT_APP_API_ENDPOINT +
          "sale/between-dates?FromDate=" +
          from_date +
          "&ToDate=" +
          to_date
      )
      .then((response) => {
        console.log("Sale Data", response.data.sales);
        setSalesData(response.data.sales);
        let totalAmount = 0;
        response.data.sales.map(({ total_price }) => {
          totalAmount += parseInt(total_price || 0);
        });
        setTotalSaleAmount(totalAmount);
        setShowTable(true);
        console.log("Total Amount", totalAmount);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  };
  const handleFromDateChange = (newValue) => {
    setFromDate(newValue);
  };

  const handleToDateChange = (newValue) => {
    setToDate(newValue);
  };
  const columns = [
    {
      name: "product_name",
      label: "Product Name",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "category_name",
      label: "Category",
    },
    {
      name: "total_price",
      label: "Total",
    },
  ];

  const options = {
    selectableRows: "none",
  };
  return (
    <div>
      <AppBarDrawerComponent title="Report" history={history}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                onChange={(value) => handleFromDateChange(value)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To Date"
                onChange={(vale) => handleToDateChange(vale)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={() => handleSaleReport()}
            >
              Sale Report
            </Button>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <DashboardSaleReportCardComponent
              title="Total Sales"
              data={totalSaleAmount}
            />
          </Grid>
          {/* MUI Datatable to display sales data */}
          {showTable && (
            <Grid item xs={12} md={12} lg={12}>
              <MUIDataTable
                title={
                  fromDate == null && toDate == null
                    ? "Sales Report By Today"
                    : "Sales Data By "+dayjs(fromDate).format("DD/MM/YYYY")+" - "+dayjs(toDate).format("DD/MM/YYYY")
                }
                data={salesData}
                columns={columns}
                options={options}
              />
            </Grid>
          )}
        </Grid>
      </AppBarDrawerComponent>
    </div>
  );
}

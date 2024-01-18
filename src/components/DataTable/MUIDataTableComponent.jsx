import { Typography } from "@mui/material"
import MUIDataTable from "mui-datatables"
export default function MUIDataTableComponent({title,data,columns,options}){
    return(
        <>
        <Typography variant="h6" gutterBottom sx={{ mt: 2,mb:2 }}>
        {title}
      </Typography>
      {data.length > 0 ? (
        <MUIDataTable data={data} columns={columns} options={options} />
      ) : (
        <Typography>No categories available.</Typography>
      )}
      </>
    )
}
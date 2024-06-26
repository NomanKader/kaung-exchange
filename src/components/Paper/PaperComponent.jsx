import { Grid,Paper,Typography } from "@mui/material";
import theme from "../../theme";
export default function PaperComponent({header,value}){
    return(
        <Grid item xs={6}>
        <Paper
          elevation={3}
          sx={{
            width: 300,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",            
            borderRadius:5
          }}
        >
          <Typography align="center" variant="body1" fontWeight='bold'>
            <span style={{color:theme.palette.primary.main}}>{header}</span> : {value} ကျပ်
          </Typography>
        </Paper>
      </Grid>
    )
}
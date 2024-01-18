import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../theme";
import AppBarDrawerComponent from "../../../components/AppBarDrawer/AppBarDrawerComponent";
import StockComponent from "../../../components/Stock/StockComponent";
import { useEffect } from "react";
import _GetUserRoleService from "../../../service/GetUserRoleService";

export default function StockPage({history}){
    useEffect(()=>{
        const accessToken=_GetUserRoleService();
        accessToken.then((res)=>{
            if(res==true){

            }
            else{
                history.push('/')
            }
        })
    },[])
    return(
        <ThemeProvider theme={theme}>
            <AppBarDrawerComponent history={history} title="Product">
                <StockComponent/>
            </AppBarDrawerComponent>
        </ThemeProvider>
    )
}
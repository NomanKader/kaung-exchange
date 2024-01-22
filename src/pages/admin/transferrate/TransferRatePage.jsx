import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../theme";
import AppBarDrawerComponent from "../../../components/AppBarDrawer/AppBarDrawerComponent";
import UserFormComponent from "../../../components/User/UserFormComponent";
import { useEffect } from "react";
import _GetUserRoleService from "../../../service/GetUserRoleService";
import TransferRateFormComponent from "../../../components/TransferRate/TransferRateFormComponent";
export default function UserPage({history}){
    useEffect(()=>{
        const accessStatus=_GetUserRoleService();
        accessStatus.then((res)=>{
            if(res==true){
            }
            else{
                history.push("/");            
            }
        })
    },[])
    return(
        <ThemeProvider theme={theme}>
            <AppBarDrawerComponent title="Transfer Rate" history={history}>
                <TransferRateFormComponent/>
            </AppBarDrawerComponent>    
        </ThemeProvider>
    )
}
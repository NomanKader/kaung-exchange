import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import AppBarDrawerComponent from "../../../components/AppBarDrawer/AppBarDrawerComponent";
import { useEffect } from "react";
import _GetUserRoleService from "../../../service/GetUserRoleService";
import CurrencyExchangeFormComponent from '../../../components/ExchangeWallet/ExchangeWalletComponent';
export default function ExchangeWalletPage({history}){
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
            <AppBarDrawerComponent title="Currency Exchange" history={history}>
                <CurrencyExchangeFormComponent/>
            </AppBarDrawerComponent>    
        </ThemeProvider>
    )
}
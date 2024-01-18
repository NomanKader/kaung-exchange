import  React,{useEffect, useState} from "react";
import SaleFormComponent from "../../components/Sale/SaleFormComponent";
import AppBarDrawerComponent from "../../components/AppBarDrawer/AppBarDrawerComponent";
import BackDropComponent from "../../components/Loading/BackDropComponent";
export default function SalePage({ history }) {
    const [showBackDrop,setShowBackDrop]=useState(false);
    useEffect(()=>{
        if(sessionStorage.getItem('UserRole')==null){
            history.push('/')        
        }
    },[])
    return(
       <AppBarDrawerComponent title="Sale" history={history}>
        <SaleFormComponent/>
        {showBackDrop && <BackDropComponent/>}
       </AppBarDrawerComponent>
    )
}

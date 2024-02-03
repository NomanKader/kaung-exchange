import  React,{useEffect, useState} from "react";
import SaleFormComponent from "../../components/Sale/SaleFormComponent";
import AppBarDrawerComponent from "../../components/AppBarDrawer/AppBarDrawerComponent";
import BackDropComponent from "../../components/Loading/BackDropComponent";
import DecryptDataComponent from "../../data/aes/DecryptData";
export default function SalePage({ history }) {
    const [showBackDrop,setShowBackDrop]=useState(false);
    useEffect(()=>{
        const userRole=sessionStorage.getItem('userRole');        
        if(userRole==null){
            //history.push('/')        
        }
        else{
            const role=DecryptDataComponent(userRole);
            // role!='Staff'?
        }
    },[])
    return(
       <AppBarDrawerComponent title="Sale" history={history}>
        <SaleFormComponent/>
        {showBackDrop && <BackDropComponent/>}
       </AppBarDrawerComponent>
    )
}

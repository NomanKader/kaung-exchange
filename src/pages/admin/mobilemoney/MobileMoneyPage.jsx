import  React,{useEffect, useState} from "react";
import SupplierFormComponent from '../../../components/Supplier/SupplierFormComponent';
import AppBarDrawerComponent from '../../../components/AppBarDrawer/AppBarDrawerComponent'
import BackDropComponent from "../../../components/Loading/BackDropComponent";
import DecryptDataComponent from "../../../data/aes/DecryptData";
import _GetUserRoleService from "../../../service/GetUserRoleService";
import WalletFormComponent from "../../../components/Wallet/WalletFormComponent";

export default function MobileMoneyPage({ history }) {
    const [showBackDrop,setShowBackDrop]=useState(false);
    useEffect(() => {
       const accessStatus=_GetUserRoleService();
       !accessStatus && history.push('/');
    },[])
    return(
       <AppBarDrawerComponent title='Mobile Money Account' history={history}>
        <WalletFormComponent/>
        {showBackDrop && <BackDropComponent/>}
       </AppBarDrawerComponent>
    )
}

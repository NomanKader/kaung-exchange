import  React,{useEffect, useState} from "react";
import SupplierFormComponent from '../../../components/Supplier/SupplierFormComponent';
import AppBarDrawerComponent from '../../../components/AppBarDrawer/AppBarDrawerComponent'
import BackDropComponent from "../../../components/Loading/BackDropComponent";
import DecryptDataComponent from "../../../data/aes/DecryptData";
import _GetUserRoleService from "../../../service/GetUserRoleService";

export default function SupplierPage({ history }) {
    const [showBackDrop,setShowBackDrop]=useState(false);
    useEffect(() => {
       const accessStatus=_GetUserRoleService();
       !accessStatus && history.push('/');
    },[])
    return(
       <AppBarDrawerComponent title='Supplier' history={history}>
        <SupplierFormComponent/>
        {showBackDrop && <BackDropComponent/>}
       </AppBarDrawerComponent>
    )
}

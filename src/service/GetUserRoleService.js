import DecryptDataComponent from "../data/aes/DecryptData";
const _GetUserRoleService=async()=>{
    const userRole=DecryptDataComponent(sessionStorage.getItem('userRole'));
    if(userRole==null || userRole!='Admin'){
        return false;       
    }
    else{
       return true;
    }        
}     
export default _GetUserRoleService;   
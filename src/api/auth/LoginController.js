import axios from 'axios';
import userData from '../../data/user_data';
import EncryptDataComponent from '../../data/aes/EncryptData';
const LoginAPI=async(postBody,history)=>{
    await axios.post(process.env.REACT_APP_API_ENDPOINT+'user/login',postBody)
    .then((res)=>{
        if(res.status===200){            
            const userRole=res.data.UserRole;            
            var cipherUserRole=EncryptDataComponent(userRole);
            sessionStorage.setItem('userRole',cipherUserRole);
            console.log("Data",cipherUserRole);
            const routePath=userRole==='Admin'?'/admin/user':'/staff/sale';          
            history.push(routePath)
        }
    }).catch((err)=>{
        console.log(err);        
    })
}
export default LoginAPI;    
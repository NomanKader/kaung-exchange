import axios from "axios";
import GetWalletAPI from "./GetWalletController";
const UpdateWalletAPI=async(postBody,setWalletList,setShowBackDrop,toast)=>{
    setShowBackDrop(true);
    await axios.put(process.env.REACT_APP_API_ENDPOINT+"wallet",postBody)
    .then((res)=>{
        if(res.status===200){   
            toast.success("Wallet Updated");
            GetWalletAPI(setWalletList,setShowBackDrop,toast);
            setShowBackDrop(false);
        }
    }).catch(err=>{
        if(err.response.status==409){
            setShowBackDrop(false);
            toast.warning('Wallet Already Exist');
        }
        else{
            console.error("Wallet Update Error",err);
            setShowBackDrop(false);
            toast.error("Server Busy");
        }
        
    })
}
export default UpdateWalletAPI;
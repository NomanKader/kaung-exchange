import axios from "axios";
import GetExchangeWalletAPI from "./GetExchangeWalletController";

const CreateExchangeWalletAPI=async(postBody,setShowBackDrop,toast,setExchangeWalletList)=>{
    setShowBackDrop(true);
    const headers={
        'Authorization':process.env.AUTHORIZATION,
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT+'exchangewallet',postBody,{headers:headers})
    .then(()=>{
        toast.success("Exchanged Successfully");
        GetExchangeWalletAPI(setExchangeWalletList,setShowBackDrop,toast);
    }).catch((err)=>{
        setShowBackDrop(false);
        if(err.response.status==402){
            toast.warn("Insufficient Amount");
        }
        else if(err.response.status==406){
            toast.warn(err.response.data);
        }
        // toast.error("Error");
        // console.error("Error",err);
    })
}
export default CreateExchangeWalletAPI;
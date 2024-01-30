import axios from "axios";
import GetWalletAPI from "./GetWalletController";
const CreateWalletAPI = async (postBody,setWalletList,setShowBackDrop,toast) => {
    setShowBackDrop(true);
    await axios.post(process.env.REACT_APP_API_ENDPOINT + "wallet",postBody)
    .then(res => {
        if(res.status){
            GetWalletAPI(setWalletList,setShowBackDrop,toast)
            setShowBackDrop(false);
            toast.success("Wallet Created Successfully");
        }
    }).catch(err => {
        if(err.response.status==409){
            setShowBackDrop(false);
            toast.warning('Wallet Already Exist');
        }
        else{
            setShowBackDrop(false);
            console.error("Wallet Create Error",err);
            toast.error("Server Busy");
        }
    })
}
export default CreateWalletAPI;
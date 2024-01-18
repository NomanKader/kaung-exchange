import axios from "axios";
const GetWalletAPI=async(setWalletList,setShowBackDrop,toast)=>{
    setShowBackDrop(true);
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'wallet')
    .then((res)=>{
        setWalletList(res.data);        
    }).catch((err)=>{
        console.error(err);
        toast.error("System Error");
    })
}
export default GetWalletAPI;
import axios from "axios";
const GetWalletAPI=async(setWalletList,setShowBackDrop,toast)=>{
    const headers={
        'Authorization':process.env.AUTHORIZATION,
    }
    setShowBackDrop(true);
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'wallet',{headers:headers})
    .then((res)=>{
        setWalletList(res.data);
        setShowBackDrop(false);        
    }).catch((err)=>{
        setShowBackDrop(false);
        console.error(err);
        toast.error("System Error");
    })
}
export default GetWalletAPI;
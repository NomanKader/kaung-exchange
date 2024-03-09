import axios from "axios";
const GetExchangeWalletAPI=async(setExchangeWalletList,setShowBackDrop,toast,fromDate,toDate)=>{
    const headers={
        'Authorization':process.env.AUTHORIZATION,
    }
    setShowBackDrop(true);
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'exchangewallet?fromDate='+fromDate+'&toDate='+toDate,{headers:headers})
    .then((res)=>{
        console.log("Data",res.data);
        setExchangeWalletList(res.data)
        setShowBackDrop(false);
    }).catch((err)=>{
        toast.error('Error');
        console.error('Error at getting exchange wallet list',err);
    })
}
export default GetExchangeWalletAPI;
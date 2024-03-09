import axios  from "axios";
const GetTransferRateAPI=async(setTransferList,setShowBackDrop)=>{
  const headers={
    'Authorization':process.env.AUTHORIZATION,
}
   await axios
    .get(process.env.REACT_APP_API_ENDPOINT + "transferrate",{headers:headers})
    .then((response) => {
      console.log("Transfer Rates",response.data);
      setTransferList(response.data);
      setShowBackDrop(false);
    })
    .catch((error) => {
      setShowBackDrop(false);      
      console.error("Error fetching users:", error);
    });
}
export default GetTransferRateAPI;
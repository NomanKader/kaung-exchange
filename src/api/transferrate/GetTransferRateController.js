import axios  from "axios";
const GetTransferRateAPI=async(setTransferList,setShowBackDrop)=>{
   await axios
    .get(process.env.REACT_APP_API_ENDPOINT + "transferrate")
    .then((response) => {
      console.log("Transfer Rates",response.data);
      setTransferList(response.data);
      setShowBackDrop(false);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}
export default GetTransferRateAPI;
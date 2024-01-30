import axios from "axios";
import GetTransferRateAPI from "./GetTransferRateController";
const CreateTransferRateAPI = async (postBody,setTransferList,setShowBackDrop,setMobileMoney,setCashInPercentage,setCashOutPercentage,toast) => {
    console.log("Transfer Rate Post Body",postBody)
  await axios
    .post(process.env.REACT_APP_API_ENDPOINT+'transferrate',postBody)
    .then(() => {
      // Update the users list after successful addition
      GetTransferRateAPI(setTransferList,setShowBackDrop);
      setMobileMoney("");
      setCashInPercentage("");
      setCashOutPercentage("");
      toast.success("Transfer Rates Added Successfully");
    })
    .catch((error) => {
      if(error.response.status==409){
        setShowBackDrop(false);
        toast.warning("Transfer Rates Already Exists");
      }
      else{
        toast.error(error);
      }
    });
};
export default CreateTransferRateAPI;

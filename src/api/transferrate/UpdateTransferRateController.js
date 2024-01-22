import axios from "axios";
import GetTransferRateAPI from "./GetTransferRateController";
const UpdateTransferRateAPI=async(postBody,setTransferRateList,setShowBackDrop,toast)=>{
  setShowBackDrop(true);
  console.log("Transfer Rate Update Post Body",postBody)
    axios
      .put(process.env.REACT_APP_API_ENDPOINT+'transferrate',postBody)
      .then((response) => {
        console.log("Transfer Rates updated successfully:", response.data);

        // Update the users list after successful update
        GetTransferRateAPI(setTransferRateList,setShowBackDrop);
        toast.success('Transfer Rates Updated Successfully');
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast.warning('Transfer Rates Already Exists');
        } else {
          toast.error('Server is Busy');
        }
        console.error("Error updating user:", error);
      });
}
export default UpdateTransferRateAPI;
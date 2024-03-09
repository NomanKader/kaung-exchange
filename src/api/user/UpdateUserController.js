import axios from "axios";
import GetUserAPI from "./GetUserController";
const UpdateUserAPI=async(postBody,setUsers,setShowBackDrop,toast)=>{
  const headers={
    'Authorization':process.env.AUTHORIZATION,
}
  setShowBackDrop(true);
    axios
      .put(process.env.REACT_APP_API_ENDPOINT+'user',postBody,{headers:headers})
      .then((response) => {
        console.log("User updated successfully:", response.data);

        // Update the users list after successful update
        GetUserAPI(setUsers,setShowBackDrop);
        toast.success('User Updated Successfully');
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast.warning('User Already Exists');
        } else {
          toast.error('Server is Busy');
        }
        console.error("Error updating user:", error);
      });
}
export default UpdateUserAPI;
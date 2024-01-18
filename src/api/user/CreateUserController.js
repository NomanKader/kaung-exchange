import axios from "axios";
import GetUserAPI from "./GerUserController";
const CreateUserAPI = async (postBody,setUsers,setShowBackDrop,setUserName,setPassword,setUserRole,toast) => {
  await axios
    .post(process.env.REACT_APP_API_ENDPOINT+'user',postBody)
    .then((response) => {
      // Update the users list after successful addition
      GetUserAPI(setUsers,setShowBackDrop);
      setUserName("");
      setPassword("");
      setUserRole("");
      toast.success("User Added Successfully");
    })
    .catch((error) => {
      if(error.response.status==409){
        toast.error("User Already Exists");
      }
      else{
        toast.error(error);
      }
    });
};
export default CreateUserAPI;

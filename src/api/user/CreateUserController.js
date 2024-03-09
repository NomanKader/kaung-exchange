import axios from "axios";
import GetUserAPI from "./GetUserController";
const CreateUserAPI = async (postBody,setUsers,setShowBackDrop,setUserName,setPassword,setUserRole,toast) => {
  const headers={
    'Authorization':process.env.AUTHORIZATION,
}
  await axios
    .post(process.env.REACT_APP_API_ENDPOINT+'user',postBody,{headers:headers})
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

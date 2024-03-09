import axios  from "axios";
const GetUserAPI=async(setUsers,setShowBackDrop)=>{
  const headers={
    'Authorization':process.env.AUTHORIZATION,
}
   await axios
    .get(process.env.REACT_APP_API_ENDPOINT + "user",{headers:headers})
    .then((response) => {
      console.log("Users",response.data);
      setUsers(response.data);
      setShowBackDrop(false);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}
export default GetUserAPI;
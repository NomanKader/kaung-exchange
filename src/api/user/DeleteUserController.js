import GetUserAPI from "./GetUserController";

const DeleteUserAPI = async (postBody, setUsers, users, setShowBackDrop, toast) => {
  const headers={
    'Authorization':process.env.AUTHORIZATION,
}
  setShowBackDrop(true);
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  };

  try {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + 'user', requestOptions,{headers:headers});

    if (response.ok) {
      console.log("User deleted successfully");
      // Update the users list after successful deletion
      const updatedUsers = users.filter((user) => user.UserID !== postBody.userID);
      setUsers(updatedUsers);
      GetUserAPI(setUsers,setShowBackDrop);
      toast.success('User Deleted Successfully');
    } else {
      const errorData = await response.json();
      if (response.status === 409) {
        toast.warning('User Already Exists');
      } else {
        toast.error(`Error deleting user: ${errorData}`);
      }
    }
  } catch (error) {
    toast.error(error);
  }
};

export default DeleteUserAPI;

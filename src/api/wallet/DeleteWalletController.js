import GetWalletAPI from "./GetWalletController";

const DeleteWalletAPI = async (postBody, setWalletList, setShowBackDrop, toast) => {
  const headers={
    'Authorization':process.env.AUTHORIZATION,
}
  setShowBackDrop(true);
  console.log("PostBody", postBody);

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  };

  try {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + 'wallet', requestOptions,{headers:headers});
    if (response.ok) {
      GetWalletAPI(setWalletList,setShowBackDrop,toast);
      setShowBackDrop(false);
      toast.success('Wallet Deleted Successfully');
    } else {
      const errorData = await response.json();
        toast.error(`Error deleting wallet: ${errorData.message}`);
    }
  } catch (error) {
    setShowBackDrop(false);
    console.error("Error deleting wallet:", error);
    toast.error('Server is Busy');
  }
};

export default DeleteWalletAPI;

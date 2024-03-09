import axios  from "axios";
const GetDashboardDataAPI=async(setDashboardData)=>{
    const headers={
        'Authorization':process.env.AUTHORIZATION,
    }
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'dashboard',{headers:headers}).then((res)=>{
        console.log("Dashboard Data",res.data);
        setDashboardData(res.data);
    }).catch((err)=>{
        console.error("Error",err);
    })
}   
export default GetDashboardDataAPI;
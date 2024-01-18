import axios  from "axios";
const GetDashboardDataAPI=async(setDashboardData)=>{
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'dashboard').then((res)=>{
        console.log("Dashboard Data",res.data);
        setDashboardData(res.data);
    }).catch((err)=>{
        console.error("Error",err);
    })
}   
export default GetDashboardDataAPI;
import axios from "axios";
import {authHeader} from "./procedure";


const API_URL = "https://localhost:5000/api/masters";

export const fetchMasters = async ( ) => {
    const {data} = await axios.get(API_URL)
    console.log(data)
    return data
}


export const deleteMaster =async(id)=>
{

    try
    {
        const res =await axios.delete(`https://localhost:5000/api/masters/${id}`,{headers: authHeader()})
        return res;
    }
    catch (e)
    {
        console.log(e);
    }

}

export const ratingMaster = async(id)=>
{
    try
    {
       const res = await axios.get(`https://localhost:5000/api/masters/rating/${id}`)
    console.log(res.data._avg)
        return res.data._avg;
    }
    catch (e)
    {
        console.log(e);
    }
}

export const getMastersByProcedure = async(id)=>
{
    try
    {
        const res=  await axios.get(`https://localhost:5000/api/procedures/mastersAndProcedures/${id}`)
        return res;
    }
    catch (e)
    {
        console.log(e);
    }
}
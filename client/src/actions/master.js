import axios from "axios";
import {authHeader} from "./procedure";


const API_URL = "http://localhost:5000/api/masters";

export const fetchMasters = async ( ) => {
    const {data} = await axios.get(API_URL)
    console.log(data)
    return data
}


export const deleteMaster =async(id)=>
{

    try
    {
        const res =await axios.delete(`http://localhost:5000/api/masters/${id}`,{headers: authHeader()})
        return res;
    }
    catch (e)
    {
        console.log(e);
    }

}
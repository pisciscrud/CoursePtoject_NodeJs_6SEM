import axios from "axios";


const API_URL = "http://localhost:5000/api/masters";

export const fetchMasters = async ( page, limit= 5) => {
    const {data} = await axios.get(API_URL)
    return data
}
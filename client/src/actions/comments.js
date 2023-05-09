import axios from 'axios'


export const getComments = async ()=>
{
    try
    {

        const res = await axios.get('https://localhost:5000/api/comments/all',{headers: authHeader()})
        console.log('aaa',res.data)
        return res.data;

    }
    catch (e)
    {

    }
}

export const fetchNotifications =async() =>{
    try {
        const response = await axios.get('https://localhost:5000/api/notifications',{headers: authHeader()});

        return response.data
    } catch (error) {
        console.error(error);
    }
}

function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`};
    } else {
        return {};
    }
}


export const onDeleteNotification = async(id)=>
{
    try {
        const res =await axios.delete(`https://localhost:5000/api/notifications/${id}`,{headers: authHeader()})
        return res;
    }
    catch (error) {
        console.error(error);
    }
}
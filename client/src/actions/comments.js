import axios from 'axios'


export const getComments = async ()=>
{
    try
    {

        const res = await axios.get('http://localhost:5000/api/comments/all',{headers: authHeader()})
        console.log('aaa',res.data)
        return res.data;

    }
    catch (e)
    {

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
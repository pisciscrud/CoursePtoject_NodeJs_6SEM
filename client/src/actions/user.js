import axios from "axios";


const API_URL = "https://localhost:5000/api/auth/";

export  const registeration = async (FullName,email,login,password) => {

try {

    const response = await axios.post(API_URL + "register", {

        FullName,
        email,
        login,
        password,

    });

    alert(response.data.message)
}
catch (err)
{
    alert(err.response.data.message)
}

};


export const getPetsOfUser = async()=>
{
  const response = await axios.get('https://localhost:5000/api/pets/petsOfUser',{headers: authHeader()})
    console.log('pets' ,response.data);
    return response.data;
}
export const getNotesOfUser = async(id)=>
{

    const response = await axios.get(`https://localhost:5000/api/schedule/recordsOfUser/${id}`,{headers: authHeader()})
        console.log('notes' ,response.data);
        return response.data;
}

 function authHeader() {
     const token = JSON.parse(localStorage.getItem('token'));
     if (token) {
         return {Authorization: `Bearer ${token}`};
     } else {
         return {};
     }
 }

export const isAdmin = async ()=>
{

  const res = await axios.get(`${API_URL}admin`, {headers: authHeader()});
  console.log(res);

  return res.data;
}



export const loginIn = async (login,password)=>{


try {
    const response = await axios.post(API_URL + "login", {
        login,
        password,

    });
    localStorage.setItem("token", JSON.stringify(response.data));
}
catch (err)
{
    alert(err.response.data.message);
}

}


export const sendComment = async (  content,rating, master_id, procedure_id,record_id)=>{
    try
    {
     console.log('record_id',record_id);
       const date_=new Date();
       console.log(date_)
       const resp = axios.post('https://localhost:5000/api/comments/add',
            {
                date_,
                rating,
                content,
                master_id,
                procedure_id,
                record_id
            },{headers: authHeader()})
        return resp;
    }
    catch(err)
    {
        alert(err.response.data.message);
    }

}

import axios from "axios";


const API_URL = "http://localhost:5000/api/auth/";

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

  return res;
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
import axios from "axios";


export const getSchedule =async()=> {

  const records =await   axios.get('https://localhost:5000/api/schedule/all')
    console.log('schedule', records.data)
    return records.data;
       /* .then(response => {
                setSchedule(response.data)
                console.log('schedule', response.data)
            }
        )*/
}
function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`};
    } else {
        return {};
    }
}

export const nearestForUser = async ()=>
{
    try
    {

        const res = await axios.get('https://localhost:5000/api/schedule/nearest',{headers: authHeader()});

        return res.data;
    }
    catch(e)
    {alert ('ERROR WITH SUBMIT')}
}


export const sendRequestOnProcedure = async (pet_id,master_id,procedure_id,date,time)=>
{
try {
    const date_=new Date(date)

    const {response}= await axios.post('https://localhost:5000/api/schedule/submit',
    {pet_id,
    master_id,
    procedure_id,
   date_,
    time}
    , {headers: authHeader()})
    return response;
}
catch(e)
{
    alert ('ERROR WITH SUBMIT')
}

}


export const deleteRecord = async (record_id) =>
{
    try
    {
        const res= await axios.delete(`https://localhost:5000/api/schedule/${record_id}`,{headers: authHeader()})
        console.log('RES',res);
        return res;
    }
    catch (e)
    {

    }

}
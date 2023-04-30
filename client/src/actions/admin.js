import axios from 'axios'


function authHeader(){
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`};
    } else {
        return {};
    }
}
export const GetWaitingRecords = async()=>
{
    try
    {
        const records = await axios.get('http://localhost:5000/api/schedule/waiting',{headers: authHeader()})

        return records.data;
    }
    catch(e)
    {

    }
}


export const handleConfirm = async(status_id, record_id)=>
    {


        try{

            const res = await axios.post('http://localhost:5000/api/schedule/confirm',
                {
                     status_id,
                    record_id
                },{headers: authHeader()})

            return res.data;
        }
        catch(e)
        {}
    }

export const getScheduleOfDay = async ()=>
{
    try
    {
        const records= await axios.get('http://localhost:5000/api/schedule/current-day',{headers: authHeader()})
        console.log('schedule',records.data)
        return records.data;
    }
    catch(e)
    {

    }
}


export const addProcedure=async(formData)=>
{
    try
    {
        // const result = Procedure_to_pet.map(pet_id => ({ pet_id }));
        // const jsonResult = JSON.stringify(result);





        const proc = await axios.post('http://localhost:5000/api/procedures',
            // {
            //
            //
            //
            //     name_procedure,
            //     Price,
            //     description,
            //     img,
            //     jsonResult
            // },
            formData,
        {headers:{ ...authHeader(), 'Content-Type': 'multipart/form-data'}})
        return proc;



    }
    catch(e)
    {}
}
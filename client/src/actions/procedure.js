import axios from "axios";
export const authHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`};
    } else {
        return {};
    }
}

export const getProceduresAll = async ()  => {
    try {
        const response = await axios.get('https://localhost:5000/api/procedures');
        return response.data
    } catch (error) {
        console.log(error);
    }
}


    export const getTypesOfPetToProcedure = async (id)=>
    {
        try
        {
            console.log(id)
            const response = await axios.get(`https://localhost:5000/api/procedures/petsOfUser/${id}`,{headers: authHeader()})
            console.log('pets',response.data)
            return response.data
        }
        catch (e)
        {
            console.log(e);
        }

    }

    export const getMastersForProcedure = async (id)=>
    {
        try
        {
            console.log('id',id)
            const response = await axios.get(`https://localhost:5000/api/procedures/mastersAndProcedures/${id}`)
            return response.data
        }
        catch (e)
        {
            console.log(e);
        }

    }


    export const deleteProcedure = async (id)=>
    {
        try
        {

            const res =await axios.delete(`https://localhost:5000/api/procedures/${id}`,{headers: authHeader()})
            return res;
        }
        catch (e)
        {
            console.log(e);
        }

    }

    export const getProceduresByType = async (id) =>
    {
        try
        {
            const res =await axios.get(`https://localhost:5000/api/procedures/byType/${id}`,{headers: authHeader()})
            console.log(res)
            return res;

        }
        catch (e)
        {
            console.log(e);
        }
    }



import axios from "axios";

export const getProceduresAll = async ()  => {
    try {
        const response = await axios.get('http://localhost:5000/api/procedures');
        return response.data
    }
    catch (error)
    {
        console.log(error);
    }
        // .then(response => {
        //         setProcedures(response.data)
        //         console.log(response.data)
        //     }
        // )
        // .catch(error => console.log(error));
}


import axios from "axios";


export const getSchedule =async()=> {

  const records =await   axios.get('http://localhost:5000/api/schedule/')
    return records.data;
       /* .then(response => {
                setSchedule(response.data)
                console.log('schedule', response.data)
            }
        )*/
}
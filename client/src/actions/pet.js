import axios from "axios";

export const getPetTypes = async ()=>
{
    const res = await axios.get('http://localhost:5000/api/pets/types')
    console.log('types',res.data)
    return res.data;
}
function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`};
    } else {
        return {};
    }
}

export const deletePet = async (id) =>
{
    const res =await axios.delete(`http://localhost:5000/api/pets/${id}`,{headers: authHeader()})
    return res;

}
export const addPet = async (pet_type_id,age1,nickname) =>
{
    const age=Number(age1)
    console.log(pet_type_id,age,nickname)
    const {response} =await axios.post('http://localhost:5000/api/pets/add',
        {
             pet_type_id,
             age,
             nickname,

        },{headers: authHeader()})
    return response
}
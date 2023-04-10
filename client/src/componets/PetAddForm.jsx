import React,{useState} from 'react';
import {Select,Input} from "@material-ui/core";
import {MenuItem} from "@mui/material";
import {addPet} from "../actions/pet";

const PetAddForm = ({petTypes}) => {
    const [petType,setPetType]=useState(petTypes[0]);
    const [age,setAge]=useState();
    const[nickname,setNickname]=useState();
    const handlePetTypeChange = (event)=>{
        const petTypeId=event.target.value;
        const petType = petTypes.find(pt=>pt.id===petTypeId)
        setPetType(petType)
    }

   const  handleAddPet = async () =>
   {
       try
       {
           const res = addPet(petType.id,age,nickname)
           console.log(res);

       }
       catch (e)
       {
           console.log('DDDDDDD')
       }
   }
    return (

        <form onSubmit={handleAddPet}>
            <p>Nickname:</p>

            <Input type="text"  value={nickname} onChange={(e)=>setNickname(e.target.value)}></Input>
            <p>Age:</p>
            <Input type="number"  value ={age} onChange={(e) => setAge(e.target.value)}></Input>
            <p>Pet Type:</p>
            {petTypes && petTypes.length>0 ?

            <Select
                value = {petType.id}
                onChange={handlePetTypeChange}>
                {petTypes.map(pt=>
                    <MenuItem key={pt.id} value={pt.id}>
                        {pt.pet_name}
                    </MenuItem>)}
            </Select> : <>f</>
            }
        <Input type='submit' value='Add pet'></Input>
        </form>
    );
};

export default PetAddForm;
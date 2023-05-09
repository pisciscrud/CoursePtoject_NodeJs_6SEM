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
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};

        // Проверка на заполненность полей
        if (!nickname.trim()) {
            errors.nickname = 'Nickname is required';
        }
        if (!age) {
            errors.age = 'Age is required';
        }
        if (!petType.id) {
            errors.petType = 'Pet type is required';
        }

        // Обновление состояния ошибок
        setErrors(errors);

        // Возвращение true, если нет ошибок, и false в противном случае
        return Object.keys(errors).length === 0;
    };
   const  handleAddPet = async (e) =>
   {
e.preventDefault()
       try
       { if (nickname && age && petType.id && validateForm()) {
           const res = await addPet(petType.id, age, nickname)
           console.log(res);
          }
       else {
         alert ('your form is empty')
       }
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
            {errors.nickname && <p style={{color:'red'}}>{errors.nickname}</p>}
            <p>Age:</p>
            <Input type="number"  value ={age} onChange={(e) => setAge(e.target.value)}></Input>
            {errors.age && <p style={{color:'red'}}>{errors.age}</p>}
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
            {errors.petType && <p style={{color:'red'}}>{errors.petType}</p>}
        <Input type='submit' value='Add pet'></Input>
        </form>
    );
};

export default PetAddForm;
import React,{useState,useEffect} from 'react';
import {Select,Input} from "@material-ui/core";
import {MenuItem} from "@mui/material";
import {addPet} from "../actions/pet";
import styles from './main.module.css';





const PetAddForm = ({petTypes, onAdd}) => {

    const [formValid, setFormValid] = useState(false);
    const [petType,setPetType]=useState(petTypes[0]);
    const [age,setAge]=useState();
    const[nickname,setNickname]=useState();

   const [error,setError] =useState('');
   const [errors,setErrors]=useState([]);

    const handlePetTypeChange = (event)=>{
        const petTypeId=event.target.value;
        const petType = petTypes.find(pt=>pt.id===petTypeId)
        setPetType(petType)
    }


    const validateForm = () => {
        if (!nickname || !age || !petType.id  ) {
          setFormValid(false);
        } else {
          setFormValid(true);
        }
      };

      useEffect(() => {
        validateForm();
      }, [nickname, age,petType.id]);

   const  handleAddPet = async (e) =>
   {
            e.preventDefault()
           try
             {
             const res = await addPet(petType.id, age, nickname)
            if (res.status === 200)
            {
                onAdd(res);
            }
            if (res.response.status === 400 && !res.response.data.errors)
            {
                setError(res.response.data);
            }
            else {
                setErrors(...errors,res.response.data.errors.map((error) => error.msg))
            }
          
       }
       catch (err)
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
             {errors && <p style={{color:'red'}}>{errors}</p>}

         <div>
        <Input className={styles.confirmationItem} type='submit' value='Add pet' disabled={!formValid}></Input>
        </div>

        </form>
    );
};

export default PetAddForm;
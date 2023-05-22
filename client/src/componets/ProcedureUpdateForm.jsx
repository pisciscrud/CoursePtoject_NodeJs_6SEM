import React, { useState,useEffect } from 'react';
import { Select, Input } from '@material-ui/core';
import { useQuery } from 'react-query';
import { getPetsOfUser } from '../actions/user';
import { getPetTypes } from '../actions/pet';
import { updateProcedure } from '../actions/admin';

import ImageResizer from 'react-image-file-resizer';
import axios from 'axios';
import { authHeader } from '../actions/procedure';
import { useNavigate } from 'react-router-dom';
 

import { UpdateProcedure } from '../actions/procedure';
import styles from './main.module.css';

const ProcedureUpdateForm = ({ petTypes, procedure, onUpdate,errors }) => {
 
  
    const [price, setPrice] = useState(procedure.Price);
    const [nameProcedure, setNameProcedure] = useState(procedure.name_procedure);
    const [description, setDescription] = useState(procedure.description);
    const [formValid, setFormValid] = useState(false);
    const [petTypesForProcedure,setPetTypesForProcedure]=useState([]);

    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

  // const [errors,setErrors]=useState([]);

   const validateForm = () => {
    if (!nameProcedure || !price || !description ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  };
   useEffect(() => {
  //  setError('');
    validateForm();
  }, [nameProcedure, price, description]);

    const handleAnimalTypeChange = (event) => {
        const { value } = event.target;
        const isChecked = event.target.checked;
        if (isChecked) {
            setPetTypesForProcedure((prevAnimalTypes) => [...prevAnimalTypes, value]);
        } else {
            setPetTypesForProcedure((prevAnimalTypes) =>
                prevAnimalTypes.filter((animalType) => animalType !== value)
            );
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.includes('image/')) {
            setError(null);
            setImage(file);
        } else {
            setError('Please choose an image file');
            setImage(null);
        }
    };

    const handleUpdateProcedure = async (event) => {
        event.preventDefault();
    
            if (!nameProcedure || !price || !description ) {
                setError('Please fill in all fields');
                return;
            }
            const formData = new FormData();

            formData.append('id', procedure.id);
            formData.append('name_procedure', nameProcedure);
            formData.append('Price', price);
            formData.append('description', description);
            if (image) {

                formData.append('image', image);
            } else {

                formData.append('procedure_photo1', procedure.procedure_photo);
            }
        

            const res = await onUpdate( formData);


            // if (res.status === 200) {
            //   onUpdate();
            // }

            // if (res.response && res.response.status === 400 )
            // {
            //     setErrors(...errors,res.response.data.errors.map((error) => error.msg))
            // }
         
    };

    return (
        <form onSubmit={handleUpdateProcedure}>
            <label>
                Image:
                <input filename={image} type='file' accept='image/*' onChange={handleImageChange} />
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </label>
            <p>Name procedure:</p>
            <Input type="text" value={nameProcedure} onChange={(e)=>setNameProcedure(e.target.value)}></Input>
            <p>Price:</p>
            <Input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}></Input>
            <p>Description:</p>
            <Input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}></Input>
            <div>

                <div>
                {errors && <div style={{ color: 'red' }}>{errors}</div>}
                </div>
            <button type="submit" className={styles.confirmationItem} disabled={!formValid}>Update</button>
            </div>
        </form>
    );
};
export default ProcedureUpdateForm ;

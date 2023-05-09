import React, { useState } from 'react';
import { Select, Input } from '@material-ui/core';
import { useQuery } from 'react-query';
import { getPetsOfUser } from '../actions/user';
import { getPetTypes } from '../actions/pet';
import { updateProcedure } from '../actions/admin';

import ImageResizer from 'react-image-file-resizer';
import axios from 'axios';
import { authHeader } from '../actions/procedure';
import { useNavigate } from 'react-router-dom';

const ProcedureUpdateForm = ({ petTypes, procedure, onUpdate }) => {
    const history = useNavigate();
    const [price, setPrice] = useState(procedure.Price);
    const [nameProcedure, setNameProcedure] = useState(procedure.name_procedure);
    const [description, setDescription] = useState(procedure.description);
    const [petTypesForProcedure, setPetTypesForProcedure] = useState(
        procedure.Procedure_to_pet.map((p) => p.pet_id)
    );
   // const [imagePreview, setImagePreview] = useState(null);

    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

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
        try {
            if (!nameProcedure || !price || !description || petTypesForProcedure.length === 0) {
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
            // const result = petTypesForProcedure.map((pet_id) => ({ pet_id }));
            // formData.append('Procedure_to_pet', JSON.stringify(result));

            const res = await axios.put(
                `https://localhost:5000/api/procedures/${procedure.id}`,
                formData,
                { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } }
            );

            if (res.status === 200) {
              onUpdate();

            }
        } catch (e) {
            alert(e);
        }
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
            {/*<p>Choose for which pets</p>*/}

            {/*{*/}
            {/*    petTypes  && petTypes.length>0 ?*/}
            {/*        petTypes.map((type)=>*/}
            {/*            //    console.log('aa'))*/}
            {/*            <div >*/}
            {/*                <label>*/}
            {/*                    <input type="checkbox"*/}
            {/*                           value={type.id}*/}
            {/*                           onChange={handleAnimalTypeChange}*/}
            {/*                           checked={petTypesForProcedure.includes(type.id)}/>*/}

            {/*                    {type.pet_name}*/}

            {/*                </label>*/}
            {/*            </div> )*/}
            {/*        : <h1>aaaa</h1>*/}
            {/*}*/}


            <button type="submit">Submit</button>
        </form>
    );
};
export default ProcedureUpdateForm ;

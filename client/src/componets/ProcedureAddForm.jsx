import React ,{useState,useEffect}from 'react';
import {Select,Input} from "@material-ui/core";
import {useQuery} from "react-query";
import {getPetsOfUser} from "../actions/user";
import {getPetTypes} from "../actions/pet";
import {addProcedure} from "../actions/admin";

import ImageResizer from 'react-image-file-resizer';
import axios from "axios";
import {authHeader} from "../actions/procedure";
import {useNavigate} from "react-router-dom";

const ProcedureAddForm = ({petTypes,onAdd}) => {
    const history = useNavigate();
    const [price,setPrice]=useState();
    const [nameProcedure,setNameProcedure]=useState('');
    const [description,setDescription]=useState('');
   const [petTypesForProcedure,setPetTypesForProcedure]=useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const [image, setImage] = useState();
    const [error, setError] = useState(null);
  //  const {refetch:refetchPetTypes}=useQuery("petTypes",()=>getPetTypes())



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

    const handleAddProcedure = async (event)=>
    {
        event.preventDefault()
        try
        {

          console.log(nameProcedure,price,description,image,petTypesForProcedure)

            const formData = new FormData();

            formData.append('name_procedure', nameProcedure);
            formData.append('Price', price);
            formData.append('description', description);
            formData.append('image', image);
            const result = petTypesForProcedure.map(pet_id => ({ pet_id }));
            formData.append('Procedure_to_pet', JSON.stringify(result))
            console.log(formData);
            const res = await axios.post('https://localhost:5000/api/procedures',
                formData,
                {headers:{ ...authHeader(), 'Content-Type': 'multipart/form-data'}})

            if (res.status===200)
            {
               // console.log('addasdas');
                onAdd(res);
                //history('/admin/procedures')
            }
         //   return proc;

            //  const procedure = await addProcedure(formData);
          //alert('fref')

        }
        catch(e)
        {
            alert(e);
        }



    }
    return (
        <form onSubmit={handleAddProcedure} >
            <label>
                Image:
                <input  filename={image}  type="file" accept="image/*" onChange={handleImageChange}/>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {/*{imagePreview && <img src={imagePreview} alt="Selected" />}*/}
            </label>
            <p>Name procedure:</p>
            <Input type="text" value={nameProcedure} onChange={(e)=>setNameProcedure(e.target.value)}></Input>
            <p>Price:</p>
            <Input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}></Input>
            <p>Description:</p>
            <Input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}></Input>
            <p>Choose for which pets</p>

            {
                petTypes  && petTypes.length>0 ?
                    petTypes.map((type)=>
                //    console.log('aa'))
                    <div >
                        <label>
                            <input type="checkbox"
                                   value={type.id}
                                   onChange={handleAnimalTypeChange}/>
                            {type.pet_name}

                        </label>
                    </div> )
                    : <h1>aaaa</h1>
         }


            <button type="submit">Submit</button>
        </form>
    );
};

export default ProcedureAddForm;
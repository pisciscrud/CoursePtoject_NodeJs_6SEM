import React, {useState} from 'react';
import {Input} from "@material-ui/core";
import axios from "axios";
import {authHeader} from "../actions/procedure";
import { useNavigate } from 'react-router-dom';
const MasterAddForm = ({procedures,onAdd}) => {
    const [description,setDescription]=useState('');
    const [image, setImage] = useState();
    const [error, setError] = useState(null);
   const [nameMaster,setNameMaster] = useState('');
   const [proceduresForMaster,setProceduresForMaster]=useState([])
   const [surnameMaster,setSurnameMaster]=useState('');



    const handleProcedureChange =(e)=>
    {
        const {value}=e.target;
        const isChecked = e.target.checked;
        if (isChecked) {
            setProceduresForMaster((prevProcedures) => [...prevProcedures, value]);
        } else {
            setProceduresForMaster((prevProcedures) =>
                prevProcedures.filter((procedure) => procedure !== value)
            );
        }
    };


    const handleImageChange = (event) => {
        // const file = event.target.files[0];
        // if (file && file.type.includes('image/')) {
        //     setError(null);
        //     // изменяем размер и качество изображения
        //     ImageResizer.imageFileResizer(
        //         file,
        //         200, // новая ширина
        //         200, // новая высота
        //         'JPEG', // формат
        //         80, // качество
        //         0, // поворот (0 - не поворачивать)
        //         (uri) => {
        //             // после изменения сохраняем сжатое изображение
        //             const byteString = atob(uri.split(',')[1]);
        //             const mimeString = uri.split(',')[0].split(':')[1].split(';')[0];
        //             const ab = new ArrayBuffer(byteString.length);
        //             const ia = new Uint8Array(ab);
        //             for (let i = 0; i < byteString.length; i++) {
        //                 ia[i] = byteString.charCodeAt(i);
        //             }
        //             const blob = new Blob([ab], { type: mimeString });
        //             setImage(blob);
        //             setImagePreview(URL.createObjectURL(blob));
        //         },
        //         'base64' // выходной формат (base64 или blob)
        //     );
        // } else {
        //     setError('Please choose an image file');
        //     setImage(null);
        //     setImagePreview(null);
        // }

        const file = event.target.files[0];
        if (file && file.type.includes('image/')) {
            setError(null);
            setImage(file);
        } else {
            setError('Please choose an image file');
            setImage(null);
        }


    };




      const handleAddMaster = async(e)=>
      {
          e.preventDefault()
          try
          {
              console.log(nameMaster,surnameMaster,description,image,proceduresForMaster)

              const formData=new FormData();
              formData.append('name_master',nameMaster);
              formData.append('surname_master',surnameMaster)
              formData.append('description',description);
              formData.append ('image',image)
              const result = proceduresForMaster.map(procedure_id => ({ procedure_id}));
              formData.append('Master_to_Procedure',JSON.stringify(result))
              const res = await axios.post('http://localhost:5000/api/procedures',
                  formData,
                  {headers:{ ...authHeader(), 'Content-Type': 'multipart/form-data'}})

              (res.status===200)
              {

                  onAdd(res);
                //  history('/admin/masters');

              }

            //  return master;
          //    alert ('cedce')
          }
          catch (e)
          {
              alert(e)
          }
      }



    return (


            <form onSubmit={handleAddMaster} >
                <label>
                    Image:
                    <input  filename={image}  type="file" accept="image/*" onChange={handleImageChange}/>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {/*{imagePreview && <img src={imagePreview} alt="Selected" />}*/}
                </label>
                <p>Name master:</p>
                <Input type="text" value={nameMaster} onChange={(e)=>setNameMaster(e.target.value)}></Input>
                <p>Surname master:</p>
                <Input type="text" value={surnameMaster} onChange={(e)=>setSurnameMaster(e.target.value)}></Input>
                <p>Description:</p>
                <Input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}></Input>
                <p>Choose for which pets</p>

                {
                   procedures && procedures.length>0 ?
                       procedures.map(( procedure)=>
                            //    console.log('aa'))
                            <div >
                                <label>
                                    <input type="checkbox"
                                           value={procedure.id}
                                           onChange={handleProcedureChange}/>
                                    {procedure.name_procedure}

                                </label>
                            </div> )
                        : <h1>aaaa</h1>
                }


                <button type="submit">Submit</button>
            </form>



    );
};

export default MasterAddForm;
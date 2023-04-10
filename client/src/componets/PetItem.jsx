import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Card, CardActionArea, CardContent, CardMedia} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {deletePet} from '../actions/pet'
const useStyles = makeStyles({
    root: {
        width: 200,
        margin:30,

    },
    media: {
        height: 140,

    },
});

const PetItem = ({pet,onDeletePet}) => {
    const [currentPet,setCurrentPet] =useState(pet)
    const classes = useStyles();
    const handleDeletePet = async () => {
        const res = await onDeletePet(pet);
        return res;
    };

    // const handleDeletePet = async () =>
    // {
    //
    //  if (  window.confirm (`Are you sure that want delete ${pet.nickname}`))
    //  {
    //      const res =  await  deletePet(currentPet.id);
    //
    //      // if (res.status === 200) {
    //         // setCurrentPet({});
    //      // }
    //       return res;
    //
    //  }
    //
    //  }


    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>

                    <CardMedia
                        className={classes.media}
                        image={process.env.PUBLIC_URL + pet.pet_type_id + '.png'}
                        title="Contemplative Reptile"
                    />



                    <CardContent>
                        <h6>Nickname: {currentPet.nickname}</h6>
                        <p> Age: {currentPet.age}</p>
                    </CardContent>

                </CardActionArea>
                <Button onClick={()=>handleDeletePet()}>delete</Button>
            </Card>
        </div>
    );
};

export default PetItem;
import React from 'react';
import {Button, Card, CardActionArea, CardContent, CardMedia} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
        width: 200,
        margin:30,

    },
    media: {
        height: 140,

    },
});
const ProcedureItem = ({procedure}) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`http://localhost:5000/${procedure.procedure_photo}`}/>
                    <CardContent>
                        <h2>{procedure.name_procedure}</h2>
                        <p>Price:{procedure.Price}$</p>
                        <h4>{procedure.description}</h4>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    );
};

export default ProcedureItem;
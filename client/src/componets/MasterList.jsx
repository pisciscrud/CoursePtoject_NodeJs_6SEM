

/*import {Row} from "react-bootstrap";*/

import axios from 'axios';
import MasterItem from "./MasterItem";
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import Pagination from '../componets/Pagination';


  const useStyles = makeStyles((theme) => ({
      root: {
          flexGrow: 1,
          marginTop: theme.spacing(2),

      },
  }));
const MasterList = () => {
    const [masters, setMasters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [objectsPerPage, setObjectsPerPage] = useState(4);
    const classes = useStyles();
    const indexOfLastObject = currentPage * objectsPerPage;
    const indexOfFirstObject = indexOfLastObject - objectsPerPage;
    const currentMasters = masters.slice(indexOfFirstObject, indexOfLastObject);


    useEffect(() => {
        axios.get('http://localhost:5000/api/masters')
            .then(response => {
                    setMasters(response.data)
                    console.log(response.data)
                }
            )
            .catch(error => console.log(error));
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className={classes.root} >

            <Grid container spacing={3}>
                {currentMasters.map((master) => (
                    <MasterItem key={master.id} master={master} />
                ))}
            </Grid>
            <Pagination
                objectsPerPage={objectsPerPage}
                totalObjects={masters.length}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

        </div>
    );
};



/*const MasterList = (() => {
    const [masters, setMasters] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/masters')
            .then(response => {
                    setMasters(response.data)
                  console.log(response.data)
                }
            )
            .catch(error => console.log(error));
    }, []);
    return (
        <Row className="d-flex mt-50">
            {masters.map(master => <MasterItem key={master.id} master={master} />)}
        </Row>
    );
});*/

export default MasterList;
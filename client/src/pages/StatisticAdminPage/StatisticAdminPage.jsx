import React, {useEffect, useState} from 'react';
import DoughnutChart from "../../componets/DoughnutChart";
import axios from "axios";
import {authHeader} from "../../actions/procedure";
import MasterChart  from "../../componets/MasterChart";
import StatusChart from "../../componets/StatusChart";
import RatingChart from '../../componets/RatingChart'
const StatisticAdminPage = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data4, setData4] = useState([]);
    useEffect(() => {

        axios.get('https://localhost:5000/api/schedule/graphic/circle-diagram',{headers:authHeader()}).then(response => {
            setData(response.data);
        });
        axios.get('https://localhost:5000/api/schedule/graphic/masters',{headers:authHeader()}).then(response => {
            setData1(response.data);
        });
        axios.get('https://localhost:5000/api/schedule/graphic/status',{headers:authHeader()}).then(response => {
            setData2(response.data);
        });
        axios.get('https://localhost:5000/api/schedule/graphic/rating',{headers:authHeader()}).then(response => {
            setData4(response.data);
        });
    }, []);
    return (
        <div style={{display:'grid', gridTemplateAreas: "'a b' 'c d'", justifyContent:'space-around'}}>
            <div style={{gridArea: 'a', margin:5,width: "350px", height: "300px", backgroundColor: "#fff",borderRadius:20}}>
                <DoughnutChart data={data} />
            </div>
            <div style={{gridArea: 'b',  margin:5,paddingTop:70, width: "500px", height: "300px", backgroundColor: "#fff",borderRadius:20}}>
                <MasterChart data1={data1}/>
            </div>
            <div style={{gridArea: 'c', margin:5,width: "350px", height: "300px", backgroundColor: "#fff",borderRadius:20}}>
                <StatusChart data2={data2}/>
            </div>
            <div style={{paddingTop:70, margin:5,gridArea: 'd' ,width: "500px", height: "300px", backgroundColor: "#fff",borderRadius:20}}>
                <RatingChart data4={data4}></RatingChart>
            </div>
        </div>
    );
};

export default StatisticAdminPage;
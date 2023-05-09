import React from 'react';
import PetsIcon from '@mui/icons-material/Pets';
const EventCard = ({event}) => {
    function  getTime(time) {
        const month = time.getMonth() + 1;
        const time1 = time.getFullYear()  +'-'+  month + '-' + time.getUTCDate()

        return time1;
    }
    return (
        <div style={{ marginTop:30, marginLeft:30,backgroundColor: '#ff49c4', color: '#fff', padding: '20px' ,width:250,borderRadius:20}}>
            <span>Upcoming event!<PetsIcon/></span>
            <div style={{ color:'#40226a',backgroundColor: '#fff', padding: '20px',borderRadius:20 }}>
                { event &&
                <div style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
                    <span style={{fontSize:13}}>{getTime(new Date(event.date_))}</span>
                    <span >{event.time} </span>
                    <span style={{marginLeft:3}}>{event.Procedure_table.name_procedure} </span>
                </div>
                }

            </div>
        </div>
    );
};

export default EventCard;
import React from 'react';
import {Link} from "react-router-dom";

const MenuAdmin = () => {
    return (
        <>
            <Link to="schedule">Schedule</Link>
            <Link to="confirmation">Confirmation</Link>
            <Link to="statistics">Statistics</Link>
        </>
    );
};

export default MenuAdmin;
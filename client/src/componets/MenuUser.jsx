import React from 'react';
import {Link} from "react-router-dom";

const MenuUser = () => {
    return (
        <>
          <Link to="schedule">My events</Link>
            <Link to="pets">My pets</Link>
            <Link to="notifications">My notifications</Link>
        </>
    );
};

export default MenuUser;
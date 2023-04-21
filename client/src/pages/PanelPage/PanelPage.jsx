import React from 'react';
import MenuAdmin from "../../componets/MenuAdmin";
import {Outlet} from "react-router-dom";


const PanelPage = () => {
    return (

        <>
         <MenuAdmin></MenuAdmin>
            <Outlet/>
        </>

    );
};

export default PanelPage;
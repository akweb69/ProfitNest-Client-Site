import React from 'react';
import Nav from '../Common/Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../Common/Footer';

const Mainlayout = () => {
    return (
        <>
            <Nav></Nav>
            <div className="pt-16 md:pt-18">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Mainlayout;
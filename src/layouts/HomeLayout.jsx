import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto pt-4 sm:pt-6 lg:pt-8'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default HomeLayout;
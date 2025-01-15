import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <section><Navbar></Navbar></section>
            <section className='min-h-screen'>
            <Outlet></Outlet>
            </section>
            <section><Footer></Footer></section>
        </div>
    );
};

export default MainLayout;
import React from 'react';
import Banner from './Banner/Banner';
import PopularCamps from './PopularCamps';
import Feedback from './Feedback';

const Home = () => {
    return (
        <div>
            <section><Banner></Banner></section>
            <section><PopularCamps></PopularCamps></section>
            <section><Feedback></Feedback></section>
        </div>
    );
};

export default Home;
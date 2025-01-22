import React from 'react';
import Banner from './Banner/Banner';
import PopularCamps from './PopularCamps';

const Home = () => {
    return (
        <div>
            <section><Banner></Banner></section>
            <section><PopularCamps></PopularCamps></section>
        </div>
    );
};

export default Home;
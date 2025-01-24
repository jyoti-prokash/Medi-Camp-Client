import React from "react";
import Banner from "./Banner/Banner";
import PopularCamps from "./PopularCamps";
import Feedback from "./Feedback";
import AboutUs from "./AboutUs";

const Home = () => {
  return (
    <div>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <PopularCamps></PopularCamps>
      </section>
      <section>
        <AboutUs></AboutUs>
      </section>
      <section>
        <Feedback></Feedback>
      </section>
    </div>
  );
};

export default Home;

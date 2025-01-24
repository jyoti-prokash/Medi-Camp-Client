import React from 'react';
import cover from '../../assets/Banner Image/full-shot-scouts-with-map-outdoors.jpg'
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
const AboutUs = () => {
    return (
      <div>
        <SectionTitle header={"About us"} subtitle={'About Our Camp'}></SectionTitle>
        <div
          className=" p-20 lg:p-40 bg-cover bg-center bg-fixed text-center font-light"
          style={{ backgroundImage: `url(${cover})` }}
        >
          <p className="text-white lg:w-4/6 mx-auto bg-black/40 p-10">
            <span className='text-2xl'>Welcome to Medi Camp</span>, <br /> a dedicated initiative
            focused on providing essential healthcare services to underserved
            communities. Our mission is to make healthcare accessible to
            everyone, regardless of their location or economic status. At our
            medical camp, we offer free medical check-ups, consultations,
            medicines, and health education, delivered by a team of experienced
            doctors, nurses, and volunteers. We believe in fostering wellness
            through early diagnosis, preventive care, and community awareness.
            Join us in our journey to build healthier, happier communities, one
            step at a time. Together, we can make a difference!
          </p>
        </div>
      </div>
    );
};

export default AboutUs;
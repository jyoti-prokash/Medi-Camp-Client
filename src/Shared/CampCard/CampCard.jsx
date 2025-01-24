import React from 'react';
import { Link } from 'react-router-dom';

const CampCard = ({camp}) => {
    const {
        _id,
      campPhoto,
      campName,
      dateTime,
      location,
      professionalName,
      participantCount,
      description
    } = camp;
    return (
      <div>
        <div className="card bg-base-100 shadow-xl h-[550px] p-2 mx-auto">
          <figure>
            <img
              className="w-[320px] object-cover transform transition-transform duration-500 hover:rotate-3"
              src={campPhoto}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{campName}</h2>
            <p>location: {location}</p>
            <p>Participant: {participantCount}</p>
            <p className='font-semibold'>Professional: {professionalName}</p>
            <p>Date: {dateTime}</p>
            <p>{description.split(' ').slice(0, 10).join(' ')} . . .</p>
            <div className="card-actions justify-end">
              <Link to={`/campDetails/${_id}`}>
                <button className="bg-[#148980] px-6 py-3 font-bold hover:bg-[#F3C677] hover:text-black rounded-3xl my-3 text-white">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CampCard;
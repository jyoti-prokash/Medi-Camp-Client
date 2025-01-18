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
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              className="w-[340px] h-[300px] object-cover transform transition-transform duration-500 hover:rotate-3"
              src={campPhoto}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{campName}</h2>
            <p>location: {location}</p>
            <p>Participant: {participantCount}</p>
            <p>Professional: {professionalName}</p>
            <p>Date: {dateTime}</p>
            <p>{description}</p>
            <div className="card-actions justify-end">
              <Link to={`/campDetails/${_id}`}>
                <button className="btn btn-primary">Details</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CampCard;
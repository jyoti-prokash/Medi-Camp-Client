import React from 'react';

const SectionTitle = ({header, subtitle}) => {
    return (
      <div>
        <div className="m-10">
          <h1 className="text-center uppercase font-bold text-2xl text-[#148980]">
            {header}
          </h1>
          <div className="divider w-52 mx-auto my-0"></div>
          <h3 className="text-lg text-gray-400 font-semibold text-center">{subtitle}</h3>
        </div>
      </div>
    );
};

export default SectionTitle;
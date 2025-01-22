import React from "react";
import useCamps from "../../Hooks/useCamps";
import CampCard from "../../Shared/CampCard/CampCard";

const AvailableCamp = () => {
  const [camps] = useCamps();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {camps.map((camp) => (
          <CampCard camp={camp}></CampCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamp;

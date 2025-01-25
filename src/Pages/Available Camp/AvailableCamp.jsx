import React, { useState, useEffect } from "react";
import useCamps from "../../Hooks/useCamps";
import CampCard from "../../Shared/CampCard/CampCard";

const AvailableCamp = () => {
  const [camps, loading] = useCamps(); // Original list of camps
  const [filteredCamps, setFilteredCamps] = useState([]); // State for filtered/sorted camps
  const [sortType, setSortType] = useState(""); // Sorting state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [isTwoColumnLayout, setIsTwoColumnLayout] = useState(false); // Layout state

  // Initialize `filteredCamps` with the original list when data is loaded
  useEffect(() => {
    if (!loading) {
      setFilteredCamps(camps);
    }
  }, [camps, loading]);

  // Handle Search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter camps based on campName or professionalName
    const filtered = camps.filter(
      (camp) =>
        camp.campName.toLowerCase().includes(query) ||
        (camp.professionalName &&
          camp.professionalName.toLowerCase().includes(query))
    );
    setFilteredCamps(filtered);
  };

  // Handle Sort
  const handleSort = (type) => {
    setSortType(type);
    let sortedCamps = [...filteredCamps];

    if (type === "fees-lowest") {
      sortedCamps.sort((a, b) => a.campFees - b.campFees);
    } else if (type === "fees-highest") {
      sortedCamps.sort((a, b) => b.campFees - a.campFees);
    }

    setFilteredCamps(sortedCamps); // Update the displayed list
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while camps are being fetched
  }

  return (
    <div className="my-10 container mx-auto">
      {/* Search Input */}
      <div className="flex justify-between items-center mb-5 flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by camp name or professional name..."
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered border-blue-500 border-2 w-full md:w-1/3"
        />
        {/* Sorting Dropdown */}
        <select
          className="border-blue-500 border-2 select select-bordered w-full md:w-1/4 font-bold"
          value={sortType}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="fees-lowest">Camp Fees (Lowest First)</option>
          <option value="fees-highest">Camp Fees (Highest First)</option>
        </select>
        {/* Layout Toggle Button */}
        <button
          className="btn hidden lg:block text-white hover:text-black bg-[#148980] w-full md:w-1/4"
          onClick={() => setIsTwoColumnLayout((prev) => !prev)}
        >
          {isTwoColumnLayout
            ? "Switch to Three Columns"
            : "Switch to Two Columns"}
        </button>
      </div>

      {/* Camps Grid */}
      <div
        className={`grid gap-5 ${
          isTwoColumnLayout ? "grid-cols-2" : "grid-cols-1 lg:grid-cols-3"
        }`}
      >
        {filteredCamps.map((camp) => (
          <CampCard key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCamp;

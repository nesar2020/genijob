import React from 'react';
import { useState } from 'react';
import './Main.css'; // Add corresponding CSS for styling
import JobListingPage from './JobListingPage';

import Navbar from '../components/Navbar';
import ExploreSection from '../components/ExploreSection';



function Main() {
  const [filtersObj, setFiltersObj] = useState({
    datePosted: '',
    salary: '',
    jobType: '',
    experienceLevel: '',
    workType: '',
    location: '',
    search: '',
  });

  const handleDataChange = (updatedFilters) => {
    setFiltersObj(updatedFilters); 
  };

  return (
      <div className="job-container">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <ExploreSection  setFiltersObj={handleDataChange} />
        <JobListingPage  filtersObj={filtersObj}  />
      </div>
  );
}

export default Main;

import React from 'react';
import PropTypes from 'prop-types';
import './ExploreSection.css';
import { useState } from 'react';



const ExploreSection = ({setFiltersObj }) => { 
  const [searchbar, setSearchbar] = useState({ search: '', location: '' });

  const handleSearch = (e) => {
    e.preventDefault();
    
    setFiltersObj((filtersObj) => ({
      ...filtersObj,
      ...searchbar,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if(name !== '' && value !== '') {
      setFiltersObj((filtersObj) => ({
        ...filtersObj,
        ...searchbar,
        [name]: value,
      }));
    }
  };
  
  const filtersSelctions = [
    {
      name: "datePosted",
      options: {
        "": "Date posted",
        "last24hours": "Last 24 hours",
        "last7days": "Last 7 days",
        "thismonth": "This month",
        "anytime": "Anytime",
      },
    },
    {
      name: "salary",
      options: {
        "": "Salary",
        "<20k": "up to $20,000",
        "20k-60k": "$20,000 - $60,000",
        "60k-100k": "$60,000 - $100,000",
        "100k+": "$100,000+",
      },
    },
    {
      name: "jobType",
      options: {
        "": "Job type",
        "full_time": "Full-time",
        "part_time": "Part-time",
        "contract": "Contract",
        "internship": "Internship",
        "temporary": "Temporary",
      },
    },
    {
      name: "experienceLevel",
      options: {
        "": "Experience level",
        "entry_level": "Entry Level",
        "mid_level": "Mid Level",
        "senior_level": "Senior Level",
        "director": "Director",
        "executive": "Executive",
      },
    },
    {
      name: "workType",
      options: {
        "": "On-site / Remote",
        "on_site": "On-site",
        "remote": "Remote",
        "hybrid": "Hybrid",
      },
    },
  ];

  return (
    <div className="explore-section">
      
      <h1>Explore jobs</h1>

      <div className="search-bar">
        <input id="search" name="search" 
        value={searchbar.search}
        onChange={(e) => setSearchbar({ ...searchbar, search: e.target.value })}
        type="text" placeholder="Looking for? e.g web developer" />

        <input id="location" name="location" 
        value={searchbar.location}
        onChange={(e) => setSearchbar({ ...searchbar, location: e.target.value })}
        type="text" placeholder="Enter location e.g Berlin" />

        <button onClick={handleSearch}>Search</button>
      </div>


      {/* Filter Bar */}
      <div className="filter-bar">
        <span>Filter by</span>
        {filtersSelctions.map((filter) => (
          <select key={filter.name} name={filter.name} onChange={handleFilterChange}>
            {Object.entries(filter.options).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        ))}
      </div>

      <hr/>

    </div>
  );
}

ExploreSection.propTypes = {
  setFiltersObj: PropTypes.func.isRequired,
};

export default ExploreSection;

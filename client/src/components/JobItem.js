import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



const JobItem = ({ job }) => (
  <div className="job-item">
    <h2>{job.title}</h2>
    <p>{job.company_name}</p>
    <p>{job.location}</p>
    <p>{new Date(job.listed_time).toLocaleDateString()}</p>
    <Link to={`/jobs/${job.job_id}`}>View Details</Link>
  </div>
);

// ...

JobItem.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    listed_time: PropTypes.string.isRequired,
    job_id: PropTypes.string.isRequired,
  }).isRequired,
};

// ...

export default JobItem;

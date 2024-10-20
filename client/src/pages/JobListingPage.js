import React from 'react';
import JobList from '../components/JobList';
import PropTypes from 'prop-types';


const JobListingPage = ({filtersObj}) => (
  <div>
    <JobList filtersObj={filtersObj} />
  </div>
);


JobListingPage.propTypes = {
  filtersObj: PropTypes.object.isRequired,
};

export default JobListingPage;
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './JobCard.css';
import { vote} from '../services/jobService';
import PropTypes from 'prop-types';



const JobCard = ({ job })=>{
  const [voteCount, setVoteCount] = useState(job?.user_trust_index || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  const handleUpvote = (job_id) => {
    if (!hasUpvoted) {
      setVoteCount(voteCount + 1);
      setHasUpvoted(true);
      setHasDownvoted(false);
      // API call to update the vote count on the server
      vote(job_id, 'upvote');
    }
  };

  const handleDownvote = (job_id) => {
    if (!hasDownvoted) {
      setVoteCount(voteCount - 1);
      setHasDownvoted(true);
      setHasUpvoted(false);
      // API call to update the vote count on the server
      vote(job_id, 'downvote');
    }
  };

  return(
    <div>
      <div className="job-card">
        <div className="job-card-header">
          <div className="job-icon">📊</div>
          <Link to={`api/jobs/${job._id}`} className="job-card-link">
            <h3 className="job-title">{job.title}</h3>
            <p className="company-name">{job.company_name||'unknown'}</p>
          </Link>
          <div className='job-actions'>

            <div className="elegant-vote-container">
              <div className="vote-info">AI trust <strong>{job?.ai_trust_index || "3.5/5"}</strong></div>
              <div className="vote-controls">
                <button className="vote-button elegant-upvote" onClick={()=>handleUpvote(job._id)}>
                  <span>&#9650;</span>
                </button>
                <span className="vote-count">{voteCount}</span>
                <button className="vote-button elegant-downvote" onClick={()=>handleDownvote(job._id)}>
                  <span>&#9660;</span>
                </button>
              </div>
            </div>

          </div>

        </div>
        <p className="job-description">{(job.description).substring(0, 100)}</p>
        <div className='detail-wrapper' >
          <div className="job-details">
            <span className="job-type">&#129520; {job.work_type}</span>
            <span className="job-location">&#127970; {job.location}</span>
            <span className="experience-level">&#129351; {job?.formatted_experience_level || 'Unknown'}</span>
          </div>
          <div className='job-actions'>
            <a href="{job.application_url||''}" className="btn btn-green apply-link">Apply</a>
          </div>
        </div>

      </div>
    </div>
  )

}

// Job card validation

JobCard.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    //company_name: PropTypes.string.isRequired,
    ai_trust_index: PropTypes.number.isRequired,
    user_trust_index: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    work_type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    formatted_experience_level: PropTypes.string,
    //application_url: PropTypes.string.isRequired,
  }).isRequired,
};



export default JobCard;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import './JobDetailPage.css';
import { Link } from 'react-router-dom';
import { vote} from '../services/jobService';

const JobDetailPage = () => {
  const [voteCount, setVoteCount] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details based on the job ID from the URL params
    getJobById(id).then(response => setJob(response.data));
    if(job){
      setVoteCount(job.user_trust_index);
    }
  }, [id,job]);

  if (!job) return <div>Loading...</div>;

  

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

  
  const salaryRange = job?.max_salary && job?.min_salary ? (
    `${job?.min_salary.toLocaleString()} ${job?.currency} - ${job?.max_salary.toLocaleString()} ${job?.currency} ${job?.pay_period ? `(${job?.pay_period.toLowerCase()})` : ''}`
  ) : (
    'Salary information not available'
  );
  const desc = formatJobDescription(job?.description);

  return (
    <div id="jobDetailsSection" className="job-details-section">

      
      <div className="job-details-container">
        <h1 className="job-title">{job?.title}</h1>
        <Link to={`/`} >
          <button className="btn btn-red">Back</button>
        </Link>
          <div className="header">
            <div className="card">
              <div className="logo">📊
                  {/* <img src="logo.png" alt="Company Logo" /> */}
              </div>
              <div className="company-info">
                  <h2>{job?.company_name}</h2>
                  
                  <div className="interactive-elements">
                      <p><i className="fa fa-globe"></i> Website</p>
                      <p><i className="fa fa-envelope"></i> info@examplecomapny.com</p>
                      <p><i className="fa fa-facebook"></i> Share on Facebook</p>
                      <p className="listed-time">Listed on: 
                        {typeof job?.listed_time !== 'undefined' ? new Date(job?.listed_time).toLocaleDateString() : 'Not specified'}

                      </p>
                  </div>
              </div>
              
              {job?.job_posting_url && (
              <div className="apply-button">
                  <button>Apply for job</button>
              </div>
              )}

            </div>
          </div>

          <div className="content">
              <div className="left-column">
                <div className="job-description">
                    <p dangerouslySetInnerHTML={{ __html: desc }} />
                </div>

                <div className="job-skills">
                    <h3>Skills Required</h3>
                    <p>{job?.skills_desc || 'Not specified'}</p>
                </div>
              </div>

              <div className="right-column">
                <h3>Job overview</h3>
                <div className="job-detail-card">

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
                  <br/>

                  <div className="job-header">
                    <p className="location"><i className="fa fa-map-marker"></i> {job?.location}</p>
                    <p className="posted-time">Listed on: 
                      {typeof job?.listed_time !== 'undefined' ? new Date(job?.listed_time).toLocaleDateString() : 'Not specified'}
                    </p>
                    <p className="expiration-date">Expires on: 
                      {typeof job?.expiry !== 'undefined' ? new Date(job?.expiry).toLocaleDateString() : 'Not specified'}
                    </p>
                  </div>
                  <div className="job-salary">
                      <h3>Salary</h3>
                      <p>{salaryRange} </p>
                      <p>{job?.med_salary > 0 && <p >Median Salary: {job?.med_salary.toLocaleString()} {job?.currency}</p>}</p>
                  </div>
                  <div>
                    <ul>
                      <li><strong>Experience Level:</strong> </li>
                      <li><strong>Work Type:</strong> {job?.formatted_work_type || job?.work_type || 'Not specified'}</li>
                      <li><strong>Remote Allowed:</strong> {job?.remote_allowed ? 'Yes' : 'No'}</li>
                      <li><strong>Compensation Type:</strong> {job?.compensation_type || 'Not specified'}</li>
                      <li><strong>ZIP Code:</strong> {job?.zip_code || 'Not specified'}</li>
                    </ul>
                  </div>
                  
                  {job?.application_url && (
                    <div className="apply-button">
                        <a href={job?.application_url} target="_blank" rel="noopener noreferrer" className="apply-button">Apply Now</a>
                    </div>
                  )}
              </div>
              </div>
          </div>

      </div>
      
    </div>
  );
};

export default JobDetailPage;

function formatJobDescription(description) {
  // Step 1: Normalize and clean the description
  description = description.replace(/\s+/g, ' ').trim(); // Remove excess whitespace
  description = description.replace(/([a-z])([A-Z])/g, '$1. $2'); // Add missing periods before capitalized words
  description = description.replace(/\.(?=[^\s])/g, '. '); // Add space after periods, if missing
  description = description.replace(/\s?-\s?/g, ' - '); // Normalize dashes

  // Step 2: Define common section headers and patterns
  const sectionHeaders = [
      "responsibilities", "requirements", "qualifications", "skills", "benefits",
      "about us", "description", "job duties", "experience needed", "education",
      "job description", "overview", "key duties", "preferred qualifications",
      "mandatory requirements", "preferred experience", "who you are", "role", "schedule"
  ];

  // Use regex to find section headers
  const sectionRegex = new RegExp(`\\b(${sectionHeaders.join('|')})\\b`, 'gi');

  // Split description into sections based on detected headers
  const sections = description.split(sectionRegex);

  let formattedDescription = {};
  let currentSection = 'General Information';

  for (let i = 0; i < sections.length; i++) {
      let section = sections[i].trim();

      // Check if the section matches a header
      if (sectionHeaders.some(header => new RegExp(header, 'i').test(section))) {
          currentSection = section.charAt(0).toUpperCase() + section.slice(1).toLowerCase();
      } else if (section.length > 0) {
          // Append to the current section
          if (!formattedDescription[currentSection]) {
              formattedDescription[currentSection] = section;
          } else {
              formattedDescription[currentSection] += ' ' + section;
          }
      }
  }

  // Step 3: Format bullet points
  for (let section in formattedDescription) {
    if (formattedDescription[section].startsWith(':') || formattedDescription[section].startsWith('.')) {
      formattedDescription[section] = formattedDescription[section].slice(1); // Remove the colon or dot if present at the beginning
    }
    formattedDescription[section] = formattedDescription[section]
      .replace(/[-*•]\s+/g, '<br/> - ') // Convert common bullet symbols into a standard format
      .replace(/\.\s/g, '.<br/>') // Add line breaks after sentences for readability
      .trim();
  }

  // Step 4: Construct the final formatted output
  let formattedOutput = '';
  for (let section in formattedDescription) {
    if(formattedDescription[section].length > 10) {
      //section in bold and with line breaks . then section description
      formattedOutput += `\n\n <strong class="section-header">${section} :</strong>   ${formattedDescription[section]}`;
      formattedOutput += '<br/><br/>';
    }
  }

  return formattedOutput.trim();
  // return formattedOutput.trim().split('\n\n') // Split paragraphs
  // .map(section => section.split('\n').join('<br />')) // Split lines within a paragraph
  // .map(section => `<p>${section.trim()}</p>`) // Wrap in paragraph tags
  // .join('');
}
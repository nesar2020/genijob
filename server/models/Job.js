const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  job_id: { type: Number, required: true, unique: true },       // Unique job ID
  company_name: { type: String },                               // Name of the company
  title: { type: String, required: true },                      // Job title
  description: { type: String, required: true },                // Job description
  max_salary: { type: Number, default: 0 },                                 // Maximum salary offered
  min_salary: { type: Number, default: 0 },                                 // Minimum salary offered
  med_salary: { type: Number, default: 0 },                                 // Median salary (if available)
  pay_period: { type: String, enum: ['HOURLY', 'YEARLY'] },     // Pay period (Hourly/Yearly)
  location: { type: String, required: true },                   // Job location
  company_id: { type: Number },                                 // Company ID
  views: { type: Number, default: 0 },                          // Number of views
  applies: { type: Number, default: 0 },                        // Number of applications
  original_listed_time: { type: Date },                         // Original listing date
  listed_time: { type: Date, default: Date.now },               // Date when job was listed in the system
  expiry: { type: Date },                                       // Expiration date of the listing
  closed_time: { type: Date },                                  // When the job listing was closed
  job_posting_url: { type: String },                            // URL to the original job posting
  application_url: { type: String },                            // URL for applications
  application_type: { type: String },                           // Type of application process
  remote_allowed: { type: Boolean, default: false },            // If remote work is allowed
  formatted_experience_level: { type: String },                 // Required experience level (formatted)
  formatted_work_type: { type: String },                        // Work type (formatted, e.g., FULL_TIME)
  skills_desc: { type: String },                                // Skills required/description
  posting_domain: { type: String },                             // Domain where the job is posted
  sponsored: { type: Boolean, default: false },                 // If the job is sponsored
  work_type: { type: String, enum: ['FULL_TIME', 'PART_TIME'] },// Type of work (Full-time/Part-time)
  currency: { type: String, default: 'USD' },                   // Currency of the salary
  compensation_type: { type: String },                          // Type of compensation (e.g., base salary)
  normalized_salary: { type: Number, default: 0},                          // Normalized salary figure
  zip_code: { type: String },                                   // Job location's ZIP code
  fips: { type: String },                                       // FIPS code for the location
  ai_trust_index: { type: Number, default: 0 },                             // AI trust index
  user_trust_index: { type: Number, default: 0},                           // User trust index
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);

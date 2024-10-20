const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },                       // Company name
  industry: { type: String },                                   // Industry the company operates in
  website: { type: String },                                    // Company website URL
  headquarters: {                                               // Headquarters location
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zip_code: { type: String },
  },
  number_of_employees: { type: Number },                        // Number of employees
  founded: { type: Date },                                      // Date when the company was founded
  company_size: { type: String },                               // Company size (e.g., 1,000-5,000 employees)
  phone: { type: String },                                      // Contact phone number
  email: { type: String },                                      // Contact email address
  description: { type: String },                                // Company description
  logo_url: { type: String },                                   // URL to company logo
  social_links: {                                               // Social media links
    linkedin: { type: String },
    facebook: { type: String },
    twitter: { type: String }
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema);

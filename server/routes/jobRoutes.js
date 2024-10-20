const express = require('express');
const jobController = require('../controllers/jobController');
const router = express.Router();

router.get('/', jobController.getAllJobs);         // GET: List all jobs
router.get('/:id', jobController.getJobById);      // GET: Job details
router.post('/', jobController.createJob);         // POST: Create a new job (Admin only)
router.put('/:id', jobController.updateJob);       // PUT: Update job by ID (Admin only)
router.delete('/:id', jobController.deleteJob);    // DELETE: Remove job by ID (Admin only)

router.post('/:id/:voteType', jobController.vote);

module.exports = router;
const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/login', adminController.login);  // POST: Admin login
router.post('/logout', adminController.logout);// POST: Admin logout

module.exports = router;

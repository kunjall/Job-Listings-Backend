// jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authenticateUser = require('../middleware/authMiddleware')

router.post('/job-listings', authenticateUser, jobController.createJobListing);
router.get('/job-listings/readListings', authenticateUser, jobController.readListings)
router.patch('/job-listings/:jobId/update', authenticateUser, jobController.updateListings)
router.delete('/job-listings/delete', authenticateUser, jobController.deleteListings)
router.post('/job-listings/:jobId/apply/:userId', authenticateUser, jobController.addApplicant);


module.exports = router;

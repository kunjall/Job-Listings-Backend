const JobListing = require('../models/jobModel');
const mongoose = require('mongoose');
const createJobListing = async (req, res) => {
  try {
    const listings = req.body;
    const jobListing = await JobListing.create(listings);
    res.status(201).json(jobListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const readListings = async (req, res) => {
  try {
    const { jobId } = req.body;
    if (jobId) {
      const job = await JobListing.findById(jobId);
      if (!job) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ job });
    } else {
      const jobs = await JobListing.find();
      res.status(200).json({ jobs });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateListings = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { date, link, title, usersApplied } = req.body;
    if (!mongoose.isValidObjectId(jobId)) {
      return res.status(400).json({ error: 'Invalid ObjectId format' });
    }
    const jobToUpdate = await JobListing.findById(jobId);
    if (!jobToUpdate) {
      return res.status(404).json({ error: 'Job not found' });
    }
    if (date !== undefined) {
      jobToUpdate.date = date;
    }
    if (link !== undefined) {
      jobToUpdate.link = link;
    }
    if (title !== undefined) {
      jobToUpdate.title = title;
    }
    if(usersApplied !== undefined) {
      jobToUpdate.usersApplied = usersApplied;
    }
    await jobToUpdate.save();
    res.status(200).json({ message: 'Job listing updated successfully', job: jobToUpdate });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteListings = async (req, res) => {
  try {
    const { jobId } = req.body;
    if (jobId) {
      const deletedJob = await JobListing.findByIdAndDelete(jobId);
      if (!deletedJob) {
        return res.status(404).json('Listing not found');
      }
      return res.status(200).json({ message: 'Listing deleted' });
    } else {
      const jobs = await Job.find();
      res.status(200).json({ jobs });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addApplicant = async (req, res) => {
  try {
    const { jobId, userId } = req.params;
    const jobListing = await JobListing.findById(jobId);
    if (!jobListing) {
      return res.status(404).json({ error: 'Job Listing not found' });
    }
    await jobListing.addApplicant(userId);
    res.status(200).json({ message: 'User added to applicants successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createJobListing,
  addApplicant,
  readListings,
  deleteListings,
  updateListings
};

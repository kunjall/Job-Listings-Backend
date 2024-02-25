const User = require('../models/userModel');
const mongoose = require('mongoose');

const createUser = async (req, res) => {
    try {
      const users = req.body; 
      const createdUsers = await User.create(users);
      res.status(201).json(createdUsers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  const readUsers = async (req, res) => {
    try {
      const { userId } = req.body;
      if (userId) {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ user });
      } else {
        const users = await User.find();
        res.status(200).json({ users });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, points, githubLink } = req.body;
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid ObjectId format' });
      } 
      const userToUpdate = await User.findById(userId);
      if (!userToUpdate) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (name !== undefined) {
        userToUpdate.name = name;
      }
      if (points !== undefined) {
        userToUpdate.points = points;
      }
      if (githubLink !== undefined) {
        userToUpdate.githubLink = githubLink;
      }
      await userToUpdate.save();
      res.status(200).json({ message: 'User updated successfully', user: userToUpdate });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const deleteUsers = async (req, res) => {
    try {
      const { userId } = req.body;
      if (userId) {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          return res.status(404).json('User not found');
        }
        return res.status(200).json({ message: 'User deleted' });
      } else {
        const users = await User.find();
        res.status(200).json({ users });
      }
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  const likeUser = async (req, res) => {
    try {
      const { userId } = req.params;
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid ObjectId format' });
      }
      const userToLike = await User.findById(userId);
      if (!userToLike) {
        return res.status(404).json({ error: 'User not found' });
      }
      await userToLike.like();
      res.status(200).json({ message: 'User liked successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getUsersByPoints = async (req, res) => {
    try {
      const users = await User.find().sort({ points: 1 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createUser,
    readUsers,
    updateUser,
    deleteUsers,
    likeUser,
    getUsersByPoints,
  };  




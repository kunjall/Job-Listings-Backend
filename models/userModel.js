const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
    githubLink: { type: String },
  });

  userSchema.methods.like = function () {
    this.points += 1;
    return this.save();
  };
  
  const User = mongoose.model('User', userSchema);


module.exports = User;

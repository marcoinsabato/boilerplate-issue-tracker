// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});


projectSchema.statics.findOrCreate = async function(projectName) {
  let project = await this.findOne({ name: projectName });
  if (!project) {
    project = new this({ name: projectName });
    await project.save();
  }
  return project;
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
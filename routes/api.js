'use strict';
const connectDB = require('../db/db'); 
const Issue = require('../models/Issue');
const Project = require('../models/Project');

connectDB();

const castType = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    switch(obj[key]) {
      case 'true':
        newObj[key] = true;
        break;
      case 'false':
        newObj[key] = false;
        break;
      default:
        if(!isNaN(obj[key])) {
          newObj[key] = Number(obj[key]);
        } else {
          newObj[key] = obj[key];
        }
    }
  });
  return newObj;
};

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async function (req, res){
      try {
        const projectName = req.params.project;
        const project = await Project.findOrCreate(projectName);
        
        let query = castType(req.query);
        const issues = await Issue.find({ ...query, project: project._id }).populate('project', 'name');
        res.json(issues);
      } catch (err) {
        res.status(500).json({ error: 'Error fetching issues' });
      }
    })
    
    .post(async function (req, res){
      try {
        const projectName = req.params.project;
        const project = await Project.findOrCreate(projectName);
        
        const newIssue = new Issue({
          ...req.body,
          project: project._id
        });
        
        const savedIssue = await newIssue.save();
        res.json(savedIssue);
      } catch (err) {
        if (err.name === 'ValidationError') {
          res.status(400).json({ error: 'required field(s) missing' });
        } else {
          res.status(500).json({ error: 'Error saving issue' });
        }
      }
    })

    .put(async function (req, res){
      try {
        const projectName = req.params.project;
        const project = await Project.findOrCreate(projectName);
        
        const { _id, ...updateData } = req.body;
        
        if (!_id) {
          return res.status(400).json({ error: 'missing _id' });
        }
        if (Object.keys(updateData).length === 0) {
          return res.status(400).json({ error: 'no update field(s) sent', '_id': _id });
        }
        
        const updatedIssue = await Issue.findOneAndUpdate(
          { _id: _id, project: project._id },
          { $set: updateData },
          { new: true, runValidators: true }
        );
        
        if (!updatedIssue) {
          return res.status(400).json({ error: 'could not update', '_id': _id });
        }
        res.json({ result: 'successfully updated', '_id': _id });
      } catch (err) {
        res.status(400).json({ error: 'could not update', '_id': req.body._id });
      }
    })
    
    .delete(async function (req, res){
      try {
        const projectName = req.params.project;
        const project = await Project.findOrCreate(projectName);
        
        const { _id } = req.body;
        
        if (!_id) {
          return res.status(400).json({ error: 'missing _id' });
        }
        
        const deletedIssue = await Issue.findOneAndDelete({ _id: _id, project: project._id });
        if (!deletedIssue) {
          return res.status(400).json({ error: 'could not delete', '_id': _id });
        }
        res.json({ result: 'successfully deleted', '_id': _id });
      } catch (err) {
        res.status(400).json({ error: 'could not delete', '_id': req.body._id });
      }
    });
    
};

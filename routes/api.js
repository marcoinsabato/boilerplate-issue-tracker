'use strict';
const Issue = require('../types/issue.js');

function generateIssue({
  _id,
  issue_title,
  issue_text,
  created_by,
  assigned_to,
  status_text,
  open,
  created_on,
  updated_on,
}) {
  return new Issue({
    _id,
    issue_title : issue_title ?? `issue_title ${i}`,
    issue_text : issue_text ?? `issue_text ${i}`,
    created_by : created_by ?? `created_by ${i}`,
    assigned_to : assigned_to ?? `assigned_to ${i}`,
    status_text : status_text ?? `status_text ${i}`,
    open : open ?? open,
    created_on : created_on ?? `created_on ${i}`,
    updated_on : updated_on ?? `updated_on ${i}`,
  });
}


const exampleIssues = [
  {
    _id: '1',
    issue_title: 'Fix error in posting data',
    issue_text: 'When we post data it has an error.',
    created_by: 'Joe',
    assigned_to: 'John',
    status_text: 'In progress',
    open: true,
    created_on: '2019-12-25T12:00:00.000Z',
    updated_on: '2020-01-25T12:00:00.000Z'
  },
  {
    _id: '2',
    issue_title: 'User profile update not working',
    issue_text: 'Users should be able to update profiles.',
    created_by: 'John',
    assigned_to: undefined,
    status_text: undefined,
    open: false,
    created_on: '2020-01-15T12:00:00.000Z',
    updated_on: '2020-01-15T12:00:00.000Z'
  },
  {
    _id: '3',
    issue_title: 'Refactor HTML/CSS',
    issue_text: 'I have a lot of duplicated code in my HTML/CSS and I would like to refactor it.',
    created_by: 'Joe',
    assigned_to: 'John',
    status_text: 'In QA',
    open: true,
    created_on: '2020-01-20T12:00:00.000Z',
    updated_on: '2020-02-20T12:00:00.000Z'
  }
].map(issue => new Issue(issue));

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
  
    .get(function (req, res){
      let project = req.params.project;
      let queryParams = castType(req.query);
      let issues;

      if(Object.keys(queryParams).length === 0) {
        issues = exampleIssues;
      } else {
      
        issues = exampleIssues.filter(issue => {
          return Object.keys(queryParams).every(key => {
            return issue[key] === queryParams[key];
          });
        });
      }

      return res.json(issues);  
    })
    
    .post(function (req, res){
      let response;
      let statusCode = 200;

      const props = req.body;
      if (!props.issue_title || !props.issue_text || !props.created_by) {
        response = {error : 'required field(s) missing'};
        statusCode = 400;
      } else {
        response = new Issue(req.body);
      }

      return res.status(statusCode).json(response);
    })
    
    .put(function (req, res){
      let project = req.params.project;

      const props = req.body;
      if (!props._id) {
        return res.status(400).json({error : 'missing _id'});
      }
      if(Object.keys(props).length === 1) {
        return res.status(400).json({ error: 'no update field(s) sent', '_id': props._id });
      }
      const issue = exampleIssues.find(issue => issue._id == props._id);

      if (!issue) {
        return res.status(400).json({ error: 'could not update', '_id': props._id });
      }

      const updatedIssue = {
        ...issue,
        ...props,
        updated_on : new Date().toISOString()
      };

      const response = {  result: 'successfully updated', '_id': props._id };

      return res.status(200).json(response);
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;

      const props = req.body;
      if (!props._id) {
        return res.status(400).json({error : 'missing _id'});
      }

      const issue = exampleIssues.find(issue => issue._id == props._id);

      if (!issue) {
        return res.status(400).json({ error: 'could not delete', '_id': props._id });
      }

      const response = {  result: 'successfully deleted', '_id': props._id };

      return res.status(200).json(response);
    });
    
};

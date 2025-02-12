'use strict';
const Issue = require('../types/issue.js');

function generateIssues(){
  const issues = [];
  for (let i = 0; i < 10; i++) {
    issues.push(new Issue({
      issue_title : 'Issue ' + i,
      issue_text : 'Issue ' + i + ' text',
      created_by : 'User ' + i,
      assigned_to : 'User ' + i,
      status_text : 'Status ' + i
    }));
  }

  return issues;
}

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let issues = generateIssues();

      return res.send(issues);  
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

      return res.status(statusCode).send(response);
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};

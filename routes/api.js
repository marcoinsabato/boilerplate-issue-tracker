'use strict';
const Issue = require('../types/issue.js');

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      
    })
    
    .post(function (req, res){
      let response;
      let statusCode = 200;

      try {
        response = new Issue(req.body);
      } catch (e) {
        response = {error : e.message};
        statusCode = 400;
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

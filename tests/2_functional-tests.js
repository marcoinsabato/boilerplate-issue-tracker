const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    // Create an issue with every field: POST request to /api/issues/{project}
    test('Create an issue with every field: POST request to /api/issues/{project}' , (done) => {
        chai.request(server)
            .post('/api/issues/apitest')
            .send({
                issue_title : "title test",
                issue_text : "text test",
                created_by : "user test",
                assigned_to : "assigned test",
                status_text : "status test"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isDefined(res.body._id);
                assert.equal(res.body.issue_title, "title test");
                assert.equal(res.body.issue_text, "text test");
                assert.equal(res.body.created_by, "user test");
                assert.equal(res.body.assigned_to, "assigned test");
                assert.isDefined(res.body.created_on);
                assert.isDefined(res.body.updated_on);
                assert.equal(res.body.open, true);
                assert.equal(res.body.status_text, "status test");
                done();
            });
    })
    // Create an issue with only required fields: POST request to /api/issues/{project}
    test('Create an issue with every field: POST request to /api/issues/{project}' , (done) => {
        chai.request(server)
            .post('/api/issues/apitest')
            .send({
                issue_title : "title test",
                issue_text : "text test",
                created_by : "user test",
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isDefined(res.body._id);
                assert.equal(res.body.issue_title, "title test");
                assert.equal(res.body.issue_text, "text test");
                assert.equal(res.body.created_by, "user test");
                assert.isUndefined(res.body.assigned_to);
                assert.isDefined(res.body.created_on);
                assert.isDefined(res.body.updated_on);
                assert.equal(res.body.open, true);
                assert.isUndefined(res.body.status_text);
                done();
            });
    })
    // Create an issue with missing required fields: POST request to /api/issues/{project}
    test('Create an issue with every field: POST request to /api/issues/{project}' , (done) => {
        chai.request(server)
            .post('/api/issues/apitest')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.isDefined(res.body.error);
                assert.equal(res.body.error, 'required field(s) missing');
                done();
            });
    })
    // View issues on a project: GET request to /api/issues/{project}
    
    // View issues on a project with one filter: GET request to /api/issues/{project}
    
    // View issues on a project with multiple filters: GET request to /api/issues/{project}
    
    // Update one field on an issue: PUT request to /api/issues/{project}
    
    // Update multiple fields on an issue: PUT request to /api/issues/{project}
    
    // Update an issue with missing _id: PUT request to /api/issues/{project}
    
    // Update an issue with no fields to update: PUT request to /api/issues/{project}
    
    // Update an issue with an invalid _id: PUT request to /api/issues/{project}
    
    // Delete an issue: DELETE request to /api/issues/{project}
    
    // Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
    
    // Delete an issue with missing _id: DELETE request to /api/issues/{project}

});

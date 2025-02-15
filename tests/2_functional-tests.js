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
    test('View issues on a project: GET request to /api/issues/{project}' , (done) => {
        chai.request(server)
            .get('/api/issues/apitest')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isDefined(res.body);
                assert.isArray(res.body);
                done();
            });
    })
    // View issues on a project with one filter: GET request to /api/issues/{project}?open=false
    test('View issues on a project: GET request to /api/issues/{project}?open=false' , (done) => {
        const openFilter = true;
        chai.request(server)
            .get(`/api/issues/apitest?open=${openFilter}`)
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isDefined(res.body);
                assert.isArray(res.body);
                
                const checkIfAllClosed = res.body.every((issue) => issue.open === openFilter);
                assert.isTrue(checkIfAllClosed);

                done();
            });
    })
    
    // View issues on a project with multiple filters: GET request to /api/issues/{project}?open=false&assigned_to=Joe
    test('View issues on a project: GET request to /api/issues/{project}' , (done) => {
        const openFilter = true;
        const assignedToFilter = 'Joe';

        chai.request(server)
            .get(`/api/issues/apitest?open=${openFilter}&assigned_to=${assignedToFilter}`)
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isDefined(res.body);
                assert.isArray(res.body);
                
                const checkIfAllClosed = res.body.every((issue) => issue.open === openFilter);
                assert.isTrue(checkIfAllClosed);

                const checkIfAllAssignedToJoe = res.body.every((issue) => issue.assigned_to === assignedToFilter);
                assert.isTrue(checkIfAllAssignedToJoe);
                done();
            });
    })
    // Update one field on an issue: PUT request to /api/issues/{project}
    test('Update one field on an issue: PUT request to /api/issues/{project}' , (done) => {
        const _id = '1';
        const updatedAssignedTo = 'Joe';

        chai.request(server)
            .put(`/api/issues/apitest`)
            .send({
                _id,
                assigned_to: updatedAssignedTo
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isDefined(res.body);
                assert.equal(res.body._id, _id);
                assert.equal(res.body.result, 'successfully updated');
                done();
            });
    })
    // Update multiple fields on an issue: PUT request to /api/issues/{project}
    test('Update multiple fields on an issue: PUT request to /api/issues/{project}' , (done) => {
        const _id = '1';
        const updatedAssignedTo = 'Joe';
        const issueText = 'Test';

        chai.request(server)
            .put(`/api/issues/apitest`)
            .send({
                _id,
                assigned_to: updatedAssignedTo,
                issue_text: issueText
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isDefined(res.body);
                assert.equal(res.body._id, _id);
                assert.equal(res.body.result, 'successfully updated');
                done();
            });
    })    
    // Update an issue with missing _id: PUT request to /api/issues/{project}
    test('Update an issue with missing _id: PUT request to /api/issues/{project}' , (done) => {
        chai.request(server)
            .put(`/api/issues/apitest`)
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.isDefined(res.body);
                assert.equal(res.body.error, 'missing _id');
                done();
            });
    })
    
    // Update an issue with no fields to update: PUT request to /api/issues/{project}
    test('Update an issue with no fields to update: PUT request to /api/issues/{project}' , (done) => {
        const _id = '1';

        chai.request(server)
            .put(`/api/issues/apitest`)
            .send({_id})
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.isDefined(res.body);
                assert.equal(res.body.error, 'no update field(s) sent');
                done();
            });
    })
    
    // Update an issue with an invalid _id: PUT request to /api/issues/{project}
    test('Update an issue with an invalid _id: PUT request to /api/issues/{project}' , (done) => {
        const _id = 'x';
        const updatedAssignedTo = 'Joe';

        chai.request(server)
            .put(`/api/issues/apitest`)
            .send({
                _id,
                assigned_to: updatedAssignedTo,
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.isDefined(res.body);
                assert.equal(res.body.error, 'could not update');
                done();
            });
    })
    // Delete an issue: DELETE request to /api/issues/{project}
    test('Delete an issue: DELETE request to /api/issues/{project}' , (done) => {
        const _id = '1';

        chai.request(server)
            .delete(`/api/issues/apitest`)
            .send({_id})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isDefined(res.body);
                assert.equal(res.body.result, 'successfully deleted');
                done();
            });
    })
    // Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}' , (done) => {
        const _id = 'x';

        chai.request(server)
            .delete(`/api/issues/apitest`)
            .send({_id})
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.isDefined(res.body);
                assert.equal(res.body.error, 'could not delete');
                done();
            });
    })
    // Delete an issue with missing _id: DELETE request to /api/issues/{project}
    test('Delete an issue with missing _id: DELETE request to /api/issues/{project}' , (done) => {
        chai.request(server)
            .delete(`/api/issues/apitest`)
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.isDefined(res.body);
                assert.equal(res.body.error, 'missing _id');
                done();
            });
    })

});

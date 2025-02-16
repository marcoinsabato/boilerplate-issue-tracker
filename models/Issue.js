const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    issue_title: {
        type: String,
        required: true
    },
    issue_text: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now,
        get: (date) => date.toDateString()
    },
    updated_on: {
        type: Date,
        default: Date.now,
        get: (date) => date.toDateString()
    },
    created_by: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        default: ''
    },
    open: {
        type: Boolean,
        default: true
    },
    status_text: {
        type: String,
        default: ''
    }
});

issueSchema.pre('save', function(next) {
    this.updated_on = new Date();
    next();
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
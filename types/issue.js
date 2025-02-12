function generateId() {
    return Math.random().toString(36).substring(4);
}

class Issue {
    // _id
    // issue_title
    // issue_text
    // created_on
    // updated_on
    // created_by
    // assigned_to
    // open
    // status_text

    constructor(props) {
        this._id = generateId();
        this.issue_title = props.issue_title;
        this.issue_text = props.issue_text;
        this.created_on = new Date().toISOString();
        this.updated_on = new Date().toISOString();
        this.created_by = props.created_by;
        this.assigned_to = props?.assigned_to ?? '';
        this.open = props?.open ?? true;
        this.status_text = props?.status_text ?? '';
    }
}

module.exports = Issue;

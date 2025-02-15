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

    /**
     * @param {Object} props
     * @param {string} props.issue_title - issue title
     * @param {string} props.issue_text - issue text
     * @param {string} props.created_by - user who created the issue
     * @param {string?} props.assigned_to - user who assigned the issue
     * @param {boolean?} props.open - whether the issue is open
     * @param {string?} props.status_text - status text
     * @throws {Error} Missing required parameters: issue_title, issue_text, and created_by are required
     */
    constructor(props) {
        if (!props.issue_title || !props.issue_text || !props.created_by) {
            throw new Error('required field(s) missing');
        }
        this._id = props._id ?? generateId();
        this.issue_title = props.issue_title;
        this.issue_text = props.issue_text;
        this.created_on = props?.created_on ?? new Date().toISOString();
        this.updated_on = props?.updated_on ?? new Date().toISOString();
        this.created_by = props.created_by;
        this.assigned_to = props?.assigned_to ?? '';
        this.open = props?.open ?? true;
        this.status_text = props?.status_text ?? '';
    }
}

module.exports = Issue;

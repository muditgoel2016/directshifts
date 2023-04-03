import React from 'react';
import ListWithToolbar from '../components/ListWithToolbar';
import IssueToolbar from '../components/toolBars/IssueToolbar';
import { ISSUES_URL } from '../services/endpoints/github';

function IssueListPage() {
    let issueListProps = {
        CustomToolbar: IssueToolbar,
        RECORD_URL: ISSUES_URL,
        title: "All Issues",
        segment: "issue",
        keyi: "issue",
        rowClickable: "internal", // rowClickableOptions: "internal", "external" or "no"
    };

    return <ListWithToolbar {...issueListProps} />
}

export default IssueListPage;
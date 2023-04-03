import React from 'react';
import ListWithToolbar from '../components/ListWithToolbar';
import PRToolbar from '../components/toolBars/PRToolbar';
import { PR_URL } from '../services/endpoints/github';

function PullRequestListPage() {
    let prListProps = {
        CustomToolbar: PRToolbar,
        RECORD_URL: PR_URL,
        title: "All Pull Requests",
        segment: "pull-request",
        keyi: "pr",
        rowClickable: "internal", // rowClickableOptions: "internal", "external" or "no"
    };
    return <ListWithToolbar {...prListProps} />
}

export default PullRequestListPage;
import React from 'react';
import ItemDetailsPanelView from '../views/ItemDetailsPanelView';
import { useLocation } from 'react-router-dom';

function IssueDetailsPage() {
    const location = useLocation();
    const record = location.state?.issue;

    const formattedRecord = {
        ...record,
        "created_at": new Date(record.created_at).toLocaleString(),
        "updated_at": new Date(record.updated_at).toLocaleString(),
    };

    return <ItemDetailsPanelView record={formattedRecord} urlLabel="ISSUE URL"/>;
}

export default IssueDetailsPage;
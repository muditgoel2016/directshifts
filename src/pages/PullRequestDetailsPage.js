import React from "react";
import { useLocation } from "react-router-dom";
import ItemDetailsPanelView from "../views/ItemDetailsPanelView";
import Comments from "../containers/Comments";

function PullRequestDetailsPage() {
    const location = useLocation();
    const record = location.state?.pr;

    const formattedRecord = {
        ...record,
        "created_at": new Date(record.created_at).toLocaleString(),
        "updated_at": new Date(record.updated_at).toLocaleString(),
    };

    return (
        <>
            <ItemDetailsPanelView record={formattedRecord} urlLabel="PR URL"/>
            <Comments record={record} />
        </>
    );
}

export default PullRequestDetailsPage;

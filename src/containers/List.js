import React from "react";
import { useNavigate } from "react-router-dom";
import ListView from "../views/ListView";

function List({ records, headerKeyMap, rowClickable, segment, keyi }) {
    const navigate = useNavigate();

    const handleRowClick = (record, rowClickable) => {
        if (rowClickable === "internal") {
            navigate(`/${segment}/${record.number}`, { state: { [keyi]: record } });
        }
        if (rowClickable === "external") {
            window.open(record.url, "_blank");
        }
    };

    return (
        <ListView
            records={records}
            headerKeyMap={headerKeyMap}
            handleRowClick={handleRowClick}
            rowClickable={rowClickable}
        />
    );
}

export default List;


import React, { useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ajaxService } from "../services/ajaxService";
import { truncateText } from "../services/textService";
import List from "../containers/List";

const Section = styled(Paper)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(2),
    boxSizing: "border-box",
}));

const Title = styled(Typography)({
    marginBottom: ({ theme }) => theme.spacing(2),
});

const LoaderContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
});

function ListWithToolbar({
    RECORD_URL,
    CustomToolbar,
    title,
    segment,
    keyi,
    rowClickable,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [records, setRecords] = useState([]);

    let headerKeyMap = {
        "ID": "number",
        "Title": "title",
        "Created At": "created_at",
        "Updated At": "updated_at",
        "Status": "state",
        "Author": "user.login"
    };

    const formattedRecords = records.map((record) => ({
        ...record,
        "title": truncateText(record.title, 200),
        "created_at": new Date(record.created_at).toLocaleString(),
        "updated_at": new Date(record.updated_at).toLocaleString(),
        "user.login": truncateText(record.user.login, 250),
    }));

    const onToolbarControlsChange = useCallback(
        (params) => {
            function getRecords(params, onSuccess, onError) {
                const queryString = new URLSearchParams(params).toString();
                const url = `${RECORD_URL}?${queryString}`;
                ajaxService(url, "GET", null, onSuccess, onError);
            }
            setIsLoading(true);
            getRecords(
                params,
                (responseText) => {
                    const records = JSON.parse(responseText);
                    setIsLoading(false);
                    setRecords(records);
                },
                (error) => {
                    console.log(`Error occurred while fetching records: ${error}`);
                    setIsLoading(false);
                }
            );
        },
        [RECORD_URL]
    );

    return (
        <Section elevation={3}>
            <Title variant="h5" component="h2">
                {title}
            </Title>
            <CustomToolbar
                records={records}
                onToolbarControlsChange={onToolbarControlsChange}
            />

            {isLoading ? (
                <LoaderContainer>
                    <CircularProgress />
                </LoaderContainer>
            ) : records.length > 0 ? (
                <List
                    records={formattedRecords}
                    headerKeyMap={headerKeyMap}
                    rowClickable={rowClickable}
                    segment={segment}
                    keyi={keyi}
                />
            ) : (
                <LoaderContainer>
                    <Typography>No records found</Typography>
                </LoaderContainer>
            )}
        </Section>
    );
}

export default ListWithToolbar;
import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import List from "../containers/List";

const LoaderContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
});

const CommentsView = ({ headerKeyMap, formattedComments, isLoading, comments }) => {
    return (
        <>
            <Typography variant="h6" component="h3" gutterBottom>
                Comments ({comments.length})
            </Typography>
            {isLoading ? (
                <LoaderContainer>
                    <CircularProgress />
                </LoaderContainer>
            ) : (
                <>
                    <List
                        records={formattedComments}
                        headerKeyMap={headerKeyMap}
                        rowClickable="external"
                    />
                    {comments.length === 0 && (
                        <Typography variant="body2">No comments yet</Typography>
                    )}
                </>
            )}
        </>
    );
};

export default CommentsView;

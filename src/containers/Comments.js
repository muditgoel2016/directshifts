import React, { useState, useEffect } from "react";
import { truncateText } from "../services/textService";
import { ajaxService } from "../services/ajaxService";
import CommentsView from "../views/CommentsView";

const Comments = ({ record }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function fetchPRComments(prCommentsUrl, onSuccess, onError) {
        ajaxService(
            prCommentsUrl,
            "GET",
            null,
            function (response) {
                onSuccess(JSON.parse(response));
            },
            function (error) {
                onError(error);
            }
        );
    }

    useEffect(() => {
        if (record) {
            setIsLoading(true);
            const prCommentsUrl = `${record.comments_url}?sort=updated&direction=desc&per_page=100&page=1`;
            fetchPRComments(
                prCommentsUrl,
                (responseText) => {
                    const commentsData = responseText;
                    const sortedComments = commentsData && Array.isArray(commentsData) && commentsData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                    const latestFiveComments = (Array.isArray(sortedComments) ? sortedComments : []).slice(0, 5);
                    setComments(latestFiveComments);
                    setIsLoading(false);
                },
                (error) => {
                    console.log(`Error occurred while fetching latest comments: ${error}`);
                    setIsLoading(false);
                }
            );
        }
    }, [record]);

    const headerKeyMap = {
        "Author": "user.login",
        "Date": "created_at",
        "Comment": "body",
    };

    const formattedComments = comments.map((comment) => ({
        ...comment,
        "user.login": truncateText(comment.user.login, 250),
        "created_at": new Date(comment.created_at).toLocaleString(),
        "body": truncateText(comment.body, 250),
    }));

    return (
        <CommentsView
            headerKeyMap={headerKeyMap}
            formattedComments={formattedComments}
            isLoading={isLoading}
            comments={comments}
        />
    );
};

export default Comments;


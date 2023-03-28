import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { ajaxService } from "../../services/ajaxService";
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: theme.spacing(2),
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const DetailsItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const DetailsLabel = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginRight: theme.spacing(1),
}));

const CommentsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const CommentItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  width: "100%",
}));

const CommentHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const CommentAuthor = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const CommentAuthorAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const CommentBody = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const PRDetails = ({ prRecord }) => {
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
    if (prRecord) {
      setIsLoading(true);
      const prCommentsUrl = `${prRecord.comments_url}?sort=updated&direction=desc&per_page=100&page=1`;
      fetchPRComments(
        prCommentsUrl, (responseText) => {
          const commentsData = responseText;
          /* Issue with comments api. I've checked that direction flag is not working for it. 
             Results're always in same order. This forced me to sort client side. 
          */
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
  }, [prRecord]);

  return (
    <Container>
      <DetailsContainer>
        <TitleContainer>
          <StyledAvatar alt={prRecord.user.login} src={prRecord.user.avatar_url} />
          <Typography variant="h6" component="h2">
            {prRecord.title}
          </Typography>
        </TitleContainer>
        <DetailsItem>
          <DetailsLabel>PR URL:</DetailsLabel>
          <Link href={prRecord.html_url} target="_blank">
            {prRecord.html_url}
          </Link>
        </DetailsItem>
        <DetailsItem>
          <DetailsLabel>Created by:</DetailsLabel>
          <CommentAuthor>
            <CommentAuthorAvatar alt={prRecord.user.login} src={prRecord.user.avatar_url} />
            <Typography variant="body2">{prRecord.user.login}</Typography>
          </CommentAuthor>
        </DetailsItem>
        <DetailsItem>
          <DetailsLabel>State:</DetailsLabel>
          <Typography variant="body2">{prRecord.state}</Typography>
        </DetailsItem>
        <DetailsItem>
          <DetailsLabel>Created at:</DetailsLabel>
          <Typography variant="body2">{new Date(prRecord.created_at).toLocaleString()}</Typography>
        </DetailsItem>
        <DetailsItem>
          <DetailsLabel>Updated at:</DetailsLabel>
          <Typography variant="body2">{new Date(prRecord.updated_at).toLocaleString()}</Typography>
        </DetailsItem>
      </DetailsContainer>
      <Divider />
      <CommentsContainer>
        <Typography variant="h6" component="h3" gutterBottom>
          Comments ({comments.length})
        </Typography>
        {isLoading && <CircularProgress />}
        {!isLoading && comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <CommentAuthor>
                <CommentAuthorAvatar alt={comment.user.login} src={comment.user.avatar_url} />
                <Typography variant="body2">{comment.user.login}</Typography>
              </CommentAuthor>
              <Typography variant="body2">{new Date(comment.created_at).toLocaleString()}</Typography>
            </CommentHeader>
            <CommentBody>
              <Typography variant="body2">{comment.body}</Typography>
            </CommentBody>
          </CommentItem>
        ))}
        {comments.length === 0 && <Typography variant="body2">No comments yet</Typography>}
        <Button variant="contained" href={prRecord.html_url} target="_blank">
          View on GitHub
        </Button>
      </CommentsContainer>
    </Container>
  );
};
export default PRDetails;
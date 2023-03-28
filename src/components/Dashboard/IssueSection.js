import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ISSUES_URL } from "../../services/endpoints/github";
import { ajaxService } from "../../services/ajaxService";
import CircularProgress from '@mui/material/CircularProgress';

const Section = styled(Paper)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    display: 'inline-block',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    borderRadius: 10,
    border: '1px solid #ccc',
    boxShadow: 'none',
    height: '92%',
    margin: 'auto',
    position: 'relative'
}));

const Title = styled(Typography)({
    marginBottom: ({ theme }) => theme.spacing(2),
    fontSize: '1.2rem'
});

const Card = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '250px',
    transition: 'box-shadow 0.2s ease-in-out, background-color 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#eee',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
    },
}));

const CardHeader = styled(Typography)({
    marginBottom: ({ theme }) => theme.spacing(1),
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    paddingBottom: ({ theme }) => theme.spacing(1),
    fontSize: '14px',
    height: '32px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

const CardBody = styled(Typography)({
    marginBottom: '10px',
    fontSize: '14px',
    height: 'calc(100% - 64px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: '10px',
});

const CardFooter = styled(Typography)({
    fontSize: '0.8rem',
    lineHeight: '1.2',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    paddingTop: ({ theme }) => theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    marginTop: ({ theme }) => theme.spacing(1),
    marginBottom: ({ theme }) => theme.spacing(1),
});

const ViewAllButton = styled(Button)(({ theme }) => ({
    display: 'block !important',
    margin: 'auto',
    marginTop: theme.spacing(2),
}));

function IssueSection() {
    const [latestIssues, setLatestIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    function getLatestFiveIssues(onSuccess, onError) {
        const url = `${ISSUES_URL}?sort=updated&direction=desc&per_page=5&page=1`;
        ajaxService(url, 'GET', null, onSuccess, onError);
    }

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        getLatestFiveIssues(
            (responseText) => {
                const latestFiveIssues = JSON.parse(responseText);
                setLatestIssues(latestFiveIssues);
                setIsLoading(false);
            },
            (error) => {
                console.log(`Error occurred while fetching latest issues: ${error}`);
                setIsLoading(false);
                setIsError(true);
            }
        );
    }, []);

    const handleClick = (issue) => {
        navigate(`/issues/${issue.number}`, { state: { issueRecord: issue } });
    }

    const handleViewAllClick = () => {
        navigate(`/issues`);
    }

    return (
        <Section elevation={3}>
            <Title variant="h5" component="h2">
                Latest 5 Issues
            </Title>
            {isLoading && <CircularProgress sx={{ position: 'absolute', left: '50%', top: '50%' }} />}
            {isError &&
                <Typography variant="body1" color="error">
                    Something went wrong. Please refresh the app
                </Typography>}
            {!isLoading && !isError && (latestIssues.length === 0) && <Typography variant="body1">No records found</Typography>}

            {!isLoading && !isError && <Grid container spacing={2}>
                {!isLoading && latestIssues.map(issue => (
                    <Grid item xs={12} sm={6} key={issue.id}>
                        <Card elevation={2} onClick={() => handleClick(issue)}>
                            <CardHeader variant="h6">{issue.title}</CardHeader>
                            <CardBody>{issue.body}</CardBody>
                            <CardFooter>{issue.user.login}</CardFooter>
                        </Card>
                    </Grid>
                ))}
            </Grid>}
            {!isLoading && !isError && (latestIssues.length > 0) && <ViewAllButton variant="outlined" onClick={() => handleViewAllClick()}>
                View All
            </ViewAllButton>}
        </Section>
    );
}

export default IssueSection;

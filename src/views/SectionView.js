import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import RecordCardView from '../views/RecordCardView.js';

const PaperSection = styled(Paper)(({ theme }) => ({
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

const ViewAllButton = styled(Button)(({ theme }) => ({
    display: 'block !important',
    margin: 'auto',
    marginTop: theme.spacing(2),
}));

const LoaderContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
});

function SectionView({ recordType, latestRecords, isLoading, isError, handleClick, handleViewAllClick }) {
    return (
        <PaperSection elevation={3}>
            <Title variant="h5" component="h2">
                {`Latest 5 ${recordType}s`}
            </Title>
            {isLoading && <LoaderContainer><CircularProgress /></LoaderContainer>}
            {isError &&
                <Typography variant="body1" color="error">
                    Something went wrong. Please refresh the app
                </Typography>}
            {!isLoading && !isError && (latestRecords.length === 0) && <Typography variant="body1">No records found</Typography>}
            {!isLoading && !isError && <Grid container spacing={2}>
                {latestRecords.length > 0 && latestRecords.map(record => (
                    <Grid item xs={12} sm={6} key={record.id}>
                        <RecordCardView record={record} onClick={() => handleClick(record)} />
                    </Grid>
                ))}
            </Grid>}
            {!isLoading && !isError && (latestRecords.length > 0) && <ViewAllButton variant="outlined" onClick={() => handleViewAllClick()}>
                View All
            </ViewAllButton>}
        </PaperSection>
    );
}

export default SectionView;

import React from 'react';
import Section from '../containers/Section';
import { PR_URL } from "..//services/endpoints/github";
import { ISSUES_URL } from "../services/endpoints/github";
import { Grid, Paper, Typography } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const SectionContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    height: '100%'
}));

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function DashboardPage() {

    let propsArray = [{
        title: 'PR Section',
        RECORDS_URL: PR_URL,
        endpoint: 'pull-request',
        recordType: 'pr'
    },
    {
        title: 'Issues Section',
        RECORDS_URL: ISSUES_URL,
        endpoint: 'issue',
        recordType: 'issue'
    }];

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
                {propsArray.map(props => <Grid item xs={12} md={6} key={props.title}>
                    <SectionContainer>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {props.title}
                        </Typography>
                        <Section {...props} />
                    </SectionContainer>
                </Grid>)}
            </Grid>
        </ThemeProvider>
    );
}

export default DashboardPage;
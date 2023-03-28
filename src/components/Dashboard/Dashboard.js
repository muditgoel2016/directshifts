import React from 'react';
import PRSection from './PRSection';
import IssueSection from './IssueSection';
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

function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SectionContainer>
            <Typography variant="h5" component="h2" gutterBottom>
              PR Section
            </Typography>
                <PRSection />
          </SectionContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <SectionContainer>
            <Typography variant="h5" component="h2" gutterBottom>
              Issues Section
            </Typography>
                <IssueSection />
          </SectionContainer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Dashboard;


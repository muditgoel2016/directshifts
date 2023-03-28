import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelIcon from '@mui/icons-material/Label';
import PersonIcon from '@mui/icons-material/Person';

const Section = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
}));

const Title = styled(Typography)({
  marginBottom: ({ theme }) => theme.spacing(2),
});

const Label = styled(ListItem)(({ theme }) => ({
  padding: 0,
  paddingBottom: ({ theme }) => theme.spacing(1),
}));

const LabelIconWrapper = styled(ListItemIcon)({
  minWidth: '32px',
});

const Author = styled(ListItem)(({ theme }) => ({
  padding: 0,
  paddingTop: ({ theme }) => theme.spacing(1),
}));

const AuthorIconWrapper = styled(ListItemIcon)({
  minWidth: '32px',
});

function IssueDetails({ issueRecord }) {
  const { title, body, user, labels } = issueRecord;

  return (
    <Section elevation={3}>
      <Title variant="h5" component="h2">
        {title}
      </Title>
      <Typography variant="body1">{body}</Typography>
      <Label>
        <LabelIconWrapper>
          <LabelIcon />
        </LabelIconWrapper>
        <ListItemText primary="Labels" />
      </Label>
      <List dense>
        {labels.map((label) => (
          <ListItem key={label.id}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary={label.name} />
          </ListItem>
        ))}
      </List>
      <Author>
        <AuthorIconWrapper>
          <PersonIcon />
        </AuthorIconWrapper>
        <ListItemText primary="Author" />
      </Author>
      <List dense>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={user.login} />
        </ListItem>
      </List>
    </Section>
  );
}

export default IssueDetails;

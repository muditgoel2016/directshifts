import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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

function RecordCard({ record, onClick }) {
    return (
        <Card elevation={2} onClick={() => onClick(record)}>
            <CardHeader variant="h6">{record.title}</CardHeader>
            <CardBody>{record.body}</CardBody>
            <CardFooter>{record.user.login}</CardFooter>
        </Card>
    );
}

export default RecordCard;

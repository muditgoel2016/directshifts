import React from "react";
import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from "@mui/material/Avatar";
import LabelIcon from '@mui/icons-material/Label';
import Link from "@mui/material/Link";


const Section = styled(Paper)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    boxSizing: 'border-box',
}));

const Label = styled(ListItem)(({ theme }) => ({
    padding: 0,
    paddingBottom: ({ theme }) => theme.spacing(1),
}));

const LabelIconWrapper = styled(ListItemIcon)({
    minWidth: '32px',
});

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


const ItemDetailsPanelView = ({ record, urlLabel }) => {
    return (
        <Container>
            <Section elevation={3}>
                <DetailsContainer>
                    <TitleContainer>
                        <StyledAvatar alt={record.user.login} src={record.user.avatar_url} />
                        <Typography variant="h6" component="h2">
                            {record.title}
                        </Typography>
                    </TitleContainer>
                    <DetailsItem>
                        <DetailsLabel>{urlLabel}:</DetailsLabel>
                        <Link href={record.html_url} target="_blank">
                            {record.html_url}
                        </Link>
                    </DetailsItem>
                    <DetailsItem>
                        <DetailsLabel>Created by:</DetailsLabel>
                        <Typography variant="body2">{record.user.login}</Typography>
                    </DetailsItem>
                    <DetailsItem>
                        <DetailsLabel>State:</DetailsLabel>
                        <Typography variant="body2">{record.state}</Typography>
                    </DetailsItem>
                    <DetailsItem>
                        <DetailsLabel>Created at:</DetailsLabel>
                        <Typography variant="body2">{new Date(record.created_at).toLocaleString()}</Typography>
                    </DetailsItem>
                    <DetailsItem>
                        <DetailsLabel>Updated at:</DetailsLabel>
                        <Typography variant="body2">{new Date(record.updated_at).toLocaleString()}</Typography>
                    </DetailsItem>
                    <Label>
                        <LabelIconWrapper>
                            <LabelIcon />
                        </LabelIconWrapper>
                        <ListItemText primary="Labels" />
                    </Label>
                    <List dense>
                        {record.labels.map((label) => (
                            <ListItem key={label.id}>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText primary={label.name} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="body1">{record.body}</Typography>
                </DetailsContainer>
            </Section>
        </Container>
    );
};
export default ItemDetailsPanelView;
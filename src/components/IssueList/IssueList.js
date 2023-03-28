import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ISSUES_URL, LABELS_URL } from "../../services/endpoints/github";
import { ajaxService } from "../../services/ajaxService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

const Section = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
}));

const Title = styled(Typography)({
  marginBottom: ({ theme }) => theme.spacing(2),
});

const PaginationContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'gainsboro',
  borderRadius: '10px'
});

const Separator = styled(Divider)(({ theme }) => ({
  height: '24px',
  margin: 'auto',
  backgroundColor: theme.palette.grey[500],
}));

const PageDisplay = styled(Typography)({
  margin: '0px 16px',
});

const FilterContainer = styled('div')({
  marginTop: '16px',
  width: '100px',
  margin: 'auto 0',
  backgroundColor: 'white'
});

const LabelContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  margin: 'auto 0',
  marginLeft: '10px',
  backgroundColor: 'white'
});

const StyledChip = styled(Chip)({
  height: '24px',
  borderRadius: '12px',
  fontSize: '14px',
  color: 'rgba(0, 0, 0, 0.87)',
  backgroundColor: 'rgba(0, 0, 0, 0.08)',
  '& .MuiChip-deleteIcon': {
    width: '16px',
    height: '16px',
    marginLeft: '4px',
  },
});

const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});


function IssueList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('open');
  const [issues, setIssues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [labelOptions, setLabelOptions] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [isLoadingLabels, setIsLoadingLabels] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddLabel = () => {
    if (newLabel.trim() !== '' && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
      setNewLabel('');
    }
  };

  const handleLabelSelect = (event, value, reason) => {
    if (reason === "selectOption") {
      if (Array.isArray(value)) {
        // Filter out any values that are already in labels
        const newLabels = value.filter((label) => !labels.includes(label));
        setLabels([...labels, ...newLabels]);
      } else {
        if (value.trim() !== '' && !labels.includes(value)) {
          setLabels([...labels, value]);
        }
      }
    }
    if (reason === "removeOption") {
      setLabels(value);
    }
    if (reason === "clear") {
      setLabels(value);
    }
  };


  const handleLabelInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddLabel();
    }
  };

  function getIssues(currentPage, statusFilter, labels, onSuccess, onError) {
    const labelsParam = labels.length > 0 ? `&labels=${labels.join(',')}` : '';
    const url = `${ISSUES_URL}?state=${statusFilter}&direction=desc&per_page=100&page=${currentPage}${labelsParam}`;
    ajaxService(url, 'GET', null, onSuccess, onError);
  }

  function getLabels(onSuccess, onError) {
    const url = `${LABELS_URL}`;
    ajaxService(url, 'GET', null, onSuccess, onError);
  }

  useEffect(() => {
    setIsLoading(true);
    getIssues(currentPage, statusFilter, labels,
      (responseText) => {
        const issues = JSON.parse(responseText);
        setIssues(issues);
        setIsLoading(false);
      },
      (error) => {
        console.log(`Error occurred while fetching issues: ${error}`);
        setIsLoading(false);
      }
    );
  }, [currentPage, statusFilter, labels]);

  useEffect(() => {
    setIsLoadingLabels(true);
    getLabels((responseText) => {
      const labels = JSON.parse(responseText);
      const lbls = labels || [];
      setLabelOptions(lbls.map(lb => lb.name));
      setIsLoadingLabels(false);
    },
      (error) => {
        console.log(`Error occurred while fetching labels: ${error}`);
        setIsLoadingLabels(false);
      })
  }, []);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (issues.length === 0) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleRowClick = (issue) => {
    navigate(`/issues/${issue.number}`, { state: { issueRecord: issue } });
  }
  return (
    <Section elevation={3}>
      <Title variant="h5" component="h2">
        All Issues
      </Title>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F5F5F5' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <FilterContainer>
            <FormControl>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                label="Status"
                sx={{ width: '100px' }}
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
          </FilterContainer>
          <LabelContainer>
            <Autocomplete
              options={labelOptions}
              filterSelectedOptions={true}
              value={labels}
              loading={isLoadingLabels}
              onChange={(event, value, reason) => handleLabelSelect(event, value, reason)}
              inputValue={newLabel}
              onInputChange={(event, value) => setNewLabel(value)}
              onKeyDown={(event) => handleLabelInputKeyDown(event)}
              multiple={true}
              sx={{ minWidth: '200px', maxWidth: "300px" }}
              renderInput={(params) => (
                <TextField {...params} label="Label" variant="outlined" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <StyledChip
                    key={index}
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </LabelContainer>
        </div>
        <PaginationContainer>
          <Button disabled={currentPage === 1} onClick={handlePrevClick}>
            Prev
          </Button>
          <Separator orientation="vertical" flexItem />
          <PageDisplay variant="h6">{`Page ${currentPage}`}</PageDisplay>
          <Separator orientation="vertical" flexItem />
          <Button disabled={issues.length === 0} onClick={handleNextClick}>
            Next
          </Button>
        </PaginationContainer>
      </Toolbar>
      {isLoading && <LoaderContainer><CircularProgress /></LoaderContainer>}
      {!isLoading && (issues.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="issues table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Updated At</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                      No results found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                issues.map((issue) => (
                  <TableRow hover
                    key={issue.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                    onClick={() => handleRowClick(issue)}>
                    <TableCell component="th" scope="row">
                      {issue.number}
                    </TableCell>
                    <TableCell align="right">{issue.title}</TableCell>
                    <TableCell align="right">{issue.created_at}</TableCell>
                    <TableCell align="right">{issue.updated_at}</TableCell>
                    <TableCell align="right">{issue.state}</TableCell>
                    <TableCell align="right">{issue.user.login}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <LoaderContainer>
          <Typography>No results found</Typography>
        </LoaderContainer>
      ))}
    </Section>
  );
}

export default IssueList;
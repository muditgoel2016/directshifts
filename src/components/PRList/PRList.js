import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { PR_URL } from "../../services/endpoints/github";
import { ajaxService } from "../../services/ajaxService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
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

const SortContainer = styled('div')({
  marginTop: '16px',
  width: '150px',
  margin: 'auto 0',
  marginLeft: '10px',
  backgroundColor: 'white'
});

const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});


function PRList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('open');
  const [sortOrder, setSortOrder] = useState('created');
  const [prs, setPrs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function getPRs(currentPage, statusFilter, sortOrder, onSuccess, onError) {
    const url = `${PR_URL}?state=${statusFilter}&sort=${sortOrder}&direction=desc&per_page=100&page=${currentPage}`;
    ajaxService(url, 'GET', null, onSuccess, onError);
  }

  useEffect(() => {
    setIsLoading(true);
    getPRs(currentPage, statusFilter, sortOrder,
      (responseText) => {
        const prs = JSON.parse(responseText);
        setIsLoading(false);
        setPrs(prs);
      },
      (error) => {
        console.log(`Error occurred while fetching PRs: ${error}`);
        setIsLoading(false);
      }
    );
  }, [currentPage, statusFilter, sortOrder]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (prs.length === 0) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleRowClick = (pr) => {
    navigate(`/pull-requests/${pr.number}`, { state: { prRecord: pr } });
  }

  return (
    <Section elevation={3}>
      <Title variant="h5" component="h2">
        All Pull Requests
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
          <SortContainer>
            <FormControl>
              <InputLabel id="sort-order-label">Sort By</InputLabel>
              <Select
                labelId="sort-order-label"
                id="sort-order"
                value={sortOrder}
                label="Sort By"
                sx={{ width: '150px' }}
                onChange={handleSortOrderChange}
              >
                <MenuItem value="created">Created</MenuItem>
                <MenuItem value="updated">Updated</MenuItem>
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="long-running">Long Running</MenuItem>
              </Select>
            </FormControl>
          </SortContainer>
        </div>
        <PaginationContainer>
          <Button disabled={currentPage === 1} onClick={handlePrevClick}>
            Prev
          </Button>
          <Separator orientation="vertical" flexItem />
          <PageDisplay variant="h6">{`Page ${currentPage}`}</PageDisplay>
          <Separator orientation="vertical" flexItem />
          <Button disabled={prs.length === 0} onClick={handleNextClick}>
            Next
          </Button>
        </PaginationContainer>
      </Toolbar>
      {isLoading && (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      )}
      {!isLoading && (prs.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="pull request table">
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
              {prs.map((pr) => (
                <TableRow
                  hover
                  key={pr.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                  onClick={() => handleRowClick(pr)}
                >
                  <TableCell component="th" scope="row">
                    {pr.number}
                  </TableCell>
                  <TableCell align="right">{pr.title}</TableCell>
                  <TableCell align="right">{pr.created_at}</TableCell>
                  <TableCell align="right">{pr.updated_at}</TableCell>
                  <TableCell align="right">{pr.state}</TableCell>
                  <TableCell align="right">{pr.user.login}</TableCell>
                </TableRow>
              ))}
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

export default PRList;
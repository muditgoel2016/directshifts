import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

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

function PaginationTool({ recordsLength, onPaginationToolChange }) {

    const [currentPage, setCurrentPage] = useState(1);
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextClick = () => {
        if (recordsLength === 0) {
            return;
        }
        setCurrentPage(currentPage + 1);
    };
    useEffect(() => {
        onPaginationToolChange(currentPage);
    }, [currentPage, onPaginationToolChange]);

    return (
        <PaginationContainer>
            <Button disabled={currentPage === 1} onClick={handlePrevClick}>
                Prev
            </Button>
            <Separator orientation="vertical" flexItem />
            <PageDisplay variant="h6">{`Page ${currentPage}`}</PageDisplay>
            <Separator orientation="vertical" flexItem />
            <Button disabled={recordsLength === 0} onClick={handleNextClick}>
                Next
            </Button>
        </PaginationContainer>
    );
}

export default PaginationTool;

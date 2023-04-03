import React, { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import FilterTool from '../tools/FilterTool';
import SortTool from '../tools/SortTool';
import PaginationTool from '../tools/PaginationTool';

function PRToolbar({
    records,
    onToolbarControlsChange,
}) {
    const [sortOrder, setSortOrder] = useState('created');
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState('open');

    const handlePaginationToolChange = (currentPage) => {
        setCurrentPage(currentPage);
    }

    const handleFilterToolChange = (status) => {
        setStatus(status);
    };

    const handleSortToolChange = (sortOrder) => {
        setSortOrder(sortOrder);
    }

    useEffect(() => {
        let params = {
            state: status,
            sort: sortOrder,
            direction: 'desc',
            per_page: 100,
            page: currentPage,
        }
        onToolbarControlsChange(params);
    }, [currentPage, status, sortOrder, onToolbarControlsChange]);

    return (
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F5F5F5' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <FilterTool
                    onFilterToolChange={handleFilterToolChange}
                />
                <SortTool onSortToolChange={handleSortToolChange} />
            </div>
            <PaginationTool
                recordsLength={records.length}
                onPaginationToolChange={handlePaginationToolChange}
            />
        </Toolbar>
    );
}

export default PRToolbar;

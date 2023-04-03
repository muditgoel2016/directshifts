import React, { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import FilterTool from '../tools/FilterTool';
import LabelTool from '../tools/LabelTool';
import PaginationTool from '../tools/PaginationTool';

function IssueToolbar({
    records,
    onToolbarControlsChange,
}) {

    const multiple = true;
    const [selectedLabels, setSelectedLabels] = useState(multiple ? [] : '');
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState('open');

    const handleLabelToolChange = (labels) => {
        setSelectedLabels(labels);
    };

    const handlePaginationToolChange = (currentPage) => {
        setCurrentPage(currentPage);
    }

    const handleFilterToolChange = (status) => {
        setStatus(status);
    };

    useEffect(() => {
        let params = {
            state: status,
            direction: 'desc',
            per_page: 100,
            page: currentPage,
        }
        if (Array.isArray(selectedLabels)) {
            params = selectedLabels.length > 0 ? { ...params, labels: selectedLabels.join(',') } : params;
        } else if (selectedLabels.trim() !== '') {
            params = { ...params, labels: selectedLabels }
        }
        onToolbarControlsChange(params);
    }, [currentPage, status, selectedLabels, onToolbarControlsChange]);

    return (
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F5F5F5' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <FilterTool
                    onFilterToolChange={handleFilterToolChange}
                />
                <LabelTool
                    onLabelToolChange={handleLabelToolChange}
                    multiple={multiple}
                />
            </div>
            <PaginationTool
                recordsLength={records.length}
                onPaginationToolChange={handlePaginationToolChange}
            />
        </Toolbar>
    );
}

export default IssueToolbar;
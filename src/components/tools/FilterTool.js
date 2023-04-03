import React, { useState, useEffect }from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const FilterContainer = styled('div')({
    marginTop: '16px',
    width: '100px',
    margin: 'auto 0',
    backgroundColor: 'white'
});

function FilterTool({ onFilterToolChange }) {
    const [status, setStatus] = useState('open');

    useEffect(() => {
        onFilterToolChange(status);
    }, [status, onFilterToolChange])

    return (
        <FilterContainer>
            <FormControl>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                    labelId="status-filter-label"
                    id="status-filter"
                    value={status}
                    label="Status"
                    sx={{ width: '100px' }}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                </Select>
            </FormControl>
        </FilterContainer>
    );
}

export default FilterTool;
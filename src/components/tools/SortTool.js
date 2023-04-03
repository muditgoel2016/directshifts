import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const SortContainer = styled('div')({
    marginTop: '16px',
    width: '150px',
    margin: 'auto 0',
    marginLeft: '10px',
    backgroundColor: 'white'
});

function SortTool({ onSortToolChange }) {
    const [sortOrder, setSortOrder] = useState('created');

    useEffect(() => {
        onSortToolChange(sortOrder);
    }, [sortOrder, onSortToolChange])

    return (
        <SortContainer>
            <FormControl>
                <InputLabel id="sort-order-label">Sort By</InputLabel>
                <Select
                    labelId="sort-order-label"
                    id="sort-order"
                    value={sortOrder}
                    label="Sort By"
                    sx={{ width: '150px' }}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <MenuItem value="created">Created</MenuItem>
                    <MenuItem value="updated">Updated</MenuItem>
                    <MenuItem value="popularity">Popularity</MenuItem>
                    <MenuItem value="long-running">Long Running</MenuItem>
                </Select>
            </FormControl>
        </SortContainer>
    );
}

export default SortTool;
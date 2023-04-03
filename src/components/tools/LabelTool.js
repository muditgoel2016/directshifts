import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { LABELS_URL } from "../../services/endpoints/github";
import { ajaxService } from "../../services/ajaxService";
import { styled } from '@mui/material/styles';

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

function LabelTool({ onLabelToolChange, multiple }) {
    const [selectedLabels, setSelectedLabels] = useState(multiple ? [] : '');
    const [labelOptions, setLabelOptions] = useState([]);
    const [newLabel, setNewLabel] = useState('');
    const [isLoadingLabels, setIsLoadingLabels] = useState(false);

    function getLabels(onSuccess, onError) {
        const url = `${LABELS_URL}`;
        ajaxService(url, 'GET', null, onSuccess, onError);
    }

    function isValidLabel(label, selectedLabels) {
        if (Array.isArray(selectedLabels)) {
            return label.trim() !== '' && !selectedLabels.includes(label);
        } else {
            return label.trim() !== '' && (selectedLabels !== label);
        }
    }

    function returnValidLabels(labels, selectedLabels) {
        if (Array.isArray(labels)) {
            return labels.filter((label) => isValidLabel(label, selectedLabels));
        } else {
            return isValidLabel(labels, selectedLabels) ? labels : ''
        }
    }

    function getLabelsToBeSelected(validLabels, selectedLabels) {
        if (Array.isArray(validLabels)) {
            return [...selectedLabels, ...validLabels];
        }
        return validLabels;
    }

    const handleLabelSelect = (event, labels, reason) => {
        if (reason === "selectOption") {
            if (event && event.key === "Enter") {
                labels = newLabel;
            }

            setSelectedLabels((prevLabels) => {
                let validLabels = returnValidLabels(labels, prevLabels);
                let toBeSelectedLabels = getLabelsToBeSelected(validLabels, prevLabels);
                return toBeSelectedLabels;
                }
            );

        } else if (reason === "removeOption" || reason === "clear") {
            setSelectedLabels(labels);
        }
    };

    useEffect(() => {
        onLabelToolChange(selectedLabels);
    }, [selectedLabels, onLabelToolChange])

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
            });
    }, []);

    return (
        <LabelContainer>
            <Autocomplete
                options={labelOptions}
                filterSelectedOptions={true}
                value={selectedLabels}
                loading={isLoadingLabels}
                onChange={(event, labels, reason) => handleLabelSelect(event, labels || '', reason)}
                inputValue={newLabel}
                onInputChange={(event, label) => setNewLabel(label || '')}
                onKeyDown={(event) => handleLabelSelect(event, '', "selectOption")}
                multiple={multiple}
                sx={{ minWidth: '200px', maxWidth: "300px" }}
                renderInput={(params) => (
                    <TextField {...params} label="Label" variant="outlined" />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <StyledChip
                            key={option}
                            label={option}
                            {...getTagProps({ index })}
                        />
                    ))
                }
            />
        </LabelContainer>
    );
}

export default LabelTool;


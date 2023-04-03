import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ajaxService } from "../services/ajaxService";
import SectionView from '../views/SectionView';

function Section({ RECORDS_URL, endpoint, recordType }) {
    const [latestRecords, setlatestRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const getLatestFiveRecords = useCallback((onSuccess, onError) => {
        const url = `${RECORDS_URL}?sort=updated&direction=desc&per_page=5&page=1`;
        ajaxService(url, 'GET', null, onSuccess, onError);
    }, [RECORDS_URL]);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        getLatestFiveRecords(
            (responseText) => {
                const latestFiveRecords = JSON.parse(responseText);
                setlatestRecords(latestFiveRecords);
                setIsLoading(false);
            },
            (error) => {
                console.log(`Error occurred while fetching latest ${recordType}: ${error}`);
                setIsLoading(false);
                setIsError(true);
            }
        );
    }, [getLatestFiveRecords, recordType]);

    const handleClick = (record) => {
        navigate(`/${endpoint}/${record.number}`, { state: { [recordType]: record } });
    }

    const handleViewAllClick = () => {
        navigate(`/${endpoint}`);
    }

    return (
        <SectionView
            recordType={recordType}
            latestRecords={latestRecords}
            isLoading={isLoading}
            isError={isError}
            handleClick={handleClick}
            handleViewAllClick={handleViewAllClick}
        />
    );
}

export default Section;
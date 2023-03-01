import React, { useState, useCallback } from 'react';
import axios from 'axios';

/**
 * @TODO: Add types for requestConfig and applyData
 */

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const sendRequest = useCallback(async (requestConfig: any, applyData: any) => {
        setIsLoading(true);
        setError(null);

        const { url, method, headers, body } = requestConfig;

        axios({
            url,
            method,
            headers,
            data: body
        })
        .then(data => { 
            applyData(data);
        })
        .catch(err => {
            setError(err.message || 'Something went wrong!');
        });

        setIsLoading(false);
    }, []);
    
    return {
        isLoading,
        error,
        sendRequest
    };
}
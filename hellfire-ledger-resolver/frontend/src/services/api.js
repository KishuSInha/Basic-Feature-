import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5050/api/v1';

/**
 * Sends a CSV ledger to the Hawkins Intelligent Resolver.
 * @param {File} file - The CSV file to process.
 * @returns {Promise<Object>} The resolved transactions and settlements.
 */
export const resolveLedger = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_BASE_URL}/resolve`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('[API] Resolution Failure:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error || 'Uplink to Hawkins Lab failed.');
    }
};

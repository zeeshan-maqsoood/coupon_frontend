/**
 * Store API Integration for Eoupon
 * Handles fetching store data from the API
 */

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetches store data from the API
 * @param {string} slug - The store slug/identifier (default: 'store-1')
 * @returns {Promise<Object>} - Promise that resolves to store data or rejects with an error
 */
async function fetchStoreData(slug) {
    console.log(slug,"slug")
    try {
        console.log(`Fetching data from: ${API_BASE_URL}/stores/lookup?slug=${slug}`);
        const response = await fetch(`${API_BASE_URL}/stores/lookup?slug=${slug}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        
        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Raw response:', responseText);
        
        let data;
        try {
            data = JSON.parse(responseText);
            console.log('Parsed data:', data);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`, { cause: data });
            }
            
            if (!data) {
                throw new Error('No data received from the server');
            }
            
            if (data.success && data.data) {
                return data.data;
            } else {
                throw new Error('Invalid response format from API');
            }
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            throw new Error('Invalid JSON response from server');
        }
        
    } catch (error) {
        console.error('Error in fetchStoreData:', error);
        if (error.cause) {
            console.error('Error details:', error.cause);
        }
        throw error;
    }
}

// Export the function for use in other files
window.StoreAPI = { fetchStoreData };

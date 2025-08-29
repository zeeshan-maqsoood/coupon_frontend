/**
 * Store API Integration for Eoupon
 * Handles fetching store data from the API
 */

// API Configuration
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Fetches store data from the API
 * @param {string} slug - The store slug/identifier (default: 'store-1')
 * @returns {Promise<Object>} - Promise that resolves to store data or rejects with an error
 */
async function fetchStoreData(slug = 'store-1') {
    const response = await fetch(`${API_BASE_URL}/stores/lookup?slug=${slug}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.data) {
        return data.data;
    } else {
        throw new Error('Invalid response format from API');
    }
}

// Export the function for use in other files
window.StoreAPI = { fetchStoreData };

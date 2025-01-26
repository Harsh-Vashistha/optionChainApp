/**
 * Generalized fetch function to make API calls.
 * @param {string} url - The API endpoint.
 * @param {string} method - The HTTP method ('GET', 'POST', 'PUT', 'DELETE', etc.).
 * @param {object} data - The payload for POST/PUT requests (optional).
 * @param {function} onSuccess - The callback to execute on a successful response.
 * @param {function} onError - The callback to execute on error/failure.
 */
async function callApi(url, method = 'GET', data = null, onSuccess, onError) {
    try {
        const options = {
            method: method, // HTTP method (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json', // assuming the API deals with JSON
            },
        };

        // If there is data to send (e.g., in POST or PUT), attach it to the request
        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            options.body = JSON.stringify(data);
        }

        // Perform the fetch request
        const response = await fetch(url, options);

        // If response is not OK, throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON
        const responseData = await response.json();

        // Call the success callback with the response data
        if (onSuccess) {
            onSuccess(responseData);
            return responseData;
        }
    } catch (error) {
        // Call the error callback with the error message
        if (onError) {
            onError(error.message);
            return error;
        }
    }
}

export default callApi; 
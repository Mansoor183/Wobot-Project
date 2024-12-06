
const api = import.meta.env.VITE_GET_API;
const token = import.meta.env.VITE_TOKEN;

export const fetchCameras = newFunction();

function newFunction() {
    return async () => {
        try {
            const response = await fetch(api, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();
            return result?.data || [];
        } catch (error) {
            console.error('Error fetching cameras:', error);
            return [];
        }
    };
}

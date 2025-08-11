import axios from "axios";

const BASE_URL = "http://localhost:3000/api";
// const BASE_URL = "https://digitalmemorygarden-backend.onrender.com/api";


const apiClient = axios.create({
    baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
    const adminData = JSON.parse(localStorage.getItem("adminPassword") || "{}");
    if (adminData.password) {
        config.headers["x-admin-password"] = adminData.password;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 400) {
            console.error('API Error:', error.response.data);
            if (error.response.data.message?.includes('File too large')) {
                throw new Error('File is too large. Maximum size is 10MB per file.');
            }
            if (error.response.data.message?.includes('Invalid file type')) {
                throw new Error('Invalid file type. Please use supported formats.');
            }
            if (error.response.data.message?.includes('Too many files')) {
                throw new Error('Too many files. Maximum is 3 files total.');
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;




import axios from "axios";

export const fetchResources = async (endpoint) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/${endpoint}`);
        return data.body;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return error;
    }
};
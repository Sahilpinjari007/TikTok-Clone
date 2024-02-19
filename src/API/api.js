import axios from 'axios'


const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_RAPIDAPI_URL}`,
    headers: {
        "X-RapidAPI-Key": `${import.meta.env.VITE_APP_RAPIDAPI_KEY}` 
    }
});

export const getReelsByKeyWord = (params) => api.get('feedSearch/',{ params: params}); 
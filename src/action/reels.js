import * as api from '../API/api.js'


export const getReels = async (params) => {
    try {
        const { data } = await api.getReelsByKeyWord(params);
        return data;
    }
    catch (error) {
        return error
    }
}

export const getReelInfo = async (reelId) => {
    try {
        const { data } = await api.getReelInfoById(reelId);
        return data;
    }
    catch (error) {
        return error
    }
}
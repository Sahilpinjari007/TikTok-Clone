import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReels } from '../../action/reels.js'
import { exploresCategoris } from '../../constant.js';

export const getReelsByKeyword = createAsyncThunk(
    "TikTok/getReelsByKeyword",
    async ({ keywords, cursor }, { rejectWithValue }) => {
        try {
            const response = await getReels({ keywords, cursor });
            return response?.response?.data ? response.response.data : response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

const initialState = {
    keywords: exploresCategoris[Math.floor(Math.random() * 20)],
    cursor: 1,
    reels: [],
    response: {},
    error: null,
    loading: false,
}

const tiktokSlice = createSlice({
    name: 'TikTok',
    initialState,
    reducers: {
        setCursor: (state, action) => {
            state.cursor = action.payload.cursor;
        },
        setKeywords: (state, action) => {
            state.keywords = action.payload.keywords;
        },
        setReels: (state, action) => {
            state.reels = action.payload.reels;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getReelsByKeyword.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(getReelsByKeyword.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload;
                state.reels.push(...action.payload?.data?.videos);
            }),
            builder.addCase(getReelsByKeyword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export const { setCursor, setKeywords, setReels } = tiktokSlice.actions;
export default tiktokSlice.reducer;
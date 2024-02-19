import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBodyScrolling: false,
    loadMoreData: false,
    reelAutoScroll: false,
    isReelEnd: {
        value: false,
        index: 0
    },
    isOpenNav: false,
}

export const menulSlice = createSlice({
    name: 'menual',
    initialState,
    reducers: {
        setBodyScrolling: (state, action) => {
            state.isBodyScrolling = action.payload.isBodyScrolling
        },
        setLoadMoreData: (state, action) => {
            state.loadMoreData = action.payload.loadMoreData
        },
        setAutoReelScroll: (state, action) => {
            state.reelAutoScroll = action.payload.reelAutoScroll
        },
        setIsReelEnd: (state, action) => {
            state.isReelEnd = action.payload;
        },
        setIsOpenNav: (state, action) => {
            state.isOpenNav = action.payload;
        }
    }
});

export const { setBodyScrolling, setLoadMoreData, setAutoReelScroll, setIsReelEnd, setIsOpenNav } = menulSlice.actions;
export default menulSlice.reducer;
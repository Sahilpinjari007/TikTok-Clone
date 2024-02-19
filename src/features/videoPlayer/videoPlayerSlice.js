import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMute: true,
}

export const videoPlayerSlice = createSlice({
    name: "videoPlayer",
    initialState,
    reducers: {
        setIsMute: (state, action) => {
            state.isMute = action.payload.setIsMute;
        },
    }
})

export const { setIsMute, setIsPause } = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
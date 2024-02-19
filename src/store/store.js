import { configureStore } from "@reduxjs/toolkit";
import menulSlice from "../features/menul/menulSlice";
import videoPlayerSlice from "../features/videoPlayer/videoPlayerSlice";
import tiktokSlice from "../features/services/tiktokSlice";


export const store = configureStore({
    reducer: {
        app: menulSlice,
        videoPlayer: videoPlayerSlice,
        tiktok: tiktokSlice,
    }
})
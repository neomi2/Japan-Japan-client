import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";

export const myStore = configureStore({
    reducer: {
        user: userSlice
    }
})
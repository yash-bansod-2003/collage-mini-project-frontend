import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./courseSlice";

const store = configureStore({
    reducer: {
        course: courseSlice
    }
});

export default store;
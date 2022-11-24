import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./courseSlice";
import degreeSlice from "./degreeSlice";
import subjectSlice from "./subjectSlice";
import sectionSlice from "./sectionSlice";

const store = configureStore({
    reducer: {
        course: courseSlice,
        degree: degreeSlice,
        subject: subjectSlice,
        section: sectionSlice
    }
});

export default store;
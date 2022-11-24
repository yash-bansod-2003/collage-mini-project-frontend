import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./courseSlice";
import degreeSlice from "./degreeSlice";
import subjectSlice from "./subjectSlice";
import sectionSlice from "./sectionSlice";
import teacherSlice from "./teacherSlice";
import studentSlice from "./studentSlice";

const store = configureStore({
    reducer: {
        course: courseSlice,
        degree: degreeSlice,
        subject: subjectSlice,
        section: sectionSlice,
        teacher: teacherSlice,
        student: studentSlice,
    }
});

export default store;
import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: 'course',
    initialState: [],
    reducers: {
        setCourses(state, action) {
            return state = action.payload;
        },

        addCourse(state, action) {
            state.push(action.payload);
        },
    }
});

export const { setCourses, addCourse } = courseSlice.actions;
export default courseSlice.reducer;

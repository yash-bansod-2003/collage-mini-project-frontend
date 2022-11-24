import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

const slice = createSlice({
    name: 'teacher',

    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },

    reducers: {
        setTeachers(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
});


export const { setTeachers, setStatus } = slice.actions;

export default slice.reducer;

export { STATUSES };

export function fetchTeachers() {
    return async function fetchTeachersThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));

        try {
            const response = await axios.get('http://127.0.0.1:5000/api/teacher');
            dispatch(setTeachers(response.data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }

    }
}

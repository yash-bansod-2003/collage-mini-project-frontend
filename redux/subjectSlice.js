import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

const slice = createSlice({
    name: 'subject',

    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },

    reducers: {
        setSubjects(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
});


export const { setSubjects, setStatus } = slice.actions;

export default slice.reducer;

export { STATUSES };

export function fetchSubjects() {
    return async function fetchSubjectsThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));

        try {
            const response = await axios.get('http://127.0.0.1:5000/api/subject');
            dispatch(setSubjects(response.data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

const degreeSlice = createSlice({
    name: 'degree',

    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },

    reducers: {
        setDegrees(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
});


export const { setDegrees, setStatus } = degreeSlice.actions;


export { STATUSES };

export function fetchDegrees() {
    return async function fetchDegreesThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));

        try {
            const response = await axios.get('http://127.0.0.1:5000/api/degree');
            dispatch(setDegrees(response.data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

export default degreeSlice.reducer;
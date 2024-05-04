import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.weekday.technology/adhoc/getSampleJdJSON';

const initialState = {
    jobListings: [],
    loading: false,
    error: null,
    offset: 0,
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (offset) => {
    try {
        const response = await axios.post(BASE_URL, {
            limit: 10,
            offset,
        });
        return response.data;
    } catch (error) {
        throw Error('Failed to fetch jobs');
    }
});

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchJobs.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.jobListings = [
                ...new Map([...state.jobListings, ...action.payload.jdList].map((item) => [item.jdUid, item])).values(),
            ];
            state.offset += 10;
        });
        builder.addCase(fetchJobs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Failed to fetch jobs';
        });
    },
});

export default jobsSlice.reducer;

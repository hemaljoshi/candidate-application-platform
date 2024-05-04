import { combineReducers } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice'    

const rootReducer = combineReducers({
    jobs: jobsReducer,
});

export default rootReducer;

import { configureStore } from '@reduxjs/toolkit';
import validationReducer from '../FEATURES/validation/validationSlice';
import exerciseReducer from '../FEATURES/validation/ExerciseSlice';

export const store = configureStore({
    reducer: {
    validation: validationReducer,
    exercise: exerciseReducer}
})
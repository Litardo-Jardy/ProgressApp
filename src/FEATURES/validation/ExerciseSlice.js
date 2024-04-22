import { createSlice } from '@reduxjs/toolkit'

export const ExerciseSlice = createSlice({
    name: 'exercise',
    initialState: [],
    reducers: {
       addSerie: (state, action) => {
         return [...state, action.payload];}
    }});
export const { addSerie } = ExerciseSlice.actions
export default ExerciseSlice.reducer;
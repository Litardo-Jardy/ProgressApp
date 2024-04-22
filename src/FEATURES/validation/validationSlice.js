import { createSlice } from '@reduxjs/toolkit'

export const validationSlice = createSlice({
    name: 'validation',
    initialState: [],
    reducers: {
        validationUser: (state, action) => {
            return [action.payload]
        }
    }
})
export const { validationUser } = validationSlice.actions;
export default validationSlice.reducer;
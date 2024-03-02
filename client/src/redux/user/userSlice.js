import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentUser: undefined,
    loading: false,
    error: undefined
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state)=>{
            state.loading = true
        },
        signInFailure: (state, action)=>{
            state.loading = false,
            state.error = action.payload
        },
        signInSuccess: (state, action)=>{
            state.loading = false,
            state.currentUser = action.payload,
            state.error = undefined
        },
        updateUserStart: (state)=>{
            state.loading = true
        },
        updateUserSuccess: (state, action)=>{
            state.loading = false,
            state.currentUser = action.payload,
            state.error = undefined
        },
        updateUserFailure: (state, action)=>{
            state.loading = false,
            state.error = action.payload
        },
        deleteUserStart: (state)=>{
            state.loading = true
        },
        deleteUserSuccess: (state, action)=>{
            state.loading = false,
            state.error = undefined,
            state.currentUser = undefined
        },
        deleteUserFailure: (state, action)=>{
            state.loading = false,
            state.error = action.payload
        },

        signoutUserSuccess: (state, action)=>{
            state.error = undefined,
            state.currentUser = undefined
        },
        signoutUserFailure: (state, action)=>{
            state.error = action.payload
        }
    }
})

export default userSlice.reducer;
export const {signInFailure, 
    signInStart, 
    signInSuccess, 
    updateUserStart, 
    updateUserSuccess, 
    updateUserFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signoutUserSuccess,
    signoutUserFailure
} = userSlice.actions;
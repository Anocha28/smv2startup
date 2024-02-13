import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const user = JSON.parse(localStorage.getItem('smv2user'))
const API_URL = '/api/auth'

const initialState = {
    user: user ? user : null,
    login: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    },
    logout: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    },
    auth: {
        status: 'ok',
        isSuccess: true
    }
    
}

export const login = createAsyncThunk('login', async (data, thunkAPI)=>{
    try {
        const response = await axios.post(API_URL, data)
        
        if(response.data) {
            localStorage.setItem('smv2user', JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
    try {
        const response = await axios.post(API_URL+'/logout')
        if(response.status === 200){
            localStorage.removeItem('smv2user')
        }   
        //console.log(response)
        return response.data
    } catch (error) {
        const message = error.response.data.message ?? error.message ?? 'Server error.'
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const authCheck = createAsyncThunk('auth_check', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL+'/auth')
        return response.data
    } catch (error) {
        const message = error.response.data.message ?? error.message ?? 'Server error.'
        return thunkAPI.rejectWithValue(message)
    }
    
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authReset : (state) => {
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state)=>{
            state.login.isLoading = true
            state.login.isError = false
            state.login.message = ''
            //this is for logout
            state.logout.isSuccess = false
            //this is for logout
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.login.isLoading = false
            state.login.isSuccess = true
            state.login.isError = false
            state.login.message = ''
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action)=>{
            state.login.isLoading = false
            state.login.isSuccess = false
            state.login.isError = true
            state.login.message = action.payload
        })
        .addCase(logout.pending, (state)=>{
            //this is for login 
            state.login.isSuccess = false
            //this is for login
            state.logout.isLoading = true
            state.logout.isError = false
            state.logout.message = ''
            
        })
        .addCase(logout.fulfilled, (state)=>{
            state.user = null
            state.logout.isLoading = false
            state.logout.isSuccess = true
            state.logout.isError = false
            state.logout.message = ''
            
        })
        .addCase(logout.rejected, (state, action)=>{
            state.logout.isLoading = false
            state.logout.isSuccess = false
            state.logout.isError = true
            state.logout.message = action.payload
        })
        .addCase(authCheck.fulfilled, (state, action)=>{
            state.auth.isSuccess = true
            state.auth.status = action.payload
        })
        .addCase(authCheck.rejected, (state, action)=>{
            state.auth.isSuccess = false
            state.auth.status = action.payload
        })
    }
})


export const { authReset } = authSlice.actions
export default authSlice.reducer
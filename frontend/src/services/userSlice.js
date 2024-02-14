import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/user'

const initialState = {
    list: {
        userList: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        page: null,
        pageTotal: null,
    },
    add: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    },
    edit: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    },
    delete: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    },
}


export const getUsers = createAsyncThunk('get_users', async (data, thunkAPI)=>{
    try {
        const { searchKey, pageNum, pageLimit } = data
        const response = await axios.get(API_URL + `?searchKey=${searchKey}&pageNum=${pageNum}&pageLimit=${pageLimit}`, data)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const addUser = createAsyncThunk('add_user', async (data, thunkAPI)=>{
    try {
        const response = await axios.post(API_URL, data)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const editUser = createAsyncThunk('edit_user', async (data, thunkAPI)=>{
    try {
        const response = await axios.put(API_URL, data)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteUser = createAsyncThunk('delete_user', async (id, thunkAPI)=>{
    try {
        //const state = thunkAPI.getState()
        const response = await axios.delete(API_URL + `?id=${id}`)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addReset : (state) => {
            state.add.isSuccess = false,
            state.add.isError = false,
            state.add.message = ''
        },
        editReset : (state) => {
            state.edit.isSuccess = false,
            state.edit.isError = false,
            state.edit.message = ''
        },
        deleteReset : (state) => {
            state.delete.isSuccess = false,
            state.delete.isError = false,
            state.delete.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(addUser.pending, (state)=>{
            state.add.isLoading = true
            state.add.isSuccess = false
            state.add.isError = false
        })
        .addCase(addUser.fulfilled, (state)=>{
            state.add.isLoading = false
            state.add.isSuccess = true
            state.add.isError = false
        })
        .addCase(addUser.rejected, (state, action)=>{
            state.add.isLoading = false
            state.add.isSuccess = false
            state.add.isError = true
            state.add.message = action.payload
        })
        .addCase(editUser.pending, (state)=>{
            state.edit.isLoading = true
            state.edit.isSuccess = false
            state.edit.isError = false
        })
        .addCase(editUser.fulfilled, (state, action)=>{
            const editedUser = action.payload
            const index = state.list.userList.findIndex(x=>x._id === editedUser._id)
            state.list.userList.splice(index, 1, editedUser)
            state.edit.isLoading = false
            state.edit.isSuccess = true
            state.edit.isError = false
        })
        .addCase(editUser.rejected, (state, action)=>{
            state.edit.isLoading = false
            state.edit.isSuccess = false
            state.edit.isError = true
            state.edit.message = action.payload
        })
        .addCase(deleteUser.pending, (state)=>{
            state.delete.isLoading = true
            state.delete.isSuccess = false
            state.delete.isError = false
        })
        .addCase(deleteUser.fulfilled, (state, action)=>{
            const deletedUserId = action.payload
            const index = state.list.userList.findIndex(x=>x._id === deletedUserId)
            state.list.userList.splice(index, 1)
            state.delete.isLoading = false
            state.delete.isSuccess = true
            state.delete.isError = false
        })
        .addCase(deleteUser.rejected, (state, action)=>{
            state.delete.isLoading = false
            state.delete.isSuccess = false
            state.delete.isError = true
            state.delete.message = action.payload
        })
        .addCase(getUsers.pending, (state)=>{
            state.list.isLoading = true
            state.list.isSuccess = false
            state.list.isError = false
        })
        .addCase(getUsers.fulfilled, (state, action)=>{
            state.list.isLoading = false
            state.list.isSuccess = true
            state.list.userList = action.payload.userList
            state.list.page = action.payload.page
            state.list.pageTotal = action.payload.pageTotal
        })
        .addCase(getUsers.rejected, (state, action)=>{
            state.list.isLoading = false
            state.list.isSuccess = false
            state.list.isError = true
            state.list.message = action.payload
        })
    }
})


export const { addReset, editReset, deleteReset } = userSlice.actions
export default userSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    current: null,
    url: '',
    pageLimit: 5,
    search: ''
}

export const updateRoute = createAsyncThunk('update_route', async (route, thunkAPI)=>{
    try {
        const routeList = [
            'shipment',
            'invoice',
            'payment',
            'sales',
            'user'
        ]
        const idx = routeList.findIndex(x=>x===route)
        if(idx === -1){
            return null
        }
        return route
    } catch (error) {
        const message = 'route update error'
        return thunkAPI.rejectWithValue(message)
    }
})

export const setSearchKey = createAsyncThunk('set_searchkey', async (data, thunkAPI)=>{
    try {
        return data
    } catch (error) {
        const message = 'route update error'
        return thunkAPI.rejectWithValue(message)
    }
})

export const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateRoute.fulfilled, (state, action)=>{
            state.current = action.payload
        })
        .addCase(setSearchKey.fulfilled, (state, action)=>{
            state.search = action.payload
        })
    }
})

export default routeSlice.reducer
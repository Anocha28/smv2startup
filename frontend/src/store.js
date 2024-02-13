import { configureStore, combineReducers } from '@reduxjs/toolkit'
import routeReducer from './services/routeSlice'
import authReducer from './services/authSlice'
import userReducer from './services/userSlice'

const appReducer = combineReducers({
    route: routeReducer,
    auth: authReducer,
    user: userReducer,
})

const rootReducer = (state, action) => {
    if(action.type === 'logout/fulfilled'){
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()]
})
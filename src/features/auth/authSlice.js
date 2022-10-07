import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, register, refresh as refreshToken } from '../services/auth/authService';
import jwt_decode from 'jwt-decode'
import { index } from '../services/test/testAuthorizedService';
import { setProxyParams } from '../proxy/proxySlice';
import { useDispatch } from 'react-redux';
import { store } from '../../app/store';




export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({username, password}, thunkapi)=>{
        try {            
            const data = await register(username, password)
            // console.log(data)
            return data
        } catch (err) {
            // console.log(err)
            if(err.response.status == 409) return thunkapi.rejectWithValue("Username is taken")
            return thunkapi.rejectWithValue("Error Registering User")
            
        }
    }
)

export const logIn = createAsyncThunk(
    'auth/logIn',
    async ({username, password}, thunkapi)=>{
        try {
            const data = await login(username, password)
            // console.log(data);
            return data            
        } catch (err) {
            // console.log(err);
            return thunkapi.rejectWithValue('Error Loggin In')
            
        }
    }
)

export const logOut = createAsyncThunk(
    'auth/logOut',
    async ({}, thunkapi)=>{
        try {
            const data = await logout()
            return data
        } catch (err) {
            console.log(err);
            return thunkapi.rejectWithValue('Error Logging Out')
        }

    }
)

export const refresh = createAsyncThunk(
    'auth/refresh',
    async ({}, thunkapi)=>{
        try {
            const data = await refreshToken()
            return data
        } catch (err) {
            console.log(err);
            return thunkapi.rejectWithValue('Error Refreshing Token')
        }
    }
)


const initialState = {
   username: '',
   accessToken: '',
   authenticated: false,
   status: 'idle',
   msg:'',
   error:null,
  };

  export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: (state, action)=>{      
            state.username = undefined
            state.accessToken = undefined
            state.authenticated = undefined
            state.status = undefined
            state.msg = undefined
            state.error = undefined
        }

    },
    extraReducers:{
        [signUp.pending]:(state,action)=>{
            state.status = 'loading'
            state.msg = ''
            state.error = null
            
        },
        [signUp.fulfilled]:(state,action)=>{
            state.status = 'success'
            state.msg = action.payload.msg
            
        },
        [signUp.rejected]:(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
            
        },
        [logIn.pending]:(state,action)=>{
            state.status = 'loading'
            state.msg = ''
            state.error = null
            
        },
        [logIn.fulfilled]:(state,action)=>{
            const decode = jwt_decode(action.payload.accessToken)
            state.status = 'success'
            state.msg = action.payload.msg
            state.username = decode.username
            state.accessToken = action.payload.accessToken
            state.authenticated = true
            
            
        },
        [logIn.rejected]:(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
            
        },
        [logOut.pending]:(state,action)=>{
            state.status = 'loading'
            state.msg = ''
            state.error = null
            
        },
        [logOut.fulfilled]:(state,action)=>{
            state.status = 'success'
            state.username = ""
            state.authenticated = false
            
        },
        [logOut.rejected]:(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
            
        },
        [refresh.pending]:(state,action)=>{
            state.status = 'loading'
            
        },
        [refresh.fulfilled]:(state,action)=>{
            const decode = jwt_decode(action.payload.accessToken)
            state.status = 'success'
            state.username = decode.username
            state.accessToken = action.payload.accessToken
            state.authenticated = true
            
        },
        [refresh.rejected]:(state,action)=>{
            state.status = 'failed'
            state.username = ""
            state.authenticated = false
            state.error = action.payload
            
        }
    }

  })
export const {reset} = authSlice.actions
export default authSlice.reducer;

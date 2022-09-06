import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logIn } from '../auth/authSlice';
import { setProxy, clearProxy, getProxy} from '../services/data/proxyService';

export const setProxyConfig = createAsyncThunk(
    'proxy/setConfig',
    async ({proxyUrl, proxyToken, proxyUsername}, thunkapi)=>{
        try {
            console.log(proxyUsername);
            
            const data = await setProxy(proxyUrl, proxyToken, proxyUsername)
            return data
        } catch (err) {
            console.log(err);
            return thunkapi.rejectWithValue('Error Setting Proxy Configs')
            
        }
    }
)

export const getProxyConfig = createAsyncThunk(
    'proxy/getConfig',
    async ({}, thunkapi)=>{
        try {
            const data = await getProxy()
            return data
        } catch (err) {
            if(err.status == 404) return thunkapi.rejectWithValue("No Proxy Configuration")
            console.log(err);
            return thunkapi.rejectWithValue('Error Getting Configuration')
        }
    }
) 

export const clearProxyConfig = createAsyncThunk(
    'proxy/clearConfig',
    async ({}, thunkapi)=>{
        try {
            const data = await clearProxy()
            return data
        } catch (err) {
            console.log(err);
            return thunkapi.rejectWithValue('Error Clearing Configuration')
            
        }
    }
)
const initialState = {
    proxyUrl: '',
    proxyToken: '',
    proxyUsername: '',
    status: 'idle',
    msg: '',
    errors: [],
    data: [],
  };

  export const proxySlice = createSlice({
    name:'proxy',
    initialState,
    reducers:{
        setProxyParams:(state,action) =>{
            console.log(action.payload);
            
            // state.proxyUrl = action.payload.proxyUrl
            // state.proxyToken = action.payload.proxyToken
        },
        setUsername: (state,action)=>{
            state.username = action.payload
        },
        reset: (state) =>{
            state.proxyUrl = undefined
            state.proxyToken = undefined
            state.proxyUsername = undefined
            state.status = undefined
            state.msg = undefined
            state.errors = undefined
            state.data = undefined
        }

    },
    extraReducers:{
        [setProxyConfig.pending]:(state,action)=>{
            state.status = 'loading'

        },
        [setProxyConfig.fulfilled]:(state,action)=>{
            state.status = 'success'
            state.proxyUsername = action.payload.username
            state.proxyUrl = action.payload.url
            state.proxyToken = action.payload.encryptedToken
            state.msg = action.payload.msg

        },
        [setProxyConfig.rejected]:(state,action)=>{
            state.status = 'failed'
            state.errors = action.payload.error

        },
        [getProxyConfig.pending]:(state,action)=>{
            state.status = 'loading'
            state.msg = ''
            
        },
        [getProxyConfig.fulfilled]:(state,action)=>{
            state.status = 'success'
            state.msg = "Configuration Saved"
            state.proxyUrl = action.payload.proxyConfig.url
            state.proxyUsername = action.payload.proxyConfig.username
            state.proxyToken = action.payload.proxyConfig.encryptedToken
            
        },
        [getProxyConfig.rejected]:(state,action)=>{
            state.status = 'failed'
            state.proxyUrl = ''
            state.proxyToken = ''

        },
        [clearProxyConfig.pending]:(state,action)=>{
            state.status = 'loading'

        },
        [clearProxyConfig.fulfilled]:(state,action)=>{
            state.status = 'success'
            state.proxyUrl = undefined
            state.proxyToken = undefined
            state.proxyUsername = undefined
            state.msg = action.payload.msg
            
        },
        [clearProxyConfig.rejected]:(state,action)=>{
            state.status = 'failed'
            state.errors = action.payload

        },
    
    }

  })

export const {setProxyParams, setUsername, reset} = proxySlice.actions
export default proxySlice.reducer;

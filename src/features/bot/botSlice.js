import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, update, destroyPending } from '../services/data/botService';

export const createPendingJob = createAsyncThunk(
    'bot/createJob',
    async ({date, startTime, endTime, clubUsername, clubPassword, member, priorityList, proxy, botStartDate, botStartTime}, thunkapi) => {
        try {
            const data = await create(date, startTime, endTime, clubUsername, clubPassword, member, priorityList, proxy, botStartDate, botStartTime)
            return data
        } catch (err) {
            console.log('error');
            return thunkapi.rejectWithValue('Job already created for date')
            // return err.data
        }
})

export const updatePendingJob = createAsyncThunk(
    'bot/updateJob',
    async ({date, startTime, endTime, clubUsername, clubPassword, member, priorityList, proxy, botStartDate, botStartTime, _id}, thunkapi) => {
        try {
            const data = await update(date, startTime, endTime, clubUsername, clubPassword, member, priorityList, proxy, botStartDate, botStartTime, _id)
            return data
        } catch (err) {
            console.log(err);
            return thunkapi.rejectWithValue('Job already created for date')
        }
})

export const deletePendingJob = createAsyncThunk(
    'bot/deleteJob',
    async ({_id}, thunkapi) => {
        try {
            const data = await destroyPending(_id)
            console.log('data');
            console.log(data);
            
            return thunkapi.fulfillWithValue("Job Deleted")
        } catch (err) {
            console.log(err);
            return thunkapi.rejectWithValue('Error Deleteing Job')
        }
})

const initialState = {
    selectedJob: null,
    teeDate: '',
    startTime: '',
    endTime: '',
    courseList: ['Fazio Foothills', 'Coore Crenshaw Cliffside', 'Fazio Canyons', 'Palmer Lakeside'],
    priorityList: [],
    username: '',
    password: '',
    member: '',
    status: 'idle',
    msg: '',
    error: '',
  };

  export const botSlice = createSlice({
    name:'bot',
    initialState,
    reducers:{
        addCourse: (state, action) =>{
            if(state.priorityList.length < 4){
                state.priorityList.push(action.payload)
            }
        },
        removeCourse: (state, action) =>{
            state.priorityList.splice(action.payload, 1)
        },
        selectJob:(state, action)=>{
            state.selectedJob = action.payload
            state.priorityList = action.payload.courseList
        },
        clearJob: (state, action)=>{
            state.selectedJob = null
            state.priorityList = []
        },
        clearMsgs: (state, action)=>{
            state.msg = ''
            state.error = ''
        },

        reset: (state) =>{
            state.pageName = undefined
            state.postCount =undefined
            state.proxyUrl = undefined
            state.proxyToken = undefined
            state.username = undefined
            state.status = undefined
            state.msg = undefined
            state.errors = undefined
            state.data = undefined
       }
    },
    extraReducers:{
        [createPendingJob.pending]:(state,action)=>{
            state.status = 'loading'
            state.msg = null
            state.error = null
        },
        [createPendingJob.fulfilled]:(state,action)=>{
            state.status = 'success'
            state.msg = action.payload.msg
        },
        [createPendingJob.rejected]:(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        },
        [updatePendingJob.pending]:(state,action)=>{
            state.status = 'loading'
            // state.error = action.payload
        },
        [updatePendingJob.fulfilled]:(state,action)=>{
            state.status = 'success'
            state.msg = action.payload.msg
        },
        [updatePendingJob.rejected]:(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        },
        [deletePendingJob.pending]:(state,action)=>{
            state.status = 'loading'
            state.selectedJob = null
            
        },
        [deletePendingJob.fulfilled]:(state,action)=>{
            state.status = 'success'
            state.msg = action.payload
            state.selectedJob = null
            state.priorityList = []
        },
        [deletePendingJob.rejected]:(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        },
    }

  })

export const { reset, addCourse, removeCourse, selectJob, clearJob, clearMsgs } = botSlice.actions
export default botSlice.reducer;

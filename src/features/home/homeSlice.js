import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../utils/convertTime';
import { getJobs, destroyCompleted } from '../services/data/botService';

export const getAllJobs = createAsyncThunk(
    'home/getJobs',
    async ({}, thunkapi) => {
        try {
            const data = await getJobs()
            console.log(data);
            
            return data
        } catch (err) {
            console.log(err);
            return
        }
})

export const deleteCompletedJob = createAsyncThunk(
    'home/destroyJob',
    async ({_id}, thunkapi) => {
        try {
            // const data = await destroyCompleted(_id)
            // console.log(data);
            
            // return 
            return thunkapi.fulfillWithValue('Completed Job Deleted')
        } catch (err) {
            console.log(err);
            return thunkapi.rejectWithValue("Error Deleteing Completed Job")
        }
})


const initialState = {
    pendingJobs: [],
    completedJobs: [
        {
            date:"09/14/2022", 
            successful:true,
            time:"8:30 AM", 
            course:"Fazio Foothills", 
            member:"David"  
        }, 
        {
            date:"09/15/2022", 
            successful:false,
            time:"8:39 AM", 
            course:"Fazio Foothills", 
            member:"David"  
        }, 
        {
            date:"09/16/2022", 
            successful:true,
            time:"7:30 AM", 
            course:"Coore Crenshaw Cliffside", 
            member:"David"  
        }, 
        {
            date:"09/17/2022", 
            successful:true,
            time:"10:30 AM", 
            course:"Palmer Lakeside", 
            member:"David"  
        }, 
    ],
    botRunning: false,
    totalRanBots: 0,
    // upcomingBookedDates: ['Coore Crenshaw Cliffside @ 9/3/2022 9:00 AM', 'Fazio Canyons @ 9/4/2022 8:30 AM', 'Palmer Lakeside @ 9/19/2022 12:00 PM', ' Fazio Canyons @ 9/25/2022 11:00 AM'],
    member: '',
    status: 'idle',
    msg: '',
    error: '',
  };

  export const homeSlice = createSlice({
    name:'home',
    initialState,
    reducers:{
        removeJob: (state, action) =>{
            state.pendingBotJobs.splice(action.payload, 1)
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
        [getAllJobs.pending]:(state,action)=>{
            state.status = 'loading'
            state.username = action.payload
        },
        [getAllJobs.fulfilled]:(state,action)=>{
            // console.log()
            state.status = 'success'
            state.pendingJobs = action.payload.pendingJobs.map(job=>job.date = {...job, date:formatDate(job.date)})
            // state.completedJobs = action.payload.completedJobs.map(job=>job.date = {...job, date:formatDate(job.date)})
        },
        [getAllJobs.rejected]:(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        },
        [deleteCompletedJob.pending]:(state,action)=>{
            state.status = 'loading'

        },
        [deleteCompletedJob.fulfilled]:(state,action)=>{
            state.status = 'success'
            state.completedJobs.splice(action.payload, 1)
        },
        [deleteCompletedJob.rejected]:(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        },
    }

  })

// export const {setProxyParams, setUsername} = scrapeSlice.actions
export const { reset, addCourse, removeCourse } = homeSlice.actions
export default homeSlice.reducer;

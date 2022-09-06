import axiosInstance from "./protectedDataAxios"

export const create = async (date, startTime, endTime, clubUsername, clubPassword, member, priorityList, proxy) =>{
    const resp = await axiosInstance.post('/bot/create', {date, startTime, endTime, clubUsername, clubPassword, member, priorityList, proxy})
    return resp.data

}

export const getJobs = async () =>{
    const resp = await axiosInstance.get('/bot/list')
    return resp.data
    
}

export const update = async (date, startTime, endTime, clubUsername, clubPassword, member, priorityList, proxy, _id) =>{
    const resp = await axiosInstance.put('/bot/update', {date, startTime, endTime, clubUsername, clubPassword, member, priorityList, proxy, _id})
    return resp.data

}

export const destroyPending = async (_id) =>{
    console.log(_id);
    
    const resp = await axiosInstance.delete(`/bot/destroy/${_id}`)
    return resp.data

}

export const destroyCompleted = async (_id) =>{
    console.log(_id);
    
    const resp = await axiosInstance.delete(`/bot/destroy/completed/${_id}`)
    return resp.data

}
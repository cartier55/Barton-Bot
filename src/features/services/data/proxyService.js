import axiosInstance from "./protectedDataAxios"

export const setProxy = async (proxyUrl, proxyToken, proxyUsername) =>{
    const resp = await axiosInstance.post('/proxy/new', {proxyUrl:proxyUrl, proxyToken:proxyToken, proxyUsername:proxyUsername})
    return resp.data
}

export const clearProxy = async () =>{
    const resp = await axiosInstance.post('/proxy/clear', )
    return resp.data
}

export const getProxy = async () =>{
    const resp = await axiosInstance.post('/proxy/get', )
    return resp.data
}

import axiosInstance from "./authAxios";

// Need No Token
export const register = async (username, password) =>{
    const resp = await axiosInstance.post('/signUp', {username:username, password:password})
    return resp.data
}

export const login = async (username, password) =>{
    const resp = await axiosInstance.post('/logIn', {username:username, password:password})
    return resp.data
}

// Need Refresh Cookie Token
export const logout = async () =>{
    const resp = await axiosInstance.post('/logOut')
    return resp.data
}

export const refresh = async ()=>{
    const resp = await axiosInstance.get('/refresh')
    return resp.data
}
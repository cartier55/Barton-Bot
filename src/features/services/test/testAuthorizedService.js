import axiosInstance from "./protectedAxios"

export const index = async (username, password) =>{
    const resp = await axiosInstance.get('/')
    return resp.data

}

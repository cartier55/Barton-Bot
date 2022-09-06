import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { refresh } from "../features/auth/authSlice";

const PersitLogin = () => {
    const authDetails = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const verify = async () => {
            dispatch(refresh({}))
        }
        if(!authDetails?.accessToken) verify()
    }, [])
    return ( 
        <>
        {authDetails.status == 'loading' ? <p>loading...</p> : <Outlet/>}
        </>
     );
}
 
export default PersitLogin;
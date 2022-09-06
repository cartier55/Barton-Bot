import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector} from "react-redux";
import { clearProxyConfig, getProxyConfig, setProxyConfig } from "../features/proxy/proxySlice";
import { useEffect } from "react";

const Proxy = () => {
    const authD = useSelector(state => state.auth)
    const {proxyUrl, proxyToken, proxyUsername, msg} = useSelector(state => state.proxy)
    const res = useSelector(state => state.auth.res)
    const dispatch = useDispatch()
    const proxyUrlRegex = new RegExp('.+:[0-9]{1,6}$')
    const proxySettingsSchema = Yup.object({
        proxyUrl: Yup.string().required('Required').trim().matches(proxyUrlRegex, 'Provide Valid Proxy Url + Port'),
        proxyUsername: Yup.string().required('Required'),
        proxyToken: Yup.string().required('Required')
    })

    const handleClick = (e) =>{
        // e.preventDefault()
        dispatch(clearProxyConfig({username:authD.username}))

    }

    useEffect(() => {
        dispatch(getProxyConfig({username:authD.username}))
    }, [])
    // const showTestRes = () =>{
    //     dispatch(test({}))
    //     // return (<p>{res}</p>)
    // }
    return ( 
        <div className="main">
        <h1>Proxy Configuration</h1>
        <hr />
        
        <Formik
            // style={formStyle}
            initialValues={{
                proxyUrl:'',
                proxyUsername:'',
                proxyToken:''
                }}
            validationSchema={proxySettingsSchema}
            // onSubmit send params to backend
            onSubmit={({proxyUrl,proxyToken,proxyUsername})=>{

                console.log('try');
                console.log(proxyUsername);
                
                dispatch(setProxyConfig({proxyUrl, proxyToken, proxyUsername}))
                window.location.reload();
            }}
            

        >
            {({values, errors, touched})=>{
                return(
                    <Form className="form-center">
                        <label className="" >Proxy Url:Port</label>
                        {errors.proxyUrl && touched.proxyUrl ? <div className="error-message">{errors.proxyUrl}</div> : null}
                        <Field className="form-control mt-1" disabled={proxyUrl && proxyToken && proxyUsername ? true : false} placeholder={proxyUrl && proxyToken && proxyUsername ? proxyUrl : "Proxy Url:Port"} name="proxyUrl" />
                        <label className="" >Proxy Username</label>
                        {errors.proxyUsername && touched.proxyUsername ? <div className="error-message">{errors.proxyUsername}</div> : null}
                        <Field className="form-control mt-1" disabled={proxyUrl && proxyToken && proxyUsername ? true : false} placeholder={proxyUrl && proxyToken && proxyUsername ? proxyUsername : "Proxy Username"} name="proxyUsername"/>
                        <label className="" >Proxy Token/Password</label>
                        {errors.proxyToken && touched.proxyToken ? <div className="error-message">{errors.proxyToken}</div> : null}
                        <Field className="form-control mt-1" disabled={proxyUrl && proxyToken && proxyUsername ? true : false} placeholder="Proxy Token/Password" value={proxyUrl && proxyToken && proxyUsername ? proxyToken : values.proxyToken} type="password" name="proxyToken"/>
                        {!proxyUrl && !proxyToken && !proxyUsername ? <button className="btn btn-primary" type="submit" >Save Proxy Config</button>: null}
                        {proxyUrl && proxyToken && proxyUsername ? <button className="btn btn-primary" type="button" onClick={()=>{handleClick()}}>Clear Proxy Config</button> : null}
                    </Form>)
            }

            }

        </Formik>
        {/* {loginError && (<p className="error-message" style={{marginTop:'35px'}}>{loginError}</p>)} */}
        {msg && (<p className="success-message" style={{marginTop:'35px'}}>{msg}</p>)}

    </div>
     );
}
 
export default Proxy;
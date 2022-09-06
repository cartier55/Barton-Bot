import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { logIn } from "../features/auth/authSlice";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authDetails = useSelector(state=>state.auth)
    const loginError = authDetails.error
    const msg = authDetails.msg
    const signUpSchema = Yup.object({
        username: Yup.string().required('required'),
        password: Yup.string().required('required'),
    })

   
    return ( 
        <div style={{
            width:'100%'
        }}>
            <Link to="/">
            <h3 className="auth-header">Barton Bot</h3> 
            </Link>
            {/* Add scraper icon */}
            {/* Make pop when logged in and clickable */}
            <div className="center">
            <h1 className="header-title">Log In</h1>
            <Formik
                initialValues={{
                    username:'',
                    password:'',
                }}
                validationSchema={signUpSchema}
                // onSubmit send params to backend
                onSubmit={({username,password})=>{
                    dispatch(logIn({username,password}))
                    // navigate('/')
                }}            
                
                >
                {({values, errors, touched})=>{
                    return(
                        <Form className="auth-form-center">
                            <label className="">Username</label>
                            {errors.username && touched.username ? <div className="error-message">{errors.username}</div> : null}
                            <Field className="form-control mt-1" placeholder="Username" name="username" label="Username" />
                            <label className="">Password</label>
                            {errors.password && touched.password ? <div className="error-message"s>{errors.password}</div> : null}
                            <Field className="form-control mt-1" placeholder="Password" name="password"/>
                            {loginError && (<p className="error-message" style={{marginTop:'35px'}}>{loginError}</p>)}
                            {msg && (<p className="success-message" style={{marginTop:'35px'}}>{msg}</p>)}
                            <button className="btn btn-primary" type="submit">Log In</button>
                        </Form>)
                }
                
            }

            </Formik>
            </div>
        </div>
     );
}
 
export default Login;
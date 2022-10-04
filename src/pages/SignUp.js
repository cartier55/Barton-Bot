import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signUp } from "../features/auth/authSlice";


const SignUp = () => {
    const dispatch = useDispatch()
    const naviagte = useNavigate()
    const authDetails = useSelector(state=>state.auth)
    const signupError = authDetails.error
    const msg = authDetails.msg
    const signUpSchema = Yup.object({
        username: Yup.string().required('required'),
        password: Yup.string().required('required'),
    })
    const handleClick = ()=>{
        console.log('try');
        
        if(authDetails.authenticated) return naviagte('/')
        else return
    }
   

    return ( 
        <div style={{
            width:'100%'
        }}>
            <Link to="/">
            <h3 className="auth-header">Barton Bot</h3> 
            </Link>
            {/* Add scraper icon */}
            <div className="center">
            <h1 className="header-title">Register New User</h1>
            <Formik
                initialValues={{
                    username:'',
                    password:'',
                }}
                validationSchema={signUpSchema}
                // onSubmit send params to backend
                onSubmit={(values)=>dispatch(signUp({username:values.username,password: values.password}))}
                
                
                >
                {({values, errors, touched})=>{
                    return(
                        <Form className="auth-form-center">
                            <label className="">Username</label>
                            {errors.username && touched.username ? <div className="error-message">{errors.username}</div> : null}
                            <Field className="form-control mt-1" placeholder="Username" name="username" label="Username" />
                            <label className="">Password</label>
                            {errors.password && touched.password ? <div className="error-message"s>{errors.password}</div> : null}
                            <Field className="form-control mt-1" placeholder="Password" type='password' name="password"/>
                            {signupError && (<p className="error-message" style={{marginTop:'35px'}}>{signupError}</p>)}
                            {msg && (<p className="success-message" style={{marginTop:'35px'}}>{msg}</p>)}
                            <button className="btn btn-primary" type="submit">Sign Up</button>
                        </Form>)
                }
                
            }

            </Formik>
            </div>
        </div>
     );
}
 
export default SignUp;
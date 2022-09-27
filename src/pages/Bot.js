import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addCourse, removeCourse, updatePendingJob, deletePendingJob, clearMsgs, createPendingJob } from "../features/bot/botSlice";
import { useDispatch, useSelector } from "react-redux";


import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { intToHHMM } from "../utils/convertTime";
import DatePicker from "../componets/DatePicker";


const Bot = () => {
    const test = false
    const {proxyUrl} = useSelector(state => state.proxy)
    const {courseList, priorityList, msg, error, selectedJob} = useSelector(state => state.bot)
    const dispatch = useDispatch()
    const today = new Date()
    const paramsSchema = Yup.object({
        date: Yup.date().required('Required').min(new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000)), "Date must be at least seven days ahead"),
        startTime: Yup.string().required('Required'),
        endTime: Yup.string().required('Required'),
        member: Yup.string(),
        clubUsername: Yup.string().required('This field is required to login'),
        clubPassword: Yup.string().required('This field is required to login'),
        proxy: Yup.boolean(),
        botStartDate: Yup.string(),
        botStartTime: Yup.string(),
    })

    const formStyle = {
        marginTop: '100px'
    }
    useEffect(()=>{
        dispatch(clearMsgs())
    }, [])
    if(selectedJob) console.log(selectedJob)
    const [time, setTime] = useState(28980)
    const [startTime, setStartTime] = useState('00:00')
    const [endTime, setEndTime] = useState('00:00')
    const handleTimeChange = (time) => {
        console.log(time);
        setTime(time)
        
    }
    const handleStartTime = () =>{
        setStartTime(intToHHMM(time))
    }
    
    const handleEndTime = () =>{
        setEndTime(intToHHMM(time))
    }
    const handleDelete = async (e) =>{
        e.preventDefault()
        await dispatch(deletePendingJob({_id:selectedJob._id}))
        console.log(selectedJob)
        

    }
    const handleAddPriority = (e) =>{
        console.log(e.target.id)
        dispatch(addCourse(e.target.textContent))
    }
    const handleRemovePriority = (e) =>{
        dispatch(removeCourse(e.target.id))
    }
    const priorityLis = priorityList.map((course, i) => <li key={i} id={i} className="course" onClick={handleRemovePriority}>{course}</li>);
    const courseLis = courseList.map((course, i) => <li key={i} id={i} className="course" onClick={handleAddPriority}>{course}</li>);

   
    return ( 
        <div className="main">
            <div>

            <h1>Bot Setup</h1>
            <hr />
            <Formik
                style={formStyle}
                initialValues={{
                    date: selectedJob ? new Date(selectedJob.date) : '',
                    startTime: selectedJob ? selectedJob.startTime : '',
                    endTime: selectedJob ? selectedJob.endTime : '',
                    member:selectedJob ? selectedJob.member : '',
                    clubUsername:selectedJob ? selectedJob.clubUsername : '',
                    clubPassword:'',
                    proxy:selectedJob ? selectedJob.proxy : false,
                    botStartDate:selectedJob ? selectedJob.botStartDate : '',
                    botStartTime:selectedJob ? selectedJob.botStartTime : '',
                }}
                validationSchema={paramsSchema}
                // onSubmit send params to backend
                // onSubmit={({pageName, postCount, loggedIn, username, password})=>dispatch(startBot({pageName, postCount, loggedIn, username, password}))}
                // onSubmit={(values)=>console.log({...values, priorityList:priorityList})}
                onSubmit={(values)=>{
                    if(priorityList.length === 0) return window.alert('Priority List Is Required')
                    if(selectedJob) return dispatch((updatePendingJob({...values, priorityList:priorityList, _id:selectedJob._id})))
                    return dispatch(createPendingJob({...values, priorityList:priorityList}))}

                }
                // onReset={(values, {resetForm})=>resetForm(initialValues)}
                // onReset={(values, resetForm) => {
                //     resetForm()   
              
                // //     setSubmitting(false);
                //   }}
                
            >
                {({values, errors, touched, resetForm})=>{
                    return(
                    <Form className="form-center">
                        <div className="date-time-picker">
                            <div class="bot-time-wrapper">
                            {/* <div class="col"> */}

                            <div className="bot-start-date">
                                <label className="form-block-label">Bot Start Date</label>
                                <DatePicker className={ errors.botStartDate && touched.botStartDate ? "form-control mt-1 error-input" : "form-control mt-1"} name="botStartDate" />
                            </div>
                            <div className="bot-start-time">
                                <label className="form-block-label">Bot Start Time</label>
                                <Field className={ errors.botStartTime && touched.botStartTime ? "form-control mt-1 error-input" : "form-control mt-1"} name="botStartTime"/>
                            </div>
                            {/* </div> */}
                            </div>
                            <label className="form-block-label">Tee Off Date</label>
                            <div class="form-group row">
                            <div class="col">
                            <DatePicker className={ errors.date && touched.date ? "form-control mt-1 error-input" : "form-control mt-1"} name="date" />
                            </div>
                            <div class="col">
                            {errors.date && touched.date ? <div className="error-message">{errors.date}</div> : null}
                            </div>

                            </div>
                            
                            
                                <label className="form-block-label" >Time Block</label>
                            <div class="form-group row" style={{width:"250px"}}>
                                {/* {errors.startTime && touched.startTime ? <div className="error-message">{errors.startTime}</div> : null} */}
                                <div class="col-sm-10">
                                {/* <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"> */}
                                    {/* <Field className="form-control mt-1" as="select" name="startTime" > */}
                                    <Field className={ errors.startTime && touched.startTime ? "form-control mt-1 error-input" : "form-control mt-1"}   as="select" name="startTime">
                                        <option value={"8:03 AM"}>8:03 AM</option>
                                        <option value={"8:12 AM"}>8:12 AM</option>
                                        <option value={"8:21 AM"}>8:21 AM</option>
                                        <option value={"8:30 AM"}>8:30 AM</option>
                                        <option value={"8:39 AM"}>8:39 AM</option>
                                        <option value={"8:48 AM"}>8:48 AM</option>
                                        <option value={"8:57 AM"}>8:57 AM</option>
                                        <option value={"9:06 AM"}>9:06 AM</option>
                                        <option value={"9:15 AM"}>9:15 AM</option>
                                        <option value={"9:24 AM"}>9:24 AM</option>
                                        <option value={"9:33 AM"}>9:33 AM</option>
                                        <option value={"9:42 AM"}>9:42 AM</option>
                                        <option value={"9:51 AM"}>9:51 AM</option>
                                        <option value={"10:00 AM"}>10:00 AM</option>
                                        <option value={"10:09 AM"}>10:09 AM</option>
                                        <option value={"10:18 AM"}>10:18 AM</option>
                                        <option value={"10:27 AM"}>10:27 AM</option>
                                        <option value={"10:36 AM"}>10:36 AM</option>
                                        <option value={"10:45 AM"}>10:45 AM</option>
                                        <option value={"10:54 AM"}>10:54 AM</option>
                                        <option value={"11:03 AM"}>11:03 AM</option>
                                        <option value={"11:12 AM"}>11:12 AM</option>
                                        <option value={"11:21 AM"}>11:21 AM</option>
                                        <option value={"11:30 AM"}>11:30 AM</option>
                                        <option value={"11:39 AM"}>11:39 AM</option>
                                        <option value={"11:48 AM"}>11:48 AM</option>
                                        <option value={"11:57 AM"}>11:57 AM</option>
                                        <option value={"12:06 PM"}>12:06 PM</option>
                                        <option value={"12:15 PM"}>12:15 PM</option>
                                        <option value={"12:24 PM"}>12:24 PM</option>
                                        <option value={"12:33 PM"}>12:33 PM</option>
                                        <option value={"12:42 PM"}>12:42 PM</option>
                                        <option value={"12:51 PM"}>12:51 PM</option>
                                        <option value={"1:00 PM"}>1:00 PM</option>
                                        <option value={"1:09 PM"}>1:09 PM</option>
                                        <option value={"1:18 PM"}>1:18 PM</option>
                                        <option value={"1:27 PM"}>1:27 PM</option>
                                        <option value={"1:36 PM"}>1:36 PM</option>
                                        <option value={"1:45 PM"}>1:45 PM</option>
                                        <option value={"1:54 PM"}>1:54 PM</option>
                                        <option value={"2:03 PM"}>2:03 PM</option>
                                        <option value={"2:12 PM"}>2:12 PM</option>
                                        <option value={"2:21 PM"}>2:21 PM</option>
                                        <option value={"2:30 PM"}>2:30 PM</option>
                                        <option value={"2:39 PM"}>2:39 PM</option>
                                        <option value={"2:48 PM"}>2:48 PM</option>
                                        <option value={"2:57 PM"}>2:57 PM</option>
                                        <option value={"3:06 PM"}>3:06 PM</option>
                                        <option value={"3:15 PM"}>3:15 PM</option>
                                        <option value={"3:24 PM"}>3:24 PM</option>
                                        <option value={"3:33 PM"}>3:33 PM</option>
                                        <option value={"3:42 PM"}>3:42 PM</option>
                                        <option value={"3:51 PM"}>3:51 PM</option>
                                        <option value={"4:00 PM"}>4:00 PM</option>
                                        <option value={"4:09 PM"}>4:09 PM</option>
                                        <option value={"4:18 PM"}>4:18 PM</option>
                                        <option value={"4:27 PM"}>4:27 PM</option>
                                        <option value={"4:36 PM"}>4:36 PM</option>
                                        <option value={"4:45 PM"}>4:45 PM</option>
                                        <option value={"4:54 PM"}>4:54 PM</option>
                                        <option value={"5:03 PM"}>5:03 PM</option>
                                        <option value={"5:12 PM"}>5:12 PM</option>
                                        <option value={"5:21 PM"}>5:21 PM</option>
                                        <option value={"5:30 PM"}>5:30 PM</option>
                                        <option value={"5:39 PM"}>5:39 PM</option>
                                        <option value={"5:48 PM"}>5:48 PM</option>
                                        <option value={"5:57 PM"}>5:57 PM</option>
                                        <option value={"6:06 PM"}>6:06 PM</option>
                                        <option value={"6:15 PM"}>6:15 PM</option>
                                        <option value={"6:24 PM"}>6:24 PM</option>
                                        <option value={"6:33 PM"}>6:33 PM</option>
                                    </Field>
                                {/* </div> */}
                                {/* <div class="col-sm-10"> */}
                                    <Field className={ errors.endTime && touched.endTime ? "form-control mt-1 error-input" : "form-control mt-1"}  as="select" name="endTime" >
                                        <option value={"8:03 AM"}>8:03 AM</option>
                                        <option value={"8:12 AM"}>8:12 AM</option>
                                        <option value={"8:21 AM"}>8:21 AM</option>
                                        <option value={"8:30 AM"}>8:30 AM</option>
                                        <option value={"8:39 AM"}>8:39 AM</option>
                                        <option value={"8:48 AM"}>8:48 AM</option>
                                        <option value={"8:57 AM"}>8:57 AM</option>
                                        <option value={"9:06 AM"}>9:06 AM</option>
                                        <option value={"9:15 AM"}>9:15 AM</option>
                                        <option value={"9:24 AM"}>9:24 AM</option>
                                        <option value={"9:33 AM"}>9:33 AM</option>
                                        <option value={"9:42 AM"}>9:42 AM</option>
                                        <option value={"9:51 AM"}>9:51 AM</option>
                                        <option value={"10:00 AM"}>10:00 AM</option>
                                        <option value={"10:09 AM"}>10:09 AM</option>
                                        <option value={"10:18 AM"}>10:18 AM</option>
                                        <option value={"10:27 AM"}>10:27 AM</option>
                                        <option value={"10:36 AM"}>10:36 AM</option>
                                        <option value={"10:45 AM"}>10:45 AM</option>
                                        <option value={"10:54 AM"}>10:54 AM</option>
                                        <option value={"11:03 AM"}>11:03 AM</option>
                                        <option value={"11:12 AM"}>11:12 AM</option>
                                        <option value={"11:21 AM"}>11:21 AM</option>
                                        <option value={"11:30 AM"}>11:30 AM</option>
                                        <option value={"11:39 AM"}>11:39 AM</option>
                                        <option value={"11:48 AM"}>11:48 AM</option>
                                        <option value={"11:57 AM"}>11:57 AM</option>
                                        <option value={"12:06 PM"}>12:06 PM</option>
                                        <option value={"12:15 PM"}>12:15 PM</option>
                                        <option value={"12:24 PM"}>12:24 PM</option>
                                        <option value={"12:33 PM"}>12:33 PM</option>
                                        <option value={"12:42 PM"}>12:42 PM</option>
                                        <option value={"12:51 PM"}>12:51 PM</option>
                                        <option value={"1:00 PM"}>1:00 PM</option>
                                        <option value={"1:09 PM"}>1:09 PM</option>
                                        <option value={"1:18 PM"}>1:18 PM</option>
                                        <option value={"1:27 PM"}>1:27 PM</option>
                                        <option value={"1:36 PM"}>1:36 PM</option>
                                        <option value={"1:45 PM"}>1:45 PM</option>
                                        <option value={"1:54 PM"}>1:54 PM</option>
                                        <option value={"2:03 PM"}>2:03 PM</option>
                                        <option value={"2:12 PM"}>2:12 PM</option>
                                        <option value={"2:21 PM"}>2:21 PM</option>
                                        <option value={"2:30 PM"}>2:30 PM</option>
                                        <option value={"2:39 PM"}>2:39 PM</option>
                                        <option value={"2:48 PM"}>2:48 PM</option>
                                        <option value={"2:57 PM"}>2:57 PM</option>
                                        <option value={"3:06 PM"}>3:06 PM</option>
                                        <option value={"3:15 PM"}>3:15 PM</option>
                                        <option value={"3:24 PM"}>3:24 PM</option>
                                        <option value={"3:33 PM"}>3:33 PM</option>
                                        <option value={"3:42 PM"}>3:42 PM</option>
                                        <option value={"3:51 PM"}>3:51 PM</option>
                                        <option value={"4:00 PM"}>4:00 PM</option>
                                        <option value={"4:09 PM"}>4:09 PM</option>
                                        <option value={"4:18 PM"}>4:18 PM</option>
                                        <option value={"4:27 PM"}>4:27 PM</option>
                                        <option value={"4:36 PM"}>4:36 PM</option>
                                        <option value={"4:45 PM"}>4:45 PM</option>
                                        <option value={"4:54 PM"}>4:54 PM</option>
                                        <option value={"5:03 PM"}>5:03 PM</option>
                                        <option value={"5:12 PM"}>5:12 PM</option>
                                        <option value={"5:21 PM"}>5:21 PM</option>
                                        <option value={"5:30 PM"}>5:30 PM</option>
                                        <option value={"5:39 PM"}>5:39 PM</option>
                                        <option value={"5:48 PM"}>5:48 PM</option>
                                        <option value={"5:57 PM"}>5:57 PM</option>
                                        <option value={"6:06 PM"}>6:06 PM</option>
                                        <option value={"6:15 PM"}>6:15 PM</option>
                                        <option value={"6:24 PM"}>6:24 PM</option>
                                        <option value={"6:33 PM"}>6:33 PM</option>
                                    </Field>

                                
                                </div>
                                </div>
                            </div>

                            <div className="wrapper">
                                <div className="member-details">
                                    <label className="form-block-label">Club Member Credentials</label>
                                    <Field className={ errors.clubUsername && touched.clubUsername ? "form-control mt-1 error-input" : "form-control mt-1"} placeholder="Username"  name="clubUsername" label="Username" />
                                    <Field className={ errors.clubPassword && touched.clubPassword ? "form-control mt-1 error-input" : "form-control mt-1"} placeholder="Password" name="clubPassword" label="password" />
                                    <label className="form-block-label">Member ID</label>
                                    <Field className="form-control mt-1" placeholder="Member" name="member" label="member" />
                                    <label>
                                    <Field type="checkbox" style={{marginTop:'13px',marginRight:'5px'}} name="proxy"/>
                                    proxy enabled
                                    </label>
                                </div>
                                <div className="course-selection">
                                    <div className="course-list">
                                        <label className="form-block-label" >Course List</label>
                                        <hr className="form-block-line"/>   
                                        <div className="courses">
                                        <ul className="display-list selection-list">
                                            {courseLis}
                                        </ul>
                                        </div>
                                    </div>

                                    <div className="priority-list">
                                        <label className="form-block-label" >Priority List</label>
                                        <hr className="form-block-line"/>   
                                        <div className="form-control mt-1 pri-list">
                                            <ul className="display-list selection-list">
                                                {priorityLis}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {msg && <div className="success-message" id="submit-success">{msg}</div>}
                            {error && <div className="error-message" id="submit-error">{error}</div>}
                            <button className="btn btn-primary bot" type="submit">{selectedJob ? "Update Params" : "Set Params"}</button>
                            {selectedJob ? <button className="btn btn-primary remove-bot" onClick={(e)=>{handleDelete(e);resetForm({values:{date:'', startTime:'', endTime:'', member:'', clubUsername: '', clubPassword:''}})}} type="reset" >Delete Job</button> : null}
                            {/* {selectedJob ? <button className="btn btn-primary remove-bot" onClick={handleReset} type="reset" >Delete Job</button> : null} */}

                        </Form>)
                }
                
            }

            </Formik>
            {/* {selectedJob ? <button className="btn btn-primary remove-bot" onClick={handleDelete}>Delete Job</button> : null} */}
            </div>
            {/* <TimePicker onChange={handleTimeChange} start="08:03" end="18:33" step={9} value={time}/>
            <button onClick={handleStartTime}>Start Time</button>
            <TimePicker onChange={handleTimeChange} start="08:03" end="18:33" step={9} value={time}/>
        <button onClick={handleEndTime}>End Time</button> */}
            

        </div>
     );
}
 
export default Bot;
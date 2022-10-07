import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearJob, selectJob } from "../features/bot/botSlice";
import { getAllJobs, deleteCompletedJob } from "../features/home/homeSlice";

const Home = () => {
    const {pendingJobs, completedJobs} = useSelector(state => state.home)
    const {selectedJob} = useSelector(state => state.bot)
    const naviagate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearJob())
    }, [selectedJob])
 
    useEffect(() =>{
        dispatch(getAllJobs({}))
    }, [])

    const handlePendingJob = (e) =>{
        naviagate('/bot')
        dispatch(selectJob(pendingJobs[e.target.id]))
    }
    const handleCompletedJob = (e) =>{
        // naviagate('/bot')
        dispatch(deleteCompletedJob(completedJobs[e.target.id]))
    }
    const pendingJobsLis = pendingJobs.map((job, i)=>{
        if(job.active){
            return (<li key={i} id={i} className="active display-list-item" onClick={handlePendingJob}>Pending Job for {job.date}</li>)
        }
        return (<li key={i} id={i} className="display-list-item" onClick={handlePendingJob}>Pending Job for {job.date}</li>)
    })
    const completedJobsLis = completedJobs.map((job, i)=>(<li className="display-list-item" key={i} id={i} onClick={handleCompletedJob}><span>{job.successful ? "Successful" : "Failed"} Job for {job.date}</span></li>))
    const teeTimes = completedJobs.map((job, i)=>{
        if(job.successful) return (
        <>
        <li key={i} id={i}>Tee off @ {job.course} on {job.date} {job.time}</li>
        <hr/>
        </>
        )
        
    })
    const isCompleted = (job) => job.successful
    return ( 
        <div className="main">
            <h1>HomePage</h1>
            <hr/>
            <div className="p-5 mb-4 text-bg-dark rounded-3 jumbotron">
                <h2>Barton Creek Coutry Club Golf Bot</h2>
                <p>
                    Automating tee time reservations on ForeTees with Barton Bot is a brezze in just three steps
                    <br/>
                    <br/>
                    How To:
                    <ol>
                        <li>Go to the Create Job page in the left hand sidebar menu</li>
                        <li>Enter job parameters (Rememeber intended dates must be set more than 7 days in the future)</li>
                        <li>Kickback and wait for you reservation confirmation!</li>
                    </ol>


                </p>
            </div>
            <div className="wrapper">
                <div className="pending-jobs">
                    <label className="form-block-label" >Pending Jobs</label>
                    <hr className="form-block-line"/>   
                    <div className="dashboard-list mt-1 scroll">
                        <ul className="display-list selection-list">
                            {pendingJobs.length && pendingJobsLis ? pendingJobsLis : <p style={{marginTop:"29px"}}>No Pending Jobs</p>}
                        </ul>
                    </div>
                </div>
                <div className="completed-jobs">
                    <label className="form-block-label" >Completed Jobs</label>
                    <hr className="form-block-line"/>   
                    <div className="dashboard-list mt-1 scroll">
                        <ul className="display-list delete-selection-list">
                            {completedJobs.length && completedJobsLis ? completedJobsLis : <p style={{marginTop:"29px"}}>No Completed Jobs</p>}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="tee-dates">
                <label className="form-block-label" >Upcoming Tee Times</label>
                <hr className="form-block-line"/>   
                <div className="dashboard-list mt-1 scroll">
                    <ul className="display-list">
                        {teeTimes && completedJobs.some(isCompleted) ? teeTimes : <p style={{marginTop:"29px"}}>No Upcoming Tee Times</p>}
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default Home;
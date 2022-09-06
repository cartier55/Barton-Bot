import { useSelector } from "react-redux";
import Login from "../pages/Login";
import SideBar from "./Sidebar";

const Layout = (props) => {
    const {authenticated} = useSelector(state => state.auth)
    if(!authenticated) return <Login/>
    return ( 
        <SideBar>
            {props.children}
        </SideBar>
     );
}
 
export default Layout;
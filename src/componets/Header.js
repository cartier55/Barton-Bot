import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, reset as clearAuth } from '../features/auth/authSlice';
import { reset as clearProxy } from '../features/proxy/proxySlice';
import { reset as clearScrape} from '../features/bot/botSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const {username} = useSelector(state => state.auth)
  const handleLogout = () =>{
    dispatch(clearAuth())
    dispatch(clearProxy())
    dispatch(clearScrape())
    dispatch(logOut({}))
    
    }
  return (
    <Navbar className="header" variant="dark">
    <Container>
      <Navbar.Brand href="#home"></Navbar.Brand>
      <Nav className="ml-auto">
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            {username}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>{handleLogout()}}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Container>
  </Navbar>
  );
}

export default Header;
import React from 'react';
import './styles/app.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './componets/Layout';
import Home from './pages/Home';
import Bot from './pages/Bot';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Proxy from './pages/Proxy';
import PersitLogin from './componets/persitLogin';

function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route element={<PersitLogin/>}>
            <Route path="/" element={<Layout><Home/></Layout>} />
            <Route path="/bot" element={<Layout><Bot/></Layout>}/>
            <Route path="/proxy" element={<Layout><Proxy/></Layout>}/>
          </Route>
          <Route path="/logIn" element={<Login/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          {/* <Route path="/" element={}/>  */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

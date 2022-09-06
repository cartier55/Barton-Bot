import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { GiSettingsKnobs, GiMeshNetwork} from "react-icons/gi";
import { StickyContainer, Sticky } from 'react-sticky';

import {FaGem, FaBattleNet, FaHammer, FaHome, FaGithub, FaSpider, FaRobot} from 'react-icons/fa';
import Header from './Header';
// import 'react-pro-sidebar/dist/css/styles.css';



const SideBar = (props) => {
    const navigate = useNavigate()
    const {children} = props
    return ( 
            <>
            {/* <StickyContainer> */}

                {/* <Sticky> */}
            <ProSidebar
                  breakPoint="md"
                  >
                <SidebarHeader>
                <div
                style={{
                    padding: '24px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 14,
                    letterSpacing: '1px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    position: '-webkit-sticky',
                    position: 'sticky',
                    top: '0'
                }}
                >
                {/* Scraper SideBar */}
                <FaRobot className='header-icon' size='25px' />
                {/* <Link to="/"> */}
                Barton Bot
                {/* </Link> */}
                </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaHome />}
                            onClick={() => navigate('/')}
                            // suffix={<span className="badge red">{intl.formatMessage({ id: 'new' })}</span>}
                            >
                            Home
                        </MenuItem>
                        <MenuItem icon={<FaHammer />} onClick={(e)=>{navigate('/bot')}}>Config Bot</MenuItem>
                        <MenuItem icon={<FaBattleNet />} onClick={(e)=>{navigate('/proxy')}}>Proxy</MenuItem>
                        </Menu>
                        <Menu iconShape="circle">
                        {/* <SubMenu
                            // suffix={<span className="badge yellow">3</span>}
                            title='Settings'
                            icon={<GiSettingsKnobs />}
                            > 
                        </SubMenu> */}
                        
                    </Menu>
                </SidebarContent>
                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                        >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                            >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            View Source
                            </span>
                        </a>
                    </div>
                </SidebarFooter >
            </ProSidebar>
            {/* </Sticky> */}
            <Header/>
             {children}
        {/* // </StickyContainer> */}
            </>
        );
    }
    
    export default SideBar;
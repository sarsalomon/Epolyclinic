import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Navbar, Container, Dropdown } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import { Context } from '..';
import { ADD_PATIENT_ROUTE, ADMIN_DASHBOARD_ROUTE, DOCTOR_DASHBOARD_ROUTE, END_RECEPTION_ROUTE, LOGIN_ROUTE, RECEPTION_DASHBOARD_ROUTE } from '../utils/consts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    let navbarText
    if(user._userrole === 'Reception'){
        navbarText = [
            <NavLink to={ADD_PATIENT_ROUTE} className="mx-4"><FontAwesomeIcon icon={faUserPlus} size="lg"/></NavLink>,
            <NavLink to={END_RECEPTION_ROUTE}><FontAwesomeIcon icon={faPrint} size="lg"/></NavLink>
        ] 
    }else if(user._userrole === 'Doctor'){
        navbarText = [
            
        ]
    }else if(user._userrole === 'Admin'){
        navbarText = [

        ]
    }

    const logOut = () => {
        localStorage.clear();
        user.setUser({})
        user.setIsAuth(false)
        history.push(LOGIN_ROUTE)
    }

    let redirectUrl
    if(user._userrole === 'Reception'){
        redirectUrl = RECEPTION_DASHBOARD_ROUTE
    }else if(user._userrole === 'Doctor'){
        redirectUrl = DOCTOR_DASHBOARD_ROUTE
    }else if(user._userrole === 'Admin'){
        redirectUrl = ADMIN_DASHBOARD_ROUTE
    }
    return (
        <header className="mb-2">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href={redirectUrl}><b><big>Elektron Poliklinika</big></b></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    {navbarText}
                    <Navbar.Text className="ms-2">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {user._userfish}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => logOut()}>CHiqish</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
});

export default NavBar;
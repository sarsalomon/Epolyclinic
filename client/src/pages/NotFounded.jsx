import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Context } from '..';
import { ADMIN_DASHBOARD_ROUTE, DOCTOR_DASHBOARD_ROUTE, RECEPTION_DASHBOARD_ROUTE } from '../utils/consts';

const NotFounded = observer(() => {
    const {user} = useContext(Context)
    let redirectButton
    if(user._userrole === 'Reception'){
        redirectButton = RECEPTION_DASHBOARD_ROUTE
    }else if(user._userrole === 'Doctor'){
        redirectButton = DOCTOR_DASHBOARD_ROUTE
    }else if(user._userrole === 'Admin'){
        redirectButton = ADMIN_DASHBOARD_ROUTE
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <h2>Afsuki siz qidirgan sahifa topilmadi :(</h2>
                        <NavLink to={redirectButton}><Button variant='success'>Bosh sahifaga qaytish</Button></NavLink>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default NotFounded;
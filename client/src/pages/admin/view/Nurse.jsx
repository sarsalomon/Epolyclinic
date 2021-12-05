import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import {Helmet} from "react-helmet";
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { observer } from 'mobx-react-lite';
import { ADD_DOCTOR_ROUTE, GET_DOCTOR_ROUTE } from '../../../utils/consts';
import { deleteDoctor, fetchDoctor } from '../../../http/doctorAPI';

const Doctor = observer(() => {
    const [items, setItems] = useState([])
    const history = useHistory()

    useEffect(()=>{
        fetchDoctor().then(data => setItems(data))
    },[])

    const Doctordelete = (id) => {
        confirmAlert({
            title: 'O`chirishni tasdiqlang',
            message: 'Ishonchingiz komilmi, bu categoriga tegishli hamma sub categoriyalar ham o`chadi',
            buttons: [
              {
                label: 'Ha',
                onClick: () => deleteDoctor(id)
              },
              {
                label: 'Yo`q'
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
          });
    }
    console.log(items)
    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Doctor</title>
                </Helmet>
            </div>
            <Container>
                <Row>
                    <Col>
                        <NavLink to={ADD_DOCTOR_ROUTE}><Button variant='success'>Add</Button></NavLink>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fish</th>
                                    <th>Phone</th>
                                    <th>Depart</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(item=>
                                        <tr key={item._id}>
                                            <td>{item.fish}</td>
                                            <td>{item.fish}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.departmentName}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => history.push(GET_DOCTOR_ROUTE + '/' + item._id)}>Yangilash</Button>
                                                <Button variant="danger" className="ms-2" onClick={() => Doctordelete(item._id)}>O`chirish</Button>
                                            </td>
                                        </tr>
                                    )   
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Doctor;
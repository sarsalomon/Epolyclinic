import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import { Helmet } from "react-helmet";
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { ADD_DEPARTMENT_ROUTE, GET_DEPARTMENT_ROUTE } from '../../../utils/consts';
import { deleteDepartment, fetchDepartment } from '../../../http/departmentAPI';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';

const Department = observer(() => {
    const [items, setItems] = useState([])
    const history = useHistory()

    useEffect(()=>{
        fetchDepartment().then(data => setItems(data))
    },[])

    const Departmentdelete = (id) => {
        confirmAlert({
            title: 'O`chirishni tasdiqlang',
            message: 'Ishonchingiz komilmi, bu categoriga tegishli hamma sub categoriyalar ham o`chadi',
            buttons: [
              {
                label: 'Ha',
                onClick: () => deleteDepartment(id)
              },
              {
                label: 'Yo`q'
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
          });
    }
    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Department</title>
                </Helmet>
            </div>
            <Container className='my-4'>
                <Row>
                    <Col>
                        <NavLink to={ADD_DEPARTMENT_ROUTE}><Button variant='success'>Add</Button></NavLink>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(item=>
                                        <tr key={item._id}>
                                            <td>{item.title}</td>
                                            <td colSpan="2">{item.title}</td>
                                            <td>
                                            <Button variant="primary" onClick={() => history.push(GET_DEPARTMENT_ROUTE + '/' + item._id)}>Yangilash</Button>
                                            <Button variant="danger" className="ms-2" onClick={() => Departmentdelete(item._id)}>O`chirish</Button>
                                            </td>
                                        </tr>
                                    )   
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            <ToastContainer />
            </Container>
        </div>
    );
});

export default Department;
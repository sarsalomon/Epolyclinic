import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getDepartment, updateDepartment } from '../../../http/departmentAPI';

const UpdateDepartment = observer(() => {
    const {id} = useParams()
    const [title, setTitle] = useState('')

    useEffect(() => {
        getDepartment(id).then(data => {
            setTitle(data.title)
        })
    }, [id])

    const Departmentupdate = async () => {
        try{
            let data;
            const formData = new FormData()
            formData.append('id', id)
            formData.append('title', title)
            data = await updateDepartment(formData)
            setTitle('')
            toast.info(`${title} ga yangilandi`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }catch(e) {
            toast.error(e.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Update Department</title>
                </Helmet>
            </div>
            <Container>
            <h2 className="text-center">Category</h2>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Department name</Form.Label>
                                <Form.Control type="text" placeholder="Enter text" value={title} onChange={e => setTitle(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" onClick={Departmentupdate} type="reset">
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            <ToastContainer />
            </Container>
        </div>
    );
});

export default UpdateDepartment;
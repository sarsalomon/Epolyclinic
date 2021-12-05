import React, { useState } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { addMFY } from '../../../http/mfyAPI';

const AddNeighBorhood = observer(() => {
    const [title, setTitle] = useState('')
    const Departmentadd = async () => {
        try{
            let data;
            const formData = new FormData()
            formData.append('title', title)
            data = await addMFY(formData)
            setTitle('')
            toast.success(`${title} nomli MFY qo'shildi`, {
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
                    <title>MFY Qo'shish</title>
                </Helmet>
            </div>
            <Container>
            <h2 className="text-center">MFY qo'shish</h2>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>MFY nomi</Form.Label>
                                <Form.Control type="text" placeholder="Mustaqillik" value={title} onChange={e=>setTitle(e.target.value)}/>
                            </Form.Group>
                            <Button variant="success" onClick={Departmentadd} type="reset">
                                Qo'shish
                            </Button>
                        </Form>
                    </Col>
                </Row>
            <ToastContainer />
            </Container>
        </div>
    );
});

export default AddNeighBorhood;
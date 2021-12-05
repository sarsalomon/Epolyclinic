import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap';
import { fetchDepartment } from '../http/departmentAPI';
import { RedirectTo, getDoctor } from '../http/doctorAPI';
import { getPatient, getComment } from '../http/receptionAPI';
import { ToastContainer, toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';

const RedirectModal = observer(({show,onHide,id}) => {
        const [patients,setPatients] = useState([])
        const [departaments,setDepartaments] = useState([])
        const [departament,setDepartament] = useState('')
        const [doctors,setDoctors] = useState([])
        const [doctor,setDoctor] = useState('')
        const [olddoctor,setOldDoctor] = useState('')
        const [mcomment, setMcomment] = useState('')

        useEffect(() => {
            // const interval = setInterval(() => {
                if(id !== '' && id !== undefined){
                    getPatient(id).then(data => setPatients(data))
                    fetchDepartment().then(data => setDepartaments(data))
                    getComment(id).then(data => {
                        setMcomment(data.comment)
                        setOldDoctor(data.doctorId)
                    })
                }
                if(departament !== ''){
                    getDoctor(departament).then(data => setDoctors(data))
                }
            // }, 1000);
            // return () => clearInterval(interval);
        }, [id,departament])

        useEffect(() => {
                if(id !== '' && id !== undefined){
                    getComment(id).then(data => {
                        setMcomment(data.mcomment)
                    })
                }
        }, [id])

        const RedirectT = async () => {
            try{
                let data;
                const formData = new FormData()
                formData.append('id', patients._id)
                formData.append('departementId', departament)
                formData.append('departementName', patients.departementName)
                formData.append('doctorId', doctor)
                formData.append('doctorName', patients.doctorName)
                formData.append('comment', mcomment)
                formData.append('olddoctor', olddoctor)
                data = await RedirectTo(formData)
                if(data){
                    onHide()
                    setMcomment('')
                }
                toast.success(`Qo'shildi Reception`, {
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
            <Modal
                    show={show}
                    onHide={onHide}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    centered
                >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Bemorni boshqa shifakorga yuborish
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row className="mt-1">
                            <Col>
                                    <b><big>{patients.fish}</big></b>
                            </Col>
                            <Col>
                                <Form.Select
                                        onChange={(e) => {const seletcedDepartament = e.target.value
                                            setDepartament(seletcedDepartament);
                                        }}
                                    >  
                                    <option value={''}>Yo'nalish</option>
                                        {departaments.map(departament =>
                                            <option  key={departament._id}
                                                value={departament._id} 
                                            >
                                                {departament.title}
                                            </option>
                                        )}
                                </Form.Select>
                            </Col>
                            <Col>                         
                                <Form.Select
                                        onChange={(e) => {const seletcedDoctor = e.target.value
                                            setDoctor(seletcedDoctor);
                                        }}
                                    >  
                                    <option value={''}>Shifakor</option>
                                        {doctors.map(doctor =>
                                            <option key={doctor._id}
                                                value={doctor._id} 
                                            >
                                                {doctor.fish} - {doctor.doorNumber}
                                            </option>
                                        )}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Izoh</Form.Label>
                                <Form.Control as="textarea" rows={3} value={mcomment} onChange={e=>setMcomment(e.target.value)}/>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Col xs={6} md={4}>
                            </Col>
                            <Col xs={6} md={4}>
                            </Col>
                            <Col xs={6} md={4} className="text-end">
                                <Button variant="outline-success" onClick={RedirectT} size="lg">Yuborish</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
});

export default RedirectModal;
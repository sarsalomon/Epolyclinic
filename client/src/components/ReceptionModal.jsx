import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap';
import { fetchDepartment } from '../http/departmentAPI';
import { getDoctor, getCountPatient } from '../http/doctorAPI';
import { addReception, getPatient } from '../http/receptionAPI';
import { ToastContainer, toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';

const ReceptionModal = observer(({show,onHide,id}) => {
    const [patient,setPatient] = useState([])
    const [departaments,setDepartaments] = useState([])
    const [departament,setDepartament] = useState('')
    const [doctors,setDoctors] = useState([])
    const [doctor,setDoctor] = useState('')
    const [count,setCount] = useState('')
    const [extreme, setExtreme] = useState('')
 
    useEffect(() => {
        if(id !== ''){
            getPatient(id).then(data => setPatient(data))
            fetchDepartment().then(data => setDepartaments(data))
        }
    }, [id])

    useEffect(() => {
        if(departament !== ''){
            getDoctor(departament).then(data => setDoctors(data))
        }
    }, [departament])
    
    useEffect(() => {
        if(doctor !== ''){
            getCountPatient(doctor).then(data => setCount(data))
        }
    }, [doctor])
    const RepectionAdd = async () => {
        try{
            let sete
            if(extreme == '' || extreme == 0){
                sete = 0
            }else{
                sete = 1
            }
            let data;
            const formData = new FormData()
            formData.append('patientId', patient._id)
            formData.append('departementId', departament)
            formData.append('doctorId', doctor)
            formData.append('extreme', sete)
            formData.append('status', 0)
            data = await addReception(formData)
            if(data){
                let nqeue
                if(data.extreme == 1){
                    nqeue = 'Bez ochered'
                }else if(data.extreme == 0){
                    nqeue = data.queue
                }
                let myWindow = window.open('', 'my div', 'height=400,width=600');
                let currentime = new Date().toLocaleString()
                if (myWindow) myWindow.opener = null
                myWindow.document.write('</head><body >');
                myWindow.document.write(`<span style="position: absolute; top: 8%; left: 90%; margin-right: -50%; transform: translate(-50%, -50%);"><img style="width:50px; height:50px;" src="${process.env.REACT_APP_API_URL + 'img/logo.png'}"></span>`);
                myWindow.document.write(`<span style="position: absolute; top: 5%; left: 50%; margin-right: -50%; transform: translate(-50%, -50%);font-size: 80px">${data.queue}</span>`);
                myWindow.document.write('<br/>');
                myWindow.document.write('<br/>');
                myWindow.document.write('<br/>');
                myWindow.document.write('<br/>');
                myWindow.document.write('_ _ _ _ _ _ _ _ _ _ _ _ _ _');
                myWindow.document.write(`<h5>Bemor: ${data.patientName}</h5>`);
                myWindow.document.write(`<h5>Toifa: ${data.departementName}</h5>`);
                myWindow.document.write(`<h5>Shifakor: ${data.doctorName}</h5>`);
                myWindow.document.write(`<h5>Qavat: ${data.floorNumber} Xona: ${data.doorNumber}</h5>`);
                myWindow.document.write(`<h6>${currentime}</h6>`);
                myWindow.document.write('_ _ _ _ _ _ _ _ _ _ _ _ _ _');
                myWindow.document.write(`<span style="position: absolute; top: 46%; left: 50%; margin-right: -50%; transform: translate(-50%, -50%);font-size: 20px">Sog'ayib keting</span>`);
                myWindow.document.write('</body></html>');
                myWindow.document.close();
                myWindow.onload=function(){
                    myWindow.focus();
                    myWindow.print();
                    myWindow.close();
                };
                onHide()
                return false;
            }
            toast.success(`Qabulga qo'shildi`, {
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
                            Qabul qo'shish
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container>
                            <Row className="mt-1">
                                <Col>
                                    <b><big>{patient.fish}</big></b>
                                </Col>
                                <Col>
                                    <big>{patient.address}</big>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <big>{patient.phone}</big>
                                </Col>
                                <Col>
                                    <big>{patient.passport}</big>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={12} md={6}>
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
                                <Col xs={6} md={6} className='d-flex'>                         
                                    <Form.Select
                                        onChange={(e) => {const seletcedDoctor = e.target.value
                                            setDoctor(seletcedDoctor);
                                        }}
                                    >  
                                    <option value={''}>Shifakor</option>
                                        {doctors.map(doctor =>
                                            <option  key={doctor._id}
                                                value={doctor._id} 
                                            >
                                                {doctor.fish}
                                            </option>
                                        )}
                                    </Form.Select>
                                        <span className="ms-2 count-badge"><big className="mt-2">{count}</big></span>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={6} md={4}>
                                    <Form.Select
                                        onChange={(e) => {const seletcedExtrem = e.target.value
                                            setExtreme(seletcedExtrem);
                                        }}
                                    >
                                        <option value={'0'}>Oddiy qabul</option>
                                        <option value={'1'}>Zarurlik bn</option>
                                    </Form.Select>
                                </Col>
                                <Col xs={6} md={4}>
                                </Col>
                                <Col xs={6} md={4} className="text-end">
                                    <Button variant="outline-success" onClick={RepectionAdd} type="submit" size="lg">Qabulga qo'shish</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>
                <ToastContainer />
        </div>
    );
});

export default ReceptionModal;
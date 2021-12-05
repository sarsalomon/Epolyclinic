import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getDoctor, updateDoctor } from '../../../http/doctorAPI';

const UpdateDoctor = observer(() => {
    const {id} = useParams()
    const [departaments,setDepartaments] = useState([])
    const [departament, setDepartament] = useState('')
    const [fish, setFish] = useState('')
    const [phone, setPhone] = useState('')
    const [bdate, setBdate] = useState('')
    const [file,setFile] = useState('')
    const [workingSince, setWorkingSince] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const selectFile = e => { 
        setFile(e.target.files[0])
    }

    useEffect(() => {
        getDoctor(id).then(data => {
            setFish(data.fish)
            setPhone(data.phone)
            setLogin(data.login)
            setBdate(data.bdate)
            setWorkingSince(data.workingSince)
        })
    }, [id])

    const Doctorupdate = async () => {
        try{
            let data;
            const formData = new FormData()
            formData.append('id', id)
            formData.append('fish', fish)
            formData.append('phone', phone)
            formData.append('img', file)
            formData.append('workingSince', workingSince)
            formData.append('login', login)
            formData.append('password', password)
            formData.append('departmentId', departament)
            formData.append('dateOfBirth', bdate)
            data = await updateDoctor(formData)
            toast.info(`Doctor ga yangilandi`, {
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
                    <title>Update Doctor</title>
                </Helmet>
            </div>
            <Container>
            <h2 className="text-center">Doctor</h2>
            <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Fish</Form.Label>
                                <Form.Control type="text" placeholder="Turdiyev G`anisher Bektremirovich"  value={fish} onChange={e=>setFish(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>phone</Form.Label>
                                <Form.Control type="text" placeholder="+998(xx)xxx-xx-xx" value={phone} onChange={e=>setPhone(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" value={bdate} onChange={e=>setBdate(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control type="file" onChange={selectFile}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                        onChange={(e) => {const seletcedDepartament = e.target.value
                                            setDepartament(seletcedDepartament);
                                        }}
                                    >  
                                    <option value={''}>Toifa</option>
                                        {departaments.map(departament =>
                                            <option  key={departament._id}
                                                value={departament._id} 
                                            >
                                                {departament.title}
                                            </option>
                                        )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>workingSince</Form.Label>
                                <Form.Control type="date" value={workingSince} onChange={e=>setWorkingSince(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Login"  value={login} onChange={e=>setLogin(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="text" placeholder="********"  value={password} onChange={e=>setPassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col className="text-end">
                            <Button variant="success" onClick={Doctorupdate} type="reset">Yangilash</Button>
                        </Col>
                    </Row>
                </Form>
            <ToastContainer />
            </Container>
        </div>
    );
});

export default UpdateDoctor;
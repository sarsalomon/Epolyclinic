import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { fetchDepartment } from '../../../http/departmentAPI';
import { addDoctor } from '../../../http/doctorAPI';
import { fetchMFY } from '../../../http/mfyAPI';

const AddDoctor = observer(() => {
    const [mfies,setMfies] = useState([])
    const [mfy, setMfy] = useState('')
    const [floor, setFloor] = useState('')
    const [door, setDoor] = useState('')
    const [departaments,setDepartaments] = useState([])
    const [departament, setDepartament] = useState('')
    const [fish, setFish] = useState('')
    const [phone, setPhone] = useState('')
    const [bdate, setBdate] = useState('')
    const [file,setFile] = useState('')
    const [workingSince, setWorkingSince] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        fetchDepartment().then(data=> setDepartaments(data))
        fetchMFY().then(data=> setMfies(data))
    },[])

    const selectFile = e => { 
        setFile(e.target.files[0])
    }

    const Doctoradd = async () => {
        try{
            let data;
            const formData = new FormData()
            formData.append('fish', fish)
            formData.append('phone', phone)
            formData.append('img', file)
            formData.append('workingSince', workingSince)
            formData.append('login', login)
            formData.append('password', password)
            formData.append('departmentId', departament)
            formData.append('dateOfBirth', bdate)
            formData.append('mfy', mfy)    
            formData.append('floor', floor)
            formData.append('door', door)
            data = await addDoctor(formData)
            setMfy('')
            setFloor('')
            setDoor('')
            setPassword('')
            setDepartament('')
            setFish('')
            setPhone('')
            setBdate('')
            setWorkingSince('')
            setLogin('')
            setPassword('')
            toast.success(`Doctor tizimga qo'shildi`, {
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
                    <title>Shifakor qo'shish</title>
                </Helmet>
            </div>
            <Container>
            <h2 className="text-center">Shifakor qo'shish</h2>
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
                                <Form.Label>Telefon raqam</Form.Label>
                                <Form.Control type="text" placeholder="+998(xx)xxx-xx-xx" value={phone} onChange={e=>setPhone(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Etaj</Form.Label>
                                <Form.Control type="text" placeholder="2" value={floor} onChange={e=>setFloor(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Xona raqami</Form.Label>
                                <Form.Control type="text" placeholder="12" value={door} onChange={e=>setDoor(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Tug'ilgan sana</Form.Label>
                                <Form.Control type="date" value={bdate} onChange={e=>setBdate(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Rasmi</Form.Label>
                                <Form.Control type="file" onChange={selectFile}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Toifa</Form.Label>
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
                                <Form.Label>MFY ligi</Form.Label>
                                <Form.Select
                                        onChange={(e) => {const seletcedMfy = e.target.value
                                            setMfy(seletcedMfy);
                                        }}
                                    >  
                                    <option value={''}>MFY</option>
                                        {mfies.map(mfy =>
                                            <option  key={mfy._id}
                                                value={mfy._id} 
                                            >
                                                {mfy.title}
                                            </option>
                                        )}
                                    </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Qachon beri ishlidi</Form.Label>
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
                                <Form.Label>Parol</Form.Label>
                                <Form.Control type="text" placeholder="********"  value={password} onChange={e=>setPassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col className="text-end">
                            <Button variant="success" onClick={Doctoradd} type="reset">Qo`shish</Button>
                        </Col>
                    </Row>
                </Form>
            <ToastContainer />
            </Container>
        </div>
    );
});

export default AddDoctor;
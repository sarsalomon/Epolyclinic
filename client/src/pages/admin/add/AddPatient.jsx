import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { addPatient } from '../../../http/userAPI';
import { fetchMFY } from '../../../http/mfyAPI';

const AddPatient = observer(() => {
    const [mfies,setMfies] = useState([])
    const [mfy, setMfy] = useState('')
    const [fish, setFish] = useState('')
    const [phone, setPhone] = useState('')
    const [bdate, setBdate] = useState('')
    const [passport, setPassport] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [sex, setSex] = useState('')

    useEffect(()=>{
        fetchMFY().then(data=> setMfies(data))
    },[])

    const Doctoradd = async () => {
        try{
            let data;
            const formData = new FormData()
            formData.append('fish', fish)
            formData.append('phone', phone)
            formData.append('passport', passport)
            formData.append('city', city)
            formData.append('address', address)
            formData.append('bloodGroup', bloodGroup)
            formData.append('dateOfBirth', bdate)
            formData.append('sex', sex)
            formData.append('NeighBorhoodId', mfy)
            data = await addPatient(formData)
            setFish('')
            setPhone('')
            setBdate('')
            setPassport('')
            setCity('')
            setAddress('')
            setBloodGroup('')
            setSex('')
            toast.success(`Foydalanuvchi tizimga qo'shildi`, {
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
                    <title>Bemor qo'shish</title>
                </Helmet>
            </div>
            <Container>
            <h2 className="text-center">Bemor qo'shish</h2>
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
                                <Form.Label>Telefon Raqam</Form.Label>
                                <Form.Control type="text" placeholder="998(xx)xxx-xx-xx" value={phone} onChange={e=>setPhone(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Tug'ilgan kun</Form.Label>
                                <Form.Control type="date" value={bdate} onChange={e=>setBdate(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Passport</Form.Label>
                                <Form.Control type="text" placeholder="ABxxxxxx" value={passport} onChange={e=>setPassport(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
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
                                <Form.Label>Manzil</Form.Label>
                                <Form.Control type="text" placeholder="4-12-34" value={address} onChange={e=>setAddress(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Jinsi</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedSex = e.target.value
                                        setSex(seletcedSex);
                                    }}
                                >  
                                    <option value={''}>Tanlash</option>
                                    <option value={'erkak'}>Erkak</option>
                                    <option value={'ayol'}>Ayol</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Label>Qon guruhi</Form.Label>
                            <Form.Select
                                onChange={(e) => {const seletcedBloodGroup = e.target.value
                                    setBloodGroup(seletcedBloodGroup);
                                }}
                            >  
                                <option value={''}>Tanlash</option>
                                <option value={'0'}>No aniq</option>
                                <option value={'1-'}>I-</option>
                                <option value={'1+'}>I+</option>
                                <option value={'2-'}>II-</option>
                                <option value={'2+'}>II+</option>
                                <option value={'3-'}>III-</option>
                                <option value={'3+'}>III+</option>
                                <option value={'4-'}>IV-</option>
                                <option value={'4+'}>IV+</option>
                            </Form.Select>
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

export default AddPatient;
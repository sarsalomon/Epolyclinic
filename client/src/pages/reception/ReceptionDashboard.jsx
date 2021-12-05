import {observer} from 'mobx-react-lite'
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button} from 'react-bootstrap';
import ReceptionModal from '../../components/ReceptionModal';
import { fetchPatient } from '../../http/receptionAPI';
import { deletePatient, getPatient } from '../../http/userAPI';
import { confirmAlert } from 'react-confirm-alert';
import { GET_PATIENT_ROUTE } from '../../utils/consts';
import { useHistory } from 'react-router';

const ReceptionDashboard = observer(() => {
    const [items,setItems] = useState([])
    const [name,setName] = useState('')
    const [tanid,setTanid] = useState('')
    const [brandVisible, setBrandVisible] = useState(false)
    const history = useHistory()
    
    useEffect(() => {
        fetchPatient(name).then(data => setItems(data))
    }, [name])

    let search
    const openModel = async (id) => {
        setTanid(id)
        setBrandVisible(true)
        setName('')
    }
    
    const deleteP = async (id) => {
        confirmAlert({
            title: 'O`chirishni tasdiqlang',
            message: 'Ishonchingiz komilmi?',
            buttons: [
              {
                label: 'Ha',
                onClick: () => deletePatient(id)
              },
              {
                label: 'Yo`q'
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
          });
    }
    if(items.length > 0){
        search = <div>
            {items.map(patient =>
                <li key={patient._id} className="mt-3"> <div> <span onClick={() => openModel(patient._id)} style={{cursor: 'pointer'}}  className="me-5"> {patient.fish} - {patient.dateOfBirth} </span> <span className="ms-5"><Button onClick={() => history.push(GET_PATIENT_ROUTE + '/' + patient._id)}>Yangilash</Button> / <Button variant="danger" onClick={() => deleteP(patient._id)} >O'chirib tashash</Button></span></div></li>
            )}
        </div>
    }else{
        
    }
    return (
        <div>
            <Container bg="warning">
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><h4>Bemorni qidirish</h4></Form.Label>
                                <Form.Control type="text" 
                                    placeholder="Turdiyev Bahodir Pardaboy o`g`li"     
                                    value={name}
                                    onChange={e=>setName(e.target.value)} 
                                />
                                <Form.Text className="text-muted">
                                    Agar passport orqali qidirmoqcha bo'lsangiz, Passport seriyasi oldiga # belgisini qo'yish esdan chiqmasin (#AB348615)
                                </Form.Text>
                            </Form.Group>
                        </Form>
                        <ul className="search_result">
                            { search }
                        </ul>
                    </Col>
                </Row>
                <ReceptionModal show={brandVisible} onHide={() => setBrandVisible(false)} id={tanid}/>
            </Container>
        </div>
    );
});

export default ReceptionDashboard;
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Slider from "react-slick";
import RedirectModal from '../../components/RedirectModal';
import { addHistory, fetchHistory, fetchPatients, getPatient, addHistoryCancel } from '../../http/doctorAPI';
import { Context } from '../..';
import Paginations from '../../components/Paginations';
import ViewModal from '../../components/ViewModal';

const DoctorDashboard = observer(() => {
    const {user} = useContext(Context)
    const [brandVisible, setBrandVisible] = useState(false)
    const [historyVisible, setHistoryVisible] = useState(false)
    const [allItems, setAllItems] = useState([])
    const [histories, setHistories] = useState([])
    const [patient, setPatient] = useState('')
    const [geth, setGeth] = useState('')
    const [comment, setComment] = useState('')
    const [gcomment, setGComment] = useState('')
    const [medicament, setMedicament] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [file,setFile] = useState('')

    useEffect(()=>{
        const interval = setInterval(() => {
            if(user._userinfo !== '' && histories.length >= 0){
                getPatient(user._userinfo).then(data => {
                    setPatient(data)
                    if(data !== undefined && data !== null){
                        if(data.comment !== undefined && data.comment !== null){
                            setComment(data.comment)
                            setGComment(data.comment)
                        }
                    }
                })
                fetchPatients(user._userinfo).then(data => setAllItems(data))
            }
        }, 1000);
        return () => clearInterval(interval);
    },[histories])

    useEffect(()=>{
            if(patient !== undefined && patient !== null && patient !== ''){
                fetchHistory(patient.patientId).then(data => setHistories(data))
            }
    },[patient])

    const selectFile = e => { 
        setFile(e.target.files[0])
    }

    const Patientadd = async () => {
        try{
            let data;
            const formData = new FormData()
            formData.append('id', patient._id)
            formData.append('patientId', patient.patientId)
            formData.append('patientName', patient.patientName)
            formData.append('departementId', patient.departementId)
            formData.append('departementName', patient.departementName)
            formData.append('doctorId', patient.doctorId)
            formData.append('doctorName', patient.doctorName)
            formData.append('status', patient.status)
            formData.append('comment', comment)
            formData.append('medications', medicament)
            formData.append('queue', patient.queue)
            formData.append('doorNumber', patient.doorNumber)
            formData.append('img', file)
            data = await addHistory(formData)
            setComment('')
            setMedicament('')
            setGComment('')
            toast.success(`Tugatish`, {
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

    const Patientcancel = async () => {
        try{
            let data;
            const formData = new FormData()
            formData.append('id', patient._id)
            formData.append('patientId', patient.patientId)
            formData.append('patientName', patient.patientName)
            formData.append('departementId', patient.departementId)
            formData.append('departementName', patient.departementName)
            formData.append('doctorId', patient.doctorId)
            formData.append('doctorName', patient.doctorName)
            formData.append('status', patient.status)
            formData.append('comment', 'Ketib qoldi')
            formData.append('medications', medicament)
            formData.append('queue', patient.queue)
            formData.append('doorNumber', patient.doorNumber)
            data = await addHistoryCancel(formData)
            setComment('')
            setMedicament('')
            setGComment('')
            toast.success(`Bekor qilindi`, {
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

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItem = histories.slice(firstItemIndex, lastItemIndex)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    let paginates = null
    if(histories.length>5){
      paginates =  <Paginations
      itemsPerPage={itemsPerPage}
      totalItems={histories.length}
      paginate={paginate}
      currentPage={currentPage}
        />
    }
    let cpi
    if(currentPage === 1){
        cpi = currentPage - 1
    }else if(currentPage >1){
        cpi = itemsPerPage * (currentPage - 1)
    }

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1
    };

    const openModel = async (id) => {
        setBrandVisible(true)
    }
    
   const viewModel = async (id) => {
        setGeth(id)
        setHistoryVisible(true)
    }

    let redirectM
    let viewM
    let card
    let getB
    let extremeText
    console.log(gcomment)
    if(gcomment.length>0){
        getB = 'Bemor boshqa Shifakordan yuborildi. Iltimos chaqiring'
    }else{

    }
    
    if(patient !== null){
        
        if(patient.extreme == 1 && patient.extreme != '' && patient.extreme != null && patient.extreme != undefined){
            extremeText = "Shoshilinch"
        }

        if(patient.patientId !== ''){
            redirectM = <RedirectModal show={brandVisible} onHide={() => setBrandVisible(false)} id={patient.patientId}/>
            viewM = <ViewModal show={historyVisible} onHide={() => setHistoryVisible(false)} id={geth}/>
        }

        if(card !== ''){
            if(allItems.length>0){
                card = [
                    <Container>
                        <Row>
                            <Col>
                                <Slider {...settings}>
                                    {allItems.map((item, index)=>
                                        <div>
                                            <h3>{item.queue}</h3>
                                        </div>
                                    )}
                                </Slider>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                            <h2 className="text-center">{extremeText} Bemor</h2>
                                <Row className="bg-danger">{getB}</Row>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Fish</Form.Label>
                                                <Form.Control placeholder={patient.patientName} disabled/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Tashhis</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={comment} onChange={e=>setComment(e.target.value)}/>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Dori</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={medicament} onChange={e=>setMedicament(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Rasm</Form.Label>
                                            <Form.Control type="file" onChange={selectFile}/>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col className="text-start">
                                            <Button variant="warning" onClick={() => openModel(patient.patientId)} type="reset">Yuborish</Button>
                                        </Col>
                                        <Col className="text-end">
                                            <Button variant="danger" onClick={Patientcancel} type="reset" className={'me-5'}>Bekor qilish</Button>
                                            <Button variant="success" onClick={Patientadd} type="reset">Qo`shish</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Fish</th>
                                            <th>Toifa</th>
                                            <th>Harakat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            currentItem.map((history,index)=>
                                                <tr key={history._id}>
                                                    <td>{cpi + index + 1}</td>
                                                    <td>{history.patientName}</td>
                                                    <td>{history.departementName}</td>
                                                    <td>
                                                        <Button onClick={() => viewModel(history._id)}>Ko'rish</Button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    <ToastContainer />
                    {paginates}
                        {redirectM}
                        {viewM}
                    </Container>
                ]
            }else{
                card = [
                    <Container>
                        <Row>
                            <Col>
                                1
                            </Col>
                        </Row>
                    </Container>
                ]
            }
        }
    }
    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Shifakor Boshqaruv paneli</title>
                </Helmet>
            </div>
            {card}
        </div>
    );
});

export default DoctorDashboard;
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Col, Container, Row, Form } from 'react-bootstrap';
import { getH } from '../http/doctorAPI';

const ViewModal = observer(({show,onHide,id}) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        if(id !== '' && id !== undefined){
            getH(id).then(data => setItems(data))
        }
    }, [id])

    const closeM = async () => {
        onHide()
    }

    return (
        <div>
            <Modal
                    show={show}
                    onHide={onHide}
                    size="lg"
                    centered
                >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Tashhis
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row className="mt-1">
                            <Col>
                                <b><big>{items.departementName}</big></b>
                            </Col>
                            <Col>
                                <b><big>{items.doctorName}</big></b>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {items.comment}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {items.medications}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs={6} md={4}>
                                {items.updateDate}
                            </Col>
                            <Col xs={6} md={4}>
                            </Col>
                            <Col xs={6} md={4} className="text-end">
                                <Button variant="danger" onClick={closeM} type="submit" size="lg">Yopish</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
});

export default ViewModal;
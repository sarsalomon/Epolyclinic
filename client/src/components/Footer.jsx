import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="mt-5" style={{position: 'absolute',width:'100%'}}>
        <Container className="bg-light pt-3 pb-2">
            <Row>
                <Col>
                    Yaratgan <a href="https://t.me/file00000000001">Yoshlar Texno Parki</a>
                </Col>
                <Col className="text-capitalize">
                    © Barcha huquqlar himoyalangan
                </Col>
            </Row>
        </Container>
    </footer>
    );
};

export default Footer;
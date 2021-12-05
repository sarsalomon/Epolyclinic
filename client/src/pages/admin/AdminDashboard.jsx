import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite'
import { fetchAdmin } from '../../http/adminApi';
const AdminDashboard = observer(() => {
    const [item, setItems] = useState([])
    useEffect(()=>{
        const interval = setInterval(() => {
            fetchAdmin().then(data => setItems(data))
        }, 2000);
        return () => clearInterval(interval);
    },[])

    let card
    if(item.length>0){
        card = [  <Container>
            <Row>
                <Col>
                    <Card className='p-5'>
                        <h1 className="text-center">{Number(39000)-item[0]}</h1>
                    </Card>
                </Col>
                <Col>
                    <Card className='p-5'>
                        <h1 className="text-center">{item[0]}</h1>
                    </Card>
                </Col>
                <Col>
                    <Card className='p-5'>
                        <h1 className="text-center">{item[1]}</h1>
                    </Card>
                </Col>
                <Col>
                    <Card className='p-5'>
                        <h1 className="text-center">{item[3]}</h1>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Fish</th>
                        <th>Soni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            item[2].map((array, index)=>
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{array[0]}</td>
                                    <td><b>{array[1]}</b></td>
                                </tr>
                            )
                        }

                    </tbody>
                </Table>
            </Row>
        </Container>]
    }
    return (
        <div>
          {card}
        </div>
    );
});

export default AdminDashboard;
import { observer } from 'mobx-react-lite'
import React, { useState, useContext} from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Card, Container, Form, Button } from 'react-bootstrap'
import { Context } from '..';
import { ToastContainer, toast } from 'react-toastify';
import { ADMIN_DASHBOARD_ROUTE, DOCTOR_DASHBOARD_ROUTE, LOGIN_ROUTE, RECEPTION_DASHBOARD_ROUTE } from '../utils/consts';
import { signIn } from '../http/userAPI';
import 'react-toastify/dist/ReactToastify.css';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const click = async ()=>{
        try{
            let data;
            data = await signIn(login, password)
            if(data){
                console.log(data)
                user.setUserInfo(data.id)
                user.setUserRole(data.role)
                user.setUserFish(data.fish)
                user.setUser(user)
                user.setIsAuth(true)
                if(data.role === 'Reception'){
                    history.push(RECEPTION_DASHBOARD_ROUTE)
                }else if(data.role === 'Doctor'){
                    history.push(DOCTOR_DASHBOARD_ROUTE)
                }else if(data.role === 'Admin'){
                    history.push(ADMIN_DASHBOARD_ROUTE)
                }
            }
        }catch(e){
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
            <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight-54}}>
                <Card className='rounded border-0 card-shadow' style={{width: '600px'}}>
                    <Card.Body>
                        <div className='m-sm-4'>
                            <h1 className="m-auto gray-text text-center">Tizimga kirish</h1>
                            <Form className="d-flex flex-column mt-4 gray-text">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control type="text" placeholder="Logini yozing" value={login} onChange={e=> setLogin(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Parol</Form.Label>
                                    <Form.Control type="password" placeholder="Parolni yozing" value={password} onChange={e=> setPassword(e.target.value)}/>
                                </Form.Group>
                            <Button  onClick={click} variant="primary">
                                Kirish
                            </Button>
                        </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <ToastContainer />
        </div>
    );
});

export default Auth;
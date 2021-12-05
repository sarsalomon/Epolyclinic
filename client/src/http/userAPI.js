import { $authHost, $host } from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (email, password, role) =>{
    const {data} = await $host.post('api/user/registration',{email, password, role})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const signIn = async (login, password) =>{
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const addPatient = async (patient) =>{
    const {data} = await $authHost.post('api/user/patientadd', patient)
    return data
}

export const getPatient = async (id) =>{
    const {data} = await $authHost.get('api/user/patientget/' + id)
    return data
}

export const updatePatient = async (patients) =>{
    const {data} = await $authHost.post('api/user/update', patients)
    return data
}

export const deletePatient = async (id) =>{
    const {data} = await $authHost.post('api/user/patientdelete', {id})
    return data
}
import { $authHost } from "./index"

export const fetchDoctor = async () => {
    const {data} = await $authHost.post('api/doctor/')
    return data
}

export const getDoctor = async (id) => {
    const {data} = await $authHost.get('api/doctor/get/' + id)
    return data
}

export const addDoctor = async (doctor) =>{
    const {data} = await $authHost.post('api/doctor/add', doctor)
    return data
}

export const deleteDoctor = async (id)  =>{
    const {data} = await $authHost.post('api/doctor/delete/', {id})
    return data
}

export const updateDoctor = async (doctor)  =>{
    const {data} = await $authHost.post('api/doctor/update', {doctor})
    return data
}

export const getCountPatient = async (id) => {
    const {data} = await $authHost.post('api/doctor/getcount/', {id})
    return data
}

export const fetchPatients = async (id) => {
    const {data} = await $authHost.post('api/doctor/fetch/', {id})
    return data
}

export const getPatient = async (id) => {
    const {data} = await $authHost.post('api/doctor/getpatient/', {id})
    return data
}

export const fetchHistory = async (id) => {
    const {data} = await $authHost.post('api/doctor/fetchhistory/', {id})
    return data
}

export const addHistory = async (history) =>{
    const {data} = await $authHost.post('api/doctor/historyadd', history)
    return data
}

export const addHistoryCancel = async (history) =>{
    const {data} = await $authHost.post('api/doctor/cancelhistoryadd', history)
    return data
}

export const RedirectTo = async (history) =>{
    const {data} = await $authHost.post('api/doctor/redirectto', history)
    return data
}

export const getH = async (id) => {
    const {data} = await $authHost.post('api/doctor/getH/', {id})
    return data
}
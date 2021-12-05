import { $authHost } from "./index"

export const fetchPatient = async (fish) => {
    const {data} = await $authHost.post('api/reception/search', {fish})
    return data
}

export const getPatient = async (id) => {
    const {data} = await $authHost.get('api/reception/get/' + id)
    return data
}

export const getComment = async (id) => {
    const {data} = await $authHost.get('api/reception/getcom/' + id)
    return data
}

export const addReception = async (reception) =>{
    const {data} = await $authHost.post('api/reception/addreception',reception)
    return data
}

export const allHistory = async (reception) =>{
    const {data} = await $authHost.post('api/reception/history',reception)
    return data
}

export const getRecaption = async (id) =>{
    const {data} = await $authHost.post('api/reception/getreception',{id})
    return data
}

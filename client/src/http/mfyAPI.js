import { $authHost } from "./index"

export const fetchMFY = async () => {
    const {data} = await $authHost.post('api/mfy/')
    return data
}

export const addMFY = async (title) =>{
    console.log(title)
    const {data} = await $authHost.post('api/mfy/add', title)
    return data
}

export const getMFY = async (id) =>{
    const {data} = await $authHost.get('api/mfy/get/' + id)
    return data
}

export const updateMFY = async (id, title) =>{
    const {data} = await $authHost.post('api/mfy/update/', {id, title})
    return data
}

export const deleteMFY = async (id)  =>{
    const {data} = await $authHost.post('api/mfy/delete/', {id})
    return data
}

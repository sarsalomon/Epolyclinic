import { $authHost } from "./index"

export const fetchDepartment = async () => {
    const {data} = await $authHost.post('api/department/')
    return data
}

export const addDepartment = async (title) =>{
    const {data} = await $authHost.post('api/department/add', title)
    return data
}

export const getDepartment = async (id) =>{
    const {data} = await $authHost.get('api/department/get/' + id)
    return data
}

export const updateDepartment = async (id, title) =>{
    const {data} = await $authHost.post('api/department/update/', {id, title})
    return data
}

export const deleteDepartment = async (id)  =>{
    const {data} = await $authHost.post('api/department/delete/', {id})
    return data
}
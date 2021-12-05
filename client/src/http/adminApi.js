import { $authHost } from "./index"

export const fetchAdmin = async () => {
    const {data} = await $authHost.post('api/admin/')
    return data
}
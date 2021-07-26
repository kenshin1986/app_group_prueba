import axios from 'axios'
import config from '../config/config'

const apiUrl = `${config.API_URL}/upload`
const headers = {
    "authorization": `bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'image/png',
}

export const uploadImage = async (event: any) => {
    const data = new FormData()
    data.append('name', 'image')
    data.append('image', event.target.files[0])
    try {
        const request = await axios.post(`${apiUrl}`, data, { headers })
        return request.data
    } catch (error: any) {
        return { error: error.response.data }
    }
}
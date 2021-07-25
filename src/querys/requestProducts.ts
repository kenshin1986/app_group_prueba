import axios from 'axios'
import config from '../config/config'

const apiUrl = `${config.API_URL}/products`
const headers = {
    "authorization": `bearer ${localStorage.getItem('token')}`
}
/**
 * @description crea un producto 
 * @param name nombre del producto
 * @param price precio del producto
 * @param image url de la imagen del producto
 * @param score puntuacion del producto
 * @returns si la consulta correcta devuelve
 * un listado de productos y
 * si no es correcta devuelve el error
 */
export const createProduct = async (name: string, price: number, image: string, score: number, description: string) => {
    try {
        const request = await axios.post(`${apiUrl}`, { name, price, image, score, description },{headers})
        return request.data
    } catch (error: any) {
        return { error: error.response.data }
    }
}

/**
 * @description borra un producto
 * @id  id del producto a borrar
 * @returns si la consulta correcta devuelve un mensaje y  
 * si no es correcta devuelve el error
 */
export const deleteProduct = async (_id: string) => {
    try {
        const request = await axios.delete(`${apiUrl}/${_id}`,{headers})
        return request.data
    } catch (error: any) {
        return { error: error.response.data }
    }
}



/**
 * @description consulta lista de productos paginada
 * @$limit  cantidad maxima de items que traera la consulta
 * @$skip  posicion de la paginacion
 * @returns si la consulta correcta devuelve un objeto de productos y
 * si ocurre algun problema devuelve un error
 */
export const getProducts = async ($limit?: number, $skip?: number) => {
    try {
        const request = await axios.get(`${apiUrl}?$limit=${$limit}&$skip=${$skip}`,{headers})
        return request.data
    } catch (error: any) {
        return { error: error.response.data }
    }
}

/**
 * @description realiza patch del producto 
 * @param _id id del producto a actualizar
 * @param name nombre del producto
 * @param price precio del producto
 * @param image url de la imagen del producto
 * @param score puntuacion del producto
 * @returns si la consulta correcta devuelve producto y  
 * si no es correcta devuelve el error
 */
export const updateProduct = async (_id: string, name: string, price: number, image: string, score: number, description: string) => {
    try {
        const request = await axios.patch(`${apiUrl}/${_id}`, { name, price, image, score, description },{headers})
        return request.data
    } catch (error: any) {
        return { error: error.response.data }
    }
}


import { User, UserList } from '../types/user.interface'
import axios from 'axios'
import config from '../config/config'

const apiUrl = `${config.API_URL}/users`

/**
 * @description consulta al susuario
 */
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  try {
    const request = await axios.get(`${apiUrl}/current`, {
      headers: {
        "authorization": `bearer ${token}`
      }
    })
    return request
  } catch (error: any) {
    localStorage.removeItem('token')
    return { error: error.response.data }
  }

}

/**
 * @description realiza patch de login
 * @param email correo de usuario
 * @param password contraseña de ingreso
 * @returns si la consulta correcta devuelve usuario y token 
 * si no es correcta devuelve el error
 */
export const login = async (email: string, password: string) => {
  try {
    const request = await axios.post(`${apiUrl}/signin`, { email, password })
    return request.data
  } catch (error: any) {
    return { error: error.response.data }
  }
}

/**
 * @description se encarga de registrar el usuario
 * @param email correo de usuario obligatorio
 * @param password contraseña de usuario obligatoria
 * @param lastName apellido del usuaio opcional
 * @param firstName nombre del usuario opcional
 * @returns si la consulta correcta devuelve usuario y token 
 * si no es correcta devuelve el error
 */
export const singUp = async (email: string, password: string, lastName: string, firstName: string) => {
  try {
    const request = await axios.post(`${apiUrl}/signup`, { email, password, lastName, firstName })
    return request.data
  } catch (error: any) {
    return { error: error.response.data }
  }
}
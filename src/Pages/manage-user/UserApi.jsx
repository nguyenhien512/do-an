import axios from "axios"
import {CONFIG} from "../../httpClient/config"

export const callGetAllUsers = async (token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        return console.log(error)
    }
}

export const callSearchUsers = async (queryString, authorities, token) => {
    const authQuery = authorities.join();
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/users/getBySearch?queryString=${queryString}&authorities=${authQuery}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        return console.log(error)
    }
}

export const callInactiveUser = async (listUsername, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/users/inactive`,listUsername, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.status
    } catch (error) {
        return console.log(error)
    }
}

export const callActiveUser = async (listUsername, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/users/active`,listUsername, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.status
    } catch (error) {
        return console.log(error)
    }
}
import axios from "axios"
import {CONFIG} from "../../httpClient/config"


export const callGetAllQuestions = async (token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/questions`, {
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

export const callSearchQuestions = async (searchKey, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/questions/getBySearch?searchKey=${searchKey}`,{
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

export const callApproveQuestion = async (qIds, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/questions/approve`,qIds, {
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

export const callArchiveQuestion = async (qIds, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/questions/archive`,qIds, {
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

export const callDeleteQuestion = async (qIds, token) => {
    try {
        const response = await axios.delete(`${CONFIG.baseUrl}/api/questions/delete`, {
            data: qIds,
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
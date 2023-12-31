import axios from "axios"
import {CONFIG} from "../../httpClient/config"

export const callGetTopics = async (token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/topics`,{
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

export const callCreateTopic = async (name, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/topics`,{
            name: name
        },{
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

export const callUpdateTopic = async (topic, token) => {
    try {
        const response = await axios.put(`${CONFIG.baseUrl}/api/topics`,topic,{
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

export const callDeleteTopic = async (name, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/topics`,{
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
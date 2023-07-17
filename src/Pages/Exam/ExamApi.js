import axios from "axios"
import {CONFIG} from "../../httpClient/config"

const BASE_URL = CONFIG.baseUrl + "/tests"

export const callCreateTest = async (token) => {
    try {
        const response = await axios.post(`${BASE_URL}`,{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return console.log(error)
    }
}

export const callPostAnswers = async (testId, answers, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/${testId}/answers`,
            {
                answers
            },
            {
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

export const callGetResult = async (testId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/${testId}/result`, {
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

export const callGetExam = async (token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/students/exams`, {
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
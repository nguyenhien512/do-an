import axios from "axios"
import {CONFIG} from "../../httpClient/config"

export const callGetExam = async (token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/exams/forTeacher`, {
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

export const callGetTests = async (examId, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/tests?examId=${examId}`, {
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

export const callGetTestResult = async (testId, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/tests/${testId}/result/forTeacher`, {
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
import axios from "axios"
import {CONFIG} from "../../httpClient/config"

export const callGetExamsOfTeacher = async (token) => {
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

export const callGetExam = async (examId, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/exams/${examId}`, {
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

export const callDeleteExam = async (examId, token) => {
    try {
        const response = await axios.delete(`${CONFIG.baseUrl}/api/exams/delete/${examId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.status
    } catch (error) {
        return console.log(error)
    }
}

export const callUpdateExamConfig = async (updatedExam, token) => {
    try {
        const response = await axios.put(`${CONFIG.baseUrl}/api/exams/config`, updatedExam,{
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

export const callPublishExam = async (examId, token) => {
    try {
        const response = await axios.put(`${CONFIG.baseUrl}/api/exams/publish/${examId}`, {},{
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
import axios from "axios"
import {CONFIG} from "../../httpClient/config"

export const callCreateTest = async (examId, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/tests?examId=${examId}`,{}, {
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
        const response = await axios.post(`${CONFIG.baseUrl}/api/tests/${testId}/answers`,
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
        const response = await axios.get(`${CONFIG.baseUrl}/api/tests/${testId}/result/forStudent`, {
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
        const response = await axios.get(`${CONFIG.baseUrl}/api/exams/publishedExam/forStudent`, {
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

export const callDeleteExam = async (classId, token) => {
    try {
        const response = await axios.delete(`${CONFIG.baseUrl}/api/classes/${classId}/delete`, {
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

export const callGetQuestions = async (examId, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/questions/getByExam?examId=${examId}`, {
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

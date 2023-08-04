import axios from "axios"
import {CONFIG} from "../../httpClient/config"
import {message} from "antd"

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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callGetTestResult = async (testId, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/tests/${testId}/result-detail`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callCreateExam = async (exam, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/exams/create`,
            {
                ...exam,
                name: exam.name.toUpperCase()
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callRemoveQuestion = async (examId, questions, token) => {
    console.log('axios',questions);
    try {
        const response = await axios.delete(`${CONFIG.baseUrl}/api/exams/remove-questions/${examId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: questions
        }
        )
        return response.status
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callAddQuestions = async (examId, questions, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/exams/add-questions/${examId}`,questions,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callGetExamMatrix = async (examId, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/exams/${examId}/matrix`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callSetQuestionsByMatrix = async (examId, data, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/exams/setQuestionsByMatrix/${examId}`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}
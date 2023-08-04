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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callSubmitTests = async (token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/tests/results/forStudent`, {
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

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
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callSearchQuestions = async (searchKey, status, token) => {
    let statusJoin = status.join(",")
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/questions/getBySearch?searchKey=${searchKey}&status=${statusJoin}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callRejectQuestion = async (qIds, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/questions/reject`,qIds, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.status
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callCreateQuestion = async (question, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/questions/create`, question, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callUpdateQuestion = async (question, token) => {
    try {
        const response = await axios.put(`${CONFIG.baseUrl}/api/questions/update`, question, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callBulkCreateQuestion = async (questions, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/questions/bulkCreate`, questions, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callCountQuestionByMatrix = async (grade, subject, status, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/questions/countByMatrix?grade=${grade}&subject=${subject}&status=${status}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}
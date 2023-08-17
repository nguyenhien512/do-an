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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
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
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Không thể tải dữ liệu');
        }
    }
}

export const callUpdateUser = async (data, token) => {
    try {
        const response = await axios.put(`${CONFIG.baseUrl}/api/users`,data, {
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

export const callGetCurrentUser = async (token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/users/getCurrentUser`, {
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
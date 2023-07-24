import axios from "axios"
import {CONFIG} from "../../httpClient/config"


export const callGetClasses = async (token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/classes/forTeacher`, {
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

export const callCreateClass = async (classObj, token) => {
    try {
        const response = await axios.post(`${CONFIG.baseUrl}/api/classes/create`,
            {
                name: classObj.name,
                schoolYear: classObj.schoolYear
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
        return console.log(error)
    }
}

export const callEditClass = async (classId, classObj, token) => {
    try {
        const response = await axios.put(`${CONFIG.baseUrl}/api/classes/${classId}/edit`,
            {
                name: classObj.name,
                schoolYear: classObj.schoolYear
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
        return console.log(error)
    }
}

export const callDeleteClass = async (classId, token) => {
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

export const callGetStudents = async (classId, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/classes/${classId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data?.students
    } catch (error) {
        return console.log(error)
    }
}

export const callAddStudent = async (classId, student, token) => {
    try {
        const response = await axios.put(`${CONFIG.baseUrl}/api/classes/${classId}/addStudent?student=${student}`, {},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data?.students
    } catch (error) {
        return console.log(error)
    }
}

export const callRemoveStudent = async (classId, student, token) => {
    try {
        const response = await axios.put(`${CONFIG.baseUrl}/api/classes/${classId}/removeStudent?student=${student}`, {},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
        return response.data?.students
    } catch (error) {
        return console.log(error)
    }
}

export const callSeachStudents = async (queryString, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/students?queryString=${queryString}`,{
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

export const callGetExamCounts = async (classId, token) => {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/api/exams/submittedExam/count?classId=${classId}`,{
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

